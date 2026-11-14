import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css'

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import PressRoom from './pages/PressRoom';
import Sponsors from './pages/Sponsors';
import Support from './pages/Support';
import ContactUs from './pages/ContactUs';
import History from './pages/History';
import Donation from './pages/Donation';

const PAGES = [
  ['', <Home />],
  ['/about-us', <AboutUs />],
  ['/events', <Events />],
  ['/gallery', <Gallery />],
  ['/press-room', <PressRoom />],
  ['/sponsors', <Sponsors />],
  ['/support', <Support />],
  ['/contact-us', <ContactUs />],
  ['/post-history', <History />],
  ['/donate', <Donation />],
];

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          {/* Every page exists twice: /about-us (English) and /fa/about-us (Farsi). */}
          {['', '/fa'].flatMap((prefix) =>
            PAGES.map(([path, element]) => (
              <Route key={prefix + path} path={prefix + path || '/'} element={element} />
            )),
          )}
        </Routes>
      </main>
    </>
  )
}

export default App
