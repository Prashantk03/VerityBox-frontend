import { useNavigate } from "react-router-dom";
import { FiFeather } from "react-icons/fi";


export default function Navbar() {

    const navigate = useNavigate();

    return (
        <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => navigate("/")}
        >
        <FiFeather size={28} className="text-purple-300" />
        <span className="text-2xl font-bold">VerityBox</span>
        
      </div>
    );
}