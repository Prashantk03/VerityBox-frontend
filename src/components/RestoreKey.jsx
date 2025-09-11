import { useState } from "react";
import { useSession } from "../context/sessionProvider";

function RestoreKey() {
  const [key, setKey] = useState("");
  const { restoreTruthKey } = useSession();

  const handleRestore = () => {
    restoreTruthKey(key.trim());
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Enter your TruthKey"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        className="border border-gray-400 p-2 rounded bg-white text-black"
      />
      <button
        onClick={handleRestore}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Restore
      </button>
    </div>
  );
}

export default RestoreKey;
