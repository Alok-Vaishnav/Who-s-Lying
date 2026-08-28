import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary: 'bg-rose-500 text-white shadow-lg shadow-rose-950/30 hover:bg-rose-400 hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'border border-slate-700 bg-slate-800/90 text-slate-100 hover:border-slate-600 hover:bg-slate-700',
    danger: 'bg-red-600 text-white shadow-lg shadow-red-950/30 hover:bg-red-500 hover:-translate-y-0.5 active:translate-y-0',
    ghost: 'border border-slate-700 bg-slate-950/30 text-slate-300 hover:border-slate-500 hover:bg-slate-800/80 hover:text-white',
  };

  return (
    <button
      type="button"
      className={[
        'inline-flex min-h-12 items-center justify-center rounded-xl px-5 py-3 text-base font-bold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-50',
        variantStyles[variant],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}
