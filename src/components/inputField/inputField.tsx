import styles from "./inputField.module.css";

interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputField(props: InputProps) {
  return (
    <div className={styles.input}>
      <label className={styles.text}>{props.label}</label>
      <input type={props.type} value={props.value} onChange={props.onChange} className={styles.inputText}/>
    </div>
  );
}
