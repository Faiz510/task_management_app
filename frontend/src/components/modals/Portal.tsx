import React from "react";
import ReactDOM from "react-dom";

interface PortalTypes {
  children: React.ReactNode;
}

const Portal: React.FC<PortalTypes> = ({ children }) => {
  const portalModal = document.getElementById("Modal");
  if (!portalModal) return;
  return ReactDOM.createPortal(children, portalModal);
};

export default Portal;
