<h1 align="center">🔐 Authentication Learning Journey (WebAuthn + Passkeys)</h1>

<p align="center">
  🚀 My deep dive into modern authentication systems <br/>
  From traditional login → Passwordless → Biometric Auth
</p>

---

<h2>📌 About This Repository</h2>

<p>
This repository is not just a project, but a <b>learning journey</b> where I explored how modern authentication systems work.
I implemented real-world concepts like <b>WebAuthn, Passkeys, and Biometric Authentication</b> from scratch.
</p>

---

<h2>🧠 What I Learned</h2>

<ul>
  <li>🔑 Difference between Password-based vs Passwordless Authentication</li>
  <li>🌐 How WebAuthn works (Browser ↔ Server ↔ Authenticator)</li>
  <li>🧬 Public Key Cryptography in Authentication</li>
  <li>👆 How fingerprint authentication actually works</li>
  <li>🔄 Counter mechanism (Replay attack prevention)</li>
  <li>⚠️ Real-world issues & debugging (encoding, origin mismatch, etc.)</li>
</ul>

---

<h2>🔐 Authentication Evolution</h2>

<pre>
1. Password-Based Auth ❌ (Insecure)
2. OTP / 2FA 🔐
3. OAuth (Google Login, etc.)
4. Passwordless Auth 🚀
5. Passkeys (Future of Auth) 🔥
</pre>

---

<h2>⚙️ Tech Concepts Covered</h2>

<ul>
  <li>WebAuthn API</li>
  <li>SimpleWebAuthn (Server + Browser)</li>
  <li>Public / Private Key Flow</li>
  <li>Challenge-Response Mechanism</li>
  <li>Credential Storage</li>
  <li>Multi-device Authentication</li>
</ul>

---

<h2>🔄 How WebAuthn Works (Flow)</h2>

<h3>📝 Registration Flow</h3>

<pre>
User → enters email
Server → generates challenge
Browser → asks for fingerprint
Authenticator → creates key pair
Server → stores public key
</pre>

---

<h3>🔐 Login Flow</h3>

<pre>
User → enters email
Server → sends challenge
Browser → triggers biometric
Authenticator → signs challenge
Server → verifies signature
</pre>

---

<h2>⚠️ Challenges I Faced</h2>

<ul>
  <li>❌ Origin mismatch errors</li>
  <li>❌ Buffer vs Base64URL encoding issues</li>
  <li>❌ "No passkeys available" confusion</li>
  <li>❌ Cross-device authentication problems</li>
  <li>❌ Multiple credential handling</li>
</ul>

---

<h2>💡 Key Learnings</h2>

<ul>
  <li>✔ Authentication is not just login — it's cryptography</li>
  <li>✔ Passkeys are device-bound by default</li>
  <li>✔ Encoding (Buffer ↔ Base64 ↔ Uint8Array) is critical</li>
  <li>✔ Browser plays a huge role in WebAuthn</li>
  <li>✔ Security > Convenience (always)</li>
</ul>

---

<h2>🚀 What I Built</h2>

<ul>
  <li>🔐 Register using fingerprint</li>
  <li>🔐 Login using passkey</li>
  <li>📱 Multi-device authentication system</li>
  <li>🗄️ Credential storage in PostgreSQL</li>
</ul>

---

<h2>📚 Future Goals</h2>

<ul>
  <li>🔐 Implement JWT session after login</li>
  <li>📱 Cross-device QR login system</li>
  <li>🌍 Deploy with HTTPS (required for WebAuthn)</li>
  <li>🧠 Explore OAuth + Passkey hybrid systems</li>
</ul>

---

<h2>👨‍💻 About Me</h2>

<p>
I'm currently exploring <b>real-world authentication systems</b> and building projects that solve actual security problems. <br/>
Focused on becoming a <b>Full Stack + AI Developer</b>.
</p>

---

<h2>⭐ Final Thought</h2>

<p>
Authentication is evolving rapidly. Passwords are dying, and <b>Passkeys are the future</b>. 🚀 <br/>
This journey helped me understand how secure systems are actually built.
</p>
