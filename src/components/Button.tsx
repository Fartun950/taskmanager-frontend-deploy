import React from 'react'

type Variant = 'primary' | 'secondary' | 'danger'
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: Variant }

const variantClasses: Record<Variant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-500',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100',
  danger: 'bg-red-600 text-white hover:bg-red-500'
}

export default function Button({ children, variant = 'primary', className = '', ...props }: React.PropsWithChildren<Props>) {
  const base = 'px-4 py-2 rounded-md font-medium transition-transform active:scale-95'
  return (
    <button className={`${base} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
