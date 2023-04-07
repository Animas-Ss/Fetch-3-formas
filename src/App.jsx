
import './App.css';
//import FetchHook from './components/FetchHook';
import { fetchData } from './components/fetchData';
// suspense es un componenete de react que nos permite englobar hijos para que carguen si hay una respuesta , de lo conmtrario no carga 
import { Suspense } from 'react';

// una forma sin usar useEffect
const apiData = fetchData("https://jsonplaceholder.typicode.com/users")

function App() {
  // aca guardamos en data la respuesta de fetchdata que es el emtodo que creamos llamado read()
  const data = apiData.read()
  return (
    <>
     {/* <FetchSimple/> */}
     {/* <FetchHook/> */}
     <div className='App'>
        <h1>fetch de datos</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <ul className='card'>
            {data?.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </Suspense>
    </div>
    </>
  )
}

export default App
