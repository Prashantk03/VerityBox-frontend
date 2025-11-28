import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PostPage() {
  const navigate = useNavigate();

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-400 p-20 ">
      <Navbar />
      <PostForm />
    </div>
      <Footer/>
    </>
  );
}
