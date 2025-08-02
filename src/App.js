import React, { useState } from "react";
import WalletAuth from "./WalletAuth";
import IdentityViewer from "./IdentityViewer";
import IdentityEditor from "./IdentityEditor";

function App() {
  const [wallet, setWallet] = useState("");

  return (
    <div className="App">
      <h1>🌐 Decentralized Identity Viewer</h1>

      <WalletAuth onConnect={setWallet} />
      <IdentityViewer />
      <IdentityEditor walletAddress={wallet} />
    </div>
  );
}

export default App;
