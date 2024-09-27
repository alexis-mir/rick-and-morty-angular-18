import { inject, InjectionToken } from '@angular/core';
import { Character } from '@app/models';
import { CharacterService } from '@app/services';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import {
  addEntity,
  removeEntity,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { lastValueFrom } from 'rxjs';

interface StoreState {
  characters: Character[];
}

const initialState: StoreState = {
  characters: [],
};

const STORE_STATE = new InjectionToken<StoreState>('GlobalStore', {
  factory: () => initialState,
});

export const GlobalStore = signalStore(
  { providedIn: 'root' },
  withState(() => inject(STORE_STATE)),
  withEntities<Character>(),
  withMethods((store, characterService = inject(CharacterService)) => ({
    getCharacter(id: number) {
      return store.characters().find((char) => char.id === id);
    },
    async addCharacter(character: Omit<Character, 'id'>) {
      try {
        await lastValueFrom(characterService.addCharacters(character));
        patchState(
          store,
          addEntity({ id: new Date().getTime(), ...character }),
        );
      } catch (error) {
        console.error(error);
      }
    },
    async updateCharacter(character: Character) {
      try {
        await lastValueFrom(characterService.updateCharacters(character));
        const { id, ...characterWithoutId } = character;
        patchState(
          store,
          updateEntity({ id, changes: { ...characterWithoutId } }),
        );
      } catch (error) {
        console.error(error);
      }
    },
    async removeCharacter(id: number) {
      try {
        await lastValueFrom(characterService.removeCharacters(id));
        patchState(store, removeEntity(id));
      } catch (error) {
        console.error(error);
      }
    },
  })),
);
