import React, { useEffect, useState } from "react";
import {
  addStudentAPI,
  getStudentsAPI,
  updateStudentAPI,
  deleteStudentAPI
} from "../src/services/allAPI";

function Home() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "",
    phone: ""
  });
  const [editId, setEditId] = useState(null);
  const fetchStudents = async () => {
    const result = await getStudentsAPI();
    if (result.status === 200) {
      setStudents(result.data);
    }
  };
  useEffect(() => {
    fetchStudents();
  }, []);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateStudentAPI(editId, form);
      setEditId(null);
    } else {
      await addStudentAPI(form);
    }
    setForm({
      name: "",
      email: "",
      course: "",
      phone: ""
    });

    fetchStudents();
  };


  const handleEdit = (student) => {
    setForm(student);
    setEditId(student._id);
  };


  const handleDelete = async (id) => {
    await deleteStudentAPI(id);
    fetchStudents();
  };


  return (

    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Student Management System</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl grid grid-cols-2 gap-4">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-900"/>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-900"/>
        <input
          name="course"
          placeholder="Course"
          value={form.course}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-900"/>
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-900"/>
        <div className="col-span-2 flex justify-center mt-2">
          <button
            type="submit"
            className="bg-gray-800 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
          >
            {editId ? "Update Student" : "Add Student"}
          </button>
        </div>
      </form>

      <div className="mt-10 w-full max-w-4xl">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Course</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students?.map((item) => (
              <tr key={item._id} className="border-b hover:bg-gray-100">
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.email}</td>
                <td className="p-3">{item.course}</td>
                <td className="p-3">{item.phone}</td>
                <td className="p-3 flex justify-center gap-3">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-800 hover:bg-yellow-700 text-white px-3 py-1 rounded">Edit</button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-800 hover:bg-red-700 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Home;