// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GroupChat {
    struct Group {
        string groupName;
        address[] members;
    }

    mapping(uint256 => Group) private groups;
    uint256 private groupCount;

    event GroupCreated(uint256 groupId, string groupName, address creator);
    event GroupMessage(uint256 groupId, address sender, string content, uint256 timestamp);

    // Function to create a new group
    function createGroup(string memory _groupName, address[] memory _members) public {
        groups[groupCount] = Group({ groupName: _groupName, members: _members });
        emit GroupCreated(groupCount, _groupName, msg.sender);
        groupCount++;
    }

    // Function to send a message to a group
    function sendGroupMessage(uint256 _groupId, string memory _content) public {
        require(_groupId < groupCount, "Group does not exist");
        emit GroupMessage(_groupId, msg.sender, _content, block.timestamp);
    }

    // Function to get group details
    function getGroup(uint256 _groupId) public view returns (string memory, address[] memory) {
        require(_groupId < groupCount, "Group does not exist");
        return (groups[_groupId].groupName, groups[_groupId].members);
    }
}
