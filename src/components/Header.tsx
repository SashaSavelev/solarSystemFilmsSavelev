import React from 'react';
import { Link } from 'react-router-dom';
import { FaFolderOpen, FaHeart, FaLongArrowAltRight, FaFilm, FaDatabase } from 'react-icons/fa';

const Header: React.FC = () => {
    return (
        <header className="fixed top-0 left-0 w-full bg-black p-3 lg:p-7 shadow-md z-50 flex flex-col lg:flex-row justify-between items-center">
            <h1 className=" font-tiny5 text-white text-3xl m-4">
                {' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-purple-500">Solar System Films</span>
            </h1>
            <div className="flex flex-wrap items-center gap-4">
                <Link
                    to="/favorites"
                    className={`flex p-2 lg:p-3 rounded-xl items-center text-white gap-2 hover:text-gray-200 ${
                        location.pathname === '/favorites' ? 'bg-gradient-to-tr from-black to-pink-700' : ''
                    }`}
                >
                    <span className="text-lg lg:text-xl hidden lg:block">Избранное</span>
                    <FaHeart className="mx-1 text-2xl lg:text-3xl" />
                    <FaLongArrowAltRight className="mx-1 text-2xl lg:text-3xl hidden lg:block" />
                    <FaFolderOpen className="mx-1 text-2xl lg:text-3xl hidden lg:block" />
                </Link>
                <Link
                    to="/"
                    className={`flex p-2 lg:p-3 rounded-xl items-center text-white gap-2 hover:text-gray-200 ${
                        location.pathname === '/' ? 'bg-gradient-to-tr from-black to-orange-700' : ''
                    }`}
                >
                    <span className="text-lg lg:text-xl hidden lg:block">На главную</span>
                    <FaDatabase className=" mx-1 text-2xl lg:text-3xl hidden lg:block" />
                    <FaLongArrowAltRight className="mx-1 text-2xl lg:text-3xl hidden lg:block" />
                    <FaFilm className=" mx-1 text-2xl lg:text-3xl" />
                </Link>
            </div>
        </header>
    );
};

export default Header;
