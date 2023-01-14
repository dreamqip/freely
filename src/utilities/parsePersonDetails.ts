import type { IPerson } from '@/types/person';
import { getGender } from './getGender';

export const parsePersonDetails = (person: IPerson) => {
  return [
    {
      label: 'Also knows as',
      value: person?.also_known_as.join(', ') || 'N/A',
    },
    {
      label: 'Birthday',
      value:
        (person?.birthday && new Date(person.birthday).toDateString()) ||
        'Unknown',
    },
    {
      label: 'Place of birth',
      value: person?.place_of_birth || 'Unknown',
    },
    {
      label: 'Deathday',
      value:
        (person?.deathday && new Date(person.deathday).toDateString()) ||
        'Unknown',
    },
    {
      label: 'Gender',
      value: (person?.gender && getGender(person.gender)) || 'Unknown',
    },
    {
      label: 'Biography',
      value: person?.biography || 'No biography available',
    },
  ];
};
