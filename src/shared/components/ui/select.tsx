import * as React from "react"

const SelectContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}>({
  open: false,
  setOpen: () => {},
})

export function Select({ children, defaultValue, value, onValueChange }: any) {
  const [open, setOpen] = React.useState(false)
  const [currentValue, setCurrentValue] = React.useState(value || defaultValue)
  const selectRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [selectRef])

  const handleValueChange = (newVal: string) => {
    setCurrentValue(newVal)
    if (onValueChange) onValueChange(newVal)
    setOpen(false)
  }

  React.useEffect(() => {
    if (value !== undefined) setCurrentValue(value)
  }, [value])

  return (
    <SelectContext.Provider value={{ value: currentValue, onValueChange: handleValueChange, open, setOpen }}>
      <div className="relative w-full" ref={selectRef}>
        {children}
      </div>
    </SelectContext.Provider>
  )
}

export const SelectTrigger = React.forwardRef<HTMLDivElement, any>(({ className = "", children, ...props }, ref) => {
  const { open, setOpen } = React.useContext(SelectContext)
  return (
    <div
      ref={ref}
      onClick={() => setOpen(!open)}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 opacity-50"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  )
})

export const SelectValue = ({ placeholder }: any) => {
  const { value } = React.useContext(SelectContext)
  return <span>{value || placeholder}</span>
}

export const SelectContent = ({ children, className = "" }: any) => {
  const { open } = React.useContext(SelectContext)
  
  if (!open) return null

  return (
    <div 
      className={`absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-md ${className}`}
    >
      <div className="p-1">{children}</div>
    </div>
  )
}

export const SelectItem = React.forwardRef<HTMLDivElement, any>(({ className = "", children, value, ...props }, ref) => {
  const { onValueChange, value: selectedValue } = React.useContext(SelectContext)
  const isSelected = selectedValue === value
  
  return (
    <div
      ref={ref}
      onClick={() => onValueChange && onValueChange(value)}
      className={`relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100 ${isSelected ? "bg-gray-100 font-medium text-blue-600" : ""} ${className}`}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {isSelected && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      {children}
    </div>
  )
})
