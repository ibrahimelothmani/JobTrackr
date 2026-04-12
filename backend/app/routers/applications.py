from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from .. import models, schemas
from ..deps import get_db, get_current_user

router = APIRouter(prefix="/applications", tags=["applications"])

@router.get("/", response_model=List[schemas.ApplicationOut])
def list_applications(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return db.query(models.Application)\
             .filter(models.Application.user_id == current_user.id)\
             .order_by(models.Application.updated_at.desc())\
             .all()

@router.post("/", response_model=schemas.ApplicationOut, status_code=201)
def create_application(
    app_in: schemas.ApplicationCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    company = db.query(models.Company).filter(
        models.Company.id == app_in.company_id,
        models.Company.user_id == current_user.id
    ).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")

    app = models.Application(**app_in.model_dump(), user_id=current_user.id)
    db.add(app)
    db.commit()
    db.refresh(app)
    return app

@router.get("/{app_id}", response_model=schemas.ApplicationOut)
def get_application(
    app_id: UUID,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    app = db.query(models.Application).filter(
        models.Application.id == app_id,
        models.Application.user_id == current_user.id
    ).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    return app

@router.put("/{app_id}", response_model=schemas.ApplicationOut)
def update_application(
    app_id: UUID,
    app_in: schemas.ApplicationUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    app = db.query(models.Application).filter(
        models.Application.id == app_id,
        models.Application.user_id == current_user.id
    ).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")

    for field, value in app_in.model_dump(exclude_unset=True).items():
        setattr(app, field, value)
    db.commit()
    db.refresh(app)
    return app

@router.delete("/{app_id}", status_code=204)
def delete_application(
    app_id: UUID,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    app = db.query(models.Application).filter(
        models.Application.id == app_id,
        models.Application.user_id == current_user.id
    ).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    db.delete(app)
    db.commit()