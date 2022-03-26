import React from 'react'
import userStyles from '../styles/User.module.css'
import { ClassNames } from '@emotion/react'
import { Head } from 'next/Head'
export default function user1() {


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



    return (
        <>

            <h1>User 1  </h1>
            <img height="50px" style={{ borderRadius: "50%", objectFit: 'cover', marginLeft: "10px" }} object-fit="cover" width="50px" src="https://images.mirror-media.xyz/nft/fxLLnfELgHtWF_DcH4TfA.png" />

            <div className={userStyles.card} style={{ border: 'none', height: '50px' }}></div>
            {/* <h1>User 1  </h1>
            <img height="50px" style={{ borderRadius: "50%", objectFit: 'cover', marginLeft: "10px" }} object-fit="cover" width="50px" src="https://images.mirror-media.xyz/nft/fxLLnfELgHtWF_DcH4TfA.png" /> */}

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


        </>
    )
}

