import './Button.scss';

type ButtonProps = {
    label: String;
    color: "primary" | "secondary";
    size: "small" | "medium" | "large";
}

const Button = ({label, color, size}: ButtonProps) => {

  return (
    <div>
        <button className={`button button--${color} && button button--${size}`}>{label}</button>
    </div>
  )
}

export default Button