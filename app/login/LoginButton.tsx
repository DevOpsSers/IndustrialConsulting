'use client'

export default function LoginButton() {
    return(
        <div className="mt-8">
            <button role="button" aria-label="Login" className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">
                Login
            </button>
        </div>
    )
}