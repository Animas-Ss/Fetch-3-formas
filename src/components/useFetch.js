import { useState, useEffect } from "react";

export function useFetch ( url ){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    // como el abortControler se encuentra dentro del useEffect no puede ser enviado a nuestra funcion de vancelar peticion
    // entonces creamos un estado y lo setiamos con la creacion del new AbortController
    const [controller, setController] = useState(null)

    useEffect(() => {
        // apra abortar las peticiones de no quererlas ya!
        const abortController = new AbortController();
        setController(abortController)
        setLoading(true)
        // a fetch le poedmos pasar un segundo parametro llamado signal
        fetch(url, {signal: abortController.signal})
         .then((response) => response.json())
         .then((data) => {
            /* setLoading(false) */
            setData(data)
        })
        .catch((error) =>{ 
            if(error.name === "AbortError"){
                console.log('User abort')
            }else{
                setError(error)
            }
        })
        .finally(() => setLoading(false));

    return () => abortController.abort();
    }, []);

    //para caundo queremos cancelar una peticion desde un botond e cancel en nuestra aplicacion
    // creamos una funcion con el abortcontroller.abort

    const handleCancelRequest = () => {
        //comprobamos si exite el abortcontroller
        if(controller){
            controller.abort();
            setError('Se cancelo la solicitud por el usuario')
        }
    }
    
    return { data, loading, error, handleCancelRequest };
}

//Existen dos metodos para devolver la finalizacion de carga
//colocandolo adentro de la resulucion de la promesa 
// antes o despues de gaurdar la data en el estado 
// o conel metodo finaly de las promesas