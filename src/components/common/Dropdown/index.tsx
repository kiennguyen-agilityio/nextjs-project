'use client';
import { SelectType } from '@/types/SelectType';

interface DropdownProps {
  label: string | number;
  options: SelectType[];
  customClass?: string;
  onChange?: (value: string) => void;
}

const Dropdown = ({ label, options, customClass, onChange }: DropdownProps) => (
  <select
    name="userRole"
    onChange={(e) => onChange && onChange(e.target.value)}
    className={`inline-flex justify-center w-full rounded-3xl px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none max-w-32 ${customClass}`}
  >
    <option value={label}>{label}</option>
    {options.map((option) => (
      <option key={option.id} value={option.id}>
        {option.label}
      </option>
    ))}
  </select>
);

export default Dropdown;
