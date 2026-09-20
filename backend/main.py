from fastapi import FastAPI
app = FastAPI(title="PaveTrack API")

@app.get("/")
def root():
    return {"message": "PaveTrack backend is running!"}