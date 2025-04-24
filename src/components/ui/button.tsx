"use client"
import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "py-1 px-3 text-sm",
      md: "py-2 px-4 text-base",
      lg: "py-3 px-6 text-lg",
    }

    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center rounded-md
          font-medium transition-colors focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-offset-2
          disabled:opacity-50 disabled:pointer-events-none
          ${sizeClasses[size]}
          ${className}
        `}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"
