import api from "../api/axios";

export const getCertificatesByStudentApi = async (studentId) => {
  try {
    const res = await api.get(`/certificate/student/${studentId}`);
    return res;
  } catch (err) {
    throw err.response?.data || { message: err.message };
  }
};