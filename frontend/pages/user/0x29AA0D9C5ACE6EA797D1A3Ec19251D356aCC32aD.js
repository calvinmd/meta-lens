import React, { useContext } from 'react'
import userStyles from '../../styles/User.module.css'
import { ClassNames } from '@emotion/react'
import footerStyles from '../../styles/Footer.module.css'
import { ethers } from 'ethers'
import { ProviderContext } from '../../contexts/ProviderContext'
import { AddressContext } from '../../contexts/AddressContext'
import { ContractAddressContext } from '../../contexts/ContractContext'
import contract_abi from '../../../ABI/MetaLensFollow.json'

export default function user1() {
    const { getProvider } = useContext(ProviderContext)
    const provider = getProvider()
    const { getAddress } = useContext(AddressContext)
    const address = getAddress()
    const { getCAddress } = useContext(ContractAddressContext)
    const contractAddress = getCAddress()

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

    let content = Array.from({ length: 6 }, () => Math.floor(Math.random() * 39));

    async function handleFollow(e) {
        e.preventDefault()
        console.log(provider, contract_abi, address)

        const signer = provider.getSigner()
        // console.log(contractAddress)
        const contract_instance = new ethers.Contract("0x90caEBDd70ca762C20CC553c741309ADD3Bd7B22", contract_abi, signer)
        console.log(contract_instance)
        try {
            const tx = await contract_instance.processFollowMint(address, "0xB9bee95542f753D3B5a9568Ff81F0Ae761d4959a")
            const receipt = await tx.wait()
            console.log(receipt)

        }
        catch (error) {
            console.log(error)
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
                {Array.from({ length: 6 }, (_, i) =>
                    <div className={userStyles.card}>

                        <h1>Description - {content[i]}</h1>
                        <img height="400px" style={{ objectFit: 'cover', marginLeft: "10px", marginLeft: '350px' }} width="400px" src="http://cryptodailycdn.ams3.cdn.digitaloceanspaces.com/lens-protocol.jpg" />

                        <div style={{ display: 'block' }} className='grid'><br />
                        </div >


                    </div>
                )}
            </section>
            <div className={footerStyles.footer}>
                <button onClick={handleFollow} style={{ size: "50px", fontWeight: "bolder", fontSize: "20px", justifyContent: "flex-start" }}>Follow</button>
                {/* <button onClick={handleNewPost} style={{ size: "50px", fontWeight: "bolder", fontSize: "20px", justifyContent: "flex-end" }}>New Post</button> */}
            </div>




        </>
    )
}

