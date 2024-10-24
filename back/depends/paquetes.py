import json
from datetime import datetime
from typing import Optional

from back.database import get_db
from back.paquete.schemas import PaqueteBase
from back.paquete.services import crear_paquete

from back.database import get_db
from back.paquete.schemas import PaqueteBase
from back.paquete.services import crear_paquete


def guardar_paquete_en_db(paquete: PaqueteBase) -> None:
    crear_paquete(next(get_db()), paquete)
    print(f"Guardado: {paquete}")


def procesar_mensaje(mensaje) -> Optional[PaqueteBase]:
    mensaje = mensaje.replace("'", '"')
    mensaje_json = json.loads(mensaje)
    try:
        mensaje_paquete = {
            "sensor_id": mensaje_json["id"],
            "temperatura": float(mensaje_json["temperatura"]),
            "nivel_hidrometrico": float(mensaje_json["nivel_hidrometrico"]),
            "date": datetime.strptime(mensaje_json["time"], "%Y-%m-%d %H:%M:%S.%f"),
        }
        paquete = PaqueteBase(**mensaje_paquete)
    except Exception as e:
        print(f"Error de validación: {e}")
    return paquete


def mi_callback(mensaje: str) -> None:
    print(f"he recibido: {mensaje}")
    paquete = procesar_mensaje(mensaje)
    if paquete is not None:
        guardar_paquete_en_db(paquete)
