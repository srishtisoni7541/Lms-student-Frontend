import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  setEnrollments,
  addEnrollment,
  updateEnrollmentInList,
  setCurrentEnrollment,
  removeEnrollment,
  setLoading,
  setError,
  clearEnrollments,
} from "../reducers/enrollSlice";

import {
  createEnrollApi,
  getEnrollApi,
  getEnrollByIdApi,
  adminCancelEnrollApi,
  requestCancelEnrollApi,
  adminHandleCancelApi,
} from "../services/enrollService";

export function useEnrollments() {
  const dispatch = useDispatch();
  const { list, currentEnrollment, loading, error, cancelledEnrollments } =
    useSelector((s) => s.enrolles);
  console.log(list);

  // Load all enrollments
  const loadEnrollments = async () => {
    try {
      dispatch(setLoading(true));
      const res = await getEnrollApi();
      console.log(res);
      dispatch(setEnrollments(res.data?.message || []));
    } catch (err) {
      dispatch(setError(err.message));
      toast.error("Failed to fetch enrollments!");
    }
  };

  // Create enrollment
  const createEnrollment = async (payload) => {
    try {
      dispatch(setLoading(true));
      const res = await createEnrollApi(payload);
      dispatch(addEnrollment(res.data?.data));
      toast.success("Enrollment created successfully!");
    } catch (err) {
      dispatch(setError(err.message));
      toast.error("Failed to create enrollment!");
    }
  };

  // Get enrollment by ID
  const fetchEnrollmentById = async (id) => {
    try {
      dispatch(setLoading(true));
      const res = await getEnrollByIdApi(id);
      dispatch(setCurrentEnrollment(res.data?.data));
    } catch (err) {
      dispatch(setError(err.message));
      toast.error("Failed to fetch enrollment details!");
    }
  };

  // Admin cancel enrollment
  const adminCancelEnrollment = async (id) => {
    try {
      await adminCancelEnrollApi(id);
      dispatch(removeEnrollment(id));
      toast.success("Enrollment cancelled successfully!");
    } catch (err) {
      dispatch(setError(err.message));
      toast.error("Failed to cancel enrollment!");
    }
  };

  // Student request cancellation
  const requestCancelEnrollment = async (id) => {
    try {
      const res = await requestCancelEnrollApi(id);
      dispatch(updateEnrollmentInList(res.data?.data));
      toast.success("Cancellation request sent!");
    } catch (err) {
      dispatch(setError(err.message));
      toast.error("Failed to request cancellation!");
    }
  };

  // Admin handle refund/cancel request
  const adminHandleCancel = async (id) => {
    try {
      const res = await adminHandleCancelApi(id);
      dispatch(updateEnrollmentInList(res.data?.data));
      toast.success("Refund/Cancel handled successfully!");
    } catch (err) {
      dispatch(setError(err.message));
      toast.error("Failed to handle refund/cancel request!");
    }
  };
  // Load enrollments for specific student
  const loadUserEnrollments = async (studentId) => {
    try {
      dispatch(setLoading(true));
      const res = await getEnrollApi(); // currently fetch all
      // filter only current user's enrollments
      const userEnrollments = res.data?.message.filter(
        (enroll) => enroll.student._id === studentId
      );
      dispatch(setEnrollments(userEnrollments));
    } catch (err) {
      dispatch(setError(err.message));
      toast.error("Failed to fetch your enrollments!");
    }
  };

  // Reset enrollments
  const resetEnrollments = () => dispatch(clearEnrollments());

  return {
    enrollments: list,
    currentEnrollment,
    cancelledEnrollments,
    loading,
    error,
    loadEnrollments,
    loadUserEnrollments,
    createEnrollment,
    fetchEnrollmentById,
    adminCancelEnrollment,
    requestCancelEnrollment,
    adminHandleCancel,
    resetEnrollments,
  };
}
