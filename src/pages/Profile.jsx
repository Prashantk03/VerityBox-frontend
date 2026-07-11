import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { profileId } = useParams();
  const isMyProfile = window.location.pathname === "/me";
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = isMyProfile
      ? `${import.meta.env.VITE_API_URL}/profile/me`
      : `${import.meta.env.VITE_API_URL}/profile/${profileId}`;

    const config = isMyProfile
      ? {
          headers: {
            "x-session-id": localStorage.getItem("truthroom_session"),
          },
        }
      : {};

    axios
      .get(url, config)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [profileId, isMyProfile]);

  if (loading) return <div>Loading...</div>;

  if (!profile) return <div>Profile not found.</div>;

  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition"
        >
          <FiArrowLeft />
          Back
        </button>

        {/* Profile */}
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <div className="w-28 h-28 rounded-full border border-indigo-500/50 bg-gradient-to-br from-indigo-900 to-slate-900 flex items-center justify-center text-6xl shadow-lg shadow-indigo-900/30">
            {profile.displayName.split(" ")[0]}
          </div>

          {/* Name */}
          <h1 className="mt-6 text-4xl font-bold text-center">
            {profile.displayName.replace(/^[^\s]+\s/, "")}
          </h1>

          {/* Reputation */}
          <div className="mt-4 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2 text-emerald-300">
            {profile.reputation.title}
          </div>

          {/* Joined */}
          <p className="mt-5 text-slate-400">
            Joined{" "}
            {new Date(profile.joined).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-5 mt-10">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center">
            <h2 className="text-4xl font-bold">{profile.postsCount}</h2>

            <p className="mt-2 text-slate-400">Thoughts</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center">
            <h2 className="text-4xl font-bold">{profile.commentsCount}</h2>

            <p className="mt-2 text-slate-400">Comments</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-800 my-12" />

        {/* Thoughts */}
        <h2 className="text-2xl font-bold mb-8">Thoughts</h2>

        {profile.recentPosts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center">
            <div className="text-5xl mb-5">📝</div>

            <h3 className="text-xl font-semibold">No public thoughts yet</h3>

            <p className="mt-3 text-slate-400">
              This anonymous member hasn't shared anything publicly.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {profile.recentPosts.map((post) => (
              <div
                key={post._id}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition hover:border-indigo-500/40"
              >
                <div className="flex justify-between items-center mb-5">
                  <span className="text-sm text-slate-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>

                  <span className="text-pink-400 font-medium">
                    ❤️ {post.likes} {post.likes === 1 ? "Like" : "Likes"}
                  </span>
                </div>

                <p className="leading-8 whitespace-pre-wrap text-slate-200">
                  {post.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
