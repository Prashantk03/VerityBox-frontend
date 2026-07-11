import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import Journal from "./pages/Journal";
import Community from "./pages/Community";
import { SessionProvider } from "./context/sessionProvider";
import { Toaster } from "react-hot-toast";
import TruthKeyPopup from "./components/TruthKeyPopup";
import IdentitySetup from "./pages/IdentitySetup";
import IdentitySuccess from "./pages/IdentitySuccess";
import Profile from "./pages/Profile";

function App() {
  return (
    <SessionProvider>
      <Toaster position="top-center"/>
      <Router>
        <TruthKeyPopup />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/community" element={<Community />} />
          <Route path="/identity" element={<IdentitySetup />} />
          <Route path="/identity-success" element={<IdentitySuccess />} />
          <Route path="/profile/:profileId" element={<Profile/>} />
          <Route path="/me" element={<Profile />} />
        </Routes>
      </Router>
    </SessionProvider>
  );
}

export default App;
