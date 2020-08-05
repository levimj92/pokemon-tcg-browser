import {CdkScrollableModule} from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CardsRoutingModule} from './cards-routing.module';
import {CardsToolbarComponent} from './cards-toolbar/cards-toolbar.component';
import {DetailsComponent} from './details/details.component';
import {ListComponent} from './list/list.component';


@NgModule({
  declarations: [ListComponent, DetailsComponent, CardsToolbarComponent],
  imports: [
    CommonModule,
    CardsRoutingModule,
    MatButtonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CdkScrollableModule,
    MatDividerModule,
    MatExpansionModule
  ]
})
export class CardsModule {
}
