import { HTMLInputTypeAttribute } from 'react';

interface Props {
  name: string;
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
}

export const Input = ({ name, label, type, placeholder }: Props) => (
  <div>
    <label
      className="block text-dark-100 text-sm font-medium leading-5 mb-4"
      htmlFor={name}
    >
      {label}
    </label>
    <input
      className="rounded-[10px] w-full h-12 py-2 px-4 bg-white-300 text-dark-90 placeholder-dark-50 leading-tight border border-gray-300 focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-300"
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
    />
  </div>
);
