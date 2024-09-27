import CryptoJS from 'crypto-js';

const key = 'Gz3!bL7@eP4#fQ8&zR9*eS1!hN5^kL2$w';

export const encryptMessage = (message:string):string => {
    return CryptoJS.AES.encrypt(message, key).toString();
};

export const decryptMessage = (message:string):string => {
    const bytes = CryptoJS.AES.decrypt(message, key);
    return bytes.toString(CryptoJS.enc.Utf8);
};