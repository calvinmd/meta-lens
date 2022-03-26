import Link from 'next/link'
import Button from './Button/ConnectButton'
import NavStyle from '../styles/Nav.module.css'

import { useContext } from 'react'
import { AddressContext } from '../contexts/AddressContext'


const Nav = () => {
  function handleLogin() {
    console.log("abc")
  }
  return (
    <nav className={NavStyle.nav}>
      <ul>
        {/* <li>
          <Link href='/'>Feed</Link>
        </li> */}
        <li>
          <Link href='/signup'>Sign Up</Link>
        </li>
        <li>
          <Link href='/profile'>Profile</Link>
        </li>
        <li>
          <Link href='/newPost'>New Post</Link>
        </li>
        <li>
          <Link href='/user/0x29AA0D9C5ACE6EA797D1A3Ec19251D356aCC32aD'>User</Link>
        </li>
        {/* <li>
          <Login onClick={handleLogin}>Login</Login>
        </li> */}
        {/* <li>
              <Link href = '/signup'>Sign Up</Link>
            </li> */}
      </ul>
      <div className={NavStyle.nav.button}><Button /></div>
    </nav>
  )
}

export default Nav