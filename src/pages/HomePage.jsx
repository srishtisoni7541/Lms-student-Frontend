import { Star, Clock, Users, BookOpen, Play, Award } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ProfileModal from "../components/ProfileModal";
import {
  deleteAccountApi,
  editProfileApi,
  getProfileApi,
  logoutApi,
} from "../services/authService";
import { toast } from "react-toastify";
import { setUser, clearCredentials } from "../reducers/authSlice";
import { useCourses } from "../hooks/useCourse";
import { usePayment } from "../hooks/usePayment";
import EnrollmentFormModal from "../components/EnrollementModalForm";
import { useEnrollments } from "../hooks/useEnrollement";

const Homepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);
  // console.log(user);
  // const payments = useSelector((state) => state.payment?.payments || []);

  const { courses, loadCourses, loading, error } = useCourses();
  // const { handlePayment, loading: paymentLoading } = usePayment();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { enrollments, loadUserEnrollments } = useEnrollments();
  // console.log(enrollments);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getProfileApi();
        // console.log(res);
        // assuming backend me enrolledCourses bhi aa raha hai
        dispatch(setUser(res.data));
      } catch (err) {
        console.log("Failed to fetch user:", err);
      }
    };

    fetchUser();
    loadCourses();
  }, []);

  useEffect(() => {
    loadCourses();
  }, []);

  const handleEdit = async (payload) => {
    try {
      const updated = await editProfileApi(payload);
      dispatch(setUser(updated.data));
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update profile!");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAccountApi();
      dispatch(clearCredentials());
      toast.success("Account deleted successfully!");
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete account!");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutApi();
      dispatch(clearCredentials());
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error("Logout failed!");
    }
  };

  const features = [
    { icon: Play, title: "Video Lectures", desc: "HD quality video content" },
    {
      icon: BookOpen,
      title: "Course Materials",
      desc: "Downloadable resources",
    },
    { icon: Award, title: "Certificates", desc: "Industry recognized" },
    { icon: Users, title: "Community", desc: "24/7 student support" },
  ];

  const isCourseBought = (courseId) => {
    console.log(courseId);
    if (!user?.enrolledCourses || user.enrolledCourses.length === 0)
      return false;

    // enrolledCourses me IDs hain, objects nahi
    // console.log(user.enrolledCourses.includes(courseId))
    return user.enrolledCourses.includes(courseId);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* ===== Header ===== */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                LearnHub
              </span>
            </div>

            <nav className="hidden md:flex space-x-8">
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
              >
                Courses
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
              >
                Contact
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <div
                  className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-indigo-300 transition"
                  onClick={() => setIsProfileOpen(true)}
                >
                  <Users className="h-5 w-5 text-white" />
                </div>
              ) : (
                <>
                  <button className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
                    Login
                  </button>
                  <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105">
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ===== Hero Section ===== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Master New Skills with
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent block">
            Expert-Led Courses
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 mx-auto">
          Join thousands of students learning from industry experts. Build real
          projects, earn certificates, and advance your career.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200"
            >
              <feature.icon className="h-5 w-5 text-indigo-600 mr-2" />
              <span className="text-gray-700 font-medium">{feature.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Courses Section ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full px-20 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our most popular courses designed by industry experts
            </p>
          </div>

          {loading ? (
            <div className="text-center text-gray-500">Loading courses...</div>
          ) : error ? (
            <div className="text-center text-red-500">
              Failed to load courses.
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center text-gray-500">
              No courses available.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div
                  key={course._id}
                   onClick={() => navigate(`/course/${course._id}`)}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {course.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-900">
                          ₹{course.price}
                        </span>
                      </div>
                    </div>

                    {isCourseBought(course._id) ? (
                      <button
                        onClick={() => navigate(`/course/${course._id}`)}
                        className="w-full mt-4 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-all transform hover:scale-105"
                      >
                        View
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (!user?.id) {
                            toast.error("Please login to buy the course");
                            return;
                          }
                          setSelectedCourse(course); // ✅ Set selected course
                          setIsEnrollModalOpen(true); // ✅ Open modal
                        }}
                        disabled={!user}
                        className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                      >
                        Buy Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">LearnHub</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering learners worldwide with quality education and
                practical skills.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Courses
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Instructors
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2024 LearnHub. All rights reserved.
          </div>
        </div>
      </footer>

      {/* ===== Profile Modal ===== */}
      {isProfileOpen && user && (
        <ProfileModal
          student={user}
          onClose={() => setIsProfileOpen(false)}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onLogout={handleLogout}
        />
      )}

      <EnrollmentFormModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        course={selectedCourse}
        studentId={user?.id}
      />
    </div>
  );
};

export default Homepage;
