import { createContext, useContext, useState } from "react";

const AlertContext = createContext(undefined);

export const AlertProvider = ({ children }) => {
  const [state, setState] = useState({
    isOpen: false,
    type: '',
    message: '',
  });

  const onOpen = ({ type, message }) => setState({ isOpen: true, type, message });
  const onClose = () => setState({ isOpen: false, type: '', message: '' });

  return (
    <AlertContext.Provider value={{ ...state, onOpen, onClose }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => useContext(AlertContext);
