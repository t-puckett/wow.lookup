import { createBrowserRouter } from "react-router";
import App from './src/App'
import Home from './src/components/home/home'
import Navmenuinitialize from './src/components/navmenu/navmenuinitialize'
import SearchBox from "./src/components/search/searchbox";
import Character from "./src/components/character/character";

createBrowserRouter([
    {
        path:"/",
        Component: App,
        children: [
            {index: true, Component: Home},
            { path: "searchbox", Component: SearchBox },
            { path: "navmenuinitialize", Component: Navmenuinitialize,
                children: [
                    {
                        path: "character", Component: Character
                    }
                ]
            },
            
            
        ]

    }
])