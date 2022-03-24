import Link from 'next/link'
import Button from './Button/ConnectButton'
import NavStyle from '../styles/Nav.module.css'

import { useContext } from 'react'
import { AddressContext } from '../contexts/AddressContext'


const Nav = () => {
  return (
    <nav className = {NavStyle.nav}>
        <ul>
            <li>
                <Link href = '/'>Home</Link>
            </li>
            <li>
                <Link href = '/about'>About</Link>
            </li>
            {/* <li>
              <Link href = '/signup'>Sign Up</Link>
            </li> */}
        </ul>
        <div className={NavStyle.nav.button}><Button /></div>
    </nav>
  )
}

export default Nav