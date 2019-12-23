import React from "react";
import Fade from "react-reveal/Fade";

export default function SuccessAlert({ title }) {
  const successCreate = {
    textAlign: "center",
    color: "green",
    left: "43%",
    position: "absolute"
  };

  const successDelete = {
      ...successCreate,
      color: "red"
  }

  return (
    <Fade>
      <h2 style={[title].includes("Course Deleted") ? successDelete : successCreate }>{title}</h2>
    </Fade>
  );
}
