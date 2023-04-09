import { useEffect, useState } from "react";
import { db, auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import UserPost from "../components/UserPost";
import Loader from "../components/Loader"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Link } from "react-router-dom";
import { easeInOut, motion } from "framer-motion";

export default function Home() {
  const [allPosts, setAllPosts] = useState([]);
  const [user, loading] = useAuthState(auth);
  const [pageLoading, setPageLoading] = useState(true);

  // Get all posts from firestore DB
  const getPosts = () => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = getPosts();
    setPageLoading(false)
    return () => unsubscribe();
  }, []);
  //----------------------------------------------

  if(pageLoading) {
    return (
    <Loader/>
    )
  }

  return (
    <motion.main 
      className="text-zinc-600 pb-12 text-large font-medium"
      initial={{ x: '-100%'}}
      animate={{ x: 0}}
      transition={{ duration: 0.4, ease: easeInOut}}
      exit={{ x: '-100vw'}}
      >
      {/* <div className=" flex justify-center items-center text-3xl mb-4">Home Page</div> */}
      {allPosts.map((post) => (
        <UserPost post={post} key={post.id} user={user}>
          <div className="w-full flex justify-center md:justify-start">
            <div className="flex mt-6 items-center gap-4 md:gap-8 justify-center lg:justify-start w-fit">
              <Link to={`/post/${post.id}`}>
                <button
                  className="font-bold bg-transparent text-zinc-600 shadow-md bg-zinc-100  py-2 px-6 rounded-xl text-sm flex items-center justify-center gap-2
                transition transform hover:scale-105"
                >
                  Comment
                </button>
              </Link>

              {post.comments?.length === 1 ? (
                <Link to={`/post/${post.id}`}>
                  <p className=" text-zinc-500 hover:underline text-sm md:text-lg">
                    {post.comments?.length || 0} comment
                  </p>
                </Link>
              ) : (
                <Link to={`/post/${post.id}`}>
                  <p className=" text-zinc-500 hover:underline text-sm md:text-lg">
                    {post.comments?.length || 0} comments
                  </p>
                </Link>
              )}
            </div>
          </div>
        </UserPost>
      ))}
    </motion.main>
  );
}
