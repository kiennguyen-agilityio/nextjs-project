// mocks
import { listCategory } from '@/mocks';

// components
import Dropdown from '@/components/common/Dropdown';

const Category = () => (
  <thead>
    <tr className="flex items-center justify-between pl-0 md:pl-0 pr-8 md:pr-12 border-b border-gray-200">
      {listCategory.map(({ id, label, options = [] }) => (
        <Dropdown key={id} label={label} options={options} />
      ))}
      <th className="text-left flex items-center mb-4 sm:mb-0" />
    </tr>
  </thead>
);

export default Category;
