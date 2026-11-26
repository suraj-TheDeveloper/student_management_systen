from pydantic import BaseModel, Field


class StudentCreate(BaseModel):
    name: str
    email: str
    mobile: str
    course: str


class StudentResponse(BaseModel):
    id: int
    name: str
    email: str
    mobile: str
    course: str