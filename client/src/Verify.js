import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Verify({ navigate }) {
  const [otp, setOtp] = useState("");
  const location = useLocation();

  const verifyOTP = async () => {
  if (!otp) {
    alert("Enter OTP");
    return;
  }

  if (otp.length !== 6) {
    alert("OTP must be 6 digits");
    return;
  }

  try {
    const res = await axios.post("http://localhost:5000/auth/verify-otp", {
      identifier: location.state.identifier,
      otp
    });

    localStorage.setItem("token", res.data.token);
    navigate("/welcome");

  } catch (err) {
    alert(err.response?.data?.message || "Something went wrong");
  }
};

  return (
    <>
        <div className="Container1">
            <h1>OTP Verification Page</h1>
        </div><br></br>
        <Stack spacing={2} direction="row" className="Container2">
            <TextField id="outlined-basic" label="Enter OTP" variant="outlined" onChange={e => setOtp(e.target.value)} style={{width:"400px"}}/>
            <Button variant="contained" onClick={verifyOTP}>Login</Button>
        </Stack>
    </>
  );
}

export default Verify;