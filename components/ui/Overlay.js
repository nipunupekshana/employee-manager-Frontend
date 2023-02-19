import React from "react";
import Spinner from "react-bootstrap/Spinner";
import classes from "./Overlay.module.css";

export default function Overlay() {
  return (
    <div className={classes['overlay-wrapper']}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
