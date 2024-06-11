// import React from "react";
// import styles from "./Input.module.css";
// type InputProps = React.ComponentProps<"input"> & {
//   label?: string;
//   type?: string;
//   // value?: string;
//   setValue?: React.Dispatch<React.SetStateAction<string>>;
//   onChange?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
// };

// const Input = ({
//   label,
//   type,
//   name,
//   placeholder,
//   value,
//   setValue,
//   onChange,
//   ...props
// }: InputProps) => {
//   return (
//     <div className={styles.containerInput}>
//       <label className={styles.label} htmlFor={name}>
//         {label}
//       </label>
//       <input
//         value={value}
//         onChange={({ currentTarget }) =>
//           setValue && setValue(currentTarget.value)
//         }
//         onClick={() => setValue}
//         placeholder={placeholder}
//         className={styles.input}
//         id={name}
//         name={name}
//         type={type}
//         {...props}
//       />
//     </div>
//   );
// };

// export default Input;

///ESTOU USANDO O ABAIXO

import React from "react";
import styles from "./Input.module.css";
type InputProps = React.ComponentProps<"input"> & {
  label?: string;
  type?: string;
  // value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  onChange?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  campo?: {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    onChange: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    error: string | null;
    validate: () => boolean;
    onBlur: () => boolean;
  };
};

const Input = ({
  label,
  type,
  name,
  placeholder,
  campo,
  ...props
}: InputProps) => {
  return (
    <div className={styles.containerInput}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        value={campo?.value}
        onChange={({ currentTarget }) =>
          campo?.setValue && campo.setValue(currentTarget.value)
        }
        onClick={() => campo?.setValue}
        placeholder={placeholder}
        className={styles.input}
        id={name}
        name={name}
        type={type}
        onBlur={campo?.onBlur}
        {...props}
      />
      {campo?.error && <p className={styles.error}>{campo.error}</p>}
    </div>
  );
};

export default Input;

///ESTOU USANDO O ACIMA
