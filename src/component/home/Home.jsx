import "./home.css";

const Home = (props) => {
  function onLogOutHandler() {
    props.logout(false);
  }
  return (
   <div>
     <button
     onClick={onLogOutHandler}
     style={{ backgroundColor: "black", color: "white", padding: "10px" ,marginLeft:'47%' }}
   >
     logout
   </button>
     <div className="card">
      <h1>Welcome</h1>
    </div>
    <h2>{props.currentaccount}</h2>
    
   </div>
  );
};

export default Home;
