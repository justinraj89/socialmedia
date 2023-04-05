import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  getDoc,
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
  const { id } = useParams();
  const { username } = useParams()
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [userPosts, setUserPosts] = useState([]);

  const userFirstName = username.split(' ')[0];


  // GET USERS POSTS
  const getUserPosts = async () => {
    if (loading) return;
    const collectionRef = collection(db, "posts");
    const filter = query(collectionRef, where("user", "==", id));
    const posts = onSnapshot(filter, (snapshot) => {
      setUserPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return posts;
  };

  useEffect(() => {
    getUserPosts();
  }, [user, loading]);


  return (
    <main className="min-h-screen">
      <div className="h-40 my-4 flex justify-center items-center bg-gray-300">
        <h1 className="text-bold text-2xl text-zinc-600">{userFirstName}'s Posts</h1>
      </div>

      <div className="flex flex-col text-zinc-600">
        {userPosts.map((post) => (
          <UserPost post={post} key={post.id} user={user}>
            <div className="w-fit">
              <Link to={`/post/${post.id}`}>
                <div className="flex mt-6 items-center gap-4 justify-center lg:justify-start w-fit">
                  <button
                    className="font-bold bg-transparent text-zinc-600 shadow-md bg-zinc-100  py-2 px-6 rounded-xl text-sm flex items-center justify-center gap-2
                  transition transform hover:scale-105"
                  >
                    Comment
                  </button>
                  {post.comments?.length === 1 ? (
                    <p className=" text-zinc-500 hover:underline">
                      {post.comments?.length || 0} comment
                    </p>
                  ) : (
                    <p className=" text-zinc-500 hover:underline">
                      {post.comments?.length || 0} comments
                    </p>
                  )}
                </div>
              </Link>
            </div>
          </UserPost>
        ))}
      </div>

      <GoToTop />
    </main>
  );
}

export default ProfilePage;
