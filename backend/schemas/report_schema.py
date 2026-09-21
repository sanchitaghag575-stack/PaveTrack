from pydantic import BaseModel
from typing import Optional


class PotholeReport(BaseModel):
    description: str
    severity: str
    latitude: float
    longitude: float
    image_url: Optional[str] = None
    status: str = "reported"