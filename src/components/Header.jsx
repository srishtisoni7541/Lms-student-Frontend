import  { useState } from 'react';
import { 
  Play, 
  ChevronDown, 
  ChevronRight, 
  Clock, 
  Users, 
  Star, 
  Download, 
  CheckCircle, 
  Lock,
  BookOpen,
  Video,
  FileText,
  Award,
  Globe
} from 'lucide-react';

// Course Header Component
const CourseHeader = ({ course }) => (
  <div className="bg-gradient-to-r mt-60 from-indigo-900 via-purple-900 to-indigo-800 text-white">
    <div className="w-full  mx-auto px-20 py-30">
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
          
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 fill-current mr-2" />
              <span className="font-semibold">{course.rating}</span>
              <span className="text-indigo-200 ml-2">({course.reviews} reviews)</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-indigo-300 mr-2" />
              <span>{course.students} students</span>
            </div>
            <div className="flex items-center">
              <Globe className="h-5 w-5 text-indigo-300 mr-2" />
              <span>{course.language}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div>
              <span className="text-3xl font-bold">{course.price}</span>
              <span className="text-xl text-indigo-200 line-through ml-2">{course.originalPrice}</span>
            </div>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              {course.discount}% OFF
            </span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-indigo-200">Duration:</span>
              <span className="font-semibold">{course.duration}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-indigo-200">Modules:</span>
              <span className="font-semibold">{course.modules} modules</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-indigo-200">Lessons:</span>
              <span className="font-semibold">{course.lessons} lessons</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-indigo-200">Level:</span>
              <span className="font-semibold">{course.level}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-indigo-200">Certificate:</span>
              <span className="font-semibold flex items-center">
                <Award className="h-4 w-4 mr-1" />
                Yes
              </span>
            </div>
          </div>
          
          <button className="w-full mt-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-4 rounded-lg hover:from-yellow-400 hover:to-orange-400 transition-all transform hover:scale-105">
            Enroll Now - {course.price}
          </button>
          
          <p className="text-center text-indigo-200 text-sm mt-3">
            30-day money-back guarantee
          </p>
        </div>
      </div>
    </div>
  </div>
);
export default CourseHeader;