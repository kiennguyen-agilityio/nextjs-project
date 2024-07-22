const UserSkeleton = () => (
  <tr className="flex flex-col sm:flex-row items-start sm:items-center sm:gap-10 pr-8 md:pr-0 justify-between p-0 sm:p-4 border-b border-gray-200 bg-gray-100">
    <td className="flex items-center w-full mb-4 sm:mb-0">
      <div className="w-10 h-10 bg-gray-300 rounded-lg mr-4 animate-pulse" />
      <div className="w-1/4 h-4 bg-gray-300 rounded-md animate-pulse" />
    </td>
    <td className="w-full h-4 bg-gray-300 rounded-md mb-4 sm:mb-0 animate-pulse" />
    <td className="w-full h-4 bg-gray-300 rounded-md mb-4 sm:mb-0 animate-pulse" />
    <td className="w-full h-4 bg-gray-300 rounded-md mb-4 sm:mb-0 animate-pulse" />
    <td className="w-full sm:w-1/12">
      <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
    </td>
  </tr>
);

export default UserSkeleton;
