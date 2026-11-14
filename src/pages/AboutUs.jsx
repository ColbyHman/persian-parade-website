import Footer from '../components/Footer';
import { bundledImgProps, bundledFamily } from '../lib/images';
import { useI18n } from '../i18n';

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
  const { t } = useI18n();
  return (
    <div>
      <div className="text-black py-20 space-y-24 px-6 md:px-12">

        {/* Row 1: text | image */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2 text-center md:text-start">
            <h1 className="text-5xl font-bold mb-6">{t('about.title')}</h1>
            <h3 className="text-3xl mb-6">{t('about.subtitle')}</h3>
            <p className="text-lg max-w-3xl mx-auto md:mx-0">
              {t('about.founded')}
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              {...props('about_1.webp', t('about.img1Alt'), 'w-full max-w-md md:max-w-full object-contain rounded')}
              />
          </div>
        </div>

        {/* Row 2: image | text */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-10">
          <div className="w-full md:w-1/2 text-center md:text-start">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{t('about.leadershipTitle')}</h1>
            <p className="text-base md:text-lg max-w-3xl mx-auto md:mx-0">
              {t('about.leadership')}
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              {...props('about_2.webp', t('about.img2Alt'), 'w-full max-w-md md:max-w-full object-cover rounded')}
              />
          </div>
        </div>

        {/* Row 3: text | image */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2 text-center md:text-start">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{t('about.missionTitle')}</h1>
            <p className="text-lg max-w-3xl py-5 mx-auto md:mx-0">
              {t('about.mission1')}
            </p>
            <p className="text-lg max-w-3xl py-5 mx-auto md:mx-0">
              {t('about.mission2')}
            </p>
            <p className="text-lg max-w-3xl py-5 mx-auto md:mx-0">
              {t('about.mission3')}
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              {...props('about_3.webp', t('about.img3Alt'), 'w-full max-w-md md:max-w-full object-cover rounded')}
              />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
