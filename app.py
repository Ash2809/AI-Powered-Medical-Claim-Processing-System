from fastapi import FastAPI, File, UploadFile
import shutil
import os
from src.ocr import extract_invoice_details
from src.fraud import classify_invoice
from src.database import save_invoice_data 
import uvicorn

app = FastAPI()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/upload-invoice/")
async def upload_invoice(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    extracted_info = extract_invoice_details(file_path)
    
    is_fraud = classify_invoice(extracted_info)
    
    invoice_record = {
        "invoice_data": extracted_info,
        "fraudulent": is_fraud
    }
    invoice_id = save_invoice_data(invoice_record)

    return {
        "invoice_id": invoice_id,
        "invoice_data": extracted_info,
        "fraudulent": is_fraud
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
