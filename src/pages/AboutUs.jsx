import about_image_1 from '../assets/about_1.png';
import about_image_2 from '../assets/about_2.png';
import about_image_3 from '../assets/about_3.png';

export default function AboutUs() {
  return (
    <div className="text-black py-20 min-h-screen grid grid-cols-1 md:grid-cols-2 gap-y-10 px-12">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold mb-6">About Us</h1>
        <h3 className="text-3xl mb-6">The Persian Parade!</h3>
        <p className="text-lg text-center max-w-3xl">
          The Persian Parade in New York City was founded in 2004 by visionary Iranian American doctors with the aim of celebrating Persian culture and heritage, especially during the Persian New Year festivities. Over the years, it has grown into an annual tradition, drawing participants and spectators from diverse backgrounds.
        </p>
      </div>
      <div className="flex justify-center items-center">
        <img
          src={about_image_1}
          alt="about-1"
          className="max-w-full max-h-[600px] object-contain rounded"
        />
      </div>

      <div className="flex flex-col-reverse md:flex-col">
        <div className="flex justify-center items-center">
          <img
            src={about_image_2}
            alt="about-2"
            className="w-full max-w-3xl py-2 object-cover rounded"
          />
        </div>
        <div className="flex flex-col py-2 justify-center items-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Our Foundation</h1>
          <p className="text-base md:text-lg max-w-3xl">
            The Persian Parade Foundation is governed by an elected Board of Directors, made up of members of the Persian community from the New York area.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl font-bold mb-4">Our Purpose & Mission</h1>
        <p className="text-lg max-w-3xl py-5">
          The annual Persian Parade is the culmination of a year-long, community-wide effort to celebrate the rich history of Persian culture in New York City. It is coordinated by the Persian Parade Foundation is a 501c3, non-profit cultural organization with no affiliation to any political or religious group. This event occurs near the Iranian New Year of the Persian calendar which coincides with the Spring Vernal Equinox. The Persian Parade is intended to promote and introduce the Iranian culture, its historical achievements in art, folklore, science, and the Iranian civilization to the general public.
        </p>
        <p className="text-lg max-w-3xl py-5">
          The Persian Parade proudly takes place under both the American and the ancient (Persian) Iranian flags. Our organization aspires to create friendship and understanding with other cultures around the world and educate them about Iranian heritage and history. We strive to demonstrate the Iranian tradition of tolerance for the ethnic, religious and cultural differences among people as well as to express the will of the Iranian community to live in peace, unity and harmony with all.
        </p>
        <p className="text-lg max-w-3xl py-5">
          The Persian Parade Foundation is a non-religious, non-political, non-governmental organization.
        </p>
      </div>
      <div className="flex justify-center items-center">
        <img
          src={about_image_3}
          alt="about-2"
          className="w-full max-w-3xl object-cover rounded"
        />
      </div>
    </div>
  );
}
