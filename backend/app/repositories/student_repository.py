from sqlalchemy.orm import Session
from app.models.student_model import Student


# Get all students
def get_all_students(db: Session):
    return db.query(Student).all()


# Get student by ID
def get_student_by_id(db: Session, student_id: int):
    return db.query(Student).filter(
        Student.id == student_id
    ).first()


# Create student
def create_student(db: Session, student_data: dict):

    new_student = Student(**student_data)

    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    return new_student


# Update student
def update_student(db: Session, student_id: int, student_data: dict):

    student = get_student_by_id(db, student_id)

    if not student:
        return None

    for key, value in student_data.items():
        setattr(student, key, value)

    db.commit()
    db.refresh(student)

    return student


# Delete student
def delete_student(db: Session, student_id: int):

    student = get_student_by_id(db, student_id)

    if not student:
        return None

    db.delete(student)
    db.commit()

    return student