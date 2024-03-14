import { Search } from "src/pages/search/Search";
import { Auth } from "src/pages/auth/Auth";
import { Basket } from "src/pages/basket/Basket";
import { Home } from "src/pages/home/Home";
import { Product } from "src/pages/product/Product";
import { Profile } from "src/pages/profile/Profile";
import { Catalog } from "src/pages/catalog/Catalog";
import { Favorites } from "src/pages/favorites/Favorites";

interface IRoute {
    path: string;
    Component: React.FC;
}

export const publicRoute: IRoute[] = [
    {
        path: "/",
        Component: Home,
    },
    {
        path: "/auth",
        Component: Auth,
    },
    {
        path: "/product/:productId",
        Component: Product,
    },
    {
        path: "/search",
        Component: Search,
    },
    {
        path: "/catalog",
        Component: Catalog,
    }
];

export const authRoute: IRoute[] = [
    {
        path: "/basket",
        Component: Basket,
    },
    {
        path: "/favorites",
        Component: Favorites,
    },
    {
        path: "/profile/:userId",
        Component: Profile,
    },
];
