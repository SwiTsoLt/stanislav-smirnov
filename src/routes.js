import { useRoutes } from "react-router-dom";
import { About } from "./pages/About";
import { AdminPanel } from "./pages/AdminPanel";
import { Auth } from "./pages/Auth";
import { Comments } from "./pages/Comments";
import { Contacts } from "./pages/Contacts";
import { News } from "./pages/News";
import { Profile } from "./pages/Profile";
import { Projects } from "./pages/Projects";
import { Settings } from "./pages/Settings";

export const CustomRouter = ({ asideProps, setAsideProps }) => {
    const routes = useRoutes([
        {
            path: '/',
            element: <News />,
        },
        {
            path: '/profile',
            element: <Profile />,
        },
        {
            path: '/news',
            element: <News asideProps={asideProps} />,
        },
        {
            path: '/projects',
            element: <Projects />,
        },
        {
            path: '/contacts',
            element: <Contacts />,
        },
        {
            path: '/settings',
            element: <Settings asideProps={asideProps} setAsideProps={setAsideProps} />,
        },
        {
            path: '/about',
            element: <About />,
        },
        {
            path: '/auth',
            element: <Auth asideProps={asideProps} setAsideProps={setAsideProps} />,
        },
        {
            path: '/comments',
            element: <Comments />,
        },
        {
            path: '/adminPanel',
            element: <AdminPanel />,
        },
    ])

    return (
        <>
            {routes}
        </>
    )
}