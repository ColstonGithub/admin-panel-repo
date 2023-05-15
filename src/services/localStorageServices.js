import * as crypto from "crypto-js";

export const encrypt = (data, secretKey) => {
  const cipher = crypto.AES.encrypt(data, secretKey).toString();
  return cipher;
};

export const decrypt = (data, secretKey) => {
  const bytes = crypto.AES.decrypt(data, secretKey);
  let originalText = bytes.toString(crypto.enc.Utf8);
  return originalText;
};
