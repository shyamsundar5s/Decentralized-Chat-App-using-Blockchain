// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProfileManagement {
    struct Profile {
        string username;
        string avatarUrl;
    }

    mapping(address => Profile) private profiles;

    // Event for profile updates
    event ProfileUpdated(address indexed user, string username, string avatarUrl);

    // Function to set or update profile
    function setProfile(string memory _username, string memory _avatarUrl) public {
        profiles[msg.sender] = Profile(_username, _avatarUrl);
        emit ProfileUpdated(msg.sender, _username, _avatarUrl);
    }

    // Function to get a profile
    function getProfile(address _user) public view returns (string memory, string memory) {
        return (profiles[_user].username, profiles[_user].avatarUrl);
    }
}
