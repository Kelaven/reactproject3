import React from "react";
import { appleImg, bagImg, searchImg } from "../utils";
import { navLists } from "../constants";

const Navbar = (props) => {


    return (
        <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
            <nav className="flex w-full screen-max-width">

                <img src={appleImg} alt="logo d'Apple" className="w-5 h-5" />

                <div className="flex flex-1 justify-center max-sm:hidden">
                    {navLists.map((nav, index) => (
                        <div key={index} className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all">
                            {nav}
                        </div>
                    ))}
                </div>

                <div className="flex max-sm:justify-end max-sm:flex-1 gap-7 items-baseline"> 
                    <img src={searchImg} alt="logo de loupe pour rechercher un mot clé" className="w-5 h-5" />
                    <img src={bagImg} alt="logo de panier d'achat" className="w-5 h-5" />
                </div>

            </nav>
        </header>
    );

}


export default Navbar;