import React from "react";
import { BsPencilSquare } from "react-icons/bs";
import { IoTrash } from "react-icons/io5";

function UserTable({
  users,
  selectedIds,
  setSelectedIds,
  handleUpdate,
  handleDelete,
}) {
  //   check all checkbox if users exists
  const isSelectedAll =
    users?.length > 0 && selectedIds.length === users.length;

  const role = localStorage.getItem("role");

  return (
    <>
      <table className="w-full text-center border border-gray-200 rounded-lg overflow-hidden shadow-xl mt-6 ">
        <thead className="bg-blue-500 text-white">
          <tr>
            {users?.length > 0 && (
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer"
                  checked={isSelectedAll}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedIds(users?.map((u) => u._id));
                    } else {
                      setSelectedIds([]);
                    }
                  }}
                />
              </th>
            )}

            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">DOB</th>
            <th className="px-4 py-2">Gender</th>
            <th className="px-4 py-2">Hobby</th>
            <th className="px-4 py-2">Country</th>
            <th className="px-4 py-2">State</th>
            <th className="px-4 py-2">City</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users?.length > 0 ? (
            users.map((user) => (
              <tr key={user._id} className="border-b border-b-gray-400">
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer"
                    checked={selectedIds.includes(user._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedIds((prev) => [...prev, user._id]);
                      } else {
                        setSelectedIds((prev) =>
                          prev.filter((id) => id !== user._id),
                        );
                      }
                    }}
                  />
                </td>
                <td className="px-4 py-2">{user._id}</td>
                <td className="px-4 py-2 font-medium">{`${user.firstName} ${user.lastName}`}</td>
                <td className="px-4 py-2">{user.dateOfBirth}</td>
                <td className="px-4 py-2">{user.gender}</td>
                <td className="px-4 py-2">{user.hobby?.join(", ")}</td>
                <td className="px-4 py-2">{user.country}</td>
                <td className="px-4 py-2">{user.state}</td>
                <td className="px-4 py-2">{user.city}</td>
                <td className="px-4 py-2">{user.address}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleUpdate(user._id)}
                    className="bg-yellow-500 hover:bg-yellow-600 cursor-pointer rounded p-2"
                  >
                    <BsPencilSquare />
                  </button>
                  {role === "admin" && (
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white cursor-pointer rounded p-2 ms-1"
                    >
                      <IoTrash />
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center py-4 text-gray-500">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default UserTable;
