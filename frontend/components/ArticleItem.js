import articleStyles from '../styles/Article.module.css'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import axios from "axios";
import { useEffect, useState } from "react";

// post list - order by ID

const ArticleItem = ({article}) => {
  const [ethereum, setEthereum] = useState(null);
  const [isPFPinata, setIsPFPinata] = useState(null);
  const [secretUrl, setSecretUrl] = useState(null);
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
      setEthereum(window.ethereum);
    }
    if (ethereum) {
      ethereum.request({ method: "eth_requestAccounts" });
    }
  }, [ethereum]);
  const handleProveIt = async () => {
    //  First we get the message to sign back from the server
    const messageToSign = await axios.get("/api/verify");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];
    const signedData = await ethereum.request({
      method: "personal_sign",
      params: [JSON.stringify(messageToSign.data), account, messageToSign.data.id],
    });

    try {
      const res = await axios.post("/api/verify", {
        address: account,
        signature: signedData
      });
      const url = res.data;
      setIsPFPinata(true);
      setSecretUrl(url);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setIsPFPinata(false);
      }
    }
  };
  return (
    <div className={articleStyles.h2}>
      <Head>
        <meta name="description" content="A MetaLens Members Only Site" />
        <link rel="icon" href="/logo.svg" />
      </Head>

      <main className={articleStyles.card}>
        <h1>Post Content</h1>
        <p>
          Post text
        </p>
        {isPFPinata === false ? (
          <div className = {articleStyles.card.image}>
            <h4>You're not one of us</h4>
            <img
              src="https://ideas.ted.com/wp-content/uploads/sites/3/2015/12/guy_winch_ted_dawn_kim_rejection_120615.jpg"
              alt="Not one of us"
            />
          </div>
        ) : isPFPinata === true ? (
          <div style={{textAlign: "center"}}>
            <h4>Welcome to the club</h4>
            <img style={{maxWidth: "80%"}} src={"https://"+secretUrl} alt="One of us" />
          </div>
        ) : (
          <button className={articleStyles.card.button} onClick={handleProveIt}>
            I'm A PFPinata
          </button>
        )}
      </main>
    </div>
  );
}

export default ArticleItem