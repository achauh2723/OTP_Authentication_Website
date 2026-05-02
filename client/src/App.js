import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login";
import Verify from "./Verify";
import Welcome from "./Welcome";

function AppWrapper() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Login navigate={navigate} />} />
      <Route path="/verify" element={<Verify navigate={navigate} />} />
      <Route path="/welcome" element={<Welcome />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}