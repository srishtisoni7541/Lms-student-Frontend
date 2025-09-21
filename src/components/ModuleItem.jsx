


import { BookOpen, CheckCircle, ChevronDown, ChevronRight, Clock, Download, FileText, Lock, Video } from "lucide-react";

// Module Component
const ModuleItem = ({ module, isOpen, onToggle, onLessonSelect, currentLesson }) => {
  const isDeleted = module.deleted;

  return (
    <div className={`border border-gray-200 rounded-lg overflow-hidden ${isDeleted ? 'opacity-50' : ''}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors relative"
        disabled={isDeleted} // optional: prevent toggle if deleted
      >
        <div className="flex items-center space-x-3">
          {isOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          <BookOpen className="h-5 w-5 text-indigo-600" />
          <div className="text-left">
            <h3 className="font-semibold text-gray-900">{module.title}</h3>
            <p className="text-sm text-gray-600">{module.lessons.length} lessons • {module.duration || 'N/A'}</p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {module.completed}/{module.lessons.length} completed
        </div>

        {isDeleted && (
          <span className="absolute top-2 right-2 bg-red-100 text-red-600 text-xs font-semibold px-2 py-0.5 rounded">
            Deleted
          </span>
        )}
      </button>
      
      {isOpen && !isDeleted && (
        <div className="divide-y divide-gray-100">
          {module.lessons.map((lesson) => (
            <div
              key={lesson.id}
              onClick={() => onLessonSelect(lesson)}
              className={`flex items-center justify-between p-4 hover:bg-indigo-50 cursor-pointer transition-colors ${
                currentLesson?.id === lesson.id ? 'bg-indigo-50 border-r-4 border-indigo-600' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                {lesson.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : lesson.locked ? (
                  <Lock className="h-5 w-5 text-gray-400" />
                ) : lesson.type === 'video' ? (
                  <Video className="h-5 w-5 text-indigo-600" />
                ) : (
                  <FileText className="h-5 w-5 text-indigo-600" />
                )}
                <div>
                  <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {lesson.duration}
                    </span>
                    <span className="capitalize">{lesson.type}</span>
                  </div>
                </div>
              </div>
              {lesson.downloadable && (
                <Download className="h-4 w-4 text-gray-400" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModuleItem;
