import gsap from "gsap"

import { ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollTrigger);

export const animateWithGsap = (target, animationProps, scrollProps) => { // on défini la fonction comme une méthode en PHP, pour éviter d'avoir à répéter le code du ScrollTrigger dans chacune de nos animations (concept du DRY)
// target est l'élément animé, 
// animationProps est un objet contenant les propriétés d'animation telles que duration, ease, et les propriétés CSS à animer,
// scrollProps est un objet contenant des propriétés pour contrôler l'animation en relation avec le défilement de la page en utilisant le plugin ScrollTrigger de GSAP.
    gsap.to(target, {
        ...animationProps, // voir memo sur les spreads operator plus bas
        scrollTrigger: {
            trigger: target,
            toggleActions: 'restart reverse restart reverse',
            start: 'top 85%',
            ...scrollProps,
        }
        // La raison pour laquelle une accolade est mise après "target," et qu'on y encadre "scrollTrigger" est due à la structure requise par GSAP pour configurer les animations. 
        // Lorsque l'on passe les configurations à gsap.to(), le deuxième argument attend un objet.
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




// * MEMO * //

// L'utilisation des spread operators (...) dans les fonctions animateWithGsap et animateWithGsapTimeline est un excellent moyen de fusionner des objets et de faciliter la transmission de propriétés d'animation dynamiques. 
// Voici des explications améliorées :

// ? Fonction animateWithGsap
// Dans animateWithGsap, le spread operator est utilisé deux fois pour intégrer dynamiquement des propriétés d'objet :
// ...animationProps : Cet usage permet d'intégrer toutes les propriétés de l'objet animationProps directement dans le premier argument de la fonction gsap.to(). Cela signifie que l'on peut passer un objet contenant des propriétés 
// d'animation personnalisées (comme duration, ease, x, y, etc.) et ces propriétés seront appliquées à l'animation de l'élément cible. C'est une manière flexible d'utiliser différentes animations sans avoir à modifier la logique interne de la fonction.
// ...scrollProps : De manière similaire, le spread operator est utilisé pour intégrer les propriétés de scrollProps dans l'objet scrollTrigger. Cela permet de personnaliser le comportement du déclencheur de défilement (ScrollTrigger) pour chaque animation, 
// en spécifiant des propriétés telles que start, end, markers, etc., qui contrôlent comment et quand l'animation se déclenche en relation avec le défilement de la page.``

// En d'autres termes, cette fonction est une manière élégante de créer des animations avec GSAP, en permettant d'ajouter des animations personnalisées à des éléments spécifiques des pages web.
// Elle encapsule la logique nécessaire pour animer un élément cible (target) en utilisant GSAP, tout en intégrant la puissance du plugin ScrollTrigger pour déclencher ces animations en fonction du défilement de la page. Voici une explication détaillée de chaque partie de votre fonction :
// target: C'est le sélecteur CSS ou l'élément du DOM que l'on souhaite animer. On peut passer ici un identifiant unique, une classe, ou même un élément du DOM directement. GSAP utilisera ce cible pour appliquer les animations que l'on défini.
// animationProps: C'est un objet contenant les propriétés d'animation que l'on souhaite appliquer à l'élément cible. Ce pourrait être n'importe quelle propriété animable par GSAP, comme x pour la translation horizontale, y pour la translation verticale, opacity pour l'opacité, scale pour l'échelle, etc. 
// L'utilisation du spread operator (...) permet d'intégrer ces propriétés directement dans l'objet de configuration passé à la méthode gsap.to().
// scrollProps: C'est un objet contenant les configurations spécifiques au ScrollTrigger. Par exemple, on peut définir à quel moment de la page l'animation doit se déclencher (start), quel élément sert de déclencheur (trigger), et quelles actions entreprendre lors de divers événements de défilement (toggleActions). 
// Encore une fois, l'utilisation du spread operator ici permet d'intégrer ces configurations directement dans l'objet scrollTrigger de la méthode gsap.to().
// L'intégration de ...animationProps permet de passer un ensemble flexible de propriétés d'animation, rendant la fonction réutilisable et adaptable à différents besoins d'animation. 
// De même, ...scrollProps rend possible la personnalisation du comportement du ScrollTrigger, en ajoutant une couche de réactivité basée sur le défilement aux animations.

// En résumé, animateWithGsap est une fonction puissante et flexible pour créer des animations dynamiques en fonction du défilement de la page, tout en offrant la flexibilité nécessaire pour personnaliser les animations et leur déclenchement.


// ? Fonction animateWithGsapTimeline
// Dans animateWithGsapTimeline, le spread operator est également utilisé pour ajouter des propriétés d'animation aux éléments firstTarget et secondTarget :
// ...animationProps : Dans ce contexte, le spread operator permet de passer un ensemble de propriétés d'animation qui seront appliquées à la fois à firstTarget et à secondTarget. 
// Cela garantit que les deux éléments peuvent être animés avec les mêmes paramètres (par exemple, même durée et type d'assouplissement) tout en permettant des animations spécifiques à chaque élément (comme des translations ou des opacités différentes).
// C'est une manière efficace de synchroniser les animations de plusieurs éléments tout en conservant la possibilité de les personnaliser.


// ? Dans les deux cas, l'utilisation des spread operators rend les fonctions d'animation plus modulaires et réutilisables, en offrant la flexibilité d'appliquer différentes propriétés d'animation et configurations de ScrollTrigger sans avoir à écrire 
// ? plusieurs variantes de ces fonctions. Cela facilite la maintenance et l'expansion du code d'animation, en permettant de construire des animations complexes avec moins de code et plus de clarté.