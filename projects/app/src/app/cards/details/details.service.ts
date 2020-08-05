import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Card} from 'pokemon-tcg-sdk-typescript/dist/classes/card';
import {Observable} from 'rxjs';
import {pluck} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class DetailsService {

  private readonly endpoint = `${environment.endpoint}/cards`;

  constructor(private httpClient: HttpClient) {
  }

  public getCard(id: string): Observable<Card> {
    return this.httpClient.get(`${this.endpoint}/${id}`).pipe(pluck('card')) as Observable<Card>;
  }
}
