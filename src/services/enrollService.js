import api from "../api/axios";

//  Create a new enrollment (student only)
export const createEnrollApi = (payload) => {
  console.log(payload);
  return api.post("/enrollment/enroll", payload);
};

//  Get all enrollments (admin/instructor)
export const getEnrollApi = () => {
  return api.get("/enrollment/allenrollments");
};


//  Get enrollment by ID (admin/instructor/student)
export const getEnrollByIdApi = (id) => {
  return api.get(`/enrollment/enrollment/${id}`);
};

//  Admin cancel enrollment
export const adminCancelEnrollApi = (id) => {
  return api.put(`/enrollment/cancel/${id}`);
};

//  Student request cancellation
export const requestCancelEnrollApi = (id) => {
  return api.put(`/enrollment/request-cancel/${id}`);
};

//  Admin handle refund/cancel request
export const adminHandleCancelApi = (id) => {
  return api.post(`/enrollment/refund/${id}`);
};
