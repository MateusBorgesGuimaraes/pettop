import React from "react";
import styles from "./TextArea.module.css";

type PropsTextArea = React.ComponentProps<"textarea"> & {
  label: string;
  name: string;
  value: string;
  onChange: (newValue: string) => void;
  // campo?: {
  //   value: string;
  //   setValue: React.Dispatch<React.SetStateAction<string>>;
  //   onChange: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  //   error: string | null;
  //   validate: () => boolean;
  //   onBlur: () => boolean;
  // };
};

const TextAreaEditavel = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  ...props
}: PropsTextArea) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value); // Chama a função onChange com o novo valor
  };
  return (
    <div className={styles.containertextArea}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <textarea
        className={styles.textArea}
        // id={name}
        // name={name}
        // value={campo?.value}
        // onChange={({ currentTarget }) =>
        //   campo?.setValue && campo.setValue(currentTarget.value)
        // }
        // onClick={() => campo?.setValue}
        // onBlur={campo?.onBlur}
        // {...props}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        id={name}
        name={name}
        {...props}
      />
    </div>
  );
};

export default TextAreaEditavel;
