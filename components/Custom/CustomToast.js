import React from "react";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function CustomToast() {
  return (
    <Container>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Container>
  );
}

export default CustomToast;
