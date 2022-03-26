import Head from "next/head"
import sign from '../styles/Login.module.css'
import { useState, useContext, useEffect } from "react"
import CeramicClient from '@ceramicnetwork/http-client'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import { AddressContext } from "../contexts/AddressContext"
import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect'
import { DID } from 'dids'
import { IDX } from '@ceramicstudio/idx'
import { ProviderContext } from "../contexts/ProviderContext"
import card from "../styles/User.module.css"
import { ethers } from "ethers"
import factory_abi from '../../ABI/MetaLensFactory.json'
import { ContractAddressContext } from "../contexts/ContractContext"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const endpoint = "https://ceramic-clay.3boxlabs.com"


const signup = () => {
  const { getProvider } = useContext(ProviderContext)
  const provider = getProvider()
  console.log(provider)
  const { getAddress } = useContext(AddressContext)
  const add = getAddress()
  const { setCAddress } = useContext(ContractAddressContext)
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [chainID, setChainID] = useState('')
  const [symbol, setSymbol] = useState('')


  function handleContract(e) {

    setName(e.target.value)

  }
  function handleSymbol(e) { setSymbol(e.target.value) }
  function handleURL(e) { setUrl(e.target.value) }

  async function handleSubmit(e) {
    e.preventDefault()
    await updateProfile()
    const signer = provider.getSigner()
    console.log(signer, factory_abi, provider)
    const contract_instance = new ethers.Contract("0x25d3460AB6dE030f30aA6Ddce76c52A29B283a44", factory_abi, signer)
    console.log(contract_instance)
    try {
      const result = await contract_instance.createContract(name, symbol, url)
      const receipt = await result.wait()
      console.log(receipt.events[0].args[0])
      let conAdd = receipt.events[0].args[0]
      setCAddress(conAdd)
      toast.success(`Your Contract Address - ${conAdd}`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });

    }
    catch (error) {
      console.log(error)
      toast.error('Error', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }




  }



  async function readProfile(e) {
    e.preventDefault()
    const ceramic = new CeramicClient(endpoint)
    const idx = new IDX({ ceramic })

    try {
      const data = await idx.get(
        'basicProfile',
        `${add}@eip155:80001`
      )
      console.log('data: ', data)
      if (data.name) setName(data.name)
      console.log("Read profile")
    } catch (error) {
      console.log('error: ', error)
      setLoaded(true)
    }
  }

  async function updateProfile() {
    console.log(name, add)

    const ceramic = new CeramicClient(endpoint)
    const threeIdConnect = new ThreeIdConnect()
    const provider = new EthereumAuthProvider(window.ethereum, add)

    await threeIdConnect.connect(provider)

    const did = new DID({
      provider: threeIdConnect.getDidProvider(),
      resolver: {
        ...ThreeIdResolver.getResolver(ceramic)
      }
    })

    ceramic.setDID(did)
    await ceramic.did.authenticate()

    const idx = new IDX({ ceramic })

    await idx.set('basicProfile', {
      name,
      url: url
    })

    console.log("Profile updated!")
  }


  return (
    <>
      <div className={card.card} style={{ textAlign: 'center' }}>

        <form className="login-form" style={{ marginLeft: "auto", marginRight: "auto" }}>

          <h1 style={{ fontSize: "4rem", marginLeft: "40px", justifyContent: "center", color: "#0070f3" }}>Sign Up</h1>
          <input type='text' className="input" onChange={handleContract} placeholder="NFT Contract Name" size="35" style={{ height: "40px", fontSize: "1rem" }} /><br /><br />
          <input className="input" placeholder="Symbol" onChange={handleSymbol} size="35" style={{ height: "40px", fontSize: "1rem" }} type='text' /><br /><br />
          <input className="input" placeholder="Metadata URL" onChange={handleURL} size="35" style={{ height: "40px", fontSize: "1rem" }} type='text' /><br /><br /><br />
          <button onClick={handleSubmit} style={{ justifyContent: "center", backgroundColor: "#0070f3", color: "#eaeaea", height: "50px", fontSize: "1rem", borderWidth: "0", fontWeight: "bold", borderRadius: "12px", cursor: "pointer", padding: "1rem" }}>Sign Up</button><br />
          <br></br>
          {/* <button onClick={readProfile} style={{ justifyContent: "center", backgroundColor: "#0070f3", color: "#eaeaea", height: "50px", fontSize: "1rem", borderWidth: "0", fontWeight: "bold", borderRadius: "12px", cursor: "pointer", padding: "1rem" }}> Read Profile</button> */}

        </form>

      </div>
      <ToastContainer style={{ width: "500px" }} />
    </>

  )
}

export default signup