import React, { useEffect, useState } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { heroVideo, smallHeroVideo } from "../utils";

const Hero = () => {

    const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo);

    const handleVideoSrcSet = () => {
        if (window.innerWidth < 760) {
            setVideoSrc(smallHeroVideo);
        } else {
            setVideoSrc(heroVideo);
        };
    };

    useEffect(() => {
        window.addEventListener('resize', handleVideoSrcSet);

        return () => {
            window.removeEventListener('resize', handleVideoSrcSet)
        }
    }, []);

    useGSAP(() => {
        gsap.to('#hero', {
            opacity: 1,
            delay: 1.5
        });
    }, []);

    return (
        <section className="bg-black w-full nav-height relative">
            <div className='h-5/6 w-full flex-center flex-col'>
                <p id='hero' className='hero-title'>
                    iPhone 15 Pro
                </p>
                <div className='md:w-10/12 w-9/12'>
                    <video autoPlay muted playsInline={true} className='pointer-events-none' key={videoSrc}>
                        <source src={videoSrc} type='video/mp4' />
                    </video>
                </div>
            </div>

        </section>
    )
}

export default Hero;



// ! Memo : 

// * playsInline={true} : 
// Cette propriété est utilisée pour les éléments vidéo HTML5 dans les navigateurs mobiles, 
// en particulier dans iOS Safari. Sans cette propriété, les vidéos peuvent automatiquement 
// passer en mode plein écran lorsqu'elles sont lues sur un appareil mobile. En définissant 
// playsInline sur true, vous indiquez que la vidéo doit être lue dans le navigateur lui-même, 
// sans basculer en plein écran, ce qui donne une expérience plus intégrée, en particulier pour 
// les sites Web qui utilisent des vidéos comme partie du design plutôt que comme contenu principal.

// * key={videoSrc} : 
// Dans React, la propriété key est utilisée pour aider à identifier les éléments uniques dans 
// des listes ou lorsqu'un élément peut changer de façon dynamique, comme ici avec une source vidéo 
// différente selon la taille de l'écran. En assignant videoSrc comme clé au composant vidéo, vous 
// dites à React de recréer l'élément vidéo à partir de zéro chaque fois que videoSrc change. 
// Cela garantit que le navigateur charge et affiche la nouvelle source vidéo au lieu de continuer 
// à utiliser l'ancienne vidéo après un changement de source.

// * useEffect : 
// Ici, il est utilisé pour s'abonner à l'événement 'resize' de la fenêtre lors du montage du 
// composant pour ajuster la source vidéo selon la taille de la fenêtre et se désabonner de cet 
// événement lors du démontage du composant pour nettoyer et éviter les fuites de mémoire ou les 
// effets secondaires non désirés.

// * La logique window.innerWidth < 760 ? smallHeroVideo : heroVideo : 
// La raison pour laquelle cette logique est utilisée à la fois dans useState et handleVideoSrcSet 
// est que :
// Dans useState, elle détermine la source vidéo initiale au moment du chargement du composant en 
// fonction de la taille de l'écran actuelle.
// Dans handleVideoSrcSet, elle permet de changer la source vidéo dynamiquement en fonction des 
// changements de taille de la fenêtre après que le composant a déjà été chargé. 
// Cela garantit que la vidéo adaptée est toujours affichée même si l'utilisateur redimensionne 
// son navigateur ou pivote son appareil mobile après le chargement de la page.