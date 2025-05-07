import CryptoJS from "crypto-js";

// Function to encrypt a message
export const encryptMessage = (message, receiverPublicKey) => {
  // Use the receiver's public key to encrypt
  return CryptoJS.AES.encrypt(message, receiverPublicKey).toString();
};

// Function to decrypt a message
export const decryptMessage = (encryptedMessage, privateKey) => {
  // Use the user's private key to decrypt
  const bytes = CryptoJS.AES.decrypt(encryptedMessage, privateKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
