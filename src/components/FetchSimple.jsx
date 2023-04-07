import React, { useEffect, useState } from 'react';


export const FetchSimple = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
         .then((response) => response.json())
         .then((data) => setData(data))
    }, []);


  return (
    <div className='App'>
        <h1>fetch de datos</h1>
        <button className='btn-cancel'>Cancelar</button>
        <div className='card'>
            <ul>
                {data?.map((item)=> (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    </div>
  )
}
