import archive from '../data/pressArchive.js';
import { useI18n } from '../i18n';

function PressArchive() {
  const { t, num } = useI18n();
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-semibold mb-12 text-center text-gray-900">
        {t('press.archive')}
      </h2>

      {Object.entries(archive)
        .sort((a, b) => b[0] - a[0]) // sort years descending
        .map(([year, posts]) => (
          <section key={year} className="mb-14">
            <h3 className="text-3xl font-semibold mb-6 border-b border-gray-300 pb-2 text-gray-800">
              {num(Number(year), { useGrouping: false })}
            </h3>
            <div
                className={`grid gap-8 ${
                    posts.length === 1 ? "grid-cols-1 justify-center" : "grid-cols-1 sm:grid-cols-2"
                }`}
            >
              {posts.map(({ title, link }) => (
                <a
                  key={title}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
                >
                  <h4 className="text-xl font-medium text-gray-900 mb-2">{title}</h4>
                  <p className="text-gray-600 text-sm">
                    {t('press.clickToView')}
                  </p>
                </a>
              ))}
            </div>
          </section>
        ))}
    </div>
  );
}

export default PressArchive;