import Layout from '../components/Layout'
import Nav from '../components/Nav'
import '../styles/globals.css'
import { AddressProvider } from '../contexts/AddressContext';

function MyApp({ Component, pageProps }) {

  return (
    <AddressProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AddressProvider>
    
  )
}

export default MyApp
