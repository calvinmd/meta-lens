import Nav from '../components/Nav'
import Header from '../components/Header'
import styles from '../styles/Layout.module.css'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <>
        <Nav />
        <div className = {styles.container}>
          {/* <Header /> */}
            <main className = {styles.main}>
                {children}
            </main>
            {/* <Footer /> */}
        </div>
    </>
  )
}

export default Layout;
