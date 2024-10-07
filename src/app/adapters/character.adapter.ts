import { PAGE_SIZE } from '@app/components';
import { Character } from '@app/models';
import { Info } from '@app/models/api.model';

export const CharacterAdapter = (
  characterInfo: Info<Character>,
  pageIndex?: number,
  name?: string,
) => ({
  characters: [...characterInfo.results],
  pages: {
    length: characterInfo.info.count,
    pageIndex: (pageIndex ?? 1) - 1,
    pageSize: PAGE_SIZE,
    filter: name,
  },
});
