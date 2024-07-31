'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// mocks
import { listCategory } from '@/mocks';

// components
import Dropdown from '@/components/common/Dropdown';
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
    <thead>
      <tr className="flex items-center justify-between pl-0 md:pl-0 pr-8 md:pr-12 border-b border-gray-200">
        {listCategory.map(({ id, label, options = [], name }) => (
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
              onChange={(value) => {
                // value name

                createFilterURL(name, value);
              }}
            />
          </th>
        ))}
        <th className="text-left flex items-center mb-4 sm:mb-0" />
      </tr>
    </thead>
  );
};

export default Category;
