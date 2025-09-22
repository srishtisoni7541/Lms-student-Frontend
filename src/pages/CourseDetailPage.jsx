import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux"; // Redux se user
import CourseHeader from "../components/Header";
import ModuleItem from "../components/ModuleItem";
import VideoPlayer from "../components/Video";
import LessonInfo from "../components/LessonInfo";
import { BookOpen } from "lucide-react";
import { getCourseByIdApi } from "../services/courseService";
import { toast } from "react-toastify";
import { requestCancelEnrollApi } from "../services/enrollService";

const CourseDetailPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loadingCourse, setLoadingCourse] = useState(true);
  const [errorCourse, setErrorCourse] = useState(null);
  const [openModules, setOpenModules] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);

  // Redux se sirf user fetch
  const user = useSelector((state) => state.auth.user);
//   console.log(user);

  // Fetch course details
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoadingCourse(true);
        const res = await getCourseByIdApi(id);
        setCourse(res.data?.message || null);
      } catch (err) {
        setErrorCourse(err.message || "Failed to load course.");
      } finally {
        setLoadingCourse(false);
      }
    };

    if (id) fetchCourse();
  }, [id]);

  const modules = course?.modules || [];
  const totalLessons = modules.reduce(
    (acc, m) => acc + (m.lessons?.length || 0),
    0
  );

  const toggleModule = (moduleId) => {
    setOpenModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

 const handleSendCancelEnroll = async (user) => {
 const enrollmentId= user.enrolledCourses[0].enrollmentId;
  const res = await requestCancelEnrollApi(enrollmentId);
  toast.success( res.data.message || "Request Sent Successfully!");
};

  const selectLesson = (lesson) => {
    if (!lesson.locked) setCurrentLesson(lesson);
  };
  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Course Header */}
      {loadingCourse ? (
        <p className="text-center py-6">Loading course...</p>
      ) : errorCourse ? (
        <p className="text-center text-red-500 py-6">{errorCourse}</p>
      ) : course ? (
        <CourseHeader
          course={{
            _id: course._id,
            title: course.title,
            description: course.description,
            category: course.category,
            price: course.price,
            thumbnail: course.thumbnail,
            instructor: course.instructor,
          }}
          handleCancelEnrollment={handleSendCancelEnroll}
        />
      ) : null}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden sticky top-4">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Course Content
                </h2>
                <p className="text-sm text-gray-600">
                  {modules.length} modules • {totalLessons} lessons
                </p>
              </div>

              <div className="max-h-96 overflow-y-auto">
                <div className="p-4 space-y-3">
                  {modules.map((module) => (
                    <ModuleItem
                      key={module._id}
                      module={module}
                      isOpen={openModules.includes(module._id)}
                      onToggle={() => toggleModule(module._id)}
                      onLessonSelect={selectLesson}
                      currentLesson={currentLesson}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-2 space-y-6">
            <VideoPlayer lesson={currentLesson} />

            {currentLesson ? (
              <LessonInfo lesson={currentLesson} />
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ready to Start Learning?
                </h3>
                <p className="text-gray-600 mb-6">
                  Select any lesson from the course curriculum to begin your
                  learning journey.
                </p>
                <button
                  onClick={() => {
                    if (modules.length && modules[0].lessons?.length) {
                      const firstLesson = modules[0].lessons[0];
                      selectLesson(firstLesson);
                      if (!openModules.includes(modules[0]._id)) {
                        toggleModule(modules[0]._id);
                      }
                    }
                  }}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Start with First Lesson
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
