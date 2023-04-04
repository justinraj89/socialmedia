import { useEffect, useState } from "react";
import { db, auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import UserPost from "../components/UserPost";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Link } from "react-router-dom";
//=============================================

export default function Home() {
  const [allPosts, setAllPosts] = useState([]);
  const [user, loading] = useAuthState(auth);

  //get all posts from firestore DB
  const getPosts = async () => {
    const collectionRef = collection(db, "posts");
    // sort posts so most recent at the top
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    // 1:31:49 for explanation of this snapshot
    const posts = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return posts;
  };

  useEffect(() => {

    getPosts();
  }, []);

  return (
    <main className="text-zinc-600 pb-12 text-large font-medium">
      {/* <div className=" flex justify-center items-center text-3xl mb-4">Home Page</div> */}
      {allPosts.map((post) => (
        <UserPost post={post} key={post.id} user={user}>
          <div className="w-fit">
              <Link to={`/post/${post.id}`}>
                <div className="flex mt-6 items-center gap-4 justify-center lg:justify-start w-fit">
                  <button className="font-bold bg-transparent text-zinc-600 shadow-md bg-zinc-100  py-2 px-6 rounded-xl text-sm flex items-center justify-center gap-2
                  transition transform hover:scale-105">
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

    </main>
  );
}


