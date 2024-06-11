import React from "react";

type PropsError = {
  error: string | null;
};

const Error = ({ error }: PropsError) => {
  if (!error) return null;
  return <p style={{ color: "#f31", margin: "1rem 0" }}>{error}</p>;
};

export default Error;
