import React from 'react'
import { footerLinks } from '../constants'

const Footer = () => {
    return (
        <footer className='py-5 sm:px-10 px-5'>
            <div className='screen-max-width'>
                <div>
                    <p className='font-semibold text-gray text-xs'>
                        Vous pouvez aussi faire vos achats {' '}
                        <span className='underline text-blue'>
                            dans un Apple Store{' '}
                        </span>
                        ou {' '}
                        <span className='underline text-blue'>
                            chez un revendeur
                        </span>
                        . Ou appeler le 0800 046 046.
                    </p>
                </div>

                <div className='bg-neutral-700 my-5 h-[1px] w-full' /> {/* hr */}

                <div className="flex w flex-col justify-between">
                    <p className="font-semibold text-gray text-xs">Copright @ 2024 Apple Inc. All rights reserved.</p>
                    <div className="flex flex-wrap sm:flex-nowrap md:flex-row flex-col mt-4 sm:mt-0 cursor-pointer">
                        {footerLinks.map((link, i) => (
                            <p key={link} className="font-semibold text-gray text-xs my-1 sm:my-0">
                                {link}{' '}
                                {i !== footerLinks.length - 1 && (
                                    <span className="hidden sm:inline mx-2"> | </span>
                                    // Affiche le séparateur seulement sur les écrans non-mobiles et seulement si le lien n'est pas le dernier du tableau
                                )}
                            </p>
                        ))}
                    </div>

                </div>
            </div>
        </footer>
    )
}

export default Footer