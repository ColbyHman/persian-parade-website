import { useI18n } from '../i18n';
import { Card } from './ui';

function SponsorTier({ name, amount, benefits, accent = 'green' }) {
  const { num } = useI18n();
  const price = num(amount, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  return (
    <Card accent={accent}>
      <h3 className="flex flex-wrap items-baseline justify-between gap-x-3 mb-2">
        <span className="text-xl font-bold">{name}</span>
        <span className="text-xl font-bold text-pp-red">{price}</span>
      </h3>
      <ul className="list-disc ps-5 text-gray-700 space-y-1">
        {benefits.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </Card>
  );
}

export default SponsorTier;
