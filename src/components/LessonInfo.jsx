import { Clock, Download, FileText, Video } from "lucide-react";

// Lesson Info Component
const LessonInfo = ({ lesson }) => {
  if (!lesson) return null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-3">{lesson.title}</h2>
      <p className="text-gray-600 mb-4">{lesson.description}</p>
      
      <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
        <span className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          {lesson.duration}
        </span>
        <span className="flex items-center">
          <Video className="h-4 w-4 mr-1" />
          {lesson.type}
        </span>
        {lesson.downloadable && (
          <span className="flex items-center">
            <Download className="h-4 w-4 mr-1" />
            Resources
          </span>
        )}
      </div>

      {lesson.resources && lesson.resources.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Lesson Resources</h3>
          <div className="space-y-2">
            {lesson.resources.map((resource, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  <span className="font-medium">{resource.name}</span>
                </div>
                <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default LessonInfo;