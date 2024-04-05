import React, { Suspense } from 'react'
import { PerspectiveCamera, View } from '@react-three/drei'
import * as THREE from 'three'
import Lights from './Lights'
import IPhone from './IPhone'

const ModelView = ({ index, groupRef, gsapType, controlRef, setRotationSize, size, item }) => {
    return (
        <View /* de @react-three/drei */
            index={index}
            id={gsapType}
            className={`border-2 border-red-500 w-full h-full ${index === 2} ?? 'right-[-100%]'`} // pour witcher entre le petit téléphone et le grand
        >
            {/* lumière d'ambiance, illumine tous les objets de la scène de façon égale : */}
            <ambientLight intensity={0.3} /> {/* de three fiber */}
            <PerspectiveCamera makeDefault position={[0, 0, 4]} /> {/* three drei, simule la caméra comme vue avec l'oeil humain. makeDefault pour en faire la caméra par défaut. */}


            <Lights />
            
            <Suspense fallback={<div>Loading</div>}> {/* Suspense enveloppe les composants qui chargent des données de manière asynchrone. 
            L'attribut fallback spécifie un contenu React temporaire à afficher pendant que le chargement est en cours, avant que le rendu du composant ou des composants enfants n'ait lieu. 
            L'utilisation de <Suspense> est particulièrement utile dans les applications web qui chargent des ressources lourdes ou qui font des appels réseau, car cela permet de maintenir une bonne expérience utilisateur en fournissant un retour visuel pendant l'attente. */}
                <IPhone />
            </Suspense>
        </View>
    )
}

export default ModelView