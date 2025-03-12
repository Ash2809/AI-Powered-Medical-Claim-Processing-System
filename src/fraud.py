from ocr import extract_invoice_details
import re
import joblib
import numpy as np

with open(r"C:\Advance_Projects\AI-Powered-Medical-Claim-Processing-System\models\model.pkl", "rb") as file:
    model = joblib.load(file)
    print(model)


def classify_invoice(extracted_data):
    try:
        claim_amount = extracted_data.get("claim_amount", "0").replace(",", "").replace("$", "")
        claim_amount = float(claim_amount)
    except ValueError:
        return True 
    
    print(claim_amount)
    prediction = model.predict([[claim_amount]])[0]

    if(prediction == 1):
        return False
    else:
        return True


if __name__ == "__main__":
    path = r"C:\Users\aashutosh kumar\Downloads\free-medical-invoice-template.png"
    
    extracted_info = extract_invoice_details(path)
    is_fraud = classify_invoice(extracted_info)
    
    print(f"Fraudulent: {is_fraud}")
