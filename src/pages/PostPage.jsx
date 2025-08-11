import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import { FiFeather } from "react-icons/fi";

export default function PostPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <FiFeather size={28} className="text-purple-300" />
        <span className="text-2xl font-bold">VerityBox</span>
      </div>
      <PostForm />
    </div>
  );
}
