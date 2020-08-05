import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Card} from 'pokemon-tcg-sdk-typescript/dist/classes/card';
import {Observable} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {DetailsService} from './details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [DetailsService]
})
export class DetailsComponent implements OnInit {

  public card$: Observable<Card>;

  constructor(private activatedRoute: ActivatedRoute, private detailsService: DetailsService) {
  }

  ngOnInit(): void {
    this.loadCard();
  }

  private loadCard(): void {
    this.card$ = this.getIdFromRouteParams()
      .pipe(
        switchMap(id => this.detailsService.getCard(id)),
        tap(console.log)
      );
  }

  private getIdFromRouteParams(): Observable<string> {
    return this.activatedRoute.paramMap
      .pipe(
        map((queryParamMap: ParamMap) => queryParamMap.get('id'))
      );
  }
}
