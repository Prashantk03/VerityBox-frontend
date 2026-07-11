import axios from "axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { emojis, adjectives, nouns } from "../data/identityData";

import EmojiPicker from "../components/identity/EmojiPicker";
import IdentityPreview from "../components/identity/IdentityPreview";
import IdentityForm from "../components/identity/IdentityForm";
import RandomIdentityButton from "../components/identity/RandomIdentityButton";
import CreateIdentityButton from "../components/identity/CreateIdentityButton";
import SuggestionList from "../components/identity/SuggestionList";

export default function IdentitySetup() {
  const [emoji, setEmoji] = useState(emojis[0]);
  const [adjective, setAdjective] = useState(adjectives[0]);
  const [noun, setNoun] = useState(nouns[0]);
  const [letter, setLetter] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const displayName = localStorage.getItem("truthroom_display_name");

    if (displayName) {
      navigate("/");
    }
  }, [navigate]);

  const handleCreateIdentity = async () => {
    // Validation
    if ((letter && !number) || (!letter && number)) {
      return toast.error("Please provide both Letter and Number.");
    }

    const sessionId = localStorage.getItem("truthroom_session");

    if (!sessionId) {
      return toast.error("TruthKey not found.");
    }

    try {
      setLoading(true);
      setError("");
      setSuggestions([]);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/create-identity`,
        {
          sessionId,
          emoji,
          adjective,
          noun,
          letter,
          number,
        },
      );

      localStorage.setItem("truthroom_display_name", res.data.displayName);

      navigate("/identity-success");

      console.log(res.data);

    } catch (err) {
      if (err.response?.status === 409) {
        setSuggestions(err.response.data.suggestions);
        setError(err.response.data.message);
      } else {
        toast.error(err.response?.data?.message || "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionSelect = async (suggestion) => {
    const sessionId = localStorage.getItem("truthroom_session");

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/create-identity`,
        {
          sessionId,
          ...suggestion,
        },
      );

      localStorage.setItem("truthroom_display_name", res.data.displayName);

      navigate("/identity-success");

    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create identity.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-28 pb-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-5xl mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🎭</div>

            <h1 className="text-4xl font-bold text-white">
              Create Your Anonymous Identity
            </h1>

            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              Choose how the community will know you. Your real identity always
              stays private.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Left */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
              <EmojiPicker emoji={emoji} setEmoji={setEmoji} />

              <IdentityForm
                adjective={adjective}
                setAdjective={setAdjective}
                noun={noun}
                setNoun={setNoun}
                letter={letter}
                setLetter={setLetter}
                number={number}
                setNumber={setNumber}
              />

              <RandomIdentityButton
                setEmoji={setEmoji}
                setAdjective={setAdjective}
                setNoun={setNoun}
                setLetter={setLetter}
                setNumber={setNumber}
              />

              <CreateIdentityButton
                loading={loading}
                onClick={handleCreateIdentity}
              />

              <SuggestionList
                suggestions={suggestions}
                onSelect={handleSuggestionSelect}
                loading={loading}
              />
            </div>

            {/* Right */}
            <IdentityPreview
              emoji={emoji}
              adjective={adjective}
              noun={noun}
              letter={letter}
              number={number}
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
