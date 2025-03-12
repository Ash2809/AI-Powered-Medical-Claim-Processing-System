// "use client";
// import { useState } from "react";

// export default function Dashboard() {
//     const [file, setFile] = useState(null);
//     const [dragActive, setDragActive] = useState(false);
//     const [claims, setClaims] = useState([
//         { id: 1, patient: "John Doe", amount: "$500", status: "Approved" },
//         { id: 2, patient: "Jane Smith", amount: "$750", status: "Pending" }
//     ]);

//     // Handles file selection from input
//     const handleFileChange = (event) => {
//         const uploadedFile = event.target.files[0];
//         if (uploadedFile) {
//             setFile(uploadedFile);
//         }
//     };

//     // Handles file drop
//     const handleDrop = (event) => {
//         event.preventDefault();
//         setDragActive(false);
//         if (event.dataTransfer.files.length > 0) {
//             setFile(event.dataTransfer.files[0]);
//         }
//     };

//     // Prevents default browser behavior for drag events
//     const handleDragOver = (event) => {
//         event.preventDefault();
//         setDragActive(true);
//     };

//     const handleDragLeave = () => setDragActive(false);

//     // Handles file upload logic
//     const handleUpload = () => {
//         if (!file) {
//             alert("Please select a file first.");
//             return;
//         }

//         // Simulating upload process
//         alert(`File uploaded successfully: ${file.name}`);

//         // Clear file input field & reset state
//         setFile(null);
//         document.getElementById("fileUpload").value = ""; // Clears UI input
//     };

//     return (
//         <div className="dashboard-container">
//             <div className="dashboard-card">
//                 <h2>Medical Claims Dashboard</h2>

//                 {/* File Upload Section */}
//                 <div 
//                     className={`upload-section ${dragActive ? "drag-active" : ""}`} 
//                     onDragOver={handleDragOver} 
//                     onDragLeave={handleDragLeave} 
//                     onDrop={handleDrop}
//                 >
//                     <input
//                         type="file"
//                         id="fileUpload"
//                         onChange={handleFileChange}
//                         accept=".pdf,.jpg,.png,.jpeg"
//                         hidden
//                     />
//                     <label htmlFor="fileUpload" className="upload-label">
//                         <p>{file ? `Selected File: ${file.name}` : "Drag & Drop or Click to Upload"}</p>
//                     </label>
//                     <button className="upload-button" onClick={handleUpload}>Upload</button>
//                 </div>

//                 {/* Table Displaying Processed Claims */}
//                 <h3>Processed Claims</h3>
//                 <table className="claims-table">
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Patient</th>
//                             <th>Amount</th>
//                             <th>Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {claims.map((claim) => (
//                             <tr key={claim.id}>
//                                 <td>{claim.id}</td>
//                                 <td>{claim.patient}</td>
//                                 <td>{claim.amount}</td>
//                                 <td>{claim.status}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

"use client";
import { useState } from "react";

export default function Dashboard() {
    const [file, setFile] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [preview, setPreview] = useState(null);

    // Handle file selection
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && isValidFileType(selectedFile)) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            alert("Invalid file type. Please upload a PNG, JPG, or JPEG file.");
        }
    };

    // Validate file type
    const isValidFileType = (file) => {
        return ["image/png", "image/jpeg", "image/jpg"].includes(file.type);
    };

    // Handle drag & drop
    const handleDragOver = (event) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        const droppedFile = event.dataTransfer.files[0];

        if (droppedFile && isValidFileType(droppedFile)) {
            setFile(droppedFile);
            setPreview(URL.createObjectURL(droppedFile));
        } else {
            alert("Invalid file type. Please upload a PNG, JPG, or JPEG file.");
        }
    };

    // Simulate file upload
    const handleUpload = () => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }
        alert(`File uploaded: ${file.name}`);
        setFile(null);
        setPreview(null); // Clear preview after upload
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <h2>Medical Claims Dashboard</h2>

                {/* File Upload Section */}
                <div
                    className={`upload-section ${dragging ? "dragging" : ""}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        id="fileUpload"
                        onChange={handleFileChange}
                        accept="image/png, image/jpeg, image/jpg"
                        style={{ display: "none" }} // Hide input
                    />
                    <label htmlFor="fileUpload" className="upload-label">
                        Drag & Drop or <span className="underline">Click to Upload</span>
                    </label>

                    {/* Show preview if an image is selected */}
                    {preview && (
                        <div className="image-preview">
                            <img src={preview} alt="Preview" />
                        </div>
                    )}

                    {/* Upload button below preview */}
                    <button className="upload-button" onClick={handleUpload}>
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
}
