from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.student_routes import router as student_router
from app.database.connection import engine, Base

from app.models.student_model import Student

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Student Management API",
    description="Student CRUD API using PostgreSQL",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(student_router)

@app.get("/")
def home():
    return {
        "message": "Welcome to Student Management API"
    }