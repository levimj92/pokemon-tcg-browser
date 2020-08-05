import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable, OnDestroy} from '@angular/core';
import {Card} from 'pokemon-tcg-sdk-typescript/dist/classes/card';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {map, pluck, switchMap, takeUntil, withLatestFrom} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class ListService implements OnDestroy {

  private readonly endpoint = `${environment.endpoint}/cards`;
  private cardsList = new BehaviorSubject<Card[]>([]);
  private searchValue = new BehaviorSubject<string>('');
  private destroy = new Subject<void>();

  public cardsList$ = this.cardsList.asObservable();

  constructor(private httpClient: HttpClient) {
    this.getAllCardsListener();
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public search(value: string): void {
    this.searchValue.next(value);
  }

  public getAllCards(searchString: string): Observable<Card[]> {
    const params = new HttpParams()
      .set('name', searchString)
      .set('pageSize', '105');
    return this.httpClient.get(this.endpoint, {params}).pipe(
      pluck('cards'),
    ) as Observable<Card[]>;
  }

  private getAllCardsListener(): void {
    this.searchValue
      .pipe(
        switchMap(search => this.getAllCards(search)),
        map((cardsList: Card[]) => this.sortCards(cardsList)),
        takeUntil(this.destroy)
      )
      .subscribe(cardsList => this.cardsList.next(cardsList));
  }

  private sortCards(cards: Card[]): Card[] {
    return cards.sort((card1: Card, card2: Card) => this.sortAlphabetically(card1.name, card2.name));
  }

  private sortAlphabetically(a: string, b: string, index: number = 0): number {
    return a.charCodeAt(index) === b.charCodeAt(index) ? this.sortAlphabetically(a, b, ++index) : a.charCodeAt(index) - b.charCodeAt(index);
  }
}
