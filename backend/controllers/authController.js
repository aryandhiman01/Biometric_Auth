import User from "../models/User.js";
import sequelize from "../config/sequelize.js";

import {
  createRegisterOptions,
  createLoginOptions,
  verifyRegister,
  verifyLogin,
} from "../services/webauthnService.js";

import {
  setChallenge,
  getChallenge,
  deleteChallenge,
} from "../utils/challengeStore.js";


// 📝 REGISTER OPTIONS
export const registerOptions = async (req, res) => {
  const { email } = req.body;

  let user = await User.findOne({ where: { email } });

  if (!user) {
    user = await User.create({ email });
  }

  const options = await createRegisterOptions(user);

  setChallenge(email, options.challenge);

  res.json(JSON.parse(JSON.stringify(options)));
};


// ✅ VERIFY REGISTER
export const verifyRegisterController = async (req, res) => {
  try {
    const { email, response } = req.body;

    const user = await User.findOne({ where: { email } });

    const expectedChallenge = getChallenge(email);

    const verification = await verifyRegister({
      response,
      expectedChallenge,
      expectedOrigin: process.env.ORIGIN,
      expectedRPID: process.env.RP_ID,
    });

    console.log("VERIFICATION:", verification); // DEBUG

    if (!verification.verified || !verification.registrationInfo) {
      return res.json({ success: false });
    }

    const {
        credential: { publicKey, id, counter },
        } = verification.registrationInfo;

        await User.update(
        {
            publicKey: Buffer.from(publicKey),
        credentialID: Buffer.from(id),
        counter,
    },
    { where: { email } }    
    );

    deleteChallenge(email);

    res.json({ success: true });
  } catch (err) {
    console.error("VERIFY ERROR:", err); // IMPORTANT
    res.status(500).json({ error: "Verification failed" });
  }
};


// 🔐 LOGIN OPTIONS
export const loginOptions = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(404).json({ error: "User not found" });

  const options = await createLoginOptions(user.credentialID);

  setChallenge(email, options.challenge);

  res.json(JSON.parse(JSON.stringify(options)));
};


// ✅ VERIFY LOGIN
export const verifyLoginController = async (req, res) => {
  try {
    const { email, response } = req.body;

    const user = await User.findOne({ where: { email } });

    const expectedChallenge = getChallenge(email);

    const verification = await verifyLogin({
      response,
      expectedChallenge,
      expectedOrigin: process.env.ORIGIN,
      expectedRPID: process.env.RP_ID,
      authenticator: {
        credentialID: user.credentialID,
        credentialPublicKey: user.publicKey,
        counter: user.counter,
      },
    });

    if (verification.verified) {
      await User.update(
        { counter: verification.authenticationInfo.newCounter },
        { where: { email } }
      );

      deleteChallenge(email);

      return res.json({ success: true });
    }

    res.json({ success: false });
  } catch (err) {
    console.error("LOGIN VERIFY ERROR:", err);
    res.status(500).json({ error: "Login failed" });
  }
};