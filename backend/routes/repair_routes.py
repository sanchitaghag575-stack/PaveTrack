from fastapi import APIRouter, HTTPException
from schemas.repair_schema import RepairVerification
from config.database import db
from bson import ObjectId

router = APIRouter(
    prefix="/api/repairs",
    tags=["Repair Verification"]
)


@router.post("/verify")
def submit_repair_evidence(repair: RepairVerification):

    # Check whether the pothole exists
    try:
        pothole = db.reports.find_one({
            "_id": ObjectId(repair.pothole_id)
        })
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid pothole ID"
        )

    if not pothole:
        raise HTTPException(
            status_code=404,
            detail="Pothole report not found"
        )

    # Save repair evidence
    repair_data = repair.model_dump()

    result = db.repairs.insert_one(repair_data)

    return {
        "message": "Repair evidence submitted successfully",
        "repair_id": str(result.inserted_id),
        "pothole_id": repair.pothole_id
    }
@router.get("/")
def get_repairs():
    repairs = list(db.repairs.find())

    for repair in repairs:
        repair["_id"] = str(repair["_id"])

    return repairs