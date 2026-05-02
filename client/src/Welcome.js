import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:5000/auth/me", {
      headers: { Authorization: token }
    })
    .then(res => setMsg(res.data.message))
    .catch(() => setMsg("Unauthorized"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h1 className="Heading">{msg}</h1><br></br>
      <div className="Con3">
        <h3>Go to Login Page</h3>
        <button onClick={handleLogout} className="Btn">Logout</button>
      </div>
    </div>
  );
}

export default Welcome;