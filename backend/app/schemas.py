from pydantic import BaseModel, EmailStr
from datetime import date, datetime
from typing import Optional
from uuid import UUID
from .models import StatusEnum

# ── Auth ──────────────────────────────────────────
class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: UUID
    email: str
    created_at: datetime
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

# ── Company ───────────────────────────────────────
class CompanyCreate(BaseModel):
    name: str
    website: Optional[str] = None

class CompanyOut(CompanyCreate):
    id: UUID
    class Config:
        from_attributes = True

# ── Application ───────────────────────────────────
class ApplicationCreate(BaseModel):
    company_id: UUID
    role: str
    status: StatusEnum = StatusEnum.applied
    applied_at: date
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    notes: Optional[str] = None
class ApplicationUpdate(BaseModel):
    role: Optional[str] = None
    status: Optional[StatusEnum] = None
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    notes: Optional[str] = None

class ApplicationOut(BaseModel):
    id: UUID
    role: str
    status: StatusEnum
    applied_at: date
    salary_min: Optional[int]
    salary_max: Optional[int]
    notes: Optional[str]
    updated_at: datetime
    company: CompanyOut
    class Config:
        from_attributes = True

# ── Stats ─────────────────────────────────────────
class StatsOut(BaseModel):
    total: int
    response_rate: float
    interviews: int
    offers: int