import commonAPI from "./commonAPI";

const BASE_URL = "https://student-backend-snbo.onrender.com";

// add
export const addStudentAPI = async (data) => {
  return await commonAPI("POST", `${BASE_URL}/students`, data);
};

// get
export const getStudentsAPI = async () => {
  return await commonAPI("GET", `${BASE_URL}/students`, "");
};

// update
export const updateStudentAPI = async (id, data) => {
  return await commonAPI("PUT", `${BASE_URL}/students/${id}`, data);
};

// delete
export const deleteStudentAPI = async (id) => {
  return await commonAPI("DELETE", `${BASE_URL}/students/${id}`, {});
};