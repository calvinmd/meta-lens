import { Dispatch } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { providers } from 'ethers';

import { INFURA_PROJECT_ID, INFURA_URL, ETHEREUM_NETWORK } from '../config/config';
import { StoreActions, StoreActionTypes, StoreState } from '../types/store';

export const configMetamask = async (
    dispatch: Dispatch<StoreActions>
  ): Promise<StoreState> => {
    const metamaskProvider = await detectEthereumProvider();
    let provider: providers.AlchemyProvider | providers.Web3Provider;
  
    if (metamaskProvider && window.ethereum) {
      provider = new providers.Web3Provider(window.ethereum);
    } else {
      provider = new providers.InfuraProvider(ETHEREUM_NETWORK, INFURA_PROJECT_ID);
    }
  
    dispatch({
      type: StoreActionTypes.SET_PROVIDER,
      payload: {
        provider,
      },
    });
  
    const accounts = await provider.send('eth_requestAccounts', []);
  
    dispatch({
      type: StoreActionTypes.SET_ACCOUNT,
      payload: { account: accounts[0] },
    });
  
    return { provider, account: accounts[0] };
  }
