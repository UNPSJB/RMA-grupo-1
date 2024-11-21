from pydantic import BaseModel
from typing import Optional

class AlertaBase(BaseModel):
    nombre: str
    titulo_notificacion: str

class AlertaCreate(AlertaBase):
    pass

class AlertaUpdate:
    id: int

class AlertaUsuario(BaseModel):
    alarma_id: int
    usuario_id: int

# Schema para recibir la suscripción desde el frontend
class PushSubscription(BaseModel):
    endpoint: str
    expirationTime: Optional[int] = None
    keys: dict