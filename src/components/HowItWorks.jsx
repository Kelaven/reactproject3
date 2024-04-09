import React, { useRef } from 'react';
import { chipImg, frameImg, frameVideo } from '../utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { animateWithGsap } from '../utils/animations';

const HowItWorks = () => {

    const videoRef = useRef();

    useGSAP(() => {
        gsap.from('#chip', {
            scrollTrigger: {
                trigger: '#chip',
                start: '20% bottom'
            },
            opacity: 0,
            scale: 2,
            duration: 2,
            ease: 'power1.inOut'
        });

        // animateWithGsap('.g_fadeIn', {
        //     opacity: 1,
        //     y: 0,
        //     duration: 1,
        //     ease: 'power2.inOut'
        // })

        gsap.to('.g_fadeIn', {
            scrollTrigger: {
                trigger: '.g_fadeIn',
                start: 'top'
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.inOut'
        });

    }, []);




    return (
        <section className='common-padding'>
            <div className='screen-max-width'>
                <div id='chip' className='flex-center w-full my-20'> {/* containeur pour la puce */}
                    <img src={chipImg} alt="puce A17 Pro" height={180} />
                </div>

                <div className='flex flex-col items-center'>  {/* containeur pour le texte */}
                    <h2 className='hiw-title'>
                        Puce A17 Pro. <br />
                        Géante pour le gaming.
                    </h2>
                    <p className='hiw-subtitle'>
                        Découvrez la métamorphose la plus spectaculaire de l’histoire des processeurs graphiques Apple.
                    </p>
                </div>

                <div className='mt-10 md:mt-20 mb-14 '>  {/* containeur pour la vidéo */}
                    <div className='relative h-full flex-center'>
                        <div className='overflow-hidden'>
                            <img src={frameImg} alt="Vidéo" className='bg-transparent relative z-10' /> {/* image de l'iPhone au contenu vide */}
                        </div>
                        <div className='hiw-video'>
                            <video className='pointer-events-none' playsInline preload='none' muted autoPlay ref={videoRef}>
                                <source src={frameVideo} type="video/mp4" className='object-cover' />  {/* vidéo */}
                            </video>
                        </div>
                    </div>

                    <p className='text-gray font-semibold text-center mt-3'>
                        Honkai: Star Rail
                    </p>

                    <div className="hiw-text-container mt-16">
                        <div className="flex flex-1 justify-center flex-col text-justify">
                            <p className="hiw-text g_fadeIn">
                                La puce A17 Pro inaugure une toute nouvelle ère pour l’iPhone et livre {' '}
                                <span className="text-white">
                                    de loin nos meilleures performances graphiques
                                </span>.
                            </p>

                            <p className="hiw-text g_fadeIn">
                                <span className="text-white">
                                    Les jeux mobiles sont plus immersifs que jamais
                                </span>,
                                avec des environ­nements ultra-détaillés et des personnages plus réalistes. Et grâce à sa vitesse et à son efficacité énergétique de pointe, l’A17 Pro vous propulse dans une autre dimension.
                            </p>
                        </div>


                        <div className="flex-1 flex justify-center flex-col g_fadeIn">
                            <p className="hiw-text">Nouveau</p>
                            <p className="hiw-bigtext">GPU de niveau Pro</p>
                            <p className="hiw-text">avec 6 cœurs</p>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default HowItWorks;