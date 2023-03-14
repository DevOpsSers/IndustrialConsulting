import '../../styles/globals.css'
import Navigation from '../../components/DashboardNavigation'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className="flex w-full h-full">

        <div className="w-2/12">
          <Navigation/>
        </div>
        <div className='w-full h-screen'>
          {children}
        </div>
        
        
      </body>
    </html>
  )
}
