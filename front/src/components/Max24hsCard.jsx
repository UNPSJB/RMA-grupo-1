export default function Max24hsCard({ data, CARD_WIDTH }) {

    const maxNivel24hs = (() => {
      
        const dateOf24hoursBefore = new Date(Date.now() - 1000 * 60 * 60 * 24);

        // caso sin datos en las ult. 24 horas
        if(data[data.length-1] < dateOf24hoursBefore)
          return "Sin datos"
  
        let max = data[data.length - 1];

        
        for(let i = data.length - 2; i >= 0; i-- ) {
            if(data[i].date < dateOf24hoursBefore)
                break;
            if(data[i].nivel_hidrometrico > max.nivel_hidrometrico)
                max = data[i];
        }
        const dateOfMax = new Date(max.date)
        debugger
        return {
            nivel_hidrometrico: max.nivel_hidrometrico.toFixed(1),
            stringTime: `${dateOfMax.getHours()}:${String(dateOfMax.getMinutes()).padStart(2, '0')}hs`
        }
      })()

  return (
    <div className="card me-2 p-1" style={{ width: CARD_WIDTH }}>
      <div className="card-header">
        <h6 className="card-title text-center">Máximo 24hs</h6>
      </div>
      <div className="card-body d-flex flex-column justify-content-center align-items-center">
        <p className="card-text fs-5">
          <div>
            <i className="fa fa-tint me-2" aria-hidden="true" />
            {maxNivel24hs.nivel_hidrometrico}m
          </div>
        </p>
        <h6 className="card-subtitle mb-2 text-body-secondary">
            {maxNivel24hs.stringTime}
        </h6>
      </div>
    </div>
  );
}