from fastapi import FastAPI, File, UploadFile, HTTPException
import shutil
import os
import logging
from src.ocr import extract_invoice_details
from src.fraud import classify_invoice
from src.database import save_invoice_data
import uvicorn
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

UPLOAD_DIR = os.path.join(os.getcwd(), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/upload-invoice/")
async def upload_invoice(file: UploadFile = File(...)):
    try:
        if not file:
            raise HTTPException(status_code=400, detail="No file provided")

        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        logger.info(f"File saved: {file.filename}")

        extracted_info = extract_invoice_details(file_path)
        if not extracted_info:
            raise HTTPException(status_code=500, detail="Failed to extract invoice details")

        is_fraud = classify_invoice(extracted_info)

        invoice_record = {
            "invoice_data": extracted_info,
            "fraudulent": is_fraud
        }
        invoice_id = save_invoice_data(invoice_record)

        logger.info(f"Invoice processed: {invoice_id}")

        return {
            "invoice_id": invoice_id,
            "invoice_data": extracted_info,
            "fraudulent": is_fraud
        }

    except Exception as e:
        logger.error(f"Error processing invoice: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
