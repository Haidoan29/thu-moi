import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateInvite from "./pages/CreateInvite";
import Invite from "./pages/Invite";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateInvite />} />
        <Route path="/invite/:id" element={<Invite />} />
      </Routes>
    </BrowserRouter>
  );
}
