import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from "@simplewebauthn/server";

import { isoUint8Array } from "@simplewebauthn/server/helpers"; // ✅ IMPORTANT

const rpID = process.env.RP_ID;
const origin = process.env.ORIGIN;

export const createRegisterOptions = async (user) => {
  return await generateRegistrationOptions({
    rpName: "BioAuth App",
    rpID,

    userID: isoUint8Array.fromUTF8String(user.id.toString()),
    userName: user.email,

    authenticatorSelection: {
      authenticatorAttachment: "platform",
      residentKey: "required",
      userVerification: "required",
    },
  });
};

export const createLoginOptions = async (credentialID) => {
  return await generateAuthenticationOptions({
    rpID: process.env.RP_ID,

    allowCredentials: [
      {
        id: Buffer.from(credentialID).toString("base64url"),
        type: "public-key",
      },
    ],

    userVerification: "required",
  });
};

export const verifyRegister = async (data) => {
  return await verifyRegistrationResponse(data);
};

export const verifyLogin = async (data) => {
  return await verifyAuthenticationResponse(data);
};