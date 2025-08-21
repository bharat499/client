import React, { useState, useEffect } from "react";

const AlertMessage = (props) => {
  const { show, message, type, onClose }=props
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
    let timer;
    if (show) {
      timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, 3000); 
    }
    return () => clearTimeout(timer);
  }, [show, onClose]);

  if (!visible) return null;

 
  const getIcon = () => {
    switch (type) {
      case "success":
        return <i className="bi bi-check-circle-fill me-2"></i>;
      case "danger":
        return <i className="bi bi-x-circle-fill me-2"></i>;
      case "warning":
        return <i className="bi bi-exclamation-triangle-fill me-2"></i>;
      case "info":
        return <i className="bi bi-info-circle-fill me-2"></i>;
      default:
        return null;
    }
  };

  return (
    <div
      className={type==='success'?`alert alert-${type}`:`alert alert-${type}`}
      role="alert"
    >
      {getIcon()}
      <div>{message}</div>
      <button
        type="button"
        className="btn-close ms-auto"
        onClick={() => {
          setVisible(false);
          if (onClose) onClose();
        }}
      ></button>
    </div>
  );
};

export default AlertMessage;
