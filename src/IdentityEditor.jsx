import React, { useEffect, useState } from "react";
import axios from "axios";

function IdentityEditor({ walletAddress }) {
  const [identity, setIdentity] = useState({
    name: "",
    dob: "",
    email: "",
    did: "",
  });

  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);

  // 🔄 Auto-fill DID when wallet connects
  useEffect(() => {
    if (walletAddress) {
      setIdentity((prev) => ({
        ...prev,
        did: `did:pkh:eip155:1:${walletAddress}`,
      }));
    }
  }, [walletAddress]);

  const handleChange = (e) => {
    setIdentity({ ...identity, [e.target.name]: e.target.value });
  };

  const handleUpload = async () => {
    setUploading(true);

    try {
      const jsonBlob = new Blob([JSON.stringify(identity, null, 2)], {
        type: "application/json",
      });

      const formData = new FormData();
      formData.append("file", jsonBlob, "identity.json");

      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxContentLength: Infinity,
        headers: {
          "Content-Type": `multipart/form-data`,
          Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
        },
      });

      setCid(res.data.IpfsHash);
    } catch (err) {
      console.error("Upload error:", err.message);
      alert("Upload failed. Check the console.");
    }

    setUploading(false);
  };

  return (
    <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #ccc" }}>
      <h2>📝 Edit Identity</h2>
      <input name="name" placeholder="Name" value={identity.name} onChange={handleChange} />
      <input name="dob" placeholder="Date of Birth" value={identity.dob} onChange={handleChange} />
      <input name="email" placeholder="Email" value={identity.email} onChange={handleChange} />
      <input name="did" placeholder="DID" value={identity.did} readOnly />

      <br /><br />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload to IPFS"}
      </button>

      {cid && (
        <p>
          ✅ New Identity CID: <code>{cid}</code>
        </p>
      )}
    </div>
  );
}

export default IdentityEditor;
