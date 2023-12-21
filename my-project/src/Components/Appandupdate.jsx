import { Field, Form, Formik } from "formik";
import Modal from "./Modal";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../Config/Firebase";
import { toast } from "react-toastify";

// import * as Yup from "Yup";

// const contactScheValidation = Yup.object().shape({
//   name: Yup.string().required("Name is Required"),
//   email: Yup.string().email("Invaid Email").required("email is Required"),
// });

const Appandupdate = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactsRef = collection(db, "contacts");
      await addDoc(contactsRef, contact);

      onClose();
      toast.success("Contact Add Sucessfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (contact, id) => {
    try {
      const contactsRef = doc(db, "contacts", id);
      await updateDoc(contactsRef, contact);

      onClose();
      toast.success("Contact Update Sucessfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          initialValues={
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) => {
            isUpdate ? updateContact(values, contact.id) : addContact(values);
            // console.log(values);
          }}>
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">name</label>
              <Field
                name="name"
                className="h-10 border border-blue-500"></Field>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email">email</label>
              <Field
                name="email"
                className="h-10 border border-blue-500"></Field>
            </div>
            <button
              className=" bg-orange self-end border px-3 py-1.5  "
              type="submit">
              {isUpdate ? "update" : "add"} contacts
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default Appandupdate;
