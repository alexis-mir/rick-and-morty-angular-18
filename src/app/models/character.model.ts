import { EntityBase, ResourceBase } from './api.model';

export enum Gender {
  FEMALE = 'Female',
  MALE = 'Male',
  GENDERLESS = 'Genderless',
  UNKNOWN = 'unknown',
}

export enum CharacterStatus {
  DEAD = 'Dead',
  ALIVE = 'Alive',
  UNKNOWN = 'unknown',
}

export type CharacterLocation = ResourceBase;

export interface Character extends ResourceBase, EntityBase {
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: Gender;
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
}

export const emptyCharacter: Character = {
  id: 0,
  name: '',
  status: CharacterStatus.UNKNOWN,
  species: '',
  type: '',
  gender: Gender.UNKNOWN,
  origin: {
    name: '',
    url: '',
  },
  location: {
    name: '',
    url: '',
  },
  image: '',
  episode: [],
  url: '',
};
