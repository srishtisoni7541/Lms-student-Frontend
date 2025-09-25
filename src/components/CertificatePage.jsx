import { useState } from "react";
import { Download, Eye, Calendar, User, X } from "lucide-react";
import { useCertificate } from "../hooks/useCertificate";
import { useSelector } from "react-redux";

const CertificateCard = () => {
  const user = useSelector((state) => state.auth.user);
//   console.log(user)

  const { certificates, loading, error } = useCertificate(user?._id);
  //   console.log(certificates)

  // Ensure it's always an array
  const certs = Array.isArray(certificates) ? certificates : [];
  console.log(certs);
  const [viewCertificate, setViewCertificate] = useState(null);

  const handleDownload = (certificate) => {
    const element = document.createElement("a");
    const file = new Blob([certificate.certificateContent], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = `${certificate.course.title}-certificate.txt`;
    document.body.appendChild(element);
    element.click();
  };

  const handleView = (certificate) => setViewCertificate(certificate);
  const closeModal = () => setViewCertificate(null);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (loading)
    return (
      <p className="text-center py-20 text-lg text-gray-600">
        Loading certificates...
      </p>
    );
  if (error)
    return <p className="text-center py-20 text-red-500 text-lg">{error}</p>;
  //   if (!certificates.length) return <p className="text-center py-20 text-gray-600">No Certificates Yet</p>;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900">My Certificates</h1>
        <p className="text-gray-600 mt-2">
          View and download your earned certificates
        </p>
        <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200 mt-4">
          <span className="text-gray-600 mr-2">Total Certificates:</span>
          <span className="text-2xl font-bold text-indigo-600">
            {certificates.length}
          </span>
        </div>
      </div>

      {/* Certificate Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certs.map((certificate) => (
          <div
            key={certificate._id}
            className="bg-white rounded-3xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
          >
            <div className="relative overflow-hidden">
              <img
                src={certificate.course.thumbnail}
                alt={certificate.course.title}
                className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Overlay Buttons */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6 space-x-4">
                <button
                  onClick={() => handleView(certificate)}
                  className="bg-white/90 p-4 rounded-full hover:scale-110 shadow-lg"
                  title="View Certificate"
                >
                  <Eye className="h-5 w-5 text-gray-700" />
                </button>
                <button
                  onClick={() => handleDownload(certificate)}
                  className="bg-indigo-600/90 p-4 rounded-full hover:scale-110 shadow-lg"
                  title="Download Certificate"
                >
                  <Download className="h-5 w-5 text-white" />
                </button>
              </div>

              {/* Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {certificate.course.category}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {certificate.course.title}
              </h3>
              <div className="text-gray-600 text-sm space-y-1">
                <p>
                  <User className="inline h-4 w-4 mr-1 text-indigo-500" />{" "}
                  Instructor: {certificate.instructor.name}
                </p>
                <p>
                  <Calendar className="inline h-4 w-4 mr-1 text-indigo-500" />{" "}
                  Completed: {formatDate(certificate.issuedAt)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Certificate Content */}
      {viewCertificate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Certificate Header */}
            <h2 className="text-2xl font-bold mb-2">
              {viewCertificate.course.title}
            </h2>
            <p className="text-gray-700 mb-1">
              <strong>Student:</strong> {user.name || "You"}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Instructor:</strong> {viewCertificate.instructor.name}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Date of Issue:</strong>{" "}
              {formatDate(viewCertificate.issuedAt)}
            </p>

            {/* Certificate Content */}
            <div className="max-h-[60vh] overflow-y-auto border p-4 rounded-lg bg-gray-50 whitespace-pre-wrap text-gray-700">
              {viewCertificate.certificateContent}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateCard;
