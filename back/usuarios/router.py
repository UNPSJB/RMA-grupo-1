from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from back.database import get_db
from back.usuarios import schemas, services

router = APIRouter()

# Rutas para usuarios
# @router.post("/login")
# def login(usuario: schemas.UsuarioBase, db: Session = Depends(get_db)):
#     return services.login_usuario(db, usuario)


@router.get("/usuarios", response_model=list[schemas.Usuario])
def read_usuarios(db: Session = Depends(get_db)):
    return services.listar_usuarios(db)


# @router.put("/usuarios/{user_id}/desactivar")
# def desactivar_usuario_route(user_id: int, db: Session = Depends(get_db)):
#     return services.desactivar_usuario(db, user_id)
