import React from 'react';
import Footer from '../components/Footer';
import { bundledImgProps, bundledFamily } from '../lib/images';
import { useI18n } from '../i18n';
import { PageHeader, Section, DonateBand } from '../components/ui';

// Bundled WebP: about_1.png was a 2.6MB PNG, now 223KB, plus @400w/@800w
// siblings. Full width on phones (but height-capped), half width from md up.
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
// Phones: a short cropped strip so the page stays compact; md+: natural ratio
// (the portrait about_1 is capped so it doesn't tower over its text).
const IMG_CLASS = 'w-full h-48 sm:h-72 md:h-auto md:max-h-[32rem] object-cover rounded-xl shadow-sm';
const props = (name, alt) => bundledImgProps(
  bundledFamily(aboutAssets, name),
  { alt, className: IMG_CLASS, sizes: ABOUT_SIZES, loading: 'lazy', width: DIMS[name][0], height: DIMS[name][1] },
);

/** Text + image side by side from md up; `flip` puts the image first. */
function Row({ title, image, flip = false, children }) {
  return (
    <div className="grid md:grid-cols-2 items-center gap-5 md:gap-12">
      <div className={flip ? 'md:order-last' : ''}>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl mb-3 sm:mb-5">{title}</h2>
        <div className="space-y-3 sm:space-y-4 text-base sm:text-lg leading-relaxed">{children}</div>
      </div>
      {image}
    </div>
  );
}

export default function AboutUs() {
  const { t } = useI18n();
  return (
    <div className="bg-pp-paper text-pp-ink">
      <PageHeader title={t('about.title')} image="/images/slider/ZFNY-416-scaled.jpg" />

      <Section tone="white">
        <Row title={t('about.subtitle')} image={<img {...props('about_1.webp', t('about.img1Alt'))} />}>
          <p>{t('about.founded')}</p>
        </Row>
      </Section>

      <Section>
        <Row flip title={t('about.leadershipTitle')} image={<img {...props('about_2.webp', t('about.img2Alt'))} />}>
          <p>{t('about.leadership')}</p>
        </Row>
      </Section>

      <Section tone="white">
        <Row title={t('about.missionTitle')} image={<img {...props('about_3.webp', t('about.img3Alt'))} />}>
          <p>{t('about.mission1')}</p>
          <p>{t('about.mission2')}</p>
          <p>{t('about.mission3')}</p>
        </Row>
      </Section>

      <DonateBand title={t('support.donorTitle')} body={t('common.donationAppeal')} cta={t('cta.donateNow')} to="/donate" />
      <Footer />
    </div>
  );
}
