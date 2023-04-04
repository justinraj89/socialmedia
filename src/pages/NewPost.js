import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
//React Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//======================================

function Post() {
  const [post, setPost] = useState({ description: "" });
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const getUserData = async () => {
    if (loading) return;
    if (!user) return navigate("/login");
  };

  useEffect(() => {
    getUserData();
  }, [user, loading]);

  // submit post
  const handleSubmitPost = async (e) => {
    e.preventDefault();
    // checks before post
    if (!post.description) {
      toast.error("Can not submit empty post 🤬", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
      });
      return;
    }

    if (post.description.length > 250) {
      toast.error("Exceeded character limit of 250, shorten your post!", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
      });
      return;
    }
    // create post
    const collectionRef = collection(db, "posts");
    await addDoc(collectionRef, {
      ...post,
      timestamp: serverTimestamp(),
      user: user.uid,
      avatar: user.photoURL,
      username: user.displayName,
    });
    toast.success("New Post Created 😃", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
    });
    setPost({ description: "" });
    navigate("/");
  };

  //=================================================================
  return (
    <div className="my-4 pt-4 flex justify-center items-center">
      <form onSubmit={handleSubmitPost} className="text-zinc-600 w-full">
        <h1 className="text-2xl md:text-3xl pb-4 text-center lg:text-left">
          create new post
        </h1>

        <div className="py-2">
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className="bg-white p-4 h-40 w-full rounded-lg focus:outline-none md:text-lg"
            placeholder="whats your your mind?"
          />
          <p
            className={`p-2 ${
              post.description.length > 250 ? "text-red-500" : null
            }`}
          >
            {post.description.length}/250
          </p>
        </div>

        <button
          type="submit"
          className="font-bold w-full lg:w-auto text-gray-100 shadow-md bg-zinc-600  py-2 px-6 rounded-xl text-sm flex items-center justify-center gap-2
          transition transform hover:scale-105">
          submit
        </button>
      </form>
    </div>
  );
}

export default Post;
