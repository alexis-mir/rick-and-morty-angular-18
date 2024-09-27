import { Character } from '@app/models';
import { Info } from '@app/models/api.model';

export const CharacterAdapter = (characterInfo: Info<Character>) => [
  ...characterInfo.results,
];
