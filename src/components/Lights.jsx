import { Environment, Lightformer } from "@react-three/drei";

// Ce fichier définit un composant React pour configurer l'éclairage dans une scène 3D utilisant @react-three/fiber et @react-three/drei.
// Le composant Lights organise et configure plusieurs types d'éclairage pour ajouter de la profondeur, des ombres et des ambiances à la scène 3D.

const Lights = () => {
    return (
        // On peut utiliser group pou rorganiser les lights, cameras, meshes, et autres objets sur la scene.
        <group name="lights">
            {/** Le composant group : Il sert à regrouper plusieurs lumières. 
            Dans three.js et donc dans @react-three/fiber, group est utilisé pour regrouper des objets qui peuvent être manipulés ensemble. Dans ce cas, il s'agit de toutes les lumières de la scène. */}
            <Environment resolution={256}>
                {/* Le composant Environment : Il est importé de @react-three/drei et est utilisé pour ajouter un éclairage global à la scène, simulant l'éclairage ambiant et les réflexions. 
                La résolution de 256 indique la qualité des textures d'éclairage indirect utilisées pour simuler cet environnement. */}
                <group>
                    {/** Les composants Lightformer : Ils créent des lumières personnalisées qui peuvent avoir différentes formes (form="rect" pour rectangulaire ici) et propriétés. 
                     * Ils sont placés à différentes positions et orientations dans la scène pour simuler l'éclairage d'objets de différentes manières, par exemple, pour créer des effets de lumière directionnelle ou pour mettre en évidence certains éléments de la scène. 
                     * La propriété intensity contrôle la force de la lumière, position définit où elle se trouve dans la scène, scale ajuste la taille de la source lumineuse, et rotation-y oriente la lumière sur l'axe Y. */}
                    <Lightformer
                        form="rect"
                        intensity={10}
                        position={[-1, 0, -10]}
                        scale={10}
                        color={"#495057"}
                    />
                    <Lightformer
                        form="rect"
                        intensity={10}
                        position={[-10, 2, 1]}
                        scale={10}
                        rotation-y={Math.PI / 2}
                    />
                    <Lightformer
                        form="rect"
                        intensity={10}
                        position={[10, 0, 1]}
                        scale={10}
                        rotation-y={Math.PI / 2}
                    />
                </group>
            </Environment>

            {/** Les composants spotLight : Ce sont des sources de lumière ponctuelles de three.js qui éclairent les objets d'un certain angle et direction, donnés par position et angle. 
            Penumbra ajoute un effet adouci aux bords de l'ombre projetée, et decay détermine la diminution de l'intensité de la lumière avec la distance. 
            Intensity contrôle la luminosité globale de la lumière et color sa teinte. */}
            <spotLight
                position={[-2, 10, 5]}
                angle={0.15}
                penumbra={1} // the penumbra is the soft edge of a shadow cast by a point light
                decay={0} // the amount the light dims as it moves away from the source
                intensity={Math.PI * 0.2} // the light intensity
                color={"#f8f9fa"}
            />
            <spotLight
                position={[0, -25, 10]}
                angle={0.15}
                penumbra={1}
                decay={0}
                intensity={Math.PI * 0.2}
                color={"#f8f9fa"}
            />
            <spotLight
                position={[0, 15, 5]}
                angle={0.15}
                penumbra={1}
                decay={0.1}
                intensity={Math.PI * 3}
            />
        </group>
    );
};

export default Lights;