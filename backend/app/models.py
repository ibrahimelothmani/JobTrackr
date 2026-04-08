import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, Integer, Date, Enum, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from .database import Base

import enum

class StatusEnum(str, enum.Enum):
    applied    = "applied"
    screening  = "screening"
    interview  = "interview"
    offer      = "offer"
    rejected   = "rejected"


class User(Base):
    __tablename__ = "users"

    id         = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email      = Column(String, unique=True, nullable=False, index=True)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    applications = relationship("Application", back_populates="user")
    companies    = relationship("Company",     back_populates="user")

class Company(Base):
    __tablename__ = "companies"

    id      = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    name    = Column(String, nullable=False)
    website = Column(String, nullable=True)

    user         = relationship("User",        back_populates="companies")
    applications = relationship("Application", back_populates="company")

class Application(Base):
    __tablename__ = "applications"

    id         = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id    = Column(UUID(as_uuid=True), ForeignKey("users.id"),    nullable=False)
    company_id = Column(UUID(as_uuid=True), ForeignKey("companies.id"), nullable=False)
    role       = Column(String, nullable=False)
    status     = Column(Enum(StatusEnum), default=StatusEnum.applied, nullable=False)
    applied_at = Column(Date, nullable=False)
    salary_min = Column(Integer, nullable=True)
    salary_max = Column(Integer, nullable=True)
    notes      = Column(Text, nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user    = relationship("User",    back_populates="applications")
    company = relationship("Company", back_populates="applications")