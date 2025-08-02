// src/WalletAuth.jsx
import React from "react";
import { ethers } from "ethers";

function WalletAuth({ onConnect }) {
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("❌ MetaMask not detected. Please install it.");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);

      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];

      console.log("✅ Wallet connected:", address);
      onConnect(address);
    } catch (err) {
      console.error("Wallet connection error:", err);
      alert("⚠️ Could not connect wallet. Check console.");
    }
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <button onClick={connectWallet}>🔐 Sign In with MetaMask</button>
    </div>
  );
}

export default WalletAuth;
