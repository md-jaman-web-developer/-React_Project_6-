import "./App.css";
import Navbar from "./Components/Navbar";
import { FaSearchengin } from "react-icons/fa";
import { BsClipboardPlusFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./Config/Firebase";
import Contactcard from "./Components/Contactcard";
import Appandupdate from "./Components/Appandupdate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [isOpen, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot) => {
          const contactList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setContacts(contactList);
        });
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");
    onSnapshot(contactsRef, (snapshot) => {
      const contactList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filteredContacts = contactList.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setContacts(filteredContacts);

      return filteredContacts;
    });
  };

  return (
    <>
      <div className="px-4 mx-auto max-w-[370px]">
        <Navbar />

        <div className="flex gap-2">
          <div className="flex relative items-center flex-grow">
            <FaSearchengin className="ml-2 absolute text-white text-3xl" />

            <input
              className="text-white pl-10 flex-grow h-10 rounded-md border border-white bg-transparent"
              type="text"
              name=""
              id=""
              onChange={filterContacts}
            />
          </div>

          <BsClipboardPlusFill
            onClick={onOpen}
            className="text-5xl cursor-pointer text-white"
          />
        </div>

        <div className="mt-4 flex flex-col gap-4">
          {contacts.map((contact) => (
            <Contactcard key={contact.id} contact={contact} />
          ))}
        </div>
      </div>

      <Appandupdate onClose={onClose} isOpen={isOpen} />
      <ToastContainer position="bottom-center" />
    </>
  );
}

export default App;
