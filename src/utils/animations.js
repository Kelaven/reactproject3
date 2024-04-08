import gsap from "gsap"

import { ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollTrigger);

export const animateWithGsap = (target, animationProps, scrollProps) => {
// target est l'élément animé, 
// animationProps est un objet contenant les propriétés d'animation telles que duration, ease, et les propriétés CSS à animer,
// scrollProps est un objet contenant des propriétés pour contrôler l'animation en relation avec le défilement de la page en utilisant le plugin ScrollTrigger de GSAP.
    gsap.to(target, {
        ...animationProps,
        scrollTrigger: {
            trigger: target,
            toggleActions: 'restart reverse restart reverse',
            start: 'top 85%',
            ...scrollProps,
        }
    })
}

export const animateWithGsapTimeline = (timeline, rotationRef, rotationState, firstTarget, secondTarget, animationProps) => {
// timeline est l'instance de gsap.timeline() à laquelle on ajoute les animations,
// rotationRef est une référence à l'objet 3D dont on souhaite animer la rotation,
// rotationState est la valeur de rotation à atteindre, habituellement récupérée à partir de l'état du composant,
// firstTarget et secondTarget sont des sélecteurs ou des références aux éléments du DOM que l'on souhaite animer en parallèle avec la rotation,
// animationProps est un objet contenant les propriétés d'animation pour les éléments firstTarget et secondTarget.    
    timeline.to(rotationRef.current.rotation, {
        y: rotationState,
        duration: 1,
        ease: 'power2.inOut'
    })

    timeline.to(
        firstTarget,
        {
            ...animationProps,
            ease: 'power2.inOut'
        },
        '<' // L'option '<'' utilisée dans timeline.to() indique que l'animation de l'élément suivant doit commencer exactement au même moment que l'animation précédente.
    )

    timeline.to(
        secondTarget,
        {
            ...animationProps,
            ease: 'power2.inOut'
        },
        '<'
    )
}