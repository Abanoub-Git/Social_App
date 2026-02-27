// import { StrictMode } from 'react'
// import CounterContext from './Context/CounterContext/CounterContext'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HeroUIProvider } from '@heroui/react'
import { RouterProvider } from 'react-router'
import { myRouter } from './Routing/AppRouter'
import { Toaster } from 'react-hot-toast'
import AuthContextProvider from './Context/AuthContextProvider/AuthContextProvider'
import 'react-loading-skeleton/dist/skeleton.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Offline, Online } from 'react-detect-offline'



createRoot(document.getElementById('root')).render(
  <>
    <QueryClientProvider client={new QueryClient()}>
      <AuthContextProvider>
        {/* <CounterContext> */}
          <HeroUIProvider>
            <RouterProvider router={myRouter}/>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            <Toaster/>
          </HeroUIProvider>
        {/* </CounterContext> */}
      </AuthContextProvider>
    </QueryClientProvider>
    <Offline>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-200 animate-slideDown">
        <div className="flex items-center gap-4 bg-linear-to-r from-red-800 to-red-700 text-white px-6 py-4 rounded-2xl shadow-2xl border border-red-400">
          <div className="w-10 h-10 flex items-center text-3xl justify-center rounded-full bg-white/20 p-7">
            📡
          </div>
          <div>
            <p className="font-semibold text-md">You're Offline</p>
            <p className="text-sm text-red-100">
              Check your internet connection
            </p>
          </div>
        </div>
      </div>
    </Offline>
  </>
)



