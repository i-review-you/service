"use client";
import { useEffect, useRef } from "react";

interface ModalProps {
  children: React.ReactNode;
  toggleModal: () => void;
  size?: string;
}

const Modal = ({ children, toggleModal, size = "100px" }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      toggleModal();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div
      ref={modalRef}
      className={`w-[${size}] border border-gay-200 rounded-lg p-2 absolute right-0 bg-white`}
    >
      {children}
    </div>
  );
};

export default Modal;
