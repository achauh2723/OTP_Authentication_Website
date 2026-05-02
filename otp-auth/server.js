const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const users = {};

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

app.post("/auth/request-otp", (req, res) => {
  const { identifier } = req.body;

  if (!identifier) {
    return res.status(400).json({ message: "Enter email or phone" });
  }

  const otp = generateOTP();

  users[identifier] = {
    otp: otp,
    expiresAt: Date.now() + 5 * 60 * 1000, // Timer
    attempts: 0,
    blockedUntil: null
  };

  console.log("OTP is:", otp); // sending OTP

  res.json({ message: "OTP sent successfully" });
});

app.post("/auth/verify-otp", (req, res) => {
  const { identifier, otp } = req.body;

  const user = users[identifier];

  if (!user) {
    return res.status(400).json({ message: "No OTP requested" });
  }

  // check
  if (user.blockedUntil && Date.now() < user.blockedUntil) {
    return res.status(403).json({ message: "Blocked for 10 minutes" });
  }

  // OTP expiry
  if (Date.now() > user.expiresAt) {
    return res.status(400).json({ message: "OTP expired" });
  }

  // wrong OTP
  if (user.otp !== otp) {
    user.attempts++;

    if (user.attempts >= 3) {
      user.blockedUntil = Date.now() + 10 * 60 * 1000;
      return res.status(403).json({ message: "Too many attempts, blocked" });
    }

    return res.status(400).json({ message: "Invalid OTP" });
  }

  const token = uuidv4();
  user.token = token;

  res.json({ token });
});

app.get("/auth/me", (req, res) => {
  const token = req.headers.authorization;

  const user = Object.values(users).find(u => u.token === token);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.json({ message: "Welcome user" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});