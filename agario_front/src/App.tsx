
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Game from './pages/Game';
import './output.css'

const router = createBrowserRouter([
  {element: <Game/> , path: "/"}
])

function App() {
  return (<RouterProvider router={router}></RouterProvider>
  );
}

export default App;
