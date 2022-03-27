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


function profile() {
    const { getAddress } = useContext(AddressContext)
    const address = getAddress()
    const endpoint = "https://ceramic-clay.3boxlabs.com"
    let userData = ''

    const ceramic = new CeramicClient(endpoint)
    const idx = new IDX({ ceramic })
    const [profileData, setProfileData] = useState('')
    const [ceramicID, setCeramicID] = useState('')

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

    useEffect(async () => {
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

            fetch('/api/user/getUserByID', requestObj).then(response => response.json()).then(function (data) {
                userData = data.data[0]
                setCeramicID(userData.userCeramicId)


                console.log(data.data[0])
            })
        }
        catch (error) {
            console.log(error)
        }


    }, [])


    return (
        <>
            <div className={postStyles.card} style={{ height: "220px", width: "1000px" }}>
                <h3>Wallet Address - {address}</h3>
                <h3>Name - {profileData.name}</h3>
                <h3>URL - {profileData.url}</h3>
                <h3>Ceramic ID - {ceramicID}</h3>
            </div>
            <h1></h1></>

    )
}

export default profile