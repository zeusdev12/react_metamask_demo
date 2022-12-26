import { useState, useEffect } from "react";
import Home from "./component/home/Home";
import Login from "./component/login/Login";
import Web3 from "web3";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentaccount, setCurrentAccound] = useState(null);
  const [provider, setProvider] = useState(window.ethereum)
  const [chainId, setChainId] = useState(null)
  const [web3, setWeb3] = useState(null)


  const NETWORKS = {
    1: "Ethereum Main Network",
    3: "Ropsten Test Network",
    4: "Rinkeby Test Network",
    5: "Goerli Test Network",
    42: "Kovan Test Network",
    80001: "Mumbai",
  };

  //login
  async function login(provider) {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    const chainId = await web3.eth.getChainId()
    if (accounts.length === 0) {
      console.log("plese connect to metamask");
      logout()
    } else if (accounts[0] !== currentaccount) {
      setProvider(provider)
      setWeb3(web3)
      setChainId(chainId)
      setCurrentAccound(accounts[0]);
      setIsConnected(true);
    }
  }
  useEffect(() => {
    const handleAccountChanged = async (accounts) => {
      console.log('handle account change');
      const web3Accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        logout()
      } else if (accounts[0] !== currentaccount) {
        setCurrentAccound(accounts[0]);
      }
    }
    const handlChainChanged = async (chainId) => {
      const web3ChainId = await web3.eth.getChainId()
      setChainId(web3ChainId)
    }
    if (isConnected) {
      console.log('useEffect iscoonected');

      provider.on('accountsChanged', handleAccountChanged)
      provider.on('chainChanged', handlChainChanged)
    }
    return () => {
      if (!isConnected) {
        provider.removeListener('accountChanged', handleAccountChanged)
        provider.removeListener('chainChanged', handlChainChanged)
      }
    }
  }, [isConnected])
  // logout
  function logout() {
    setIsConnected(false);
    setCurrentAccound(null)
  }
  const getCurrentNetwork = (chainId) => {
    return NETWORKS[chainId];
  };

  return (
    <div>
      <header className="main-header">
        <h1>React &amp; Web3</h1>
        <nav className="nav">
          <ul>
            <li>
              <a href="/">{currentaccount}</a>
            </li>
          </ul>
        </nav>
      </header>
      <main style={{ display: "flex", justifyContent: "center" }}>
        {!isConnected && <Login login={login} />}
        {isConnected && <Home logout={logout} currentaccount={currentaccount} currentNetwork={getCurrentNetwork(chainId)} />}
      </main>
    </div>
  );
}

export default App;
