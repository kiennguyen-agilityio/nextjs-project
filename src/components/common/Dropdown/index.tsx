interface DropdownProps {
  label: string | number;
  options: Array<{ value: string; label: string }>;
  customClass?: string;
}

const Dropdown = ({ label, options, customClass }: DropdownProps) => (
  <select
    className={`inline-flex justify-center w-full rounded-3xl px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none max-w-32 ${customClass}`}
  >
    <option value="">{label}</option>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default Dropdown;
