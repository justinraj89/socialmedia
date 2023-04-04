import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
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
    <>
    <section className="flex flex-col justify-center items-center mt-4 p-6 border-2 h-36 bg-gray-200">
      <h1 className="text-center">Login to join the family and begin talking shit</h1>
      {/* <Image src={'/friends.png'} width={200} height={200} className='w-96 lg:w-1/2 opacity-60' alt="friends"/> */}
    </section>

      <section className=" text-zinc-600 mt-8">
        <h3 className="pb-2 text-center pt-2 text-sm">
          Sign in with one of the providers
        </h3>

        <div className="py-2 flex flex-col justify-center items-center ">
          <button
            onClick={googleLoginAddUser}
            className="text-zinc-600  bg-gray-200 border-2 border-zinc-400
           lg:w-80 font-bold text-sm lg:text-md rounded-lg flex justify-center p-4 gap-2 lg:transition lg:ease-in-out lg:duration-200"
          >
            <FcGoogle className="text-2xl" />
            sign in with Google
          </button>
        </div>
      </section>
    </>
  );
}

export default Login;
