import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react'



const Features = () => {


    useGSAP(() => {
        animateWithGsap('#features_title', { y: 0, opacity: 1}) // fonction conçue dans animations.js
    }, []);




    return (
        <section className='h-full common-padding bg-zinc relative overflow-hidden'>
            <div className='screen-max-width'>
                <div className='mb-12 w-full'>
                    <h1 id='features_title' className='section-heading'>
                        Tous les détails.
                    </h1>
                </div>
            </div>
        </section>
    )
}

export default Features