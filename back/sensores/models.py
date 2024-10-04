from sqlalchemy import Boolean, Column, ForeignKey, Integer, String,Float
from sqlalchemy.orm import Mapped, mapped_column, relationship
from enum import auto, StrEnum
from datetime import datetime, UTC
from back.models import BaseModel           
from typing import Optional, List
from back.paquete.models import Paquete

class Sensor(BaseModel):
    __tablename__ = "sensores" 

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    identificador: Mapped[str] = mapped_column(String, index=True)
    porcentajeBateria: Mapped[int] = mapped_column(Integer,index = True)
    latitud: Mapped[float] = mapped_column(Float, index=True, nullable=True)  
    longitud: Mapped[float] = mapped_column(Float, index=True, nullable=True)  
