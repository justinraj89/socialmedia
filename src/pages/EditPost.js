import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  serverTimestamp,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
//React Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//=================================================

function EditPost() {
  const [post, setPost] = useState({ description: "" });
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const { id } = useParams();

  const getUserData = async () => {
    if (loading) return;
    if (!user) return navigate("/login");
  };

  const fetchPostData = async () => {
    try {
      const docRef = doc(db, "posts", id);
      const document = await getDoc(docRef);
      const response = document._document.data.value.mapValue.fields;
      setPost({ description: response.description.stringValue });
    } catch (error) {
      console.log("Error fetching document:", error);
    }
  };

  useEffect(() => {
    fetchPostData(id);
    getUserData();
  }, [id]);

  const handleEditPost = async (e) => {
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
    // edit post
    const docRef = doc(db, "posts", id);
    const updatedPost = { ...post, timestamp: serverTimestamp() };
    await updateDoc(docRef, updatedPost);
    toast.success('Post Edited', {
      position:toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000
    })
    navigate("/dashboard");
  };

  return (
    <div className="my-4 pt-4 flex justify-center items-center">
      <form onSubmit={handleEditPost} className="text-zinc-600 w-full">
        <h1 className="text-2xl md:text-3xl pb-4 text-center lg:text-left">
          Edit your post
        </h1>

        <div className="py-2">
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className="bg-white p-4 h-40 w-full rounded-lg focus:outline-none"
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

        <div className="flex gap-4">
          <button
            type="submit"
            className="font-bold text-gray-100 shadow-md bg-zinc-600  py-2 px-6 rounded-xl text-sm flex items-center justify-center gap-2 
            transition transform hover:scale-105"
          >
            <CiEdit className="text-2xl"/>Edit Post
          </button>

          <Link to="/dashboard">
            <button className="font-bold text-gray-100 shadow-md bg-zinc-600  py-2 px-6 rounded-xl text-sm flex items-center justify-center gap-2 
            transition transform hover:scale-105">
              <AiOutlineCloseSquare className="text-2xl"/>Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
