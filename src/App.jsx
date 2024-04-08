import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Navbar from './components/Navbar';
import Model from './components/Model';

import * as Sentry from '@sentry/react'

const App = () => {

  return (

    <main>
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
    </main>

  )


}

export default Sentry.withProfiler(App);