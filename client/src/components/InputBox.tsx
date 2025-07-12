import type { ChangeEvent } from "react";

interface InputBoxProps {
  label: string;
  placeholder: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void; 
}

export function InputBox({
  label,
  placeholder,
  onChange
}: InputBoxProps) {
  return (
    <div className="flex flex-col ">
      <div className="text-start font-medium py-2 capitalize">{label}</div>
      <input type="text" className="w-full px-2 py-1 border rounded border-slate-200" placeholder={placeholder} onChange={onChange} />
    </div>
  );
}
