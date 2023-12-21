import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

const Modal = ({ isOpen, onClose, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <>
          <div className=" m-auto bg-white min-h-[200px] max-w-[80%] z-50 relative p-4">
            <div className="flex justify-end">
              <IoClose onClick={onClose} />
            </div>
            {children}
          </div>
          <div
            onClick={onClose}
            className="absolute top-0 z-40 h-screen w-screen backdrop-blur"
          />
          {/* <div className="absolute top-0 z-40 h-screen w-screen backdrop-blur" /> */}
        </>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
