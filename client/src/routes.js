import {ADMIN_ROUTE, PRODUCT_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "./utils/consts";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import ProductPage from "./pages/ProductPage";
import Shop from "./pages/Shop";

// 
export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    },

]

//
export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    }
]