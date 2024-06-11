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

import React from "react";
import styles from "./Input.module.css";
type InputProps = React.ComponentProps<"input"> & {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (newValue: string) => void;
  // value?: string;
  // setValue?: React.Dispatch<React.SetStateAction<string>>;
  // onChange?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  // campo?: {
  //   value: string;
  //   setValue: React.Dispatch<React.SetStateAction<string>>;
  //   onChange: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  //   error: string | null;
  //   validate: () => boolean;
  //   onBlur: () => boolean;
  // };
};

const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  ...props
}: InputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value); // Chama a função onChange com o novo valor
  };
  return (
    <div className={styles.containerInput}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        // value={campo?.value || ""}
        // onChange={({ currentTarget }) =>
        //   campo?.setValue && campo.setValue(currentTarget.value)
        // }
        // onClick={() => campo?.setValue}
        value={value}
        placeholder={placeholder}
        className={styles.input}
        onChange={handleChange}
        id={name}
        name={name}
        type={type}
        {...props}
        // onBlur={campo?.onBlur}
      />
      {/* {campo?.error && <p className={styles.error}>{campo.error}</p>} */}
    </div>
  );
};

export default Input;
