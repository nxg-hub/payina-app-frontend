import React, { useState } from 'react';

const DocumentUploader = () => {
  const [files, setFiles] = useState({
    file1: null,
    file2: null,
    file3: null,
  });
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e, fileKey) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [fileKey]: e.target.files[0], // Store the selected file
    }));
  };
  const userEmail = localStorage.getItem('userEmail');

  const handleUpload = async () => {
    if (!files.file1 || !files.file2 || !files.file3) {
      alert('Please select all three files before uploading.');
      return;
    }
    setLoading(true);

    try {
      setUploadStatus('');

      // Create an array of file uploads
      let uploadFiles = [files.file1, files.file2, files.file3].map(async (file) => {
        const formData = new FormData();
        formData.append('document', file);
        formData.append('email', userEmail);

        return fetch(import.meta.env.VITE_UPLOAD_DOCUMENT_ENDPOINT, {
          method: 'POST',
          body: formData,
        });
      });
      // Wait for all uploads to complete
      let responses = await Promise.all(uploadFiles);

      console.log(responses[0].ok && responses[1].ok && responses[2].ok);

      if (responses[0].ok && responses[1].ok && responses[2].ok) {
        setUploadStatus('Files uploaded successfully!');
        setSuccess(true);
      }
    } catch (err) {
      console.log(err);
      setUploadStatus(`Error:Something went wrong!!`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white border border-[#ddd] shadow-2xl rounded-lg">
      <h1 className="text-lg font-bold mb-4">Upload The Following Documents</h1>

      {/* File 1 Input */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2 font-semibold">CAC Certificate:</label>
        <input
          type="file"
          onChange={(e) => handleFileChange(e, 'file1')}
          className="block w-full"
        />
      </div>

      {/* File 2 Input */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2 font-semibold">Memart:</label>
        <input
          type="file"
          onChange={(e) => handleFileChange(e, 'file2')}
          className="block w-full"
        />
      </div>

      {/* File 3 Input */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2 font-semibold">Article of Association:</label>
        <input
          type="file"
          onChange={(e) => handleFileChange(e, 'file3')}
          className="block w-full"
        />
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className={`bg-secondary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Files'}
      </button>

      {/* Upload Status */}
      {uploadStatus && (
        <p className={`mt-4 ${success ? 'text-green-500' : 'text-red-500'}`}>{uploadStatus}</p>
      )}
    </div>
  );
};

export default DocumentUploader;
