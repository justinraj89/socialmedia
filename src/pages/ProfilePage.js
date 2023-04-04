import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
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
//=================================================

function ProfilePage() {
  const { id } = useParams()
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [userPosts, setUserPosts] = useState([]);

  // GET USERS POSTS
  const getUserPosts = async () => {
    if (loading) return;
    if (!user) return navigate("/auth/login");
    const collectionRef = collection(db, "posts");
    const filter = query(collectionRef, where('user', "==", id));
    const posts = onSnapshot(filter, (snapshot) => {
      setUserPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return posts;
  };

  useEffect(() => {
    getUserPosts();
  }, [user, loading]);

  console.log(userPosts, 'USER POSTS')


  return (
    <main className="min-h-screen">
      <div className="h-40 my-4 flex justify-center items-center bg-gray-300">
        <h1 className="text-bold text-2xl text-zinc-600">{user.displayName}'s Posts</h1>
      </div>

      <div className="flex flex-col text-zinc-600">
        {userPosts.map((post) => (
          <UserPost post={post} key={post.id} user={user} >

          </UserPost>
        ))}
      </div>

          <GoToTop/>
    </main>
  )
}

export default ProfilePage;
