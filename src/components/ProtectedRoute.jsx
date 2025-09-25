import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux"; 

const ProtectedRoute = ({ children }) => {
  const { courseId } = useParams();
  const user = useSelector((state) => state.auth.user);

  // check if user is enrolled
  const isEnrolled = user?.enrolledCourses?.includes(courseId);

  if (!isEnrolled) {
    // redirect to courses page ya show message
    return <Navigate to="/courses" replace />;
  }

  return children;
};

export default ProtectedRoute;
