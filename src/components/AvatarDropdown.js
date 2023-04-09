import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineWavingHand } from "react-icons/md";

export default function AvatarDropdown({ user }) {
  const navigate = useNavigate();

  const logUserOut = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <img
            src={user.photoURL}
            alt=""
            className="w-10 lg:w-12 rounded-full cursor-pointer border-2 border-zinc-400"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0  w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={"/dashboard"}
                  className={`${
                    active ? "bg-gray-200 text-zinc-600" : "text-zinc-600"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <CgProfile
                      className="mr-2 h-5 w-5 text-zinc-600"
                      aria-hidden="true"
                    />
                  ) : (
                    <CgProfile
                      className="mr-2 h-5 w-5 text-zinc-600"
                      aria-hidden="true"
                    />
                  )}
                  Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={"/post"}
                  className={`${
                    active ? "bg-gray-200 text-zinc-600" : "text-zinc-600"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <IoIosAddCircleOutline
                      className="mr-2 h-5 w-5 text-zinc-600"
                      aria-hidden="true"
                    />
                  ) : (
                    <IoIosAddCircleOutline
                      className="mr-2 h-5 w-5 text-zinc-600"
                      aria-hidden="true"
                    />
                  )}
                  New Post
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={"/"}
                  className={`${
                    active ? "bg-gray-200 text-zinc-600" : "text-zinc-600"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <AiOutlineHome
                      className="mr-2 h-5 w-5 text-zinc-600"
                      aria-hidden="true"
                    />
                  ) : (
                    <AiOutlineHome
                      className="mr-2 h-5 w-5 text-zinc-600"
                      aria-hidden="true"
                    />
                  )}
                  Home
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  to={"/"}
                  onClick={() => logUserOut()}
                  className={`${
                    active ? "bg-gray-200 text-zinc-600" : "text-zinc-600"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <MdOutlineWavingHand
                      className="mr-2 h-5 w-5 text-zinc-600"
                      aria-hidden="true"
                    />
                  ) : (
                    <MdOutlineWavingHand
                      className="mr-2 h-5 w-5 text-zinc-600"
                      aria-hidden="true"
                    />
                  )}
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
