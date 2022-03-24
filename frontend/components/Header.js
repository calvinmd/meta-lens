import headerStyles from '../styles/Header.module.css'
import { useContext } from 'react'
import { AddressContext } from '../contexts/AddressContext'

const Header = () => {
  
  return (
    <div>
        <h1 className = {headerStyles.title}>
            <span>Welcome To MetaLens</span>
        </h1>
        {/* <button>Sign Up</button> */}
    </div>
  )
}

export default Header