
import { Outlet } from 'react-router-dom';
import './App.css';
import { Header } from './components/index';


function App() {
 
  return (
    <>
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          <Outlet/>
        </main>
        
      </div>
    </div>  
      
    </>
  )
}

export default App
