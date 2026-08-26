import type { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  message?: string;
  children?: ReactNode;
}

export function Modal({ isOpen, title, message, children }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl shadow-slate-950/40">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        {message ? <p className="mt-2 text-sm text-slate-300">{message}</p> : null}
        {children ? <div className="mt-5">{children}</div> : null}
      </div>
    </div>
  );
}
