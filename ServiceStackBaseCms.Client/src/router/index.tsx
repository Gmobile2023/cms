import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import BlankLayout from '@/components/Layouts/BlankLayout';
import DefaultLayout from '@/components/layouts/DefaultLayout';

const finalRoutes = routes.map((route) => {
    return {
        ...route,
        element: route.layout === 'blank' ? <BlankLayout>{route.element}</BlankLayout> : <DefaultLayout>{route.element}</DefaultLayout>,
    };
});

const router = createBrowserRouter(finalRoutes);

export default router;
