import easyocr
import re

reader = easyocr.Reader(['en'])

def extract_invoice_details(image_path):
    results = reader.readtext(image_path, detail=0)
    full_text = "\n".join(results)

    print("===== Extracted Text from Invoice =====")
    print(full_text)
    print("========================================\n")

    extracted_data = {
        "patient_name": None,
        "claim_amount": None,
        "diagnosis": None,
        "date_of_service": None
    }

    dates_found = []

    for i, text in enumerate(results):
        text_lower = text.lower()

        if "bill to" in text_lower and i + 1 < len(results):
            extracted_data["patient_name"] = results[i + 1].strip()

        if "$" in text or "total" in text_lower:
            match = re.findall(r"\$?\d+[\.,]?\d*", text)
            if match:
                extracted_data["claim_amount"] = match[-1]

        if "prescription" in text_lower or "consultation" in text_lower:
            extracted_data["diagnosis"] = text.strip()

        date_matches = re.findall(r"\d{1,2}[./-]\d{1,2}[./-]\d{4}", text)
        dates_found.extend(date_matches)

    if dates_found:
        extracted_data["date_of_service"] = min(dates_found)  

    return extracted_data

if __name__ == "__main__":
    path = r"C:\Users\aashutosh kumar\Downloads\free-medical-invoice-template.png"
    
    extracted_info = extract_invoice_details(path)

    print("===== Extracted Invoice Details =====")
    for key, value in extracted_info.items():
        print(f"{key.replace('_', ' ').title()}: {value}")
    print("=====================================")
