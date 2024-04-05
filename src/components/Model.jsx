import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ModelView from './ModelView';
import { yellowImg } from '../utils';
import * as THREE from "three";
import { View } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { models } from '../constants';
import { sizes } from '../constants';

const Model = () => {

    // il ya deux téléphones à manipuler : le petit et le grand
    const [size, setSize] = useState('small');
    const [model, setModel] = useState({
        title: 'iPhone 15 Pro en titane naturel',
        color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
        img: yellowImg
    })

    // controle de la caméra :
    const cameraControlSmall = useRef();
    const cameraControlLarge = useRef();

    // modele : 
    const small = useRef(new THREE.Group());
    const large = useRef(new THREE.Group());
    // THREE.Group est une classe dans Three.js qui permet de grouper plusieurs objets 3D ensemble. 
    // Un groupe peut contenir des meshs, des caméras, des lumières, ou même d'autres groupes. 

    // rotation :
    const [smallRotation, setSmallRotation] = useState(0);
    const [largeRotation, setLargeRotation] = useState(0);

    useGSAP(() => {
        gsap.to('#heading', {
            opacity: 1,
            y: 0
        });
    }, []);


    return (
        <section className='common-padding'>
            <div className='screen-max-width'>
                <h1 id='heading' className='section-heading'>
                    De plus près.
                </h1>

                <div className='flex flex-col items-center mt-5'> {/* conteneur pour le telephone */}
                    <div className='w-full h-[75vh] md:h-[90vh] overflow-hidden relative'>
                        <ModelView
                            index={1}
                            groupRef={small}
                            gsapType="view1"
                            controlRef={cameraControlSmall}
                            setRotationState={setSmallRotation}
                            item={model}
                            size={size}
                        />
                        <ModelView
                            index={2}
                            groupRef={large}
                            gsapType="view2"
                            controlRef={cameraControlLarge}
                            setRotationState={setLargeRotation}
                            item={model}
                            size={size}
                        />

                        <Canvas // vient de React three fiber : conteneur pour la scène 3D. initialise automatiquement une scène 3D, une caméra et un renderer WebGL.
                            className='w-full h-full'
                            style={{
                                position: 'fixed',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                overflow: 'hidden'
                            }}
                            eventSource={document.getElementById('root')} // pour interagir avec le modèle sur lequel on travaille
                        >
                            <View.Port /> {/* <View> permet d'afficher plusieurs vues d'un modèle dans le même canvas, donc d'animer le modèle. Vient de react three drei, à utiliser avec .Port quand c'est placé dans un canvas. */}
                        </Canvas>
                    </div>
                    <div className='mx-auto w-full'>
                        <p className='text-sm font-light text-center mb-5'>{model.title}</p>
                        <div className='flex-center'> {/*  conteneur des palettes de couleurs */}
                            <ul className='color-container'>
                                {models.map((item, index) => (
                                    <li
                                        key={index}
                                        className='w-6 h-6 rounded-full mx-2 cursor-pointer'
                                        style={{ backgroundColor: item.color[0] }}
                                        onClick={() => setModel(item)} // au click, sélectionne les infos de la couleur cliquée
                                    />
                                ))}
                            </ul>
                            <button className='size-btn-container'> {/* pour choisir la taille du téléphone */}
                                {sizes.map(({ label, value }) => (
                                    // Normalement, map recevrait un objet complet comme argument : sizes.map(size => { ... });
                                    // Mais au lieu de cela, on utilise la déstructuration d'objet dans les arguments de la fonction : sizes.map(({label, value}) => { ... });
                                    // Cela permet d'accéder directement à label et value à l'intérieur de la fonction sans avoir à faire référence à l'objet original. 
                                    // C'est un moyen plus propre et plus direct d'accéder aux propriétés des objets lorsque l'on sait quelles propriétés on a besoin d'utiliser.
                                    <span
                                        key={label}
                                        className='size-btn'
                                        style={{
                                            backgroundColor: size === value ? 'white' : 'transparent', // size est la constante définie avec useState. Donc si value est small, alors le bg est white sinon transparent
                                            color: size === value ? 'black' : 'white'
                                        }}
                                        onClick={() => setSize(value)}
                                    >
                                        {label}
                                    </span>
                                ))}
                            </button>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default Model;




// * Memo : 

// ? @react-three/fiber est une bibliothèque React qui permet d'utiliser Three.js dans le cadre d'une application React.
// Les bibliothèques associées à @react-three/fiber sont des extensions ou des outils qui complètent et étendent les fonctionnalités de base de @react-three/fiber, 
// permettant ainsi aux développeurs de créer plus facilement des scènes 3D interactives avec React.
// Parmi les bibliothèques les plus connues : 

// @react-three/drei
// Description : Une collection d'helpers, d'abstractions, et de composants réutilisables pour @react-three/fiber. 
// Elle offre une variété d'objets et d'outils utiles, comme des contrôles de caméra, des modèles prêts à l'emploi, des lumières, des ombres, et bien plus.
// Utilisation typique : Simplifier la mise en place de scènes 3D communes, fournir des composants prêts à l'emploi (comme des boutons 3D, des environnements, des contrôleurs de caméra, etc.).

// @react-three/cannon
// Description : Un wrapper React pour cannon-es, un moteur de physique pour les jeux et les simulations en 3D. Il permet d'ajouter des effets physiques réalistes aux objets 3D.
// Utilisation typique : Ajouter la gravité, les collisions, et d'autres comportements physiques aux objets dans les scènes 3D.

// @react-three/postprocessing
// Description : Permet d'ajouter et de configurer des effets de post-traitement à vos scènes 3D créées avec @react-three/fiber. Le post-traitement peut inclure des effets visuels comme le flou, le bloom, le tone mapping, etc.
// Utilisation typique : Améliorer visuellement la scène 3D avec des effets appliqués après le rendu initial de la scène.

// @react-three/flex
// Description : Apporte la puissance du layout Flexbox à @react-three/fiber, permettant une mise en page plus facile des éléments 3D, similaire à l'utilisation de Flexbox dans le développement web classique.
// Utilisation typique : Organiser les éléments 3D dans la scène de manière intuitive, avec le support du layout Flexbox.