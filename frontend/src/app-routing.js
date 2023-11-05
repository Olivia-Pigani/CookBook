import { createBrowserRouter } from "react-router-dom";
import App from "./App.js"
import ErrorPage from "./components/shared/ErrorPage.jsx"
import Display from "./components/recipes/Display";
import AuthForm from "./components/auth/AuthForm";
import Details from "./components/recipes/Details";
import Form from "./components/recipes/Form";
import FormUpdate from "./components/recipes/FormUpdate.jsx";

const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        errorElement:<ErrorPage/>,
        children : [
            {
                path:"/",
                element:<Display/>,

            },
            {
                path:"/auth",
                element:<AuthForm/>
            },
            {
                path:"/details/:id",
                element:<Details/>
            },
            // {
            //     path:"/form/:action/:id", // car on souhaite faire un crud
            //     element:<Form/>
            // }
            {
                path:"/form/add",
                element:<Form/>
            },
            {
                path:"/form/update/:id",
                element:<FormUpdate/>
            },

        ]
    }
])
export default router