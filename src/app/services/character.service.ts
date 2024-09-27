import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CharacterAdapter } from '@app/adapters';
import { Character, Info } from '@app/models';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private readonly baseUrl = 'https://rickandmortyapi.com/character';
  http = inject(HttpClient);

  getAllCharacters(): Observable<Character[]> {
    return this.http
      .get<Info<Character>>(this.baseUrl)
      .pipe(map((info) => CharacterAdapter(info)));
  }

  addCharacters(character: Omit<Character, 'id'>): Observable<void> {
    return this.http.post<void>(this.baseUrl, { character }).pipe(
      catchError(() => {
        console.info('error prevented for testing');
        return Promise.resolve();
      }),
    );
  }

  updateCharacters(character: Character): Observable<void> {
    const { id, ...characterWithoutId } = character;
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<void>(url, { characterWithoutId }).pipe(
      catchError(() => {
        console.info('error prevented for testing');
        return Promise.resolve();
      }),
    );
  }

  removeCharacters(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(() => {
        console.info('error prevented for testing');
        return Promise.resolve();
      }),
    );
  }
}
