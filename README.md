## **Project Overview: AI-Powered Medical Claim Processing System**  

The **AI-Powered Medical Claim Processing System** is a **full-stack web application** that streamlines medical invoice processing using **OCR, AI-based fraud detection, and automation**. It allows users to **upload invoices, extract information, and verify claim authenticity** while providing a **secure and responsive dashboard**.

---

## Website Link : https://medical-claim-dashboard-8x61611c3.vercel.app/

## **🛠 Project Directory Breakdown **  

### **1️⃣ Frontend (Next.js & React) – `/medical-claims-dashboard/src/`**  

#### 📂 `app/` (Next.js App Router Structure)  
- **`dashboard/`** – Contains the main dashboard page where users see processed claims.  
  - `page.js` → Displays claims & analytics  
- **`api/`** – API handlers for interacting with the backend.  
  - `proxy.js` → Acts as a bridge between the frontend & backend to handle cross-origin requests.  
- **`login/`** – Authentication page where users log in.  
  - `page.js` → Handles login functionality.  
- **`signup/`** – Registration page for new users.  
  - `page.js` → Handles signup functionality.  
- **`layout.js`** – Defines the page layout (e.g., navigation, footer).  
- **`styles.css`** – Styling for the frontend using Tailwind CSS.  

#### 📂 `components/`  
- **Reusable UI components** such as buttons, modals, or form inputs.  

#### 📂 `firebase.js`  
- Handles Firebase authentication (sign-up, login, logout).  

#### 📂 `public/`  
- Stores static assets like images, icons, etc.  

---

### **2️⃣ Backend (FastAPI) – `/src/`**  

#### 📂 `database.py`  
- Defines the **MongoDB** connection and schema for storing invoice data.  

#### 📂 `fraud.py`  
- Contains **fraud detection logic** using AI models.  

#### 📂 `ocr.py`  
- Handles **OCR processing** of invoices using **Tesseract OCR**.  

#### 📂 `uploads/`  
- Stores temporarily uploaded invoices before processing.  

#### 📄 `app.py`  
- The **FastAPI application** that serves endpoints for **OCR, fraud detection, and claim verification**.  

#### 📄 `main.py`  
- The **entry point** for running the backend.  

#### 📄 `.env`  
- Stores **environment variables** (e.g., database credentials, API keys).  

#### 📄 `requirements.txt`  
- Lists all dependencies required for the **FastAPI backend**.  

---

### **3️⃣ Configuration & Deployment**  
#### 📄 `.gitignore`  
- Ensures sensitive files (like `.env`) are **not tracked** in Git.  

#### 📄 `postcss.config.mjs` & `tailwind.config.mjs`  
- Tailwind CSS configuration files for styling.  

#### 📄 `vercel.json`  
- Configuration for **Vercel deployment**.  

#### 📄 `README.md`  
- Documentation for **setup, usage, and deployment**.  

---

## **🚀 Why We Used Each Component?**  

| **Technology** | **Purpose** |
|---------------|------------|
| **Next.js (React)** | Frontend framework for building a dynamic dashboard with API routes. |
| **Firebase Auth** | Provides **secure authentication** without backend implementation. |
| **Tailwind CSS** | Simplifies styling for a clean and responsive UI. |
| **Axios** | Handles **frontend API requests** to the backend. |
| **FastAPI** | Backend framework for **OCR processing & AI model inference**. |
| **Tesseract OCR** | Extracts text from invoices automatically. |
| **MongoDB** | Stores **user claims & extracted invoice data**. |
| **AWS EC2** | Hosts the backend API for scalability. |
| **Vercel** | Hosts the **frontend** for seamless deployment. |

---

## **📊 Workflow of the Medical Claim Processing System**  

### **1️⃣ User Registration & Login**
- Users **sign up** and **log in** using **Firebase authentication**.  
- After successful authentication, users are redirected to the **dashboard**.  

### **2️⃣ Uploading Medical Invoices**
- Users **upload a scanned invoice** through the dashboard.  
- The invoice is sent to the **FastAPI backend** via a proxy route (`/api/proxy`).  

### **3️⃣ OCR Extraction (FastAPI & Tesseract)**
- The uploaded invoice is processed using **Tesseract OCR**, which extracts **patient details, bill amount, doctor’s name, etc.**.  

### **4️⃣ Fraud Detection (AI Model)**
- The extracted invoice data is **validated against historical claim patterns** using an **AI model**.  
- If fraudulent activity is detected, it is **flagged** in the dashboard.  

### **5️⃣ Storing Claims in MongoDB**
- The extracted & validated claim data is stored in **MongoDB**.  
- Users can see the processed claim details in **real-time** on the dashboard.  

### **6️⃣ Viewing Processed Claims**
- Users can view the **status of their claim** (approved, rejected, flagged for review) in the dashboard.  
- Admins can **manually verify flagged claims**.  

---

## **🌎 Deployment Flow**
| Component | Deployment |
|-----------|------------|
| **Frontend** | Deployed on **Vercel** (`vercel --prod`) |
| **Backend** | Hosted on **AWS EC2** (`uvicorn main:app --host 0.0.0.0 --port 8000`) |
| **Database** | **MongoDB Atlas** (Cloud-based NoSQL DB) |

---

## **📜 Conclusion**
This **AI-powered medical claim processing system** **automates invoice verification, fraud detection, and claim management**. By leveraging **OCR, AI models, and cloud technologies**, it provides **efficiency, accuracy, and security** in medical insurance processing.


http://127.0.0.1:8000/docs
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
