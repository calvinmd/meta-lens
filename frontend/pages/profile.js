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

function profile() {
    const endpoint = "https://ceramic-clay.3boxlabs.com"

    const ceramic = new CeramicClient(endpoint)
    const idx = new IDX({ ceramic })
    const [profileData, setProfileData] = useState('')

    try {
        idx.get(
            'basicProfile',
            `0xD59fcF0EaC5946b8a1fB12e6F83eAC74F2688bc2@eip155:80001`
        ).then(function (data) {
            console.log(data)
            setProfileData(data)

        })


    } catch (error) {
        console.log('error: ', error)
    }

    // async function readProfile(e) {
    //     e.preventDefault()
    //     const endpoint = "https://ceramic-clay.3boxlabs.com"

    //     const ceramic = new CeramicClient(endpoint)
    //     const idx = new IDX({ ceramic })

    //     try {
    //         const data = await idx.get(
    //             'basicProfile',
    //             `0xD59fcF0EaC5946b8a1fB12e6F83eAC74F2688bc2@eip155:80001`
    //         )
    //         console.log('data: ', data)
    //         if (data.name) setName(data.name)
    //         console.log("Read profile")
    //     } catch (error) {
    //         console.log('error: ', error)
    //     }
    // }

    return (
        <>
            <div>
                <h1>{profileData.name}</h1>
                <h1>{profileData.url}</h1>
            </div>
            <h1></h1></>

    )
}

export default profile