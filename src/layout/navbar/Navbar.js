import { createContext, Fragment,useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon,ShoppingCartIcon,HeartIcon } from '@heroicons/react/outline'
import { Link, NavLink } from 'react-router-dom'
import "./Navbar.css"
import Cart from './cart/Cart'
import { Avatar } from "@mui/material";

const navigation = [
  { name: 'Home', href: '/home'},
  { name: 'Categories', href: '/categories'},
  { name: 'Purchased', href: '/purchased'},
  { name: 'About', href: '/About'},
]

const ShowContext=createContext();

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Navbar(props) {
  const {Logout,CartItems,User,url,db}=props;
  const [Show, setShow] = useState(false);
  const HandleShowCart=()=>{setShow(!Show)};

  return (
    <>
      <div className="">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-4 lg:px-3">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.href}
                            className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                            
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        className="bg-gray-800 p-1 rounded-full text-gray-400 mr-1 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      >
                        <HeartIcon className="h-6 w-6" aria-hidden="true" /> 
                      </button>
                      <button
                        onClick={HandleShowCart}
                        className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      >
                        <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative">
                        <div>
                          <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <Avatar src={url} alt="" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {User.email==="admin@admin.com"||User.email==="delivery@delivery.com"?
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to="/users"
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Users
                                  </Link>
                                )}
                              </Menu.Item>:""}
                          {User.email==="admin@admin.com"?
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to="/addbooks"
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Add Books
                                  </Link>
                                )}
                              </Menu.Item>:""}
                              {User.email!==""?
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    onClick={Logout}
                                    to="/home"
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Sign out
                                  </Link>
                                )}
                              </Menu.Item>:
                              <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/signin"
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Sign in
                                </Link>
                              )}
                            </Menu.Item>}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <div className="flex items-center px-1 py-2 border-b border-gray-700 justify-between">
                  <div className='flex items-center'>
                    <div className="flex-shrink-0">
                      <Avatar src={url} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{User.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{User.email}</div>
                    </div>
                  </div>
                    <div>
                      <button
                        className="ml-auto bg-gray-800 mr-1 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      >
                        <HeartIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                      <button
                        onClick={HandleShowCart}
                        className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      >
                        <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  {navigation.map((item) => (
                    <Disclosure.Button className="w-full" key={item.href}>
                      <Link
                        to={item.href}
                        onClick={item.act}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block px-3 py-2 rounded-md text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="pb-3 border-t border-gray-700">
                  
                  <div className="mt-2 px-2 space-y-1">
                  {User.email==="admin@admin.com"?
                    <Disclosure.Button className="w-full">
                      <Link
                        to="/users"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        Users
                      </Link>
                    </Disclosure.Button>:""}
                    {User.email==="admin@admin.com"?
                    <Disclosure.Button className="w-full">
                      <Link
                        to="/admin"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        Add Books
                      </Link>
                    </Disclosure.Button>:""}
                    {User.email!==""?
                    <Disclosure.Button className="w-full">
                      <Link
                        to="/home"
                        onClick={Logout}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        Sign out
                      </Link>
                    </Disclosure.Button>:
                    <Disclosure.Button className="w-full">
                      <Link
                        to="/signin"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        Sign in
                      </Link>
                    </Disclosure.Button>}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
      <ShowContext.Provider value={{Show,setShow}}>
        <Cart CartItems={CartItems} db={db} User={User} />  
      </ShowContext.Provider>
    </>
  )
}

export { ShowContext };
export default Navbar;