import Layout  from "./Layout";
import Demo from "./Demo";

const Users = () => {
  return (
    <Layout >
       <div className="w-full -mt-6 ">
      {/* Parent div with flexbox */}
      <div className="flex mb-2 items-center justify-between bg-white p-4 rounded-lg shadow">
        
        {/* Left side - Search input */}
        <input
          type="text"
          placeholder="Search users..."
          className="w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Right side - Button */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + New User
        </button>
      </div>
{/* 
    <div className="w-full bg-white p-4 rounded-lg shadow overflow-x-auto">
  <table className="w-full border-collapse">
    <thead>
      <tr className="bg-gray-100 text-gray-700 text-sm">
        <th className="p-3 text-left">S. No.</th>
        <th className="p-3 text-left">Name</th>
        <th className="p-3 text-left">Email</th>
        <th className="p-3 text-left">Mobile</th>
        <th className="p-3 text-left">Role</th>
        <th className="p-3 text-left">Type</th>
        <th className="p-3 text-left">Work Location</th>
        <th className="p-3 text-left">Status</th>
        <th className="p-3 text-left">Salary (Gross)</th>
        <th className="p-3 text-left">Action</th>
      </tr>
    </thead>
    <tbody className="text-sm text-gray-600">
      <tr className="border-b hover:bg-gray-50">
        <td className="p-3">1</td>
        <td className="p-3">Rahul Sharma</td>
        <td className="p-3">rahul@example.com</td>
        <td className="p-3">9876543210</td>
        <td className="p-3">Developer</td>
        <td className="p-3">Full-Time</td>
        <td className="p-3">Delhi</td>
        <td className="p-3">
          <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">Active</span>
        </td>
        <td className="p-3">₹50,000</td>
        <td className="p-3">
          <button className="text-blue-600 hover:underline">Edit</button>
        </td>
      </tr>

      <tr className="border-b hover:bg-gray-50">
        <td className="p-3">2</td>
        <td className="p-3">Priya Verma</td>
        <td className="p-3">priya@example.com</td>
        <td className="p-3">9123456780</td>
        <td className="p-3">Designer</td>
        <td className="p-3">Part-Time</td>
        <td className="p-3">Mumbai</td>
        <td className="p-3">
          <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-700">Inactive</span>
        </td>
        <td className="p-3">₹25,000</td>
        <td className="p-3">
          <button className="text-blue-600 hover:underline">Edit</button>
        </td>
      </tr>

      <tr className="border-b hover:bg-gray-50">
        <td className="p-3">3</td>
        <td className="p-3">Amit Singh</td>
        <td className="p-3">amit@example.com</td>
        <td className="p-3">9988776655</td>
        <td className="p-3">Manager</td>
        <td className="p-3">Full-Time</td>
        <td className="p-3">Bangalore</td>
        <td className="p-3">
          <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">Active</span>
        </td>
        <td className="p-3">₹75,000</td>
        <td className="p-3">
          <button className="text-blue-600 hover:underline">Edit</button>
        </td>
      </tr>

      <tr className="border-b hover:bg-gray-50">
        <td className="p-3">4</td>
        <td className="p-3">Neha Gupta</td>
        <td className="p-3">neha@example.com</td>
        <td className="p-3">9090909090</td>
        <td className="p-3">HR</td>
        <td className="p-3">Contract</td>
        <td className="p-3">Chennai</td>
        <td className="p-3">
          <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">Active</span>
        </td>
        <td className="p-3">₹40,000</td>
        <td className="p-3">
          <button className="text-blue-600 hover:underline">Edit</button>
        </td>
      </tr>

      <tr className="border-b hover:bg-gray-50">
        <td className="p-3">5</td>
        <td className="p-3">Ravi Kumar</td>
        <td className="p-3">ravi@example.com</td>
        <td className="p-3">9012345678</td>
        <td className="p-3">Intern</td>
        <td className="p-3">Internship</td>
        <td className="p-3">Hyderabad</td>
        <td className="p-3">
          <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700">On Hold</span>
        </td>
        <td className="p-3">₹10,000</td>
        <td className="p-3">
          <button className="text-blue-600 hover:underline">Edit</button>
        </td>
      </tr>
    </tbody>
  </table>
</div> */}

<Demo></Demo>


    </div>
    </Layout>
  );
}

export default Users