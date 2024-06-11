import React from "react";
import styles from "./TextArea.module.css";

type PropsTextArea = React.ComponentProps<"textarea"> & {
  label: string;
  campo?: {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    onChange: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    error: string | null;
    validate: () => boolean;
    onBlur: () => boolean;
  };
};

const TextArea = ({ label, name, campo, ...props }: PropsTextArea) => {
  return (
    <div className={styles.containertextArea}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <textarea
        className={styles.textArea}
        id={name}
        name={name}
        value={campo?.value}
        onChange={({ currentTarget }) =>
          campo?.setValue && campo.setValue(currentTarget.value)
        }
        onClick={() => campo?.setValue}
        onBlur={campo?.onBlur}
        {...props}
      />
    </div>
  );
};

export default TextArea;
