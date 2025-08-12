import React from 'react';

function FormButtons({ text, onClick, type, children }) {
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
