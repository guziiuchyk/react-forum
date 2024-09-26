import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {RouterProvider,} from "react-router-dom"
import {router} from "./router.tsx";
import { store } from './redux/store.ts'
import { Provider } from 'react-redux'
import "./index.css"
import "./variables.css"
import "./normalize.css"

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <StrictMode>
            <RouterProvider router={router}/>
        </StrictMode>
    </Provider>
)
