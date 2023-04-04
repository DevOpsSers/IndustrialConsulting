import Image from 'next/image'
import house from '../public/images/forest-house.jpg'
import HomeHeader from 'components/HeaderHome'
import Head from './head'
export default function HomePage() {
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-gradient-to-tl from-lime-100 to-green-200 w-screen h-screen py-16 px-4">
      <Head props="Home" />
      <HomeHeader />

      <div className="relative isolate px-6 pt-14 lg:px-8">

        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className=" sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full py-1 px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  <Image className='h-auto max-w-full rounded-lg ' src={house} alt={'forest house'} width={500} height={300}></Image>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-yellow-700 sm:text-4xl">
              Energy responsable housing
            </h1>
            <p className="mt-6 text-lg leading-8 text-yellow-700">
              New forest housing is a company that rent houses in the New forest area with a responsible managin of energy.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="./login"
                className="rounded-md bg-lime-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log In
              </a>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}