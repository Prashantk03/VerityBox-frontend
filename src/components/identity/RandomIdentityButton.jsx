import { FiShuffle } from "react-icons/fi";
import { motion } from "framer-motion";

import {
  emojis,
  adjectives,
  nouns,
} from "../../data/identityData";

export default function RandomIdentityButton({
  setEmoji,
  setAdjective,
  setNoun,
  setLetter,
  setNumber,
}) {
  const randomItem = (arr) =>
    arr[Math.floor(Math.random() * arr.length)];

  const randomLetter = () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26));

  const randomNumber = () =>
    String(Math.floor(Math.random() * 99) + 1).padStart(2, "0");

  const generateRandom = () => {
    setEmoji(randomItem(emojis));
    setAdjective(randomItem(adjectives));
    setNoun(randomItem(nouns));
    setLetter(randomLetter());
    setNumber(randomNumber());
  };

  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      onClick={generateRandom}
      className="mt-8 w-full rounded-xl border border-indigo-500/20 bg-indigo-500/10 py-3 text-indigo-300 font-medium hover:bg-indigo-500/20 transition flex justify-center items-center gap-2"
    >
      <FiShuffle />

      Surprise Me
    </motion.button>
  );
}