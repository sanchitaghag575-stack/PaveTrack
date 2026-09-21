from pydantic import BaseModel
from typing import Optional


class RepairVerification(BaseModel):
    pothole_id: str
    repair_image_url: Optional[str] = None
    repair_description: Optional[str] = None
    verification_status: str = "pending"