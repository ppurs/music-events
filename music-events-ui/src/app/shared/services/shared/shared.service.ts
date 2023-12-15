import { Observable, map, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private readonly STATICS_PATH = 'assets/static'
  private readonly TYPES_API = "/api/types"

  constructor(private http: HttpClient) { }

  getInstruments(): Observable<string[]> {
    return this.http.get<{instruments: string[]}>(`${this.STATICS_PATH}/instruments.json`)
      .pipe(map(data => data.instruments));
  }

  getMusicGenres(): Observable<string[]> {
    return this.http.get<{genres: string[]}>(`${this.STATICS_PATH}/genres.json`)
      .pipe(map(data => data.genres));
  }

  getMusicProfileTypes(): Observable<string[]> {
    return of(["Band", "Instrumentalist", "Singer"]);
    //return this.http.get<string[]>(`${this.TYPES}/music-profile`);
  }
}
