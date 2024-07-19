// mocks
import { listCategory } from '@/mocks';

// components
import Dropdown from '@/components/common/Dropdown';

const Category = () => (
  <thead>
    <tr className="flex items-center justify-between pl-0 md:pl-0 pr-8 md:pr-12 border-b border-gray-200">
      {listCategory.map(({ id, label, options = [] }) => (
        <th key={id} className="text-left mb-4 sm:mb-0">
          <Dropdown label={label} options={options} />
        </th>
      ))}
      <th className="text-left flex items-center mb-4 sm:mb-0" />
    </tr>
  </thead>
);

export default Category;
