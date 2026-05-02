import { useState } from "react";
import axios from "axios";
import './App.css'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Login({ navigate }) {
  const [input, setInput] = useState("");

  const sendOTP = async () => {
  if (!input) {
    alert("Please enter email");
    return;
  }

  if (!input.includes("@")) {
    alert("Enter valid email");
    return;
  }

  await axios.post("http://localhost:5000/auth/request-otp", {
    identifier: input
  });

  navigate("/verify", { state: { identifier: input } });
};

  return (
    <>
        <div className="Container1">
            <h1>Login Page</h1>
        </div><br></br>
        <Stack spacing={2} direction="row" className="Container2">
            <TextField id="outlined-basic" label="Email" variant="outlined" onChange={e => setInput(e.target.value)} style={{width:"400px"}}/>
            <Button variant="contained" onClick={sendOTP}>Send OTP</Button>
        </Stack>
    </>
  );
}

export default Login;