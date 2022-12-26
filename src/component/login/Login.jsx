import "./login.css";
import { useState } from "react";

const Login = (props) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const detectProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      window.alert("no ethereum browser detected checkout metamask");
    }
    return provider;
  };

  async function onLoginHandler() {
    const provider = detectProvider();
    if (provider) {
      if (!window.ethereum) {
        console.error("you have installed multiple wallet");
      }
      setIsConnecting(true);
      await provider.request({
        method: "eth_requestAccounts",
      });
      setIsConnecting(false);
      props.login(provider);
    }
  }
  return (
    <div className="card">
      <button
        onClick={onLoginHandler}
        style={{ backgroundColor: "violet", color: "white", padding: "10px" }}
      >
       {! isConnecting && "Connect"}
       {isConnecting && "Loading..."}
      </button>
    </div>
  );
};

export default Login;
