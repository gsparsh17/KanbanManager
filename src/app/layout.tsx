import { Inter } from 'next/font/google'
import './globals.css'
// Remove the import and define metadata directly in this file
const metadata = {
  title: 'Task Management App',
  description: 'A simple task management application',
};
import { TaskProvider } from '../context/TaskContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          <TaskProvider>
            {children}
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </TaskProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

// Export the metadata
export { metadata }
