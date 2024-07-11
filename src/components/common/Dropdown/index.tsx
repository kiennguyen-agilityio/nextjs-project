interface DropdownProps {
  label: string;
  options: Array<{ value: string; label: string }>;
}

const Dropdown = ({ label, options }: DropdownProps) => {
  return (
    <div className="relative inline-block text-left">
      <select className="inline-flex justify-center w-full rounded-3xl px-4 py-2  text-sm  font-medium text-gray-700 hover:bg-gray-200 focus:outline-none">
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
