import React from 'react';

interface Props {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  children?: React.ReactNode;
}

function FormButtons({ text, onClick, type, children }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full p-2 rounded-full button_shadow bg-slate-950 hover:scale-90 flex items-center justify-center gap-4"
    >
      {children && <div>{children}</div>}
      <h1 className="text-lg">{text}</h1>
    </button>
  );
}

export default FormButtons;
