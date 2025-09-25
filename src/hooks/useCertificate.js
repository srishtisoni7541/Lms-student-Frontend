import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCertificates,
  setLoading,
  setError,
  clearCertificates,
} from "../reducers/certificateSlice";
import { getCertificatesByStudentApi } from "../services/certificateService";

export const useCertificate = (studentId) => {
  const dispatch = useDispatch();
  const { certificates, loading, error } = useSelector(
    (state) => state.certificates
  );

  useEffect(() => {
    const fetchCertificates = async () => {
      dispatch(setLoading(true));
      try {
        const data = await getCertificatesByStudentApi(studentId);
        // console.log(data.data.data);
        dispatch(setCertificates(data.data.data || []));
      } catch (err) {
        dispatch(setError(err.message || "Failed to fetch certificates"));
      }
    };

    if (studentId) fetchCertificates();

    return () => {
      dispatch(clearCertificates());
    };
  }, [dispatch, studentId]);

  return { certificates, loading, error };
};
