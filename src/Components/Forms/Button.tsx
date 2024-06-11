import React from "react";
import styles from "./Button.module.css";

// type ButtonProps = {
//   children: React.ReactNode;
//   disabled?: boolean;
// };

type ButtonProps = React.ComponentProps<"button"> & {
  children: React.ReactNode;
  disabled?: boolean;
};

const Button = ({ children, disabled = false, ...props }: ButtonProps) => {
  return (
    <button {...props} disabled={disabled} className={styles.btn}>
      {children}
    </button>
  );
};

export default Button;
