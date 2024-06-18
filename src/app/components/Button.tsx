type ButtonProps = {
    children: string,
    onClick?: () => void,
    className?: string,
    ariaLabel?: string,
    type?: "submit" | "reset" | "button" | undefined,
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className, ariaLabel, type }) => {

    return (
        <button 
            onClick={onClick}
            className={`bg-gradient-to-br from-primary-300 to-primary-500 rounded-3xl py-3 px-4 shadow-xl text-white ${className}`}
            aria-label={ariaLabel}
            type={type}
        >
            {children}
        </button>
    );
}

export default Button;