# import easyocr
# import re

# reader = easyocr.Reader(['en'])

# def extract_invoice_details(image_path):
#     results = reader.readtext(image_path, detail=0)
#     full_text = "\n".join(results)

#     print("===== Extracted Text from Invoice =====")
#     print(full_text)
#     print("========================================\n")

#     extracted_data = {
#         "patient_name": None,
#         "claim_amount": None,
#         "diagnosis": None,
#         "date_of_service": None
#     }

#     dates_found = []
#     claim_amount_candidates = []

#     for i, text in enumerate(results):
#         text_lower = text.lower()

#         # Extract patient name (handling "NAME" case)
#         if "name" in text_lower:
#             for j in range(1, 4):  # Look at the next 3 lines
#                 if i + j < len(results):
#                     potential_name = results[i + j].strip()
                    
#                     # Ensure it's a valid name (no numbers, no short text)
#                     if re.match(r"^[A-Za-z\s]+$", potential_name) and len(potential_name) > 2:
#                         extracted_data["patient_name"] = potential_name
#                         break  # Stop once a valid name is found

#         # Extract claim amount (handle multi-line cases)
#         if any(keyword in text_lower for keyword in ["$", "total", "amt paid", "amount paid", "claimed", "paid"]):
#             match = re.findall(r"\$?[\d,]+\.?\d*", text)
#             if match:
#                 claim_amount_candidates.append(match[-1])
#             elif i + 1 < len(results):  # Check the next line
#                 match_next = re.findall(r"\$?[\d,]+\.?\d*", results[i + 1])
#                 if match_next:
#                     claim_amount_candidates.append(match_next[-1])

#         # Extract diagnosis based on medical terms
#         if any(keyword in text_lower for keyword in ["prescription", "consultation", "diagnosis"]):
#             extracted_data["diagnosis"] = text.strip()

#         # Extract dates
#         date_matches = re.findall(r"\d{4}-\d{2}-\d{2}", text)  # Match YYYY-MM-DD format
#         dates_found.extend(date_matches)

#     # Assign extracted values
#     if claim_amount_candidates:
#         extracted_data["claim_amount"] = claim_amount_candidates[-1].replace(",", "")  # Remove commas
#     else:
#         extracted_data["claim_amount"] = None

#     extracted_data["date_of_service"] = min(dates_found) if dates_found else None

#     return extracted_data

# if __name__ == "__main__":
#     path = r"C:\Users\aashutosh kumar\Downloads\Screenshot 2025-03-13 093208.png"
    
#     extracted_info = extract_invoice_details(path)

#     print("===== Extracted Invoice Details =====")
#     for key, value in extracted_info.items():
#         print(f"{key.replace('_', ' ').title()}: {value}")
#     print("=====================================")


import cv2
import pytesseract
import re

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def extract_invoice_details(image_path):
    img = cv2.imread(image_path)

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    gray = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

    full_text = pytesseract.image_to_string(gray)

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
    claim_amount_candidates = []

    lines = full_text.split("\n")

    for i, text in enumerate(lines):
        text = text.strip()
        text_lower = text.lower()

        if "name" in text_lower:
            for j in range(1, 4): 
                if i + j < len(lines):
                    potential_name = lines[i + j].strip()
                    
                    if re.match(r"^[A-Za-z\s]+$", potential_name) and len(potential_name) > 2:
                        extracted_data["patient_name"] = potential_name
                        break  

        if any(keyword in text_lower for keyword in ["$", "total", "amt paid", "amount paid", "claimed", "paid"]):
            match = re.findall(r"\$?[\d,]+\.?\d*", text)
            if match:
                claim_amount_candidates.append(match[-1])
            elif i + 1 < len(lines): 
                match_next = re.findall(r"\$?[\d,]+\.?\d*", lines[i + 1])
                if match_next:
                    claim_amount_candidates.append(match_next[-1])

        if any(keyword in text_lower for keyword in ["prescription", "consultation", "diagnosis"]):
            extracted_data["diagnosis"] = text.strip()

        date_matches = re.findall(r"\d{4}-\d{2}-\d{2}", text)
        dates_found.extend(date_matches)

    extracted_data["claim_amount"] = claim_amount_candidates[-1].replace(",", "") if claim_amount_candidates else None
    extracted_data["date_of_service"] = min(dates_found) if dates_found else None

    return extracted_data

if __name__ == "__main__":
    image_path = r"C:\Users\aashutosh kumar\Downloads\free-medical-invoice-template.png"
    
    extracted_info = extract_invoice_details(image_path)

    print("===== Extracted Invoice Details =====")
    for key, value in extracted_info.items():
        print(f"{key.replace('_', ' ').title()}: {value}")
    print("=====================================")
