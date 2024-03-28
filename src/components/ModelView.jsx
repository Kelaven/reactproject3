import React from 'react'
import { View } from '@react-three/drei'

const ModelView = ({ index, groupRef, gsapType, controlRef, setRotationSize, size, item}) => {
    return (
        <View /* de @react-three/drei */
            index={index}
            id={gsapType}
            className="border-2 border-red-500"
        > 

        </View>
    )
}

export default ModelView