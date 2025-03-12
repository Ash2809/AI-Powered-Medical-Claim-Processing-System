from pymongo import MongoClient

MONGO_URI = "mongodb+srv://aashutoshkumar8385:Bi7mbkTK8GxBpT1k@medi-claim.mtjf0.mongodb.net/?retryWrites=true&w=majority&appName=Medi-Claim"

client = MongoClient(MONGO_URI)

db = client["Medical"]
collection = db["medi_claim"]

def save_invoice_data(invoice_data):
    result = collection.insert_one(invoice_data)
    return str(result.inserted_id)


if __name__ == "__main__":
    sample_invoice = {
        "patient_name": "John Doe",
        "claim_amount": "500.00",
        "diagnosis": "Fractured Arm",
        "date_of_service": "03/10/2025",
        "fraudulent": False
    }

    result = save_invoice_data(sample_invoice)
    print(f"ID is inserted successfully {result}")