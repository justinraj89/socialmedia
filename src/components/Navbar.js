import { Link } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth"; // anytime you want acess to your user
import AvatarDropdown from "../components/AvatarDropdown";
//========================================================

function Navbar() {
  const [user, loading] = useAuthState(auth);
  const [prevScrollPos, setPrevScrollPos] = useState(10);
  const [visible, setVisible] = useState(true);

  // This scroll logic handles hiding/showing the Navbar on scroll
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    const scrollDelta = currentScrollPos - prevScrollPos;
    if (currentScrollPos > 15) {
      if (scrollDelta > 0) {
        // Scrolling down
        setVisible(false);
      } else if (scrollDelta < 0) {
        // Scrolling up
        setVisible(true);
      }
    } else if (currentScrollPos >= 0) {
      // At top of page
      setVisible(true);
    }
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <nav
      className={`flex justify-between items-center py-3  sticky bg-gray-100 bg-opacity-95 z-20 mb-4 border-b-2
    ${
      visible
        ? "top-0 transition-transform duration-700 transform translate-y-0"
        : "top-0 transition-transform duration-700 transform -translate-y-full"
    }`}
    >
      <Link to="/">
        <img
          src={"/moonguy.png"}
          width={100}
          height={100}
          alt="food for thought"
          className="w-16 lg:w-20 opacity-70"
        />
      </Link>

      <Link to={'/'}>
      <h1 className="font-logoFont text-2xl lg:text-5xl text-zinc-600">Thought Cloud</h1>
      </Link>
      

      <ul className="flex items-center">
        {!user ? (
          <Link
            to="/auth/login"
            className="font-bold text-gray-100 shadow-md bg-blue-900 py-2 px-2 lg:px-6 rounded-xl text-xs lg:text-sm flex items-center justify-center gap-2 
            transition transform hover:scale-105"
          >
            login
          </Link>
        ) : (
          <div className="flex items-center gap-6">
            <AvatarDropdown user={user} />
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
