import { useState } from "react";
import Layout from "./Layout";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleTypeFilter, setRoleTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [editUserId, setEditUserId] = useState(null);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      mobile: "9876543210",
      role: "Developer",
      roleType: "Admin",
      location: "Delhi",
      status: "Active",
      salary: "50,000",
    },
    {
      id: 2,
      name: "Priya Verma",
      email: "priya@example.com",
      mobile: "9123456780",
      role: "Designer",
      roleType: "Employee",
      location: "Mumbai",
      status: "Inactive",
      salary: "25,000",
    },
    {
      id: 3,
      name: "Amit Singh",
      email: "amit@example.com",
      mobile: "9988776655",
      role: "Manager",
      roleType: "Admin",
      location: "Bangalore",
      status: "Active",
      salary: "75,000",
    },
  ]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "",
    roleType: "Employee",
    location: "",
    status: "Active",
    salary: "",
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch = Object.values(user)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesRoleType =
      roleTypeFilter === "All" || user.roleType === roleTypeFilter;

    const matchesStatus =
      statusFilter === "All" || user.status === statusFilter;

    return matchesSearch && matchesRoleType && matchesStatus;
  });

  const handleSaveUser = (e) => {
    e.preventDefault();
    if (editUserId) {
      setUsers(
        users.map((u) => (u.id === editUserId ? { ...u, ...newUser } : u))
      );
      setEditUserId(null);
    } else {
      const id = users.length + 1;
      setUsers([...users, { id, ...newUser }]);
    }

    setNewUser({
      name: "",
      email: "",
      mobile: "",
      role: "",
      roleType: "Employee",
      location: "",
      status: "Active",
      salary: "",
    });
    setShowForm(false);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
    setConfirmDelete(null);
  };

  const handleEditUser = (user) => {
    setNewUser({ ...user });
    setEditUserId(user.id);
    setShowForm(true);
  };

  return (
    <Layout>
      <div className="w-full mt-4 space-y-6 bg-[#081b29] p-6 rounded-xl border border-[#0ef]/20">
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-2 items-stretch md:items-center justify-between bg-[#0a2235] p-4 rounded-lg shadow">
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-2/3">
            {/* Search */}
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:flex-1 p-2 rounded-lg bg-[#0a2235]/70 border border-[#0ef]/40 text-[#0ef] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0ef]"
            />
            {/* Role Filter */}
            <select
              value={roleTypeFilter}
              onChange={(e) => setRoleTypeFilter(e.target.value)}
              className="w-full md:w-32 p-2 rounded-lg bg-[#0a2235]/70 border border-[#0ef]/40 text-[#0ef] focus:outline-none focus:ring-2 focus:ring-[#0ef] text-sm"
            >
              <option className="bg-[#081b29]" value="All">All Roles</option>
              <option className="bg-[#081b29]" value="Admin">Admin</option>
              <option className="bg-[#081b29]" value="Employee">Employee</option>
            </select>
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-32 p-2 rounded-lg bg-[#0a2235]/70 border border-[#0ef]/40 text-[#0ef] focus:outline-none focus:ring-2 focus:ring-[#0ef] text-sm"
            >
              <option className="bg-[#081b29]" value="All">All Status</option>
              <option className="bg-[#081b29]" value="Active">Active</option>
              <option className="bg-[#081b29]" value="Inactive">Inactive</option>
            </select>
          </div>

          <button
            onClick={() => {
              setEditUserId(null);
              setNewUser({
                name: "",
                email: "",
                mobile: "",
                role: "",
                roleType: "Employee",
                location: "",
                status: "Active",
                salary: "",
              });
              setShowForm(true);
            }}
            className="bg-[#0ef] text-[#081b29] font-semibold px-4 py-2 rounded-lg hover:bg-[#3ff] transition-all duration-300 shadow-md w-full md:w-auto"
          >
            + New User
          </button>
        </div>

        {/* Table */}
        <div className="w-full bg-[#0a2235] p-4 rounded-lg shadow overflow-x-auto border border-[#0ef]/30">
          <table className="min-w-[800px] w-full border-collapse">
            <thead>
              <tr className="bg-[#081b29] text-[#0ef] text-sm">
                <th className="p-3 text-left border-b border-[#0ef]/30">S. No.</th>
                <th className="p-3 text-left border-b border-[#0ef]/30">Name</th>
                <th className="p-3 text-left border-b border-[#0ef]/30">Email</th>
                <th className="p-3 text-left border-b border-[#0ef]/30">Mobile</th>
                <th className="p-3 text-left border-b border-[#0ef]/30">Role</th>
                <th className="p-3 text-left border-b border-[#0ef]/30">Role Type</th>
                <th className="p-3 text-left border-b border-[#0ef]/30">Location</th>
                <th className="p-3 text-left border-b border-[#0ef]/30">Status</th>
                <th className="p-3 text-left border-b border-[#0ef]/30">Salary</th>
                <th className="p-3 text-left border-b border-[#0ef]/30">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-[#0ef]">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className="border-b border-[#0ef]/20 odd:bg-[#0a2235]/30 even:bg-[#081b29] hover:bg-[#0a2235] transition"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.mobile}</td>
                    <td className="p-3">{user.role}</td>
                    <td className="p-3">{user.roleType}</td>
                    <td className="p-3">{user.location}</td>
                    <td className="p-3">
                      <span
  className={`px-3 py-1 rounded-full text-xs font-medium
    ${
      user.status === "Active"
        ? "bg-green-500/10 text-green-400"
        : "bg-red-500/10 text-red-400"
    }`}
>
  {user.status}
</span>
                    </td>
                    <td className="p-3">₹{user.salary}</td>
                    <td className="p-3 flex gap-2">
                      <button
                        className="px-3 py-1 rounded bg-[#0ef]/20 text-[#0ef] hover:bg-[#0ef]/30"
                        onClick={() => handleEditUser(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500/40"
                        onClick={() => setConfirmDelete(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center p-3 text-gray-400">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Delete Modal */}
        {confirmDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="bg-[#0a2235] text-[#0ef] p-6 rounded-lg border border-[#0ef]/30 shadow-xl w-[90%] md:w-1/3">
              <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
              <p className="mb-6">Are you sure you want to delete this user?</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteUser(confirmDelete)}
                  className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit User Form */}
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center px-4 bg-black/60 z-50">
            <div className="bg-[#0a2235] text-[#0ef] p-8 rounded-lg border border-[#0ef]/30 shadow-lg w-full md:w-2/3">
              <h2 className="text-xl font-semibold mb-4">
                {editUserId ? "Edit User" : "Add New User"}
              </h2>
              <form
                onSubmit={handleSaveUser}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <input
                  type="text"
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="p-2 w-full rounded bg-[#0a2235]/70 border border-[#0ef]/40 text-[#0ef] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0ef]"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="p-2 w-full rounded bg-[#0a2235]/70 border border-[#0ef]/40 text-[#0ef] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0ef]"
                  required
                />
                <input
                  type="text"
                  placeholder="Mobile"
                  value={newUser.mobile}
                  onChange={(e) => setNewUser({ ...newUser, mobile: e.target.value })}
                  className="p-2 w-full rounded bg-[#0a2235]/70 border border-[#0ef]/40 text-[#0ef] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0ef]"
                  required
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="p-2 w-full rounded bg-[#0a2235]/70 border border-[#0ef]/40 text-[#0ef] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0ef]"
                  required
                />
                <select
                  value={newUser.roleType}
                  onChange={(e) => setNewUser({ ...newUser, roleType: e.target.value })}
                  className="p-2 w-full rounded bg-[#0a2235]/70 border border-[#0ef]/40 text-[#0ef] focus:outline-none focus:ring-2 focus:ring-[#0ef]"
                >
                  <option className="bg-[#081b29]" value="Admin">Admin</option>
                  <option className="bg-[#081b29]" value="Employee">Employee</option>
                </select>
                <input
                  type="text"
                  placeholder="Work Location"
                  value={newUser.location}
                  onChange={(e) => setNewUser({ ...newUser, location: e.target.value })}
                  className="p-2 w-full rounded bg-[#0a2235]/70 border border-[#0ef]/40 text-[#0ef] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0ef]"
                  required
                />
                <select
                  value={newUser.status}
                  onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                  className="p-2 w-full rounded bg-[#0a2235]/70 border border-[#0ef]/40 text-[#0ef] focus:outline-none focus:ring-2 focus:ring-[#0ef]"
                >
                  <option className="bg-[#081b29]" value="Active">Active</option>
                  <option className="bg-[#081b29]" value="Inactive">Inactive</option>
                </select>
                <input
                  type="text"
                  placeholder="Salary"
                  value={newUser.salary}
                  onChange={(e) => setNewUser({ ...newUser, salary: e.target.value })}
                  className="p-2 w-full rounded bg-[#0a2235]/70 border border-[#0ef]/40 text-[#0ef] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0ef]"
                  required
                />

                <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditUserId(null);
                    }}
                    className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-[#0ef] text-[#081b29] font-semibold hover:bg-[#3ff] transition-all duration-300 shadow-md"
                  >
                    {editUserId ? "Save Changes" : "Add User"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Users;
