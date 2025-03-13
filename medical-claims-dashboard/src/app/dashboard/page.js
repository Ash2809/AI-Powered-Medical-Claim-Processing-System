"use client";
import { useState } from "react";
import axios from "axios";

export default function Dashboard() {
    const [file, setFile] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [preview, setPreview] = useState(null);
    const [invoiceDetails, setInvoiceDetails] = useState(null);
    const [loading, setLoading] = useState(false); 

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && isValidFileType(selectedFile)) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            alert("Invalid file type. Please upload a PNG, JPG, or JPEG file.");
        }
    };

    const isValidFileType = (file) => {
        return ["image/png", "image/jpeg", "image/jpg"].includes(file.type);
    };

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

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }
    
        setLoading(true); 
        const formData = new FormData();
        formData.append("file", file);
    
        try {
            const response = await axios.post("http://localhost:8000/upload-invoice/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setLoading(false); 
            alert("File uploaded successfully!");
            console.log("Response:", response.data);

            setInvoiceDetails(response.data);

            setFile(null);
            setPreview(null);
        } catch (error) {
            setLoading(false); 
            alert("Upload failed. Please try again.");
            console.error("Upload Error:", error);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <h2>Medical Claims Dashboard</h2>

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
                        style={{ display: "none" }}
                    />
                    <label htmlFor="fileUpload" className="upload-label">
                        Drag & Drop or <span className="underline">Click to Upload</span>
                    </label>

                    {preview && (
                        <div className="image-preview">
                            <img src={preview} alt="Preview" />
                        </div>
                    )}

                    <button className="upload-button" onClick={handleUpload} disabled={loading}>
                        {loading ? "Processing..." : "Upload"}
                    </button>

                    {loading && (
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                            <p>Please wait, processing your invoice...</p>
                        </div>
                    )}
                </div>

                {invoiceDetails && (
                    <div className="invoice-details">
                        <h3>Extracted Invoice Data</h3>
                        <table className="invoice-table">
                            <tbody>
                                <tr>
                                    <td><strong>Invoice ID</strong></td>
                                    <td>{invoiceDetails.invoice_id}</td>
                                </tr>
                                <tr>
                                    <td><strong>Patient Name</strong></td>
                                    <td>{invoiceDetails.invoice_data.patient_name || "N/A"}</td>
                                </tr>
                                <tr>
                                    <td><strong>Claim Amount</strong></td>
                                    <td>{invoiceDetails.invoice_data.claim_amount || "N/A"}</td>
                                </tr>
                                <tr>
                                    <td><strong>Diagnosis</strong></td>
                                    <td>{invoiceDetails.invoice_data.diagnosis || "N/A"}</td>
                                </tr>
                                <tr>
                                    <td><strong>Date of Service</strong></td>
                                    <td>{invoiceDetails.invoice_data.date_of_service || "N/A"}</td>
                                </tr>
                                <tr>
                                    <td><strong>Fraudulent</strong></td>
                                    <td>{invoiceDetails.fraudulent ? "Yes" : "No"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
