
import { useSelector } from "react-redux";

const CourseHeader = ({ course, handleCancelEnrollment }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="bg-gradient-to-r mt-60 from-indigo-900 via-purple-900 to-indigo-800 text-white">
      <div className="w-full mx-auto px-20 py-30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                BESTSELLER
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                {course.category}
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {course.title}
            </h1>
            <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
              {course.description}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            {/* Cancel Enrollment Button */}
            <button
              className="w-full mt-6 bg-red-500 text-white font-bold py-4 rounded-lg hover:bg-red-600 transition-all transform hover:scale-105"
              onClick={() => handleCancelEnrollment(user)}
            >
              Cancel Enrollment
            </button>

            <p className="text-center text-indigo-200 text-sm mt-3">
              30-day money-back guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
