import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import Journal from "./pages/Journal";
import Community from "./pages/Community";
import { SessionProvider } from "./context/sessionProvider";
import TruthKeyPopup from "./components/TruthKeyPopup";
import GenerateKeyButton from "./components/generateKey";

function App() {
  return (
    <SessionProvider>
      <Router>
        <TruthKeyPopup />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </Router>
    </SessionProvider>
  );
}

export default App;
