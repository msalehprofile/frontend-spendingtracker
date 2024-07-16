import { MouseEventHandler } from 'react';
import './Button.scss';

type ButtonProps = {
    label: String;
    color: "primary" | "secondary";
    size: "small" | "medium" | "large";
    onClick?: MouseEventHandler;
}

const Button = ({label, color, size, onClick}: ButtonProps) => {

  return (
    <div>
        <button className={`button button--${color} && button button--${size}`} onClick={onClick}>{label}</button>
    </div>
  )
}

export default Button