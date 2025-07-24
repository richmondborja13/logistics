/*
============================================================
Modal Component (Front-end Guide & Back-end Follow Through)
============================================================

Front-end Guide:
- This file implements a reusable modal dialog for the service registration pages.
- Uses Tailwind CSS for layout and styling.
- To update modal appearance or behavior, edit the JSX in the Modal component.
- To add new props or features, update the ModalProps interface and component logic.

Back-end Follow Through:
- If dynamic modal content is needed, pass content as children or via props from parent components.
- For integration with back-end actions, connect modal actions to API calls as needed.
- Ensure any new data fields from the back-end are mapped to the UI components here.

Integration Notes:
- The Modal can be reused or extended for other dialogs or overlays.
- For additional integration, see README or API documentation.
*/
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {title && <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>}
        <div className="overflow-y-auto max-h-[60vh] text-gray-800 text-sm leading-relaxed space-y-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal; 