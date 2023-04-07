// en esta funcion generamos un estado que por default esta en pendiente osea en proceso de ser resuelto
// y una variable que va a guardar la respuesta a de la promesa
// a la promesa que habiamos pasado como parametro le realizamos un then 
// el cual nos da una respuesta o un error
// segun sea la respuesta generamos un cambio en el estado de pendiente a success que es que paso
// o lo cambiamos por el mensaje o estado de error y deboilvemos el error que nos dio y lo guardamos en la variable respuesta
// luego generamos una funcion que vca a contener un switch que segun el estado va a darnos una alternativa
// genera el suspender que es al promesa nos da el error o nos devuelve al respuesta

function getSuspender(promise){
    let status = "pending";
    let response;

    const suspender = promise.then(
        (res) => {
            status = 'seccess';
            response = res;
        },
        (err) => {
            status = 'error';
            response = err;
        }
    );

    const read = () => {
        switch(status) {
            case "pending":
                throw suspender;
            case "error":
                throw response;
            default:
                return response;
        }
    };

    return { read };
}


//cremos la funcion par hacer las peticiones 
//le pasamos una url la cual generamos una promesa y guardamos dicha promesa en una constante
// luego se la pasamos a una funcion que va a resolver esa promesa llamada getSuspender
export function fetchData(url) {
  const promise = fetch(url)
    .then((response) => response.json())
    .then((data) => data);

  return getSuspender(promise);
}
