import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { motion } from "framer-motion";
//===========================================

function Login() {
  
  const [user, loading] = useAuthState(auth); // Allows access to user from firebase
  const navigate = useNavigate();
  // This useEffect is so logged in users cannot go back to login page
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  //Sign in with Google
  const googleProvider = new GoogleAuthProvider();

  const googleLoginAddUser = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const currentUser = res.user;
      const userData = {
        name: currentUser.displayName,
        email: currentUser.email,
        photoUrl: currentUser.photoURL
      };
      const collectionRef = collection(db, 'users');
      await addDoc(collectionRef, userData)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }
  //===========================================================

  return (
    <motion.main initial={{ opacity: 0}} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className=" text-zinc-600 mt-8">
        <div className="flex justify-center items-center">
          <img src="/foodforthought.png" alt="login" className="w-48 opacity-75"/>
        </div>


        <div className="py-6 flex flex-col justify-center items-center ">
          <button
            onClick={googleLoginAddUser}
            className="font-bold bg-transparent text-zinc-600 shadow-md bg-zinc-200  py-2 px-6 rounded-xl text-xl flex items-center justify-center gap-2
            transition transform hover:scale-105"
          >
            <FcGoogle className="text-2xl" />
            Sign in with Google
          </button>
        </div>
      </section>
    </motion.main>
  );
}

export default Login;
