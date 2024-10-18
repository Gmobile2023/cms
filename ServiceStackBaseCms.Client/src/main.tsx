import '../tailwind.css'
import 'react/jsx-runtime'
import Layout from '@/components/Layout'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { Loading } from '@/components/Form'

import { Provider } from 'react-redux'
import store from './store/root'

import { ThemeProvider } from "@/components/theme-provider"
import { PropsWithChildren, StrictMode, Suspense, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
// import { RouterProvider, BrowserRouter as Router, useRoutes, useLocation } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import router from './router/index';

import routes from '~react-pages'

import press from "virtual:press"
import { PressContext } from './contexts'
import { useApp } from "@/gateway";

useApp().load()

// Define your props type
// interface AppProps extends PropsWithChildren<{}> {}

// function App({ children }: AppProps) {
//     return (
//         <Suspense fallback={<Layout><Loading className='p-4'></Loading></Layout>}>
//             <ThemeProvider defaultTheme="light" storageKey="color-scheme">
//                 <PressContext.Provider value={press}>
//                     {useRoutes(routes)}
//                     {children}
//                 </PressContext.Provider>
//             </ThemeProvider>
//         </Suspense>
//     )
// }

// function ScrollToTop() {
//     const { pathname } = useLocation();
//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, [pathname]);
//     return null;
// }

const app = createRoot(document.getElementById('root')!)

app.render(
    <StrictMode>
        {/* <Router> */}
            {/* <ScrollToTop /> */}
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        {/* </Router> */}
    </StrictMode>,
)