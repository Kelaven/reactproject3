import React from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { rightImg, watchImg } from '../utils';
import VideoCarousel from './VideoCarousel';

const Highlights = () => {

    useGSAP(() => {
        gsap.to('#title', {
            opacity: 1,
            y: 0
        });
    }, []);

    useGSAP(() => {
        gsap.to('.link', {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.25,
        });
    }, []);




    return (
        <section id="highlights" className='w-screen overflow-hidden h-full common-padding bg-zinc'>
            <div className="screen-max-width">
                <div className='mb-12 w-full md:flex items-center justify-between'>
                    <h1 id='title' className='section-heading'>Au programme.</h1>

                    <div className='flex flex-wrap items-end gap-5'>
                        <p className='link'>
                            Regarder le film
                            <img src={watchImg} alt="logo de bouton play vidéo" className='ml-2' />
                        </p>
                        <p className='link'>
                            Regarder l'évènement
                            <img src={rightImg} alt="logo de chevron vers la droite" className='ml-2' />
                        </p>
                    </div>
                </div>

                <VideoCarousel />
            </div>
        </section>
    )
}

export default Highlights;







// ! Memo : 

// * w-screen : 
// Cette classe définit la largeur de l'élément à la largeur de l'écran/viewport. Cela signifie que 
// peu importe la largeur du conteneur parent, l'élément s'étendra pour occuper la largeur entière 
// de l'écran. C'est utile pour les éléments que vous voulez s'étendre sur toute la largeur de la 
// page, comme un en-tête ou une section d'arrière-plan.
// w-full : Cette classe définit la largeur de l'élément à 100% de la largeur de son conteneur parent. 
// Cela signifie que l'élément occupera toute la largeur disponible de son parent, mais pas 
// nécessairement toute la largeur de l'écran. C'est utile lorsque vous voulez qu'un élément s'adapte à 
// la largeur de son conteneur sans déborder.