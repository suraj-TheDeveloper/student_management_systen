from sqlalchemy.orm import Session

from app.repositories import student_repository
from app.schemas.student_schema import StudentCreate


def get_students(db: Session):
    return student_repository.get_all_students(db)


def get_student(db: Session, student_id: int):
    return student_repository.get_student_by_id(db, student_id)


def create_student(db: Session, student: StudentCreate):
    student_data = student.model_dump()

    return student_repository.create_student(db, student_data)


def update_student(db: Session, student_id: int, student: StudentCreate):
    student_data = student.model_dump()

    return student_repository.update_student(
        db, student_id, student_data
    )


def delete_student(db: Session, student_id: int):
    return student_repository.delete_student(db, student_id)