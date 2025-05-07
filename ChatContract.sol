// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ChatContract {
    // Struct to represent a message
    struct Message {
        address sender;
        address receiver;
        string content;
        uint256 timestamp;
    }

    // Array to store all messages
    Message[] private messages;

    // Event to notify of a new message
    event NewMessage(address indexed sender, address indexed receiver, string content, uint256 timestamp);

    // Function to send a message
    function sendMessage(address _receiver, string memory _content) public {
        require(_receiver != address(0), "Invalid receiver address");
        require(bytes(_content).length > 0, "Message content cannot be empty");

        Message memory newMessage = Message({
            sender: msg.sender,
            receiver: _receiver,
            content: _content,
            timestamp: block.timestamp
        });

        messages.push(newMessage);

        emit NewMessage(msg.sender, _receiver, _content, block.timestamp);
    }

    // Function to retrieve messages for a specific user
    function getMessages(address _user) public view returns (Message[] memory) {
        uint256 count = 0;

        // Count the number of messages for the user
        for (uint256 i = 0; i < messages.length; i++) {
            if (messages[i].sender == _user || messages[i].receiver == _user) {
                count++;
            }
        }

        // Fill the user's messages into a new array
        Message[] memory userMessages = new Message[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < messages.length; i++) {
            if (messages[i].sender == _user || messages[i].receiver == _user) {
                userMessages[index] = messages[i];
                index++;
            }
        }
        return userMessages;
    }
}
