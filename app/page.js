// "use client";
// import React, { useRef, useState } from "react";

// import SubmittedDataList from "./components/SubmittedDataList";
// import { useReactToPrint } from "react-to-print";

// const order = {
//   date: "Jan 9, 2023",
//   dueDate: "Feb 9, 2023",
//   customer: {
//     zip: "20002",
//     city: "Anytown",
//     name: "Ron John Surfer",
//     state: "KS",
//     address: "123 Any Street",
//     country: "United States",
//   },
//   lineItems: [
//     {
//       tax: "6%",
//       item: "Surf Board",
//       price: "$1,000",
//       total: "$1,060.00",
//       quantity: "1",
//       description: "Rides big waves",
//     },
//     {
//       tax: "6%",
//       item: "Board Wax",
//       price: "$75",
//       total: "$159.00",
//       quantity: "2",
//       description: "Best wax in town",
//     },
//   ],
//   invoiceTotal: "$1,219.00",
//   invoiceNumber: "0003578",
// };

// export default function Home() {
//   const componentRef = useRef();

//   // State to store form data
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   // State to mock a database using an object structure
//   // const [mockDatabase, setMockDatabase] = useState([]);

//   // Handle input change but do not update the mock database here
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   // Handle form submission, update the mock database here
//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   // Generate a unique ID for each form submission (simple ID generation)
//   //   const id = Object.keys(mockDatabase).length + 1;

//   //   // Update the mock database with the new entry
//   //   setMockDatabase((prevData) => ({
//   //     ...prevData,
//   //     [id]: formData,
//   //   }));

//   //   console.log("Data captured and stored:", {
//   //     ...mockDatabase,
//   //     [id]: formData,
//   //   });
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('/api/submit-form', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         console.log("Data submitted successfully:", result);
//         // Optionally, redirect or show a success message
//         setFormData({ name: "", email: "", message: "" });
//         // For example, redirect to a thank you page
//         // router.push('/thank-you');
//       } else {
//         console.error("Submission error:", result.error);
//         // Optionally, display an error message to the user
//       }
//     } catch (error) {
//       console.error("Network error:", error);
//       // Optionally, display a network error message to the user
//     }
//   };

//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//     pageStyle: `
//       @page {
//         size: A4 portrait;
//         margin: 20mm;
//       }
//       body {
//         font-family: Arial, sans-serif;
//       }
//     `,
//   });
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <div>
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto"
//         >
//           <h2 className="text-2xl font-bold mb-6 text-gray-800">
//             Submit Your Information
//           </h2>

//           <div className="mb-4 flex items-center">
//             <label
//               htmlFor="name"
//               className="block text-sm font-medium text-gray-700 pr-1"
//             >
//               Name:
//             </label>
//             <input
//               type="text"
//               name="name"
//               id="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="mt-1 pl-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//               required
//             />
//           </div>
//           <div className="mb-4 flex items-center">
//             <label
//               htmlFor="email"
//               className="mt-1 text-sm font-medium text-gray-700 pr-1"
//             >
//               Email:
//             </label>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="mt-1 pl-1 w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="message"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Message:
//             </label>
//             <textarea
//               name="message"
//               id="message"
//               value={formData.message}
//               onChange={handleChange}
//               className="mt-1 pl-1 pt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//               required
//             ></textarea>
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Submit
//           </button>
//         </form>
//         {/* Data View Component */}
//         <div
//           ref={componentRef}
//           className="mt-10 p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto"
//         >
//           <h2 className="text-xl font-bold mb-4 text-gray-800">Form Data</h2>
//           <p className="text-gray-700">
//             <strong>Name:</strong> {formData.name}
//           </p>
//           <p className="text-red-700">
//             <strong>Email:</strong> {formData.email}
//           </p>
//           <p className="text-gray-700">
//             <strong>Message:</strong> {formData.message}
//           </p>
//         </div>
//         {/* Submitted Data List from db */}
//         <SubmittedDataList data={mockDatabase} />
//         {/* Button to create, print, save and preview PDF */}
//         <button
//           onClick={handlePrint}
//           className="mt-6 py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mx-auto block"
//         >
//           Print to PDF
//         </button>
//       </div>
//     </main>
//   );
// }

"use client"
import React, { useRef, useState, useEffect } from "react";
import SubmittedDataList from "./components/SubmittedDataList";
import { useReactToPrint } from "react-to-print";
// import { v4 as uuidv4 } from 'uuid'; // If using UUIDs
// import { useRouter } from 'next/navigation'; // If using for navigation

export default function Home() {
  const componentRef = useRef();
  
  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State to store submissions fetched from the server
  const [submissions, setSubmissions] = useState([]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Data submitted successfully:", result);
        setFormData({ name: "", email: "", message: "" });
        fetchSubmissions(); // Refresh the submissions list
      } else {
        console.error("Submission error:", result.error);
        // Optionally, display an error message to the user
      }
    } catch (error) {
      console.error("Network error:", error);
      // Optionally, display a network error message to the user
    }
  };

  // Function to fetch submissions from the server
  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/get-submissions');
      const result = await response.json();

      if (response.ok) {
        setSubmissions(result.submissions);
      } else {
        console.error("Fetch error:", result.error);
        // Optionally, handle fetch errors
      }
    } catch (error) {
      console.error("Network error:", error);
      // Optionally, handle network errors
    }
  };

  // Fetch submissions when the component mounts
  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
      @page {
        size: A4 portrait;
        margin: 20mm;
      }
      body {
        font-family: Arial, sans-serif;
      }
    `,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Submit Your Information
          </h2>

          <div className="mb-4 flex items-center">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 pr-1"
            >
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 pl-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <label
              htmlFor="email"
              className="mt-1 text-sm font-medium text-gray-700 pr-1"
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 pl-1 w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message:
            </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 pl-1 pt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
        
        {/* Data View Component */}
        <div
          ref={componentRef}
          className="mt-10 p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto"
        >
          <h2 className="text-xl font-bold mb-4 text-gray-800">Form Data</h2>
          <p className="text-gray-700">
            <strong>Name:</strong> {formData.name}
          </p>
          <p className="text-red-700">
            <strong>Email:</strong> {formData.email}
          </p>
          <p className="text-gray-700">
            <strong>Message:</strong> {formData.message}
          </p>
        </div>
        
        {/* Submitted Data List from Database */}
        <SubmittedDataList data={submissions} />
        
        {/* Button to create, print, save, and preview PDF */}
        <button
          onClick={handlePrint}
          className="mt-6 py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mx-auto block"
        >
          Print to PDF
        </button>
      </div>
    </main>
  );
}
