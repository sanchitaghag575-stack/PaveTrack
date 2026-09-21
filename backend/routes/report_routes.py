from fastapi import APIRouter, HTTPException
from schemas.report_schema import PotholeReport
from config.database import db
from bson import ObjectId
router = APIRouter(prefix="/api/reports", tags=["Reports"])


@router.post("/")
def create_report(report: PotholeReport):
    report_data = report.model_dump()

    result = db.reports.insert_one(report_data)

    return {
        "message": "Pothole report created successfully",
        "report_id": str(result.inserted_id)
    }
@router.get("/")
def get_reports():
    reports = list(db.reports.find())

    for report in reports:
        report["_id"] = str(report["_id"])

    return reports
@router.get("/{report_id}")
def get_report(report_id: str):
    try:
        report = db.reports.find_one({
            "_id": ObjectId(report_id)
        })
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid report ID"
        )

    if not report:
        raise HTTPException(
            status_code=404,
            detail="Pothole report not found"
        )

    report["_id"] = str(report["_id"])

    return report