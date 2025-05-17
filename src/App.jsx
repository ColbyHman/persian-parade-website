import { React, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';import './App.css'

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import PressRoom from './pages/PressRoom';
import Sponsors from './pages/Sponsors';
import Support from './pages/Support';
import ContactUs from './pages/ContactUs';
import Donate from './pages/Donate';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/press-room" element={<PressRoom />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/support" element={<Support />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/donate" element={<Donate />} />
        </Routes>
      </main>
    </>
  )
}

export default App
