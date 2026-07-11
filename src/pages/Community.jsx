import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import CommunityHero from "../components/community/CommunityHero";
import CommunityStats from "../components/community/CommunityStats";
import CommunityGuidelines from "../components/community/CommunityGuidelines";
import FeedHeader from "../components/community/FeedHeader";
import CommunityCard from "../components/community/CommunityCard";
import EmptyFeed from "../components/community/EmptyFeed";
import LoadingSkeleton from "../components/community/LoadingSkeleton";
import Pagination from "../components/community/Pagination";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [newComments, setNewComments] = useState({});

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [currentTime, setCurrentTime] = useState(Date.now());
  const [sendingComments, setSendingComments] = useState({});

  const totalLikes = posts.reduce((sum, post) => sum + (post.likes || 0), 0);

  const totalComments = Object.values(comments).reduce(
    (sum, arr) => sum + arr.length,
    0,
  );

  const sessionId = localStorage.getItem("truthroom_session");

  //************Fetch public posts**************/
  useEffect(() => {
    setLoading(true);

    axios
      .get(
        `${import.meta.env.VITE_API_URL}/posts/public?page=${currentPage}&limit=5`,
        {
          headers: {
            "x-session-id": sessionId,
          },
        },
      )
      .then((res) => {
        const fetchedPosts = res.data.posts;

        setPosts(fetchedPosts);

        setTotalPages(res.data.totalPages);

        const commentMap = {};

        fetchedPosts.forEach((post) => {
          commentMap[post._id] = post.comments || [];
        });

        setComments(commentMap);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [currentPage]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  //***************Handle Comment****************/
  const handleCommentSubmit = async (postId) => {
    const text = (newComments[postId] || "").trim();

    if (!text) return;

    const storedId = localStorage.getItem("truthroom_session");
    const displayName = localStorage.getItem("truthroom_display_name");

    const tempId = `temp-${Date.now()}`;

    const optimisticComment = {
      _id: tempId,
      text,
      sessionId: storedId,
      displayName,
      createdAt: new Date().toISOString(),
      optimistic: true,
    };

    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), optimisticComment],
    }));

    setNewComments((prev) => ({
      ...prev,
      [postId]: "",
    }));

    setSendingComments((prev) => ({
      ...prev,
      [postId]: true,
    }));

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/comments`, {
        text,
        postId,
        sessionId: storedId,
      });

      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) =>
          comment._id === tempId ? res.data : comment,
        ),
      }));

      setErrors((prev) => ({
        ...prev,
        [postId]: "",
      }));
    } catch (err) {
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment._id !== tempId),
      }));

      const reason = err?.response?.data?.reason || "Something went wrong";

      setErrors((prev) => ({
        ...prev,
        [postId]: reason,
      }));
    } finally {
      setSendingComments((prev) => ({
        ...prev,
        [postId]: false,
      }));
    }
  };

  const handleCommentChange = (postId, text) => {
    setNewComments((prev) => ({
      ...prev,
      [postId]: text,
    }));

    setErrors((prev) => ({
      ...prev,
      [postId]: "",
    }));
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      const storedId = localStorage.getItem("truthroom_session");

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/comments/${commentId}`,
        {
          data: { sessionId: storedId },
        },
      );

      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((c) => c._id !== commentId),
      }));
    } catch (err) {
      console.error("Failed to delete comment:", err);
      toast.error("You can only delete your own comment");
    }
  };

  //***************Handle Like***************/
  const handleToggleLike = async (postId) => {
    // Save current state in case we need to rollback
    const previousPosts = posts;

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id !== postId) return post;

        const liked = post.liked;

        return {
          ...post,
          likes: liked ? post.likes - 1 : post.likes + 1,
          liked: !liked,
        };
      }),
    );

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/posts/${postId}/toggle-like`,
        { sessionId },
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: res.data.likes,
                liked: res.data.liked,
              }
            : post,
        ),
      );
    } catch (err) {
      console.error("Toggle like failed:", err);

      setPosts(previousPosts);

      toast.error("Failed to update like.");
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <CommunityHero />

          <CommunityStats
            totalPosts={posts.length}
            totalLikes={totalLikes}
            totalComments={totalComments}
          />

          <CommunityGuidelines />

          <FeedHeader />

          {loading ? (
            <LoadingSkeleton />
          ) : posts.length === 0 ? (
            <EmptyFeed />
          ) : (
            <>
              {posts.map((post) => (
                <CommunityCard
                  key={post._id}
                  post={post}
                  currentTime={currentTime}
                  sessionId={sessionId}
                  sendingComments={sendingComments}
                  comments={comments}
                  newComments={newComments}
                  errors={errors}
                  handleCommentChange={handleCommentChange}
                  handleCommentSubmit={handleCommentSubmit}
                  handleDeleteComment={handleDeleteComment}
                  handleToggleLike={handleToggleLike}
                />
              ))}

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Community;
