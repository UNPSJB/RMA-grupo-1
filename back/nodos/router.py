from datetime import datetime
from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from ..database import get_db
from ..nodos import schemas, services

from ..paquete.services import listar_paquetes

router = APIRouter()

# Rutas para nodos


@router.get("/nodos", response_model=list[schemas.Nodo], tags=["Nodos"])
def read_nodos(db: Session = Depends(get_db)):
    return services.listar_nodos(db)


@router.post("/nodos", response_model=schemas.Nodo, tags=["Nodos"])
def create_nodo(nodo: schemas.NodoCreate, db: Session = Depends(get_db)):
    return services.crear_nodo(db, nodo)


@router.get("/nodos/{id}", response_model=schemas.Nodo, tags=["Nodos"])
def read_nodo(id: int, db: Session = Depends(get_db)):
    return services.get_nodo(nodo_id=id, db=db)


@router.put("/nodos/{nodo_id}", response_model=schemas.Nodo, tags=["Nodos"])
def update_nodo(nodo_id: int, nodo: schemas.NodoUpdate, db: Session = Depends(get_db)):
    return services.modificar_nodo(db, nodo_id, nodo)


@router.delete(
    "/nodos/{nodo_id}", response_model=schemas.DeleteResponseSchema, tags=["Nodos"]
)
def delete_nodo(nodo_id: int, db: Session = Depends(get_db)):
    return services.archivar_y_eliminar_nodo(db=db, nodo_id=nodo_id)


@router.get(
    "/nodos/{nodo_id}/paquetes", response_model=schemas.NodoConPaquetes, tags=["Nodos"]
)
def get_nodo_con_paquetes(
    nodo_id: int,
    limit: int = Query(10, ge=1),
    offset: int = Query(0, ge=0),
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    data_min: Optional[float] = None,
    data_max: Optional[float] = None,
    order_by: Optional[str] = None,
    type: Optional[int] = None,
    order: str = Query("asc"),
    db: Session = Depends(get_db),
):

    nodo = services.get_nodo(db, nodo_id)

    paquetes = listar_paquetes(
        db,
        limit=limit,
        offset=offset,
        nodo_id=nodo_id,
        start_date=start_date,
        end_date=end_date,
        data_min=data_min,
        data_max=data_max,
        order_by=order_by,
        order=order,
        type=type,
    )
    nodo.paquetes = paquetes["items"]

    return nodo