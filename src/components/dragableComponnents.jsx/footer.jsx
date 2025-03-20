import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <div>
            <footer className="bg-gray-900 text-white py-10">
                <div className="container mx-auto px-6 md:px-12">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div>
                            <h2 className="text-2xl font-bold">Luli Universe</h2>
                            <p className="mt-3 text-gray-400">
                                Bringing you the best web solutions with modern technology.
                            </p>
                            {/* Social Media Icons */}
                            <div className="flex space-x-4 mt-4">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <FaFacebook size={20} />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <FaTwitter size={20} />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <FaInstagram size={20} />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <FaLinkedin size={20} />
                                </a>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">Quick Links</h3>
                            <ul className="mt-3 space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                            </ul>
                        </div>


                        <div>
                            <h3 className="text-xl font-semibold">Subscribe</h3>
                            <p className="text-gray-400 mt-3">Get updates on our latest services.</p>
                            <div className="mt-4 flex">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full p-2 rounded-l bg-gray-800 border border-gray-700 text-white outline-none"
                                />
                                <button className="bg-blue-500 px-4 py-2 rounded-r hover:bg-blue-600">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 text-center text-gray-500 border-t border-gray-700 pt-5">
                        &copy; {new Date().getFullYear()} Luli Universe. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;