import Footer from '../components/Footer';
import { bundledImgProps, bundledFamily } from '../lib/images';

// Bundled WebP: about_1.png was a 2.6MB PNG, now 223KB, plus @400w/@800w
// siblings. These render inside max-w-md (448px) half-width columns.
const ABOUT_SIZES = '(max-width: 768px) 100vw, 50vw';
const aboutAssets = import.meta.glob('../assets/about_*.webp', { eager: true });
// Intrinsic sizes of the full-size WebPs, so the browser reserves layout space
// before the bytes arrive (the manifest can't help — these are bundled and
// Vite renames them).
const DIMS = {
  'about_1.webp': [1165, 1420],
  'about_2.webp': [1200, 799],
  'about_3.webp': [800, 538],
};
const props = (name, alt, className) => bundledImgProps(
  bundledFamily(aboutAssets, name),
  { alt, className, sizes: ABOUT_SIZES, loading: 'lazy', width: DIMS[name][0], height: DIMS[name][1] },
);

export default function AboutUs() {
  return (
    <div>
      <div className="text-black py-20 space-y-24 px-6 md:px-12">

        {/* Row 1: text | image */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl font-bold mb-6">About Us</h1>
            <h3 className="text-3xl mb-6">The Persian Parade!</h3>
            <p className="text-lg max-w-3xl mx-auto md:mx-0">
              The Persian Parade in New York City was founded in 2004 by visionary Iranian American doctors with the aim of celebrating Persian culture and heritage, especially during the Persian New Year festivities.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              {...props('about_1.webp', 'about-1', 'w-full max-w-md md:max-w-full object-contain rounded')}
              />
          </div>
        </div>

        {/* Row 2: image | text */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-10">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Our Leadership</h1>
            <p className="text-base md:text-lg max-w-3xl mx-auto md:mx-0">
              The Persian Parade Foundation is governed by an elected Board of Directors, made up of members of the Persian community from the New York area.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              {...props('about_2.webp', 'about-2', 'w-full max-w-md md:max-w-full object-cover rounded')}
              />
          </div>
        </div>

        {/* Row 3: text | image */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Our Purpose & Mission</h1>
            <p className="text-lg max-w-3xl py-5 mx-auto md:mx-0">
              The annual Persian Parade is the culmination of a year-long, community-wide effort to celebrate the rich history of Persian culture in New York City.
            </p>
            <p className="text-lg max-w-3xl py-5 mx-auto md:mx-0">
              Our organization aspires to create friendship and understanding with other cultures and educate about Iranian heritage and values.
            </p>
            <p className="text-lg max-w-3xl py-5 mx-auto md:mx-0">
              The Persian Parade Foundation is a non-religious, non-political, non-governmental organization.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              {...props('about_3.webp', 'about-3', 'w-full max-w-md md:max-w-full object-cover rounded')}
              />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
