import CryptoJS from "crypto-js";

export const generateSignature = () => {
  //   let timestamp = new Date().toISOString();
  //   let timestamp = Math.floor(Date.now() / 1000).toString();
  let timestamp = "1652877946";
  let api_key =
    "XI8dhliRB5sMJrEG3Hqyr1pvg0RIURNEpCTde65AUzPHo0au7EMYZqJWeu9Jkje1qlNgCPMPUF2gJVhCujOkYCbW2QSwHTEBwDwdr/K3gOq7gEfumiheIUI1MhbBO/Qdl3dLu9UtUKsnXEC9nXAmwIEydxSON88Kk/f/BkTvzpI=";
  let partner_id = "100";

  // Combine the data we want to hash
  let data = timestamp + partner_id + "sid_request";

  // Create HMAC-SHA256 hash
  let hmac = CryptoJS.HmacSHA256(data, api_key);

  // Convert to Base64
  let signature = CryptoJS.enc.Base64.stringify(hmac);

  return {
    timestamp,
    signature,
  };
};
