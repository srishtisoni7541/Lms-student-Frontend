import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";
import { usePayment } from "../hooks/usePayment";
import { useEnrollments } from "../hooks/useEnrollement";

const EnrollmentFormModal = ({ isOpen, onClose, course, studentId }) => {
  console.log(studentId);
  const { handlePayment, loading: paymentLoading } = usePayment();
  const { createEnrollment, loading: enrollLoading } = useEnrollments();

  if (!isOpen || !course) return null;

  const handleProceedPayment = async () => {
    if (!studentId) {
      toast.error("User not logged in!");
      return;
    }

    try {
      // 1️ Trigger payment & wait for verification
      const verifiedPayment = await handlePayment(course, studentId);

      // 2️ Only create enrollment if payment verified
      if (verifiedPayment && verifiedPayment.paymentStatus === "success") {
        const res= await createEnrollment({ course: course._id, student: studentId });
        console.log(res);
        toast.success("Enrollment completed successfully!");
        onClose();
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Payment failed. Enrollment not created.");
    }
  };

  const isProcessing = paymentLoading || enrollLoading;

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Panel className="bg-white rounded-xl shadow-lg p-6 w-[400px]">
          <Dialog.Title className="text-xl font-bold mb-4">
            Enroll in {course.title}
          </Dialog.Title>
          <p className="mb-4 text-gray-600">
            You are enrolling in this course. Please proceed to payment to
            confirm.
          </p>
          <div className="flex justify-end gap-4">
            <button
              className="px-4 py-2 rounded-md bg-gray-200"
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-md bg-indigo-600 text-white"
              onClick={handleProceedPayment}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Proceed to Payment"}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EnrollmentFormModal;
