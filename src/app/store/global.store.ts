import { inject, InjectionToken } from '@angular/core';
import { Character } from '@app/models';
import { CharacterService } from '@app/services';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
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
  withMethods((store, characterService = inject(CharacterService)) => ({
    getCharacter(id: number) {
      return store.characters().find((char) => char.id === id);
    },
    async addCharacter(character: Omit<Character, 'id'>) {
      try {
        await lastValueFrom(characterService.addCharacters(character));
        patchState(store, ({ characters }) => ({
          characters: [
            ...characters,
            { id: new Date().getTime(), ...character },
          ],
        }));
      } catch (error) {
        console.error(error);
      }
    },
    async updateCharacter(character: Character) {
      try {
        await lastValueFrom(characterService.updateCharacters(character));
        const { id, ...characterWithoutId } = character;
        patchState(store, ({ characters }) => ({
          characters: characters.map((char) =>
            char.id === id ? { ...char, ...characterWithoutId } : char,
          ),
          isLoading: false,
        }));
      } catch (error) {
        console.error(error);
      }
    },
    async removeCharacter(id: number) {
      try {
        await lastValueFrom(characterService.removeCharacters(id));
        patchState(store, ({ characters }) => ({
          characters: characters.filter((char) => char.id !== id),
        }));
      } catch (error) {
        console.error(error);
      }
    },
  })),
  withHooks({
    async onInit(store, characterService = inject(CharacterService)) {
      const characters = await lastValueFrom(
        characterService.getAllCharacters(),
      );
      patchState(store, { characters });
    },
  }),
);
