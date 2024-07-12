// mocks
import { listCategory } from '@/mocks';

// components
import Dropdown from '@/components/common/Dropdown';

const Category = () => (
  <div className="flex space-x-8 p-4">
    {listCategory.map((dropdown) => (
      <Dropdown
        key={dropdown.id}
        label={dropdown.label}
        options={dropdown.options ? dropdown.options : []}
      />
    ))}
  </div>
);

export default Category;
