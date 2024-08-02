'use client';

import { SelectType } from '@/types/SelectType';

interface DropdownProps {
  label: string | number;
  options: SelectType[];
  customClass?: string;
  value: string;
  onChange?: (value: string) => void;
}

const Dropdown = ({
  label,
  options,
  customClass,
  value,
  onChange,
}: DropdownProps) => (
  <select
    name="userRole"
    onChange={(e) => onChange && onChange(e.target.value)}
    className={`inline-flex justify-center w-full rounded-3xl px-2 py-1 text-sm font-medium text-gray-700 cursor-pointer focus:outline-none max-w-32 ${customClass}`}
  >
    <option value={value}>{label}</option>
    {options.map((option) => (
      <option key={option.id} value={option.id}>
        {option.label}
      </option>
    ))}
  </select>
);

export default Dropdown;
