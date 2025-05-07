import React, { useState, useEffect } from "react";
import Web3 from "web3";
import ChatContract from "./ChatContract.json";

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const accounts = await web3Instance.eth.getAccounts();
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = ChatContract.networks[networkId];

        const contractInstance = new web3Instance.eth.Contract(
          ChatContract.abi,
          deployedNetwork && deployedNetwork.address
        );

        setWeb3(web3Instance);
        setAccount(accounts[0]);
        setContract(contractInstance);
      } else {
        alert("Please install MetaMask!");
      }
    };

    initWeb3();
  }, []);

  const fetchMessages = async () => {
    if (contract) {
      const userMessages = await contract.methods.getMessages(account).call();
      setMessages(userMessages);
    }
  };

  const sendMessage = async () => {
    if (contract) {
      await contract.methods.sendMessage(receiver, message).send({ from: account });
      setMessage("");
      fetchMessages();
    }
  };

  return (
    <div>
      <h1>Decentralized Chat App</h1>
      <p>Logged in as: {account}</p>

      <div>
        <h3>Send a Message</h3>
        <input
          type="text"
          placeholder="Receiver Address"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <div>
        <h3>Your Messages</h3>
        <button onClick={fetchMessages}>Refresh</button>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <strong>From:</strong> {msg.sender} <br />
              <strong>To:</strong> {msg.receiver} <br />
              <strong>Message:</strong> {msg.content} <br />
              <strong>Timestamp:</strong> {new Date(msg.timestamp * 1000).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
