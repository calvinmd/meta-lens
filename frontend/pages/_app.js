import Layout from '../components/Layout'
import Nav from '../components/Nav'
import '../styles/globals.css'
import { AddressProvider } from '../contexts/AddressContext';
import { ProviderProvider } from '../contexts/ProviderContext';
import { ContractAddressProvider } from '../contexts/ContractContext'

function MyApp({ Component, pageProps }) {

  return (

    <ProviderProvider>
      <AddressProvider>
        <ContractAddressProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ContractAddressProvider>
      </AddressProvider>
    </ProviderProvider>


  )
}

export default MyApp
