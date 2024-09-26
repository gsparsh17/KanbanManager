// src/components/Modal.tsx
import React, { ReactNode } from 'react';

interface ModalProps {
  onClose: () => boolean | void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  const handleOutsideClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      const shouldClose = onClose();
      if (shouldClose === false) {
        // Prevent closing if onClose returns false
        event.preventDefault();
      }
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleOutsideClick}
    >
      <div className="rounded-lg shadow-lg max-w-lg w-full relative">
        {children}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full p-2"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Modal;
