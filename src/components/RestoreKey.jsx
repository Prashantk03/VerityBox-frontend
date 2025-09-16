import { useState } from "react";
import { useSession } from "../context/sessionProvider";

function RestoreKey() {
  const [showModal, setShowModal] = useState(false); // Modal state
  const [key, setKey] = useState("");
  const { restoreTruthKey } = useSession(); // Assuming you have this function in sessionProvider

  // Handle the restore action
  const handleRestore = () => {
    restoreTruthKey(key.trim()); // Restore the key using the context function
    setShowModal(false); // Close the modal after restoring
  };

  return (
    <>
      {/* Restore Key Button */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-black hover:bg-gray-600 text-white py-1 px-2 rounded-2xl w-full"
      >
        Restore TruthKey
      </button>

      {/* Modal (Popup) for Restore Key */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-black text-xl text-center  font-semibold mb-4">Restore with Key</h2>
            <input
              type="text"
              placeholder="Enter your Key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="border border-gray-600 text-black p-2 rounded w-full mb-4"
            />
            <div className="flex justify-end space-x-4">
              {/* Cancel Button */}
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-900 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              {/* Restore Button */}
              <button
                onClick={handleRestore}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Restore
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RestoreKey;

