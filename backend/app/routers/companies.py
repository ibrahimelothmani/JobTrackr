from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from .. import models, schemas
from ..deps import get_db, get_current_user

router = APIRouter(prefix="/companies", tags=["companies"])


@router.get("/", response_model=List[schemas.CompanyOut])
def list_companies(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    return (
        db.query(models.Company)
        .filter(models.Company.user_id == current_user.id)
        .order_by(models.Company.name.asc())
        .all()
    )


@router.post("/", response_model=schemas.CompanyOut, status_code=201)
def create_company(
    company_in: schemas.CompanyCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    existing = (
        db.query(models.Company)
        .filter(
            models.Company.user_id == current_user.id,
            models.Company.name == company_in.name,
        )
        .first()
    )
    if existing:
        raise HTTPException(status_code=409, detail="Company already exists")

    company = models.Company(
        user_id=current_user.id,
        name=company_in.name,
        website=company_in.website,
    )
    db.add(company)
    db.commit()
    db.refresh(company)
    return company
