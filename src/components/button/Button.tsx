import React, { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md";
  variant?: "primary" | "outline";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

// Size Classes
const sizeClasses = {
  sm: "px-4 py-3 text-sm",
  md: "px-5 py-3.5 text-sm"
}

// Variant Classes
const variantClasses = {
  primary: "bg-blue-500 text-white shadow-theme-xs hover:bg-blue-600 disabled:bg-blue-300",
  outline: "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300",
};

const Button: React.FC<ButtonProps> = ({className, size="md", variant="primary", startIcon, children, endIcon, disabled=false, onClick}) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center font-medium gap-2 rounded-lg transition 
        ${sizeClasses[size]} 
        ${variantClasses[variant]} 
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  )
}

export default Button
