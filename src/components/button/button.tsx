import style from "./buton.module.css";

interface ButtonProps {
  color?: string;
  text: string;
  width: string;
  onClick?: () => void;
}

export function Button(props: ButtonProps) {
  return (
    <button
      style={{ backgroundColor: props.color, width: props.width }}
      onClick={props.onClick}
    >
      <p>{props.text}</p>
    </button>
  );
}
