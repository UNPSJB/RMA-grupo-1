from datetime import datetime
from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from ..auth.dependencies import permiso_requerido
from ..database import get_db
from ..paquete import schemas, services
from ..auth.dependencies import permiso_requerido

router = APIRouter()


@router.get(
    "/paquetes",
    response_model=schemas.PaqueteResponse,
    tags=["Paquetes"],
    dependencies=[Depends(permiso_requerido("read_paquetes"))],
)
def read_paquetes(
    limit: int = Query(None, ge=1),
    offset: int = Query(0, ge=0),
    nodo_id: Optional[int] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    data_min: Optional[float] = None,
    data_max: Optional[float] = None,
    order_by: Optional[str] = None,
    type: Optional[int] = None,
    order: str = Query("asc"),
    db: Session = Depends(get_db),
):
    result = services.listar_paquetes(
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
    return result


# Endpoint para obtener todos los tipos de datos
@router.get("/tipos", response_model=list[schemas.TipoBase])
def read_tipos(db: Session = Depends(get_db)):
    # Llamamos a la función de servicio para obtener todos los tipos de la base de datos
    tipos = services.listar_tipos(db)
    return tipos


@router.get("/tipos/{id}", response_model=schemas.TipoBase, tags=["Tipos"])
def read_tipo(id: int, db: Session = Depends(get_db)):
    return services.get_tipo(db=db, tipo_id=id)


# R


@router.get(
    "/paquetesarchivos",
    response_model=schemas.PaqueteArchivoResponse,
    tags=["Paquetes"],
    # dependencies=[Depends(permiso_requerido("read_paquetes_archivos"))],
)
def read_paquetes(
    limit: int = Query(None, ge=1),
    offset: int = Query(0, ge=0),
    nodo_id: Optional[int] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    data_min: Optional[float] = None,
    data_max: Optional[float] = None,
    order_by: Optional[str] = None,
    type: Optional[int] = None,
    order: str = Query("asc"),
    db: Session = Depends(get_db),
):
    result = services.listar_paquetes_archivo(
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
    return result
