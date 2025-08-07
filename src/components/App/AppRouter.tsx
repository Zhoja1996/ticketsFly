import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "./Layouts/BaseLayout";
import FligthsPage from "../../pages/FlightsPage";
import FlightDetailsPage from "../../pages/FlightDetailsPage";
import CartPage from "../../pages/CartPage";

const AppRouter = createBrowserRouter([
    {
        element: <BaseLayout/>,
        errorElement: <div>Error</div>,
        children: [
            {path: '/', element: <FligthsPage/>},
            {path: '/flight/:id', element: <FlightDetailsPage/>},
            {path: '/cart', element: <CartPage/>}
        ]
    }
])

export default AppRouter;