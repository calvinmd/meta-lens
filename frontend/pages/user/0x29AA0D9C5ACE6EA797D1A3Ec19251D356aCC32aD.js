import React, { useContext, useEffect, useState } from 'react'
import userStyles from '../../styles/User.module.css'
import { ClassNames } from '@emotion/react'
import footerStyles from '../../styles/Footer.module.css'
import { ethers } from 'ethers'
import { ProviderContext } from '../../contexts/ProviderContext'
import { AddressContext } from '../../contexts/AddressContext'
import { ContractAddressContext } from '../../contexts/ContractContext'
import contract_abi from '../../../ABI/MetaLensFollow.json'
import nft_abi from '../../../ABI/NFT.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

export default function user1() {
    // const { getProvider } = useContext(ProviderContext)
    // const provider = getProvider()
    // const { getAddress } = useContext(AddressContext)
    // const address = getAddress()
    const { getCAddress } = useContext(ContractAddressContext)
    const contractAddress = getCAddress()
    let postData = ''
    let postContent = []
    const [content, setcontent] = useState([])
    const [cid, setcid] = useState([])
    const [postD, setPostD] = useState('')
    const [len, setLen] = useState(0)
    const CID = []
    const token = []
    const [image, setimage] = useState([])


    const tokenAccess = ["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmRleGVzIjpbIjExMWJhNzgzNTU0NTVkYTBiMjI1MWJjMmJiNzM2ODdhIl0sImFjY291bnRJZCI6IjdmMjczMmRmLWIzYzAtNGI3YS1iOTc3LTJhYzU5NDFlNjlmYiIsImlhdCI6MTY0ODM4NDc0MiwiZXhwIjoxNjQ4Mzg4MzQyfQ.jsenNEw3C1a8HUVHYBswJHPJssesN1RSOPFYmkcZabA", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmRleGVzIjpbIjQwMjg1YjFiYWM2YzA4ODkwMWI0Njc3YzU4MzUzMjlkIl0sImFjY291bnRJZCI6IjdmMjczMmRmLWIzYzAtNGI3YS1iOTc3LTJhYzU5NDFlNjlmYiIsImlhdCI6MTY0ODM4NDc2NiwiZXhwIjoxNjQ4Mzg4MzY2fQ.HTngH3VYgDbRi5wx1sqi2dSB810sxDArIJ2aXwtUd44", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmRleGVzIjpbIjZkYmE1MDQ0MmQ3ZjU2OGIyNDllMTNhZTcxNTYwNTkzIl0sImFjY291bnRJZCI6IjdmMjczMmRmLWIzYzAtNGI3YS1iOTc3LTJhYzU5NDFlNjlmYiIsImlhdCI6MTY0ODM4NDc4NiwiZXhwIjoxNjQ4Mzg4Mzg2fQ.kvMArL1x-C33HYgnlCP8ofFdh5MXxHrmfXmkGE3I5Uc", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmRleGVzIjpbImRjNjg2YzY5MjRkYmQ0NDY5NGI0NDJmN2FjN2VmOGFmIl0sImFjY291bnRJZCI6IjdmMjczMmRmLWIzYzAtNGI3YS1iOTc3LTJhYzU5NDFlNjlmYiIsImlhdCI6MTY0ODM4MjgwNywiZXhwIjoxNjQ4Mzg2NDA3fQ.Pb8-3_IVs_mP_h-DEaU2gEy3noc0fU8y2c-F5K-7Hes"]

    useEffect(async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        let add = await provider.send("eth_requestAccounts", []);
        const address = add[0]
        console.log(address)


        try {
            let config = {
                "userID": "0x29aa0d9c5ace6ea797d1a3ec19251d356acc32ad"
            }

            let requestObj = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(config)
            }

            const result = await fetch('/api/post/findPostByUser', requestObj).then(response => response.json()).then(function (data) {
                postData = data.data
                setPostD(postData)
                console.log(postData)
                setLen(postData.length)
                console.log(length)
                console.log(postData)

            })
        }
        catch (error) {
            console.log(error)
        }
        // await loadContent()
        // const signer = provider.getSigner()
        console.log(provider)
        const nft_instance = new ethers.Contract("0x31356ACA0Fa732fFcebf10EDC82E34670a6Be593", nft_abi, provider)
        const tx = await nft_instance.balanceOf(address)
        console.log(tx)
        for (let i = 0; i < postData.length; i++) {

            //cid.push(postData[i].postCID)
            // postContent.push(postData[i].postContent)
            await setcontent(oldcontent => [...oldcontent, postData[i].postContent])
            if (tx._hex !== "0x00") {
                await setcid(oldcid => [...oldcid, postData[i].postCID])
                CID.push(postData[i].postCID)
                let result = await accessToken(i)
                setimage(prevResult => [...prevResult, result])
            }
            else {
                let dummy = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/31/ff/6a/locked-escape-room-herning.jpg?w=800&h=-1&s=1'
                setimage(prevResult => [...prevResult, dummy])
            }
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



    function render_div() {

        return (
            <>
                <h1>ABC</h1>
            </>

        )

    }
    function render() {

        for (let i = 0; i < 5; i++) {
            console.log(render_div())
            return render_div()

            // return (
            //     <>
            //         <h1>ABC</h1>
            //     </>
            // )
        }
    }

    let con = Array.from({ length: 6 }, () => Math.floor(Math.random() * 39));

    async function handleFollow(e) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        let add = await provider.send("eth_requestAccounts", []);
        const address = add[0]
        e.preventDefault()
        console.log(provider, contract_abi, address)

        // console.log(contractAddress)
        const signer = provider.getSigner()
        const contract_instance = new ethers.Contract("0x31356ACA0Fa732fFcebf10EDC82E34670a6Be593", nft_abi, signer)
        console.log(contract_instance)
        try {
            const tx = await contract_instance.safeMint(address)
            const receipt = await tx.wait()
            console.log(receipt)
            toast.success(`NFT Minted`, {
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
    function handleNewPost(e) {

    }

    return (
        <>

            <h3>User  - 0x29AA0D9C5ACE6EA797D1A3Ec19251D356aCC32aD</h3>
            <img height="50px" style={{ borderRadius: "50%", objectFit: 'cover', marginLeft: "10px" }} object-fit="cover" width="50px" src="https://images.mirror-media.xyz/nft/fxLLnfELgHtWF_DcH4TfA.png" />

            <div className={userStyles.card} style={{ border: 'none', height: '50px', width: "600px" }}></div>


            <section>
                {Array.from({ length: len }, (_, i) =>
                    <div className={userStyles.card}>
                        <h1>{content[i]}</h1>
                        <img height="400px" style={{ objectFit: 'cover', marginLeft: "10px", marginLeft: '350px' }} width="400px" src={image[i]} />
                    </div>
                )}
            </section>
            {/* <div className={userStyles.card}>
                <h1>{content[0]}</h1>
                <img height="400px" style={{ objectFit: 'cover', marginLeft: "10px", marginLeft: '350px' }} width="400px" src={`https://metadeso.mypinata.cloud/ipfs/${cid[0]}?accessToken=${tokenAccess[0]}`} />
            </div>
            <div className={userStyles.card}>
                <h1>{content[1]}</h1>
                <img height="400px" style={{ objectFit: 'cover', marginLeft: "10px", marginLeft: '350px' }} width="400px" src={`https://metadeso.mypinata.cloud/ipfs/${cid[1]}?accessToken=${tokenAccess[1]}`} />
            </div>
            <div className={userStyles.card}>
                <h1>{content[2]}</h1>
                <img height="400px" style={{ objectFit: 'cover', marginLeft: "10px", marginLeft: '350px' }} width="400px" src={`https://metadeso.mypinata.cloud/ipfs/${cid[2]}?accessToken=${tokenAccess[2]}`} />
            </div>
            <div className={userStyles.card}>
                <h1> {content[3]}</h1>
                <img height="400px" style={{ objectFit: 'cover', marginLeft: "10px", marginLeft: '350px' }} width="400px" src={`https://metadeso.mypinata.cloud/ipfs/${cid[3]}?accessToken=${tokenAccess[3]}`} />
            </div> */}
            <div className={footerStyles.footer}>
                <button onClick={handleFollow} style={{ size: "50px", fontWeight: "bolder", fontSize: "20px", justifyContent: "flex-start", cursor: "pointer" }}>Follow</button>
                {/* <button onClick={handleNewPost} style={{ size: "50px", fontWeight: "bolder", fontSize: "20px", justifyContent: "flex-end" }}>New Post</button> */}
            </div>


            <ToastContainer style={{ width: "500px" }} />


        </>
    )
}

