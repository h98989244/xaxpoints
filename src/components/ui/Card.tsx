import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export default function Card({ hover = false, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 ${
        hover ? 'transition-all hover:border-primary cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
