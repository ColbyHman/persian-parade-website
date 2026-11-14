import archive from '../data/pressArchive.js';
import { useI18n } from '../i18n';
import { Card } from './ui';

// One card per year (newest first), each a compact list of outlet links.
function PressArchive() {
  const { t, num } = useI18n();
  return (
    <div className="grid gap-3 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start">
      {Object.entries(archive)
        .sort((a, b) => b[0] - a[0]) // sort years descending
        .map(([year, posts]) => (
          <Card as="section" key={year} accent="gold" aria-labelledby={`press-year-${year}`} className="!p-0 overflow-hidden">
            <h3
              id={`press-year-${year}`}
              className="px-4 sm:px-5 pt-2 sm:pt-3 font-serif font-bold text-lg sm:text-xl text-pp-gold-text"
            >
              {num(Number(year), { useGrouping: false })}
            </h3>
            <ul className="divide-y divide-stone-200">
              {posts.map(({ title, link }) => (
                <li key={title}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={t('press.clickToView')}
                    className="flex items-center gap-3 min-h-11 px-4 sm:px-5 py-2 font-semibold no-underline !text-pp-ink hover:bg-pp-paper hover:!text-pp-green-dark"
                  >
                    <span className="flex-1 [overflow-wrap:anywhere]">{title}</span>
                    <span className="sr-only">{t('press.newTab')}</span>
                    <span aria-hidden="true" className="text-pp-green-dark font-bold inline-block rtl:-scale-x-100">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        ))}
    </div>
  );
}

export default PressArchive;
