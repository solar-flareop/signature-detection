import React from "react";

const SignCard = ({ key, value }) => {
  return (
    <div key={key}>
      <h5>{key}</h5>
      <img src={value.base64} alt="sign" />
      <h5>{value.confidence}</h5>
    </div>
  );
};

export default SignCard;
