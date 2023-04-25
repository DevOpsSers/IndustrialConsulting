import '../../styles/globals.css'
import VisitorsNavigation from '../../components/visitor/VisitorsNavigation'
import MobileNavigation from '../../components/visitor/MobileNavigation'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className="lg:flex w-full h-full bg-green-100">

        <div className="lg:w-3/12">
          <VisitorsNavigation/>
        </div>
        {/* <div className="w-12/12 lg:hidden">
          <MobileNavigation/>
        </div> */}
        <div className='w-8/12 h-screen ml-auto mr-auto'>
          {children}
        </div>
        
        
      </body>
    </html>
  )
}
