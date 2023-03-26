import '../../styles/globals.css'
import Navigation from '../../components/DashboardNavigation'
import MobileNavigation from '../../components/MobileNavigation'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className="lg:flex w-full h-full bg-green-100">

        <div className="lg:w-3/12 hidden lg:block">
          <Navigation/>
        </div>
        <div className="w-12/12 lg:hidden">
          <MobileNavigation/>
        </div>
        <div className='w-8/12 h-screen ml-auto mr-auto'>
          {children}
        </div>
        
        
      </body>
    </html>
  )
}
