import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react'
import { animateWithGsap } from '../utils/animations';
import { explore1Img, explore2Img, exploreVideo } from '../utils';

const Features = () => {

    const videoRef = useRef();

    useGSAP(() => {
        animateWithGsap('#exploreVideo', {
            scrollTrigger: {
                trigger: '#exploreVideo',
                toggleActions: 'play pause reverse restart',
                start: '-10% bottom',
            },
            onComplete: () => { // relancer quand la vidéo est terminée
                videoRef.current.play(); // on selectionne la vidéo grâce au useRef, donc on utilise videoRef.current.fonction
            }
        })

        animateWithGsap('#features_title', { y: 0, opacity: 1 }) // fonction conçue dans animations.js

        animateWithGsap('.g_grow',
            { scale: 1, opacity: 1, ease: 'power1' },
            { scrub: 5.5 } // utilisé pour créer des animations de défilement lisse ("smooth scrolling animations", scrollTrigger)
            // Lorsque l'on utilise l'option scrub, cela permet à l'animation de suivre le défilement de la page, au lieu de se jouer une seule fois lorsqu'un point spécifique est atteint.
        )

        animateWithGsap('.g_text',
            { y: 0, opacity: 1, ease: 'power2.inOut', duration: 1 }
        )

    }, []);




    return (
        <section className='h-full common-padding bg-zinc relative overflow-hidden'>
            <div className='screen-max-width'>
                <div className='mb-12 w-full'>
                    <h1 id='features_title' className='section-heading'>
                        Tous les détails.
                    </h1>
                </div>

                <div className='flex flex-col justify-center items-center overflow-hidden'>
                    <div className='mt-32 mb-24'>
                        {/* <div className='mt-32 mb-24 pl-24'> */}
                        <h2 className='text-5xl lg:text-7xl font-semibold'>iPhone.</h2>
                        <h2 className='text-5xl lg:text-7xl font-semibold'>Taillé dans le titane.</h2>
                    </div>
                    <div className='flex-center flex-col sm:px-10'>
                        <div className='relative h-[50vh] w-full flex items-center'>
                            <video playsInline id='exploreVideo' className='w-full h-full object-cover object-center' preload='none' muted autoPlay ref={videoRef}>
                                {/* playsInline pour garder la vidéo dans le contexte de l'écran (pas que sa taille change comme pour se mettre automatiquement en plein écran), 
                            preload='none' pour les perfs de la page,
                            reference pour la jouer plus tard */}
                                <source src={exploreVideo} type='video/mp4' />
                                {/* exploreVideo vient des utils */}
                            </video>
                        </div>

                        <div className='flex flex-col w-full relative'> {/*  containeur pour les images */}
                            <div className='feature-video-container'>
                                <div className='overflow-hidden flex-1 h-[50vh]'>
                                    <img src={explore1Img} alt="titane" className='feature-video g_grow' />
                                </div>
                                <div className='overflow-hidden flex-1 h-[50vh]'>
                                    <img src={explore2Img} alt="titane2" className='feature-video g_grow' />
                                </div>
                            </div>

                            <div>
                                <div className='feature-text-container'>
                                    <div className='flex-1 flex-center'>
                                        <p className='feature-text g_text text-justify'>
                                            L'iPhone 15 Pro est {''}
                                            <span className='text-white'>
                                                le premier iPhone avec un design en titane de qualité aérospatiale
                                            </span>
                                            , conçu à partir du même alliage que les véhicules d’exploration envoyés en mission sur Mars.
                                        </p>
                                    </div>
                                    <div>
                                        <p className='feature-text g_text text-justify'>
                                            Le titane est l’un des métaux offrant le meilleur ratio résistance/poids, ce qui nous a permis de créer nos
                                            <span className='text-white'> modèles pro les plus légers à ce jour
                                            </span>
                                            . Vous sentirez tout de suite la différence.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features