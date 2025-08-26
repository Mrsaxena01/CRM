import React, { useState } from "react";
import Layout from "./Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEye,
  faEdit,
  faTrash,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

function Project() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "CRM System",
      clientName: "Bireena InfoTech",
      department: "Development",
      employee: "John Doe",
      status: "In Progress",
      budget: "5000.00",
      tasksPending: 3,
    },
    {
      id: 2,
      name: "HR Portal",
      clientName: "Tech Solutions",
      department: "HR",
      employee: "Jane Smith",
      status: "Completed",
      budget: "3000.00",
      tasksPending: 0,
    },
    {
      id: 3,
      name: "E-Commerce Platform",
      clientName: "ShopEase",
      department: "Development",
      employee: "Michael Brown",
      status: "Pending",
      budget: "8000.00",
      tasksPending: 5,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Filter projects according to search
  const filteredProjects = projects.filter((project) =>
    Object.values(project)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6 bg-[#081b29] p-6 rounded-xl backdrop-blur-sm border border-[#0ef]/10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 bg-[#081b29]/80 border border-[#0ef]/20 
              rounded-lg text-white placeholder-gray-400 focus:outline-none 
              focus:border-[#0ef] transition-all duration-300"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0ef]/50"
            />
          </div>
          <button
            className="bg-[#0ef] hover:bg-[#0ef]/80 text-[#081b29] px-6 py-2 rounded-lg 
            flex items-center gap-2 transition-all duration-300 font-semibold hover:shadow-[0_0_20px_rgba(0,238,255,0.5)]"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Project
          </button>
        </div>

        {/* Projects Table */}
        <div className="overflow-x-auto rounded-lg border border-[#0ef]/20 shadow-md">
          <table className="w-full text-sm text-white">
            <thead className="bg-[#081b29] border-b-2 border-[#0ef]-500 text-[#0ef]">
              <tr>
                <th className="px-4 py-4 text-left font-semibold">Name</th>
                <th className="px-4 py-4 text-left font-semibold">Client Name</th>
                <th className="px-4 py-4 text-left font-semibold">Department</th>
                <th className="px-4 py-4 text-left font-semibold">Employee</th>
                <th className="px-4 py-4 text-left font-semibold">Status</th>
                <th className="px-4 py-4 text-right font-semibold">Budget</th>
                <th className="px-4 py-4 text-center font-semibold">Tasks Pending</th>
                <th className="px-4 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0ef]/10">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-[#0ef]/5 transition-all duration-300"
                  >
                    <td className="px-4 py-4">{project.name}</td>
                    <td className="px-4 py-4">{project.clientName}</td>
                    <td className="px-4 py-4">{project.department}</td>
                    <td className="px-4 py-4">{project.employee}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          project.status === "In Progress"
                            ? "bg-[#0ef]/10 text-[#0ef]"
                            : project.status === "Completed"
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">${project.budget}</td>
                    <td className="px-4 py-4 text-center">{project.tasksPending}</td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center gap-3">
                        <button
                          className="p-1.5 hover:text-[#0ef] transition-all duration-300 
                          hover:shadow-[0_0_10px_rgba(0,238,255,0.5)] rounded-md"
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button
                          className="p-1.5 hover:text-[#0ef] transition-all duration-300
                          hover:shadow-[0_0_10px_rgba(0,238,255,0.5)] rounded-md"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          className="p-1.5 hover:text-red-400 transition-all duration-300
                          hover:shadow-[0_0_10px_rgba(255,0,0,0.4)] rounded-md"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-6 text-[#0ef]/70 italic"
                  >
                    No projects found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default Project;
