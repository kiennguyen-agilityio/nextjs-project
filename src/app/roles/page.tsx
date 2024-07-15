// components
import { Button } from '@/components/common/Button';

// icons
import { TripleDot } from '@/icons/TripleDot';

// mocks
import { roles } from '@/mocks';

const RolesPage = () => {
  return (
    <div className="relative shadow-lg sm:rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-8 bg-gray-500">
        Roles
      </h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b" />
          </tr>
        </thead>
        <tbody>
          {roles.map(({ id, name, description }) => (
            <tr key={id} className="text-center hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{id}</td>
              <td className="py-2 px-4 border-b">{name}</td>
              <td className="py-2 px-4 border-b">{description}</td>
              <td className="py-2 px-4 border-b">
                <Button
                  customClass="text-gray-500 outline-none border-none"
                  variant="outline"
                  data-testid="triple-dot"
                >
                  <TripleDot />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <Button variant="primary" type="button" ariaLabel="Add New Role">
          Add New Role
        </Button>
      </div>
    </div>
  );
};

export default RolesPage;
