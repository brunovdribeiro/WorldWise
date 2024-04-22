import { ReactNode } from "react";
import style from './Button.module.css';

type ButtonProps = {
    style: "primary" | "back" | "position",
    type?: "submit" | "button" | "reset",
    onClick?: () => void,
    children: ReactNode
}
const Button = (props: ButtonProps) => {
    return (
            <button
                    type={props.type ?? "submit"}
                    className={`${style.btn} ${style[props.style]}`}
                    onClick={props.onClick}>
                {props.children}
            </button>
    );
};

export default Button;