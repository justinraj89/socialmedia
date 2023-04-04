import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  writeBatch,
  getDocs,
} from "firebase/firestore";
import UserPost from "../components/UserPost";
import { BsTrash3 } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
// React Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//=====================================
// to sign user out, all you have to do is auth.signOut() which is provided through firebase

function Dashboard() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [userPosts, setUserPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  // GET USERS POSTS
  const getUserPosts = async () => {
    if (loading) return;
    if (!user) return navigate("/auth/login");
    const collectionRef = collection(db, "posts");
    const filter = query(collectionRef, where("user", "==", user.uid));
    const posts = onSnapshot(filter, (snapshot) => {
      setUserPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return posts;
  };


  const deletePost = async () => {
    if (!selectedPostId) return;
    const docRef = doc(db, "posts", selectedPostId);
    await deleteDoc(docRef);
    setSelectedPostId(null);
    closeModal();
    toast.success("Post Deleted", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
    });
  };

  // MODAL

  function closeModal() {
    setShowModal(false);
  }

  function openModal() {
    setShowModal(true);
  }

  //=============================

  const logUserOut = () => {
    auth.signOut();
    navigate("/");
  };
  //------------------------------

  useEffect(() => {
    getUserPosts();
  }, [user, loading]);

  return (
    <main className="min-h-screen">
      <div className="h-40 my-4 flex justify-center items-center bg-gray-300">
        <h1 className="text-bold text-2xl text-zinc-600">Your Posts</h1>
      </div>

      <div className="flex flex-col text-zinc-600">
        {userPosts.map((post) => (
          <UserPost post={post} key={post.id}>
            <div className="flex gap-2 pt-4  mt-4">
              <button
                onClick={() => {
                  setSelectedPostId(post.id);
                  openModal();
                }}
                className="font-bold bg-transparent text-zinc-600 shadow-md bg-zinc-100  py-2 px-6 rounded-xl text-sm flex items-center justify-center gap-2
              transition transform hover:scale-105"
              >
                <BsTrash3 className="text-2xl" />
                Delete
              </button>

              <DeleteModal
                showModal={showModal}
                closeModal={closeModal}
                deletePost={deletePost}
              />

              <Link to={`/editpost/${post.id}`}>
                <button
                  className="font-bold bg-transparent text-zinc-600 shadow-md bg-zinc-100  py-2 px-6 rounded-xl text-sm flex items-center justify-center gap-2
                transition transform hover:scale-105"
                >
                  <CiEdit className="text-2xl" />
                  Edit
                </button>
              </Link>
            </div>
          </UserPost>
        ))}
      </div>

      <div className="flex justify-center items-center pb-8 pt-8">
        <button
          onClick={() => logUserOut()}
          className="w-full lg:w-auto font-bold text-gray-100 shadow-md bg-zinc-600  py-2 px-6 rounded-xl text-sm flex items-center justify-center gap-2"
        >
          Sign Out
        </button>
      </div>
    </main>
  );
}

export default Dashboard;
