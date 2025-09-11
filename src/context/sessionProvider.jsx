import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(localStorage.getItem("truthroom_session") || "");
  const [showPopup, setShowPopup] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false); // Flag to prevent popup during restore

  // Generate TruthKey when button is clicked
  const generateTruthKey = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/guest`);
      const newSessionId = res.data.sessionId;

      localStorage.setItem("truthroom_session", newSessionId);
      setSessionId(newSessionId);
      
      if (!isRestoring) { // Show popup only if it's not a restore action
        setShowPopup(true);
      }
    } catch (err) {
      console.error("Failed to generate TruthKey:", err);
    }
  };

  // Restore an existing TruthKey from the input
  const restoreTruthKey = async (key) => {
    setIsRestoring(true); // Set flag to prevent popup on restore
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/validate`, { sessionId: key });

      if (res.data.valid) {
        localStorage.setItem("truthroom_session", res.data.session.sessionId);
        setSessionId(res.data.session.sessionId);
      } else {
        alert("❌ Invalid TruthKey");
      }
    } catch (err) {
      console.error("Restore error:", err);
      alert("⚠️ Error validating TruthKey. Try again later.");
    } finally {
      setIsRestoring(false); // Reset flag after restore
    }
  };

  return (
    <SessionContext.Provider
      value={{
        sessionId,
        generateTruthKey,
        restoreTruthKey,
        showPopup,
        setShowPopup,
        isRestoring,
        setIsRestoring
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);

