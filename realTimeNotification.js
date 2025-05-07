import React, { useEffect } from "react";

const RealTimeNotifications = ({ contract, account }) => {
  useEffect(() => {
    if (contract) {
      // Subscribe to the NewMessage event
      contract.events.NewMessage({ filter: { receiver: account } })
        .on("data", (event) => {
          const { sender, content } = event.returnValues;
          alert(`New message from ${sender}: ${content}`);
        })
        .on("error", console.error);
    }
  }, [contract, account]);

  return null;
};

export default RealTimeNotifications;
