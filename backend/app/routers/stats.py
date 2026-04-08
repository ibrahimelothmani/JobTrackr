from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, schemas
from ..deps import get_db, get_current_user

router = APIRouter(prefix="/stats", tags=["stats"])

@router.get("/", response_model=schemas.StatsOut)
def get_stats(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    apps = db.query(models.Application)\
             .filter(models.Application.user_id == current_user.id)\
             .all()

    total = len(apps)
    responded = sum(1 for a in apps if a.status != models.StatusEnum.applied)
    interviews = sum(1 for a in apps if a.status == models.StatusEnum.interview)
    offers     = sum(1 for a in apps if a.status == models.StatusEnum.offer)

    return {
        "total":         total,
        "response_rate": round((responded / total * 100), 1) if total > 0 else 0.0,
        "interviews":    interviews,
        "offers":        offers,
    }