from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session

from app.schemas.student_schema import StudentCreate, StudentResponse
from app.services import student_service
from app.database.connection import get_db

router = APIRouter(
    prefix="/students",
    tags=["Students"]
)

# Get all students
@router.get("/", response_model=list[StudentResponse])
def get_students(db: Session = Depends(get_db)):
    return student_service.get_students(db)

# Get student by ID
@router.get("/{student_id}", response_model=StudentResponse)
def get_student(
    student_id: int,
    db: Session = Depends(get_db)
):
    student = student_service.get_student(db, student_id)

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return student

# Create student
@router.post(
    "/",
    response_model=StudentResponse,
    status_code=status.HTTP_201_CREATED
)
def create_student(
    student: StudentCreate,
    db: Session = Depends(get_db)
):
    return student_service.create_student(db, student)

# Update student
@router.put("/{student_id}", response_model=StudentResponse)
def update_student(
    student_id: int,
    student: StudentCreate,
    db: Session = Depends(get_db)
):
    updated_student = student_service.update_student(
        db, student_id, student
    )

    if not updated_student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return updated_student

# Delete student
@router.delete("/{student_id}")
def delete_student(
    student_id: int,
    db: Session = Depends(get_db)
):
    deleted_student = student_service.delete_student(db, student_id)

    if not deleted_student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return {
        "message": "Student deleted successfully",
        "student": deleted_student
    }