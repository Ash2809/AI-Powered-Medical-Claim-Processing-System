from ocr import extract_invoice_details
import re

def classify_invoice(extracted_data):
    reasons = []

    if not extracted_data["patient_name"]:
        reasons.append("Missing patient name.")
    if not extracted_data["claim_amount"]:
        reasons.append("Missing claim amount.")

    try:
        claim_amount = float(extracted_data["claim_amount"].replace(",", "").replace("$", ""))
        if claim_amount > 20000:
            reasons.append("Claim amount is unusually high.")
    except ValueError:
        reasons.append("Invalid claim amount format.")

    if extracted_data["date_of_service"]:
        try:
            service_date = extracted_data["date_of_service"]
            issue_date = extracted_data.get("issue_date")  
            if issue_date and service_date > issue_date:
                reasons.append("Due date is before the issue date.")
        except Exception:
            reasons.append("Date format error.")

    if any(len(value) > 50 for value in extracted_data.values() if value):
        reasons.append("Possible OCR text corruption detected.")

    if reasons:
        return "Fraudulent", reasons
    return "Valid", []

if __name__ == "__main__":
    path = r"C:\Users\aashutosh kumar\Downloads\free-medical-invoice-template.png"
    
    extracted_info = extract_invoice_details(path)
    classification, reasons = classify_invoice(extracted_info)

    print("===== Extracted Invoice Details =====")
    for key, value in extracted_info.items():
        print(f"{key.replace('_', ' ').title()}: {value}")
    print("=====================================")
    
    print(f"Invoice Classification: {classification}")
    if reasons:
        print("Reasons for Classification:")
        for reason in reasons:
            print(f"- {reason}")
