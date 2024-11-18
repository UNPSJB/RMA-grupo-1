from datetime import datetime
from math import ceil
from typing import Optional

from sqlalchemy import func
from sqlalchemy.orm import Session

from . import schemas
from .models import Paquete, PaqueteRechazado


def listar_paquetes(
    db: Session,
    limit: Optional[int] = None,
    offset: int = 0,
    nodo_id: Optional[int] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    data_min: Optional[float] = None,
    data_max: Optional[float] = None,
    order_by: Optional[str] = None,
    order: str = "asc",
    type: Optional[int] = None,
):
    query = db.query(Paquete)
    if type is not None:
        query = query.filter(Paquete.type == type)
    if nodo_id is not None:
        query = query.filter(Paquete.nodo_id == nodo_id)
    if start_date and end_date:
        query = query.filter(
            func.date(Paquete.date).between(start_date.date(), end_date.date())
        )
    elif start_date is not None:
        query = query.filter(func.date(Paquete.date) == start_date.date())
    if data_min is not None:
        query = query.filter(Paquete.data >= data_min)
    if data_max is not None:
        query = query.filter(Paquete.data <= data_max)

    # Aplicar orden de datos
    if order_by:
        if order.lower() == "desc":
            query = query.order_by(getattr(Paquete, order_by).desc())
        else:
            query = query.order_by(getattr(Paquete, order_by))

    if limit is not None:
        total_items = query.count()
        items = query.offset(offset).limit(limit).all()
        total_pages = ceil(total_items / limit) if limit > 0 else 1
        current_page = (offset // limit) + 1 if limit > 0 else 1

        return {
            "info": {
                "total_items": total_items,
                "total_pages": total_pages,
                "current_page": current_page,
                "limit": limit,
                "offset": offset,
            },
            "items": items,
        }
    else:
        items = query.all()
        total_items = len(items)

        return {
            "info": {
                "total_items": total_items,
                "total_pages": 1,
                "current_page": 1,
                "limit": total_items,
                "offset": 0,
            },
            "items": items,
        }


def crear_paquete(db: Session, paquete: schemas.PaqueteCreate) -> Paquete:
    return Paquete.create(db, paquete)


def crear_paquete_rechazado(db: Session, paquete: schemas.PaqueteRechazado):
    return PaqueteRechazado.create(db, paquete)
