import React from 'react';
import { FaInstagram,FaFacebook,FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="dark:bg-coolGray-800 dark:text-coolGray-50 bg-gray-800 text-gray-300 shadow-2xl relative bottom-0">
            <div className="container flex flex-col pb-6 p-4 mx-auto md:p-8 lg:flex-row lg:mb-0 divide-coolGray-400 text-lg">
                <ul className="self-center py-6 space-y-4 text-center sm:flex sm:space-y-0 sm:justify-around sm:space-x-4 lg:flex-1 lg:justify-start">
                    <li>Don't find a book? Contact Us.</li>
                </ul>
                <div className="flex flex-col justify-center items pt-6 lg:pt-0">
                    <div className="flex justify-center space-x-6 text-3xl">
                        <a rel="noopener noreferrer" href="https://twitter.com/Ridaajam999" title="Twitter" className="flex text-blue-500 items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 dark:bg-violet-400 dark:text-coolGray-900">
                            <FaTwitter />
                        </a>
                        <a rel="noopener noreferrer" href="https://www.facebook.com/rida.ossmanajam/" title="Facebook" className="flex text-blue-700 items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 dark:bg-violet-400 dark:text-coolGray-900">
                            <FaFacebook />
                        </a>
                        <a rel="noopener noreferrer" href="https://www.instagram.com/r.i.d_aj/" title="Gmail" className="flex text-fuchsia-500 items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 dark:bg-violet-400 dark:text-coolGray-900">
                            <FaInstagram />
                        </a>
                    </div>
                    <hr className='mt-2'/>
                    <p className='text-sm text-center'>Copyright 2022 - RidaAjam</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
