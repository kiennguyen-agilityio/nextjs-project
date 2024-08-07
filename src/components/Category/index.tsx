'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// mocks
import { listCategory } from '@/mocks';

// components
import Dropdown from '@/components/common/Dropdown';

// models
import { RoleModel } from '@/models/RoleModel';

interface CategoryProps {
  roles: RoleModel[];
}

const Category = ({ roles }: CategoryProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const router = useRouter();

  const createFilterURL = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (name === 'userRole') {
      params.set(name, value);
    } else {
      params.set('sortBy', name);
      params.set('order', value);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <thead className="bg-gray-400 text-gray-800 border-b border-gray-300">
      <tr className="flex items-center justify-between pl-6 pr-8 py-3">
        {listCategory.map(({ id, label, options = [], name }) => (
          <th
            key={id}
            className="text-left font-semibold text-sm sm:text-base px-4 py-2"
          >
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
              onChange={(value) => {
                createFilterURL(name, value);
              }}
            />
          </th>
        ))}
        <th className="text-left px-4 py-2" />
      </tr>
    </thead>
  );
};

export default Category;
