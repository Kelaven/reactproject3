import React, { Suspense, useState, useEffect } from 'react';
import { OrbitControls, PerspectiveCamera, View } from '@react-three/drei';
import * as THREE from 'three';
import Lights from './Lights';
import IPhone from './IPhone';
import Loader from './Loader';

const ModelView = ({ index, groupRef, gsapType, controlRef, setRotationState, size, item }) => {

    const [isSceneReady, setIsSceneReady] = useState(false); // Initialiser l'état pour contrôler la préparation de la scène. 
    // Permet d'utiliser des éléments comme OrbitControls seulement quand tout est chargé pour éviter des bugs

    useEffect(() => {
        // Simuler le chargement des éléments de la scène ici
        const timer = setTimeout(() => setIsSceneReady(true), 1000); // Supposons que tout est chargé après 1 seconde

        return () => clearTimeout(timer); // Nettoyer le timer
    }, []); // Cet effet s'exécute une fois après le premier rendu

    return (
        <View /* de @react-three/drei */
            index={index}
            id={gsapType}
            className={`w-full h-full absolute ${index === 2 ? 'right-[-100%]' : ''}`} // pour switcher entre le petit téléphone et le grand
        >
            {/* lumière d'ambiance, illumine tous les objets de la scène de façon égale : */}
            <ambientLight intensity={0.3} />
            {/* ambientLight vient de three fiber */}
            <PerspectiveCamera makeDefault position={[0, 0, 4]} />
            {/* PerspectiveCamera vient de three drei, simule la caméra comme vue avec l'oeil humain. makeDefault pour en faire la caméra par défaut. */}

            <Lights />

            {/* Conditionner le rendu de OrbitControls basé sur isSceneReady */}
            {isSceneReady && (
                <OrbitControls
                    makeDefault
                    ref={controlRef}
                    enableZoom={false} // on veut pas pouvoir zoomer dessus
                    enablePan={false} // on ne veut pas le déplacer
                    autoRotateSpeed={0.4} // doucement et constant
                    target={new THREE.Vector3(0, 0, 0)} // cibler le centre de l'écran, c'est à dire où l'on a positionné l'iPhone dans le group ci-dessous
                    onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())} // pour placer la caméra là où on a arréter de faire pivoter.
                // getAzimuthalAngle pour savoir où on est dans l'espace.
                />
            )}

            <group
                ref={groupRef}
                name={index === 1 ? 'small' : 'large'}
                position={[0, 0, 0]} // la position permet de centrer l'iphone
            >
                <Suspense fallback={<Loader />}>
                    {/* Suspense enveloppe les composants qui chargent des données de manière asynchrone. 
                L'attribut fallback spécifie un contenu React temporaire à afficher pendant que le chargement est en cours, avant que le rendu du composant ou des composants enfants n'ait lieu. 
                L'utilisation de <Suspense> est particulièrement utile dans les applications web qui chargent des ressources lourdes ou qui font des appels réseau, car cela permet de maintenir une bonne expérience utilisateur en fournissant un retour visuel pendant l'attente. */}
                    <IPhone
                        scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}  // le tél doit être petit ou grand ? 
                        item={item}
                        size={size}
                    />
                </Suspense>
            </group>
        </View>
    );
}

export default ModelView;
