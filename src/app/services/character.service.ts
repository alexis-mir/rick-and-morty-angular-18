import { HttpClient } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { inject, Injectable } from '@angular/core';
import { CharacterAdapter } from '@app/adapters';
import { Character, Info } from '@app/models';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private readonly baseUrl = 'https://rickandmortyapi.com/api/character';
  http = inject(HttpClient);

  getAllCharacters(
    pageIndex?: number,
  ): Observable<{ characters: Character[]; pages: PageEvent }> {
    const url = pageIndex ? `${this.baseUrl}?page=${pageIndex}` : this.baseUrl;
    return this.http
      .get<Info<Character>>(url)
      .pipe(map((info) => CharacterAdapter(info, pageIndex)));
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
