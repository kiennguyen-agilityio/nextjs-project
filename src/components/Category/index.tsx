// mocks
import { listCategory } from '@/mocks';

// components
import Dropdown from '@/components/common/Dropdown';
import { getRoleList } from '@/api/role';

const Category = async () => {
  const roles = await getRoleList();

  return (
    <thead>
      <tr className="flex items-center justify-between pl-0 md:pl-0 pr-8 md:pr-12 border-b border-gray-200">
        {listCategory.map(({ id, label, options = [] }) => (
          <th key={id} className="text-left mb-4 sm:mb-0">
            <Dropdown
              value={id}
              label={label}
              options={
                label === 'Role'
                  ? roles.map((role) => ({
                      id: role.id.toString(),
                      label: role.name,
                    }))
                  : options.map((option) => ({
                      id: option.value,
                      ...option,
                    }))
              }
            />
          </th>
        ))}
        <th className="text-left flex items-center mb-4 sm:mb-0" />
      </tr>
    </thead>
  );
};

export default Category;
