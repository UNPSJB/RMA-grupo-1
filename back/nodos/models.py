from typing import List, Optional

from sqlalchemy import Float, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from back.models import ModeloBase


class Nodo(ModeloBase):
    __tablename__ = "nodos"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    identificador: Mapped[str] = mapped_column(String, unique=True, index=True)
    descripcion: Mapped[str] = mapped_column(String, index=True)
    porcentajeBateria: Mapped[int] = mapped_column(Integer, index=True)
    latitud: Mapped[float] = mapped_column(Float, index=True, nullable=True)
    longitud: Mapped[float] = mapped_column(Float, index=True, nullable=True)
    # Relación con Paquete
    # paquetes = relationship("Paquete", back_populates="sensor")
    paquetes: Mapped[List["Paquete"]] = relationship("Paquete", back_populates="nodo")