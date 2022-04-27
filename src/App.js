import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import GlobalStyles from './globalStyles'
import { Navbar, Footer } from './components';
import Home from './pages/HomePage/Home';
import Services from './pages/Services/Services';
import Products from './pages/Products/Products';
import SignUp from './pages/SignUp/SignUp';
import ScrollToTop from './components/ScrollToTop';
import { useDispatch } from "react-redux";
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import { loadContract } from './utils/load-contract';
import { setWeb3Api as setWeb3 } from './actions/web3ApiAction'
import { setAccount as setAccountAction } from './actions/accountActions'
import Infomation from './pages/Infomation/Infomation';

function App() {
  
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null
  });
  const [account, setAccount] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      const contract = await loadContract('VaccineContract', provider);
      setWeb3Api({
        web3: new Web3(provider),
        provider,
        contract
      });
    }
    loadProvider();
  }, []);

  useEffect(() => {
    dispatch(setWeb3(web3Api))
  }, [web3Api]);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    }
    web3Api.web3 && getAccount();
  }, [web3Api.web3]);

  useEffect(() => {
    dispatch(setAccountAction(account))
  }, [account])

  return (
    <Router>
      <GlobalStyles />
      <ScrollToTop />
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/infomation' component={Infomation} />
        <Route path='/services' component={Services} />
        <Route path='/products' component={Products} />
        <Route path='/sign-up' component={SignUp} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
