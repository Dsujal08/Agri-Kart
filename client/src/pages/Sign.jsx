import {React , useState} from 'react'
import { Link, NavLink } from 'react-router-dom'


function Sign() {
     const state = useState()
    return (
        <>
            <div className="flex h-screen">
                <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
                    <div className="max-w-md text-center">

                    <img src="https://img.freepik.com/free-vector/two-factor-authentication-concept-illustration_114360-5488.jpg?t=st=1738238316~exp=1738241916~hmac=9d79f3add18fc858f7425de926ecb73daf967f7061b98fd1a9ff63b04e8c80e7&w=740" className="w-full h-auto" />

                    </div>
                </div>

                <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
                    <div className="max-w-md w-full p-6">
                        <h1 className="text-3xl font-semibold mb-6 text-black text-center">Sign Up</h1>
                        <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">Join to Our Community with all time access and free </h1>
                        <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
                            <div className="w-full lg:w-1/2 mb-2 lg:mb-0">
                                <button type="button" className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4" id="google">
                                        {/* Google SVG path here */}
                                    </svg> Sign Up with Google
                                </button>
                            </div>
                            <div className="w-full lg:w-1/2 ml-0 lg:ml-2">
                                <button type="button" className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="github" className="w-4">
                                        {/* GitHub SVG path here */}
                                    </svg> Sign Up with Github
                                </button>
                            </div>
                        </div>
                        <div className="mt-4 text-sm text-gray-600 text-center">
                            <p>or with email</p>
                        </div>
                        <form action="#" method="POST" className="space-y-4">
                            <div>
                               
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                                <input type="text" id="username" name="username" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="text" id="email" name="email" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <input type="password" id="password" name="password" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" />
                            </div>
                            <div>
                                <button type="submit" className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Sign Up</button>
                            </div>
                        </form>
                        <div className="mt-4 text-sm text-gray-600 text-center">
                            <p>Already have an account? <Link to="/login" className="text-black hover:underline">Login here</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sign