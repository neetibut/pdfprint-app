import React from "react";

const SubmittedDataList = ({ data }) => {
  return (
    <div className="mt-10 p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Submitted Data</h2>
      {Object.keys(data).length === 0 ? (
        <p className="text-gray-700">No submissions yet.</p>
      ) : (
        Object.entries(data).map(([id, entry]) => (
          <div key={id} className="mb-4 p-4 bg-gray-50 rounded-md shadow">
            <p className="text-gray-700">
              <strong>ID:</strong> {id}
            </p>
            <p className="text-gray-700">
              <strong>Name:</strong> {entry.name}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {entry.email}
            </p>
            <p className="text-gray-700">
              <strong>Message:</strong> {entry.message}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default SubmittedDataList;
