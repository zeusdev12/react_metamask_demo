import "./login.css";
import { useState, useEffect } from "react";

const Login = (props) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [provider, setProvider] = useState(window.ethereum)
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false)

  useEffect(() => {
    setProvider(detectProvider())
  }, [])
  useEffect(() => {
    const provider = detectProvider();
    if (provider) {
      if (!window.ethereum) {
        console.error("you have installed multiple wallet");
      }
      setIsMetamaskInstalled(true)
    }
  }, [provider])

  const detectProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.warn("no ethereum browser detected checkout metamask");
    }
    return provider;
  };

  async function onLoginHandler() {
    setIsConnecting(true);
    await provider.request({
      method: "eth_requestAccounts",
    });
    setIsConnecting(false);
    props.login(provider);
  }

  return (
    <div className="card">
      {isMetamaskInstalled &&
        <button
          onClick={onLoginHandler}
          style={{ backgroundColor: "violet", color: "white", padding: "10px" }}
        >
          {!isConnecting && "Connect"}
          {isConnecting && "Loading..."}
        </button>}

      {!isMetamaskInstalled &&
        <p><a href="https://metamask.io/">Install Metamask</a></p>}

    </div>
  );
};

export default Login;
