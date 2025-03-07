import React from 'react'

interface InputProps {
  type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
  placeholder?: string;
  name?: string;
  id?: string;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  max?: string;
  step?: number;
  className?: string;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  hint?: string;
  value?: string;
}

const Input:React.FC<InputProps> = ({type="text", placeholder, value="", name, id, defaultValue, onChange, min, max, step, className="", disabled=false, error = false, success = false, hint}) => {

  let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${className}`

  if(disabled){
    inputClasses += " text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
  } else if(error){
    inputClasses += " text-error-800 border-error-500 focus:ring focus:ring-error-500/10  dark:text-error-400 dark:border-error-500"
  } else if(success){
    inputClasses += " text-success-500 border-success-400 focus:ring-success-500/10 focus:border-success-300  dark:text-success-400 dark:border-success-500"
  } else {
    inputClasses += " bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
  }

  return (
    <div className='relative'>
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        name={name}
        id={id}
        defaultValue={defaultValue}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        className={inputClasses}
        value={value}
      />
      {
        hint && (
          <p className={`mt-1.5 text-xs ${error ? "text-error-500" : success ? "text-success-500" : "text-gray-500"}`}>
            {hint}
          </p>
        )
      }
    </div>
  )
}

export default Input