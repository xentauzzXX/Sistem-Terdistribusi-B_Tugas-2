// src/App.jsx
import React, { useState } from "react";
import "./App.css";

function App() {
  const [response, setResponse] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState([]);
  const [rpcInput, setRpcInput] = useState(""); // Input untuk RPC
  const [selectedModel, setSelectedModel] = useState("request-response");

  const handleRequestResponse = (input) => {
    setResponse(`Response with input: ${input}`);
  };

  const handlePublishSubscribe = (input) => {
    const newMessage = input || `Message ${receivedMessages.length + 1}`;
    setReceivedMessages([...receivedMessages, newMessage]);
  };

  const handleMessagePassing = () => {
    if (message) {
      setSentMessages([...sentMessages, message]);
      setMessage("");
    }
  };

  // Logika untuk RPC
  const handleRPC = () => {
    setResponse(`Response from RPC model with input: ${rpcInput}`);
    setRpcInput(""); // Reset input setelah diproses
  };

  const renderModel = () => {
    let explanation = "";

    switch (selectedModel) {
      case "request-response":
        explanation = (
          <p>
            <strong>Alur Request-Response:</strong> Pengirim mengirimkan
            permintaan ke penerima, dan penerima memberikan respons kembali ke
            pengirim.
          </p>
        );
        return (
          <div>
            <h2>Request-Response Model</h2>
            <input
              type="text"
              placeholder="Enter request"
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={() => handleRequestResponse(message)}>
              Send Request
            </button>
            <div className="response">{`Response: ${response}`}</div>
            {explanation}
          </div>
        );

      case "publish-subscribe":
        explanation = (
          <p>
            <strong>Alur Publish-Subscribe:</strong> Pengirim menerbitkan pesan,
            dan penerima yang berlangganan akan menerima pesan tersebut.
          </p>
        );
        return (
          <div>
            <h2>Publish-Subscribe Model</h2>
            <input
              type="text"
              placeholder="Enter message to publish"
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={() => handlePublishSubscribe(message)}>
              Publish Message
            </button>
            <div className="received-messages">
              <h3>Received Messages:</h3>
              <ul>
                {receivedMessages.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </ul>
            </div>
            {explanation}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <h1>Communication Models Simulation</h1>
      <label htmlFor="modelSelect">Select Communication Model:</label>
      <select
        id="modelSelect"
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
      >
        <option value="request-response">Request-Response</option>
        <option value="publish-subscribe">Publish-Subscribe</option>
      </select>

      {renderModel()}
    </div>
  );
}

export default App;
