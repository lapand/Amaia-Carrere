type ButtonProps = {
    children: string,
    onClick?: () => void,
    className?: string,
    ariaLabel?: string,
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className, ariaLabel }) => {

    return (
        <button 
            onClick={onClick}
            className={`bg-gradient-to-br from-primary-300 to-primary-500 rounded-3xl p-4 shadow-2xl text-white ${className}`}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    );
}

export default Button;