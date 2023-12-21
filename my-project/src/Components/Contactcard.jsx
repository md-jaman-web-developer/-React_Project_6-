import { FaPencilAlt } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi";
import { PiTrashSimpleDuotone } from "react-icons/pi";
import { db } from "../Config/Firebase";
import { doc, deleteDoc } from "firebase/firestore";
import Appandupdate from "./Appandupdate";
import useDisclouse from "../hooks/useDisclouse";
import { toast } from "react-toastify";

const Contactcard = ({ contact }) => {
  const { isOpen, onOpen, onClose } = useDisclouse();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));

      toast.success("Contact Deleted Sucessfully");
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <>
      <div
        className="bg-yellow flex justify-between gap-1 rounded-lg items-center"
        key={contact.id}>
        <HiOutlineUserCircle className="text-orange text-5xl" />
        <div className="">
          <h2 className="text-lg">{contact.name}</h2>
          <p className="text-sm">{contact.email}</p>
        </div>
        <div className="px-4 flex text-3xl gap-1">
          <PiTrashSimpleDuotone
            onClick={() => deleteContact(contact.id)}
            className="text-4xl cursor-pointer text-red-600"
          />
          <FaPencilAlt
            className="cursor-pointer  text-indigo-700"
            onClick={onOpen}
          />
        </div>
      </div>
      <Appandupdate
        contact={contact}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default Contactcard;
