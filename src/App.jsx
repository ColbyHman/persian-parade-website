import { React } from 'react'
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
import History from './pages/History';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/press-room" element={<PressRoom />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/support" element={<Support />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/post-history" element={<History />} />
        </Routes>
      </main>
    </>
  )
}

export default App
