
import { useFetch } from './useFetch'

function FetchHook() {
  const {data, loading, error, handleCancelRequest} = useFetch('https://jsonplaceholder.typicode.com/users')
  return (
    <>
     <div className='App'>
        <h1>fetch de datos</h1>
        <button className='btn-cancel' onClick={handleCancelRequest}>Cancelar</button>
        <div className='card'>
            <ul>
              {error && <li>Error:{error}</li>}
              {loading && <li>Loading ...</li>}
                {data?.map((item)=> (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    </div>
    </>
  )
}

export default FetchHook
