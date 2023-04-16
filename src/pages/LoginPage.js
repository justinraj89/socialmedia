import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp, getDocs, where, query } from "firebase/firestore";
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

  // const googleLoginAddUser = async () => {
  //   try {
  //     const res = await signInWithPopup(auth, googleProvider);
  //     const currentUser = res.user;
  //     const userData = {
  //       name: currentUser.displayName,
  //       email: currentUser.email,
  //       photoUrl: currentUser.photoURL,
  //       id: currentUser.uid,
  //       timeStamp: serverTimestamp()
  //     };
  //     const collectionRef = collection(db, 'users');
  //     await addDoc(collectionRef, userData)
  //     navigate('/')
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const googleLoginAddUser = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const currentUser = res.user;
      const userData = {
        name: currentUser.displayName,
        email: currentUser.email,
        photoUrl: currentUser.photoURL,
        id: currentUser.uid,
        timeStamp: serverTimestamp()
      };
      const collectionRef = collection(db, 'users');
      const querySnapshot = await getDocs(query(collectionRef, where('id', '==', currentUser.uid)));
      if (querySnapshot.empty) {
        await addDoc(collectionRef, userData);
      }
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }
  
  //===========================================================

  return (
    <motion.main initial={{ opacity: 0}} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col justify-center items-center h-96">
      <div className="text-lg">Join the discussion!</div>
      <section className=" text-zinc-600 mt-8">
        <div className="flex justify-center items-center">
          <img src="/foodforthought.png" alt="login" className="w-48 opacity-75"/>
        </div>


        <div className="py-6 flex flex-col justify-center items-center ">
          <button
            onClick={googleLoginAddUser}
            className="font-bold text-gray-100 shadow-md bg-zinc-600 py-3 px-4 lg:px-6 rounded-xl text-md flex items-center justify-center 
            transition transform hover:scale-105"
          >
            <FcGoogle className="text-2xl mr-2" />
            Sign in with Google
          </button>
        </div>
      </section>
    </motion.main>
  );
}

export default Login;
