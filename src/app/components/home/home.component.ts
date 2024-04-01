import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { RatingComponent } from './rating/rating.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,MatChipsModule,RatingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
