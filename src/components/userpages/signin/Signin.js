import React,{useState} from 'react';
import { LockClosedIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

export default function Signin(props) {
  const {adminUsers,Login,error}=props;
    const [details, setdetails] = useState({email:"",password:""});
    const submitHandler=(e)=>{
        e.preventDefault();
        Login(details);
      }
  return (
    <>
      <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto mb-3 h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
              alt="Workflow"
            />
            <h2 className="mt-0 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          </div>
          <form className="mt-8 space-y-6" action='/dashboard' method='GET'>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-cyan-600 focus:border-cyan-600 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={e=>setdetails({...details,email:e.target.value})} value={details.email}
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-cyan-600 focus:border-cyan-600 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={e=>setdetails({...details,password:e.target.value})} value={details.password}
                />
              </div>
              <span className='text-sm text-red-600 ml-0.5'>{error}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-cyan-700 focus:ring-cyan-600 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/signup" className="font-medium text-cyan-600 hover:text-cyan-500">
                  Sign Up
                </Link>
              </div>
            </div>

            <div>
                <button type='submit'
                onClick={submitHandler}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-900 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-cyan-700 group-hover:text-cyan-600" aria-hidden="true" />
                    </span>
                    Sign in
                </button> 
            </div>
          </form>
        </div>
      </div>
    </>
  )
}