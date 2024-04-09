import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Navbar from './components/Navbar';
import Model from './components/Model';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';

import * as Sentry from '@sentry/react'
import Footer from './components/Footer';

const App = () => {

  return (

    <main>
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <HowItWorks />
      <Footer />
    </main>

  )


}

export default Sentry.withProfiler(App);