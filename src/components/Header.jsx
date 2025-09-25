

import { useSelector } from "react-redux";

const CourseHeader = ({ course, handleCancelEnrollment }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="bg-gradient-to-r mt-24 sm:mt-32 from-indigo-900 via-purple-900 to-indigo-800 text-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start lg:items-center">
          {/* Left Content */}
          <div className="lg:mt-6 mt-120">
            <div className="flex flex-wrap sm:flex-nowrap items-center space-x-2 mb-4 gap-2 ">
              <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                BESTSELLER
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs sm:text-sm">
                {course.category}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-snug sm:leading-tight">
              {course.title}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-indigo-100 mb-6 sm:mb-8 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Right Content */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 flex flex-col justify-center">
            {/* Cancel Enrollment Button */}
            <button
              className="w-full mt-4 sm:mt-6 bg-red-500 text-white font-bold py-3 sm:py-4 rounded-lg hover:bg-red-600 transition-all transform hover:scale-105"
              onClick={() => handleCancelEnrollment(user)}
            >
              Cancel Enrollment
            </button>

            <p className="text-center text-indigo-200 text-xs sm:text-sm mt-2 sm:mt-3">
              30-day money-back guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
