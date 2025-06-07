import about_image_1 from '../assets/about_1.png';
import about_image_2 from '../assets/about_2.png';
import about_image_3 from '../assets/about_3.png';
import Footer from '../components/Footer';

export default function AboutUs() {
  return (
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
            src={about_image_1}
            alt="about-1"
            className="w-full max-w-md md:max-w-full object-contain rounded"
          />
        </div>
      </div>

      {/* Row 2: image | text */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-10">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Our Foundation</h1>
          <p className="text-base md:text-lg max-w-3xl mx-auto md:mx-0">
            The Persian Parade Foundation is governed by an elected Board of Directors, made up of members of the Persian community from the New York area.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={about_image_2}
            alt="about-2"
            className="w-full max-w-md md:max-w-full object-cover rounded"
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
            src={about_image_3}
            alt="about-3"
            className="w-full max-w-md md:max-w-full object-cover rounded"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
