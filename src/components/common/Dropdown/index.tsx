interface DropdownProps {
  label: string;
  options: Array<{ value: string; label: string }>;
}

const Dropdown = ({ label, options }: DropdownProps) => (
  <div className="relative text-left flex items-center sm:w-1/5 mb-4 sm:mb-0 flex-1 min-w-[120px]">
    <select className="inline-flex justify-center w-full rounded-3xl px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none max-w-32">
      <option value="">{label}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default Dropdown;
