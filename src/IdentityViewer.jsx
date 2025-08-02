// IdentityViewer.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function IdentityViewer() {
  const [cid, setCid] = useState('');
  const [identity, setIdentity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchIdentity = async () => {
    setLoading(true);
    setError('');
    try {
      const url = `https://gateway.pinata.cloud/ipfs/${cid}`;
      const res = await axios.get(url);
      setIdentity(res.data);
    } catch (err) {
      setError('❌ Failed to fetch identity. Please check the CID.');
      setIdentity(null);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">🌐 Decentralized Identity Viewer</h1>
      <input
        type="text"
        className="p-2 rounded text-black w-full max-w-md mb-4"
        placeholder="Enter IPFS CID..."
        value={cid}
        onChange={(e) => setCid(e.target.value)}
      />
      <button
        onClick={fetchIdentity}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
        disabled={loading || !cid}
      >
        {loading ? 'Loading...' : 'Fetch Identity'}
      </button>

      {error && <p className="text-red-400">{error}</p>}

      {identity && (
        <div className="bg-gray-800 p-4 rounded shadow w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">🪪 Identity Data</h2>
          <p><strong>Name:</strong> {identity.name}</p>
          <p><strong>Email:</strong> {identity.email}</p>
          <p><strong>DOB:</strong> {identity.dob}</p>
          <p><strong>DID:</strong> <code className="break-all text-green-400">{identity.did}</code></p>
        </div>
      )}
    </div>
  );
}
