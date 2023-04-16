import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import UserPost from "../components/UserPost";
import { BsTrash3 } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import GoToTop from "../utils/goToTop";
// React Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Moment, framer motion
import moment from "moment";
import { motion } from "framer-motion";
//=====================================
// to sign user out, all you have to do is auth.signOut() which is provided through firebase

function Dashboard() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [userPosts, setUserPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const getUserData = async () => {
    if (loading) return;
    if (!user) return navigate("/auth/login");
  };

  const formattedUserSinceDate = moment(user?.metadata.creationTime).format("MM/DD/YYYY");

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

  // DELETE POST

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

  useEffect(() => {
    getUserData()
    getUserPosts();
  }, [user, loading]);

  return (
    <motion.main initial={{ opacity: 0}} animate={{ opacity: 1}} exit={{ opacity: 0 }} className="min-h-screen">
      <div className="flex flex-col md:flex-row my-6 justify-center md:justify-start gap-4 border-b-2">
        <div className="flex flex-col md:flex-row items-center justify-center md:pb-6">
          <img src={user?.photoURL} alt="user-img" className="w-28 md:w-32"/>
        </div>
        <div className="text-center lg:text-left text-xl md:text-2xl text-zinc-600 md:pl-4 pb-4">
          <h1 className="font-bold">{user?.displayName}</h1>
          <h2 className="font-bold md:text-xl"><span>Total Posts:</span> {userPosts.length}</h2>
          <p className="font-bold text-sm"><span>Account Created:</span> {formattedUserSinceDate}</p>
        </div>
      </div>

      <div className="flex flex-col text-zinc-600">
        {userPosts.map((post) => (
          <UserPost post={post} key={post.id} user={user} >
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
      <GoToTop/>
    </motion.main>
  );
}

export default Dashboard;
