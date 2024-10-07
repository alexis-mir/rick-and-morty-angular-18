import { HttpClient, HttpParams } from '@angular/common/http';
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

  getAllCharacters(options?: {
    pageIndex?: number;
    name?: string;
  }): Observable<{ characters: Character[]; pages: PageEvent }> {
    let params = new HttpParams();

    if (options?.pageIndex !== undefined) {
      params = params.set('page', ++options.pageIndex);
    }

    if (options?.name) {
      params = params.set('name', options.name);
    }

    return this.http
      .get<Info<Character>>(this.baseUrl, { params })
      .pipe(
        map((info) =>
          CharacterAdapter(info, options?.pageIndex, options?.name),
        ),
      );
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
