import { useState } from "react";
import Home from "./component/home/Home";
import Login from "./component/login/Login";
import Web3 from "web3";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentaccount, setCurrentAccound] = useState(null);
  async function login(provider) {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      console.log("plese connect to metamask");
    } else if (accounts[0] !== currentaccount) {
      setCurrentAccound(accounts[0]);
    }else{

    }
    setIsConnected(true);
  }
  function logout() {
    setIsConnected(false);
  }
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
        {isConnected && <Home logout={logout} currentaccount={currentaccount} />}
      </main>
    </div>
  );
}

export default App;
