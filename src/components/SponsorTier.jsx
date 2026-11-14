import { useI18n } from '../i18n';

function SponsorTier({ name, amount, benefits }) {
  const { num } = useI18n();
  const price = num(amount, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  return (
    <div className="border border-gray-300 rounded-lg p-6 shadow-sm">
      <h3 className="text-xl font-bold mb-2">{name} – <span className="text-pp-red">{price}</span></h3>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        {benefits.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default SponsorTier;
