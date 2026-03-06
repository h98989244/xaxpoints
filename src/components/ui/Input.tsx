import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: string
}

export default function Input({ label, icon, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium text-slate-300">{label}</label>}
      <div className="relative">
        {icon && (
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
            {icon}
          </span>
        )}
        <input
          className={`w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-2 text-sm focus:ring-2 focus:ring-primary outline-none ${
            icon ? 'pl-10 pr-4' : 'px-4'
          } ${className}`}
          {...props}
        />
      </div>
    </div>
  )
}
