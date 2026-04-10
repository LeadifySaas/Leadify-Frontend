import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    let baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
    
    let variants: Record<string, string> = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      outline: "border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-700",
      ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
    }
    
    let sizes: Record<string, string> = {
      default: "h-10 py-2 px-4 text-sm",
      icon: "h-10 w-10",
    }

    const appliedVariant = variants[variant] || variants.default
    const appliedSize = sizes[size] || sizes.default
    
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${appliedVariant} ${appliedSize} ${className}`}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
