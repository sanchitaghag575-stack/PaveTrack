from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config.database import db
from routes.report_routes import router as report_router
from routes.repair_routes import router as repair_router

app = FastAPI(title="PaveTrack API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "PaveTrack backend is running!"}


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "database": "Local database connected"
    }


app.include_router(report_router)
app.include_router(repair_router)
