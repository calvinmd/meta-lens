import { ethers } from "ethers"
import { useState, useEffect, useContext } from "react"

import { AddressContext } from "../../contexts/AddressContext";

const Button = ({}) => {
  const { addAddress } = useContext(AddressContext);

  const [address, setAddress] = useState('Connect Wallet');
  const [ethereum, setEthereum] = useState(null);
  const [connect, setConnect] = useState(false)
  const [accounts, setAccounts] = useState('');
  const [count, setCount] = useState(0);
  const [display, setDisplay] = useState("Connect Wallet")

  async function connectWallet() {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const add = await provider.send("eth_requestAccounts", []);
        setAddress(add[0])
        setEthereum(provider);
        setConnect(true)
      }
      else {
        alert("Install Metamask Extension")
      }

  }

  async function getAccount() {
      const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
      });

      return accounts[0];
  }

  useEffect(() => {
      connectWallet()
      getAccount().then((account) => {
        setAccounts(account);
        addAddress(account);
        setCount(count + 1);
      });
  }, [accounts, count]);

  const handleConnect = async () => {
    setDisplay(address)
  }

  return (
    <button onClick= { handleConnect } > { address } </button>
  )
}

export default Button