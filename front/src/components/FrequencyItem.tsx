import { Frequency } from '../service/mutation.type'
import { toPercent } from '../util/percentageFormatter';

type FrequencyProps = {
  frequency: Frequency
};

export function FrequencyItem({ frequency }: FrequencyProps) {
  return <span>
    {toPercent(frequency.frequency)} - {frequency.population} - {frequency.source}
  </span>;
};