import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
//=========================================================

function DeleteModal({ showModal, closeModal, deletePost }) {
  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog as="div" className="relative z-20 font-mono" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black  bg-opacity-40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 text-gray-900 text-center md:text-lg font-bold"
                >
                  Delete Post?
                </Dialog.Title>

                <div className="mt-8 mb-4 flex justify-around gap-8">
                  <button
                    type="button"
                    className="font-bold w-full bg-red-500 text-gray-100 shadow-md py-2 px-6 rounded-xl text-sm flex items-center justify-center gap-2
                              transition transform hover:scale-105"
                    onClick={deletePost}
                  >
                    <BsTrash3 className="text-xl" />
                    Delete
                  </button>
                  <button
                    type="button"
                    className="font-bold w-full bg-transparent text-zinc-600 shadow-md bg-zinc-100  py-2 px-6 rounded-xl text-sm flex items-center justify-center gap-2
                              transition transform hover:scale-105"
                    onClick={closeModal}
                  >
                    <AiOutlineCloseSquare className="text-2xl" /> Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default DeleteModal;
