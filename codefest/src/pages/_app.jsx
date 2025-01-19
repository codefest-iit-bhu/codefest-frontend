import '@/styles/index.css'
import { Toaster } from 'react-hot-toast'
import '@/styles/App.css'
import { UserProvider } from '@/context/context'

export default function App({ Component, pageProps }) {
  return <UserProvider>
      <Toaster position="top-center" />
      <Component {...pageProps} />
  </UserProvider>
}
