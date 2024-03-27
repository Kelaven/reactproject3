import React, { useEffect, useRef, useState } from 'react';
import { hightlightsSlides } from '../constants';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { pauseImg, playImg, replayImg } from '../utils';





const VideoCarousel = () => {


    ////////////////// ! VARIABLES ! //////////////////

    // useRef est un Hook qui permet de conserver des références sur les éléments du DOM et les valeurs à travers les re-renders du composant. 
    // useRef est initialisé avec un tableau vide car on envisage de stocker les références de plusieurs éléments vidéo.
    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    const [video, setVideo] = useState({ // Ici, useState est utilisé pour gérer l'état local des vidéos (si elles sont en cours de lecture, si la vidéo a atteint la fin, etc.).
        isEnd: false, // Indique si la vidéo est terminée
        startPlay: false, // Commence à jouer la vidéo
        videoId: 0, // ID de la vidéo actuelle
        isLastVideo: false, // Vérifie si c'est la dernière vidéo
        isPlaying: false // Vérifie si la vidéo est en cours de lecture
    });
    const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video; // pour éviter d'avoir a écrire video.clé à chaque fois, destructuring

    const [loadedData, setLoadedData] = useState([]);




    ////////////////// ! ANIMATION ! //////////////////

    useGSAP(() => {
        gsap.to('.video', {
            // x: 250,
            // repeat: -1
        });
    }, [isEnd, videoId]);



    ////////////////// ! EFETS ! //////////////////

    // Les effets (useEffect) sont utilisés pour effectuer des effets secondaires dans les composants fonctionnels. 
    // Ici, ils sont utilisés pour mettre en pause ou jouer des vidéos basées sur l'état du composant.
    useEffect(() => { // Gestion de la lecture et de la pause des vidéos
        if (loadedData.length > 3) { // vérifie si le tableau loadedData contient plus de trois éléments. 
            // Dans le contexte d'un carrousel de vidéos, cette condition est utilisée pour s'assurer que toutes les vidéos (ou du moins un certain nombre minimal attendu) ont bien été chargées avant d'essayer de les jouer ou de les mettre en pause.
            // Cela peut aider à éviter des erreurs, comme essayer d'accéder à une vidéo qui n'a pas encore été chargée, ce qui pourrait entraîner des bugs ou des comportements imprévus.
            if (!isPlaying) { // Contrôle de la vidéo basée sur l'état de lecture
                videoRef.current[videoId].pause(); // Met en pause la vidéo actuelle si elle est en train de jouer
                // videoRef: C'est la référence créée à l'aide de useRef().
                // .current: C'est une propriété de l'objet de référence. Elle contient la valeur actuelle de la référence, qui est l'élément du DOM auquel la référence est attachée.
                // Lorsque l'on fait videoRef.current[videoId].pause(), on accède à l'élément vidéo spécifique dans le tableau de références qui correspond à l'ID de la vidéo actuelle, et on appelle la méthode .pause() de cet élément vidéo pour le mettre en pause. 
                // En bref, ça permet de contrôler directement la lecture des éléments vidéo dans notre composant en fonction de l'état ou des interactions de l'utilisateur.
            } else {
                startPlay && videoRef.current[videoId].play(); // Joue la vidéo actuelle si l'état startPlay est vrai
            }
        }

        return () => { // Nettoyage pour éviter les effets secondaires lors du démontage du composant si nécessaire
        }
    }, [startPlay, videoId, isPlaying, loadedData]); // Réexécute l'effet si ces valeurs changent


    useEffect(() => {
        const currentProgress = 0;
        let span = videoSpanRef.current;

        if (span[videoId]) {
            // animer la progression de la vidéo
            let anim = gsap.to(span[videoId], {
                onUpdate: () => {

                },
                onComplete: () => {

                }

            })
        }

        return () => {

        }
    }, [videoId, startPlay]) // on aura besoin de rappeler useEffect quand le videoId ou le startPlay changera 



    ////////////////// ! FONCTIONS ! //////////////////

    // La fonction handleProcess est utilisée pour gérer différents types d'événements liés à la lecture vidéo (comme fin de vidéo, lecture, pause, etc.), et elle met à jour l'état du composant en conséquence.
    const handleProcess = (type, index) => {
        switch (type) {
            case 'video-end':
                // Marque la vidéo comme terminée et passe à la vidéo suivante
                setVideo((prevVideo) => ({ ...prevVideo, isEnd: true, videoId: index + 1 }));
                // Dans le contexte des objets, le spread operator permet de copier facilement toutes les paires clé-valeur d'un objet dans un nouvel objet. 
                // C'est particulièrement utile dans React pour mettre à jour l'état qui est un objet sans modifier l'état original, respectant ainsi l'immutabilité des données.
                // Ici, on met à jour l'état 'video' avec (prevVideo) => { ... }: C'est une fonction fléchée qui reçoit l'état précédent de video (que nous appelons prevVideo) comme argument. 
                // Cette fonction retourne un nouvel objet qui deviendra le nouvel état de video.
                // Donc ici, le spread operator ... est utilisé pour copier toutes les propriétés de l'état précédent prevVideo dans un nouvel objet. Ensuite, cet objet est modifié.
                break;
            case 'video-last':
                // Marque que la dernière vidéo a été atteinte
                setVideo((pre) => ({ ...pre, isLastVideo: true }));
                break;
            case 'video-reset':
                // Réinitialise le carrousel de vidéos au début
                setVideo((pre) => ({ ...pre, isLastVideo: false, videoId: 0 }));
                break;
            case 'play':
                // Bascule l'état de lecture de la vidéo
                setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
                // isPlaying: !pre.isPlaying : Cette partie de l'objet mis à jour inverse la valeur actuelle de isPlaying dans l'état video. 
                // Si isPlaying était true, il deviendra false, et vice-versa (toggle). 
                // Cela est souvent utilisé pour des fonctionnalités de type interrupteur (on/off) comme jouer ou mettre en pause une vidéo.
                // En résumé, setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying })); est une manière de dire : 
                // "Prends l'état actuel de video, conserve toutes ses propriétés actuelles, mais inverse la valeur de isPlaying". 
                // Cela permet de mettre à jour l'état de manière prévisible sans affecter d'autres valeurs d'état qui ne doivent pas changer.
                // Si pre.isPlaying est actuellement true : signifie que la vidéo est en train de jouer.
                break;
            default:
                // Ne change rien si le type d'action n'est pas reconnu
                return video;

            // Dans le cadre du switch, la logique est utilisée pour gérer différents cas (comme 'video-end', 'video-last', etc.) en fonction des actions de l'utilisateur ou des événements dans l'application. 
            // À chaque fois, on prend l'état actuel de video, on conserve toutes ses propriétés, et on modifie uniquement les propriétés nécessaires en fonction de l'action en cours.
            // Le spread operator est donc utilisé ici pour créer une nouvelle version de l'objet d'état tout en conservant les propriétés non modifiées de l'objet d'état précédent, ce qui aide à maintenir l'immutabilité de l'état.
        }
    }





    ////////////////// ! RETURN ! //////////////////

    return (
        <>
            <div className='flex items-center'> {/* conteneur pour le carrousel complet */}
                {hightlightsSlides.map((list, index) => ( // si je mets des paranthèses et non accodales, le return se fait immédiatement
                    <div key={list.id} className='slider sm:pr-20 pr-10'>
                        <div className='video-carousel_container'>
                            <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                                <video
                                    className='video'
                                    playsInline={true}
                                    preload='auto'
                                    muted
                                    ref={(el) => (videoRef.current[index] = el)} // Crée une référence pour chaque vidéo / DETAIL EN MEMO
                                    onPlay={() => { // Met à jour l'état lorsque la vidéo commence à jouer / DETAIL EN MEMO
                                        setVideo((prevVideo) => ({
                                            ...prevVideo, isPlaying: true
                                        }))
                                    }}
                                >
                                    <source src={list.video} type='video/mp4' />
                                </video>
                            </div>
                            <div className='absolute top-12 left-[5%] z-10'>
                                {list.textLists.map((text) => ( /* Affiche le texte associé à chaque vidéo */
                                    <p key={text} className='md:text-2xl text-xl font-medium'>
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='relative flex-center mt-10'> {/* conteneur principal pour les indicateurs de vidéo et le bouton de contrôle. */}
                <div className='flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full'>
                    {videoRef.current.map((_, index) => ( /* Affiche des indicateurs pour chaque vidéo */
                    // le _ est un placeholder pour le premier paramètre de la fonction map, qui serait normalement l'élément actuel du tableau lors de l'itération. 
                    // Quand on n'a pas besoin de cet élément dans la fonction, utiliser _ est une convention qui indique que ce paramètre est ignoré. 
                        <span
                            key={index}
                            ref={(el) => (videoDivRef.current[index] = el)} // Référence pour les indicateurs de progression
                            className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer' // donc ce sont les ronds sur lesquels on clique
                        >
                            <span
                                className='absolute h-full w-full rounded-full'
                                ref={(el) => (videoSpanRef.current[index] = el)} // Référence pour la barre de progression de la vidéo, le rond qui se transformera en barre de progression dynamique
                            />
                        </span>
                        // La structure avec les deux <span> imbriqués est utilisée pour créer des indicateurs pour chaque vidéo dans le carrousel. 
                        // Chaque indicateur est un cercle (rounded-full) qui peut servir de barre de progression (modifié dynamiquement avec GSAP). 
                        // Les références (ref) à ces éléments sont stockées dans videoDivRef et videoSpanRef pour un accès ultérieur (pour la manipulation des animations).
                    ))}
                </div>
                <button className='control-btn'>
                    <img
                        // Si isLastVideo est true, cela signifie que l'on est à la dernière vidéo, donc l'image affichée est celle du bouton replayImg (logo rejouer).
                        // Si isPlaying est false, cela signifie que la vidéo est en pause ou n'a pas commencé, donc l'image affichée est celle du bouton playImg (logo jouer).
                        // Si aucune des conditions précédentes n'est vraie, cela signifie que la vidéo est en cours de lecture, donc l'image affichée est celle du bouton pauseImg (logo pause).
                        src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                        alt={isLastVideo ? "logo rejouer" : !isPlaying ? "logo jouer" : "logo pause"}
                        onClick={isLastVideo ? () => handleProcess('video-reset') : !isPlaying ? () => handleProcess('play') : () => handleProcess('pause')}
                        // Le onClick sur l'image gère la logique de changement d'état pour jouer, mettre en pause ou réinitialiser la vidéo en fonction de l'état actuel de la lecture vidéo.
                    />
                </button>
            </div>
        </>
    )
}

export default VideoCarousel;




////////////////// * MEMO * //////////////////

// ? ref={(el) => (videoRef.current[index] = el)}
// ref={...} : Cette partie est une prop spéciale en React qui accepte une fonction de rappel (callback function) ou un objet créé par useRef(). 
// Cette prop est utilisée pour attacher une référence à un élément du DOM. Lorsque l'élément correspondant est monté (rendered), React passera 
// l'élément du DOM à la fonction de rappel ou assignera cet élément à l'attribut .current de l'objet de référence.

// (el) => {...} : C'est une fonction de rappel qui est appelée par React une fois l'élément du DOM monté. 
// Le paramètre el représente l'élément du DOM auquel la ref est attachée (dans ce cas, un élément <video>).

// videoRef.current[index] = el : videoRef est un objet créé à partir de useRef(). L'attribut current de cet objet est destiné à contenir la référence réelle. 
// Dans ce cas, puisque l'on travaille avec plusieurs éléments vidéo, on utilise un tableau pour stocker chaque référence de vidéo. 
// L'index correspond à la position de la vidéo dans la liste (ou dans le carrousel). Donc, pour chaque vidéo rendue, on assigne la référence de cet élément vidéo 
// à la position index dans le tableau stocké dans videoRef.current.

// En résumé, chaque fois qu'un élément vidéo est monté, sa référence est stockée dans le tableau videoRef.current à l'index correspondant. 
// Cela permet de référencer et de manipuler directement chacun des éléments vidéo du DOM à partir du code React, par exemple, pour contrôler la lecture, mettre en pause, etc. 
// C'est une technique commune lorsqu'on travaille avec des listes d'éléments interactifs en React.


// ? onPlay={() => {
// ?     setVideo((prevVideo) => ({
// ?         ...prevVideo, isPlaying: true
// ?     }));
// ? }}
// (prevVideo) => ({...prevVideo, isPlaying: true}) : Cette fonction fléchée est passée à setVideo. Elle prend l'état actuel prevVideo (qui représente l'état video avant la mise à jour) comme argument. 
// L'utilisation de cette fonction est recommandée pour les mises à jour d'état qui dépendent de l'état précédent.

// ...prevVideo : Le spread operator est utilisé ici pour copier toutes les propriétés de l'objet prevVideo dans un nouvel objet. 
// Cela garantit que toutes les autres propriétés de l'état video sont préservées lorsque l'on mette à jour une seule propriété (isPlaying).

// isPlaying: true : Cette partie modifie la propriété isPlaying de l'état video, la définissant sur true, ce qui indique que la vidéo est en cours de lecture.

// En résumé : Ce gestionnaire d'événements se déclenche lorsque la vidéo commence à jouer. Il appelle la fonction setVideo, qui met à jour l'état du composant. 
// L'état 'video' est un objet contenant plusieurs propriétés liées à l'état de la lecture vidéo. Dans ce cas, le spread operator (...) est utilisé pour conserver toutes les propriétés actuelles 
// de l'état 'video' tout en mettant à jour la propriété 'isPlaying' pour refléter que la vidéo est désormais en cours de lecture. Cela assure que nous ne remplaçons pas l'ensemble de l'objet d'état 
// mais seulement modifions la valeur nécessaire tout en conservant les autres valeurs intactes.


// ? La fonction callback :
// Une fonction callback est une fonction passée à une autre fonction en tant qu'argument, qui est ensuite invoquée à l'intérieur de la fonction externe pour compléter une sorte de routine ou d'action.
// En d'autres termes, une fonction callback est une fonction que l'on fourni à une autre fonction pour qu'elle soit appelée (ou "rappelée") ultérieurement.

// Exemple : 
// function greeting(name) {
//     alert(`Bonjour ${name}`);
//   }

//   function processUserInput(callback) {
//     const name = prompt('Veuillez entrer votre nom.');
//     callback(name);
//   }

//   processUserInput(greeting);

// Ici, greeting est une fonction callback. Nous la passons à la fonction processUserInput. Lorsque l'utilisateur saisit son nom, processUserInput appelle greeting en lui passant le nom de l'utilisateur.