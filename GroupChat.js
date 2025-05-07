import React, { useState } from "react";

const GroupChat = ({ contract, account }) => {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState("");
  const [groupId, setGroupId] = useState(0);
  const [message, setMessage] = useState("");

  const createGroup = async () => {
    const memberArray = members.split(",").map((addr) => addr.trim());
    await contract.methods.createGroup(groupName, memberArray).send({ from: account });
    alert("Group created!");
  };

  const sendMessage = async () => {
    await contract.methods.sendGroupMessage(groupId, message).send({ from: account });
    setMessage("");
    alert("Message sent to group!");
  };

  return (
    <div>
      <h3>Create Group</h3>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Member Addresses (comma-separated)"
        value={members}
        onChange={(e) => setMembers(e.target.value)}
      />
      <button onClick={createGroup}>Create Group</button>

      <h3>Send Group Message</h3>
      <input
        type="number"
        placeholder="Group ID"
        value={groupId}
        onChange={(e) => setGroupId(e.target.value)}
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default GroupChat;
