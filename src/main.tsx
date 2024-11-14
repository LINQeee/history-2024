import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainMenu } from './components/mainMenu/mainMenu.tsx'
import './app.sass'
import { GameMenu } from './components/gameMenu/gameMenu.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainMenu />,
  },
  {
    path: '/test',
    element: <GameMenu />,
  },
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
)
