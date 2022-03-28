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
import postStyles from '../styles/NewPost.module.css'
import axios from "axios"

function profile() {
    // const { getAddress } = useContext(AddressContext)
    // const address = getAddress()
    const endpoint = "https://ceramic-clay.3boxlabs.com"
    let userData = ''

    const ceramic = new CeramicClient(endpoint)
    const idx = new IDX({ ceramic })
    const [profileData, setProfileData] = useState('')
    const [ceramicID, setCeramicID] = useState('')
    const [len, setLen] = useState('')

    const [content, setcontent] = useState([])
    const [image, setimage] = useState([])
    const [postD, setPostD] = useState(null)
    const [add, setAdd] = useState('')
    let postData = ''
    let provider = ''
    let address = ''
    let CID = []

    useEffect(async () => {
        provider = new ethers.providers.Web3Provider(window.ethereum)
        let add = await provider.send("eth_requestAccounts", [])
        address = add[0]
        setAdd(address)
        try {
            await getProfileDetails()
            let config = {
                "userWallet": address
            }
            let requestObj = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(config)
            }
            await fetch('/api/user/getUserByID', requestObj).then(response => response.json()).then(function (data) {
                userData = data.data[0]
                setCeramicID(userData.userCeramicId)
                console.log(data.data[0])
            })
        }
        catch (error) {
            console.log(error)
        }
        try {
            let config = {
                "userID": address
            }
            let requestObj = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(config)
            }
            await fetch('/api/post/findPostByUser', requestObj).then(response => response.json()).then(function (data) {

                postData = data.data
                setPostD(postData)
                console.log(postData)
                setLen(postData.length)
            })
            for (let i = 0; i < postData.length; i++) {
                await setcontent(oldcontent => [...oldcontent, postData[i].postContent])
                CID.push(postData[i].postCID)
                let result = await accessToken(i)
                setimage(prevResult => [...prevResult, result])
            }
        }
        catch (error) {
            console.log(error)
        }


    }, [])
    async function accessToken(j) {

        const urlV2API = `https://managed.mypinata.cloud/api/v1`;
        const API_KEY = "7pOx7VnDHTWqQIOv70vd5xAAlJqWqWXr";
        const GATEWAY_URL = "metadeso.mypinata.cloud";


        const config = {
            headers: {
                "x-api-key": `${API_KEY}`,
                'Content-Type': 'application/json'
            }
        }
        try {
            const con = await axios.get(`${urlV2API}/content`, config);
            console.log(con)

            const { data } = con;
            console.log(data)
            const { items } = data;
            console.log(items)

            const item = items.find(i => i.cid === CID[j]);
            console.log(item)
            const body = {
                timeoutSeconds: 3600,
                contentIds: [item.id]
            }
            console.log(body)
            const token = await axios.post(`${urlV2API}/auth/content/jwt`, body, config);
            console.log(token)
            return (`https://${GATEWAY_URL}/ipfs/${CID[j]}?accessToken=${token.data}`);


        } catch (error) {
            console.log(error);
            return error
        }
    }


    async function getProfileDetails() {
        console.log(address)
        try {
            idx.get(
                'basicProfile',
                `${address}@eip155:80001`
            ).then(function (data) {
                console.log(data)
                setProfileData(data)

            })


        } catch (error) {
            console.log('error: ', error)
        }
    }


    return (
        <>
            <div className={postStyles.card} style={{ height: "220px", width: "1000px", marginTop: "0rem" }}>
                <h3>Wallet Address - {add}</h3>
                <h3>Name - {profileData.name}</h3>
                <h3>URL - {profileData.url}</h3>
                <h3>Ceramic ID - {ceramicID}</h3>
            </div>

            <section>
                {Array.from({ length: len }, (_, i) =>
                    <div className={postStyles.card} style={{ height: '600px', width: "1000px" }}>
                        <h1>{content[i]}</h1>
                        <img height="400px" style={{ objectFit: 'cover', marginLeft: "10px", marginLeft: '350px' }} width="400px" src={image[i]} />
                    </div>
                )}
            </section>

        </>

    )
}

export default profile