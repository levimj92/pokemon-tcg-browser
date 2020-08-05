import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Card} from 'pokemon-tcg-sdk-typescript/dist/classes/card';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, takeUntil} from 'rxjs/operators';
import {ListService} from './list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ListService]
})
export class ListComponent implements OnInit, OnDestroy {

  private destroy = new Subject<void>();

  public searchControl = new FormControl('', Validators.minLength(3));
  public cardsList$: Observable<Card[]>;

  constructor(private listService: ListService) {
  }

  ngOnInit(): void {
    this.cardsList$ = this.listService.cardsList$;
    this.searchListener();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  private searchListener(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        filter((value: string) => value.length >= 3 || value.length === 0),
        distinctUntilChanged(),
        takeUntil(this.destroy)
      )
      .subscribe({
        next: (value: string) => this.listService.search(value)
      });
  }

  public cardsTrackByFn(iterator: number, card: Card): string {
    return card.id;
  }

  loadMoreCards(): void {
    // TODO
  }
}
