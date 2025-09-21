import api from "../api/axios";


export const createPaymentOrderApi = async ({ courseId, amount,user }) => {
  console.log(user);
  return api.post(`/payments/create`, { course: courseId, amount, student: user });
};

export const verifyPaymentApi = async (paymentData) => {
  return api.put(`/payments/update/${paymentData.paymentId}`, paymentData);
};

export const getPaymentsApi = async () => {
  return api.get(`/payments/get-payments`);
};

export const refundPaymentApi = async (paymentId) => {
  return api.post(`/payments/refund/${paymentId}`);
};
