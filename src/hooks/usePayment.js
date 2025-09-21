

// import { useState } from "react";
// import { toast } from "react-toastify";
// import api from "../api/axios";

// export const usePayment = () => {
//   const [loading, setLoading] = useState(false);

//   const handlePayment = async (course, studentId) => {
//     if (!studentId) throw new Error("User not logged in");

//     setLoading(true);
//     try {
//       // 1️⃣ Create order
//       const res = await api.post("/payments/create", {
//         course: course._id,
//         amount: course.price,
//         student: studentId,
//       });

//       const order = res.data.message.order; // yahan se paymentId milega

//       // 2️⃣ Razorpay options
//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY,
//         amount: order.amount,
//         currency: order.currency,
//         name: "LearnHub",
//         description: course.title,
//         order_id: order.id,
//         handler: async function (response) {
//           try {
//             // 3️⃣ Verify payment on backend with paymentId from order
//             await api.put(`/payments/verify/${order.id}`, {
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_signature: response.razorpay_signature,
//             });
//             toast.success("Payment successful!");
//           } catch (err) {
//             console.log(err);
//             toast.error("Payment verification failed!");
//           } finally {
//             setLoading(false);
//           }
//         },
//         prefill: {
//           name: "", // optional, user name
//           email: "", // optional, user email
//         },
//         theme: { color: "#5B21B6" },
//       };

//       // 4️⃣ Open Razorpay popup
//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
//     } catch (err) {
//       console.log(err);
//       toast.error("Payment failed!");
//       setLoading(false);
//       throw err;
//     }
//   };

//   return { handlePayment, loading };
// };




import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";

export const usePayment = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async (course, studentId) => {
    if (!studentId) throw new Error("User not logged in");

    setLoading(true);
    return new Promise(async (resolve, reject) => {
      try {
        // 1️⃣ Create order
        const res = await api.post("/payments/create", {
          course: course._id,
          amount: course.price,
          student: studentId,
        });

        const order = res.data.message.order;

        // 2️⃣ Razorpay options
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY,
          amount: order.amount,
          currency: order.currency,
          name: "LearnHub",
          description: course.title,
          order_id: order.id,
          handler: async function (response) {
            try {
              // 3️⃣ Verify payment on backend
              const verifyRes = await api.put(`/payments/verify/${response.razorpay_payment_id}`, response);
              toast.success("Payment successful!");
              setLoading(false);
              resolve(verifyRes.data.message); // return verified payment
            } catch (err) {
              console.log(err);
              toast.error("Payment verification failed!");
              setLoading(false);
              reject(new Error("Payment verification failed")); // reject promise
            }
          },
          modal: {
            ondismiss: () => {
              setLoading(false);
              reject(new Error("Payment popup closed")); // if user closes Razorpay
            }
          },
          prefill: { name: "", email: "" },
          theme: { color: "#5B21B6" },
        };

        // 4️⃣ Open Razorpay popup
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (err) {
        console.log(err);
        toast.error("Payment failed!");
        setLoading(false);
        reject(err);
      }
    });
  };

  return { handlePayment, loading };
};
