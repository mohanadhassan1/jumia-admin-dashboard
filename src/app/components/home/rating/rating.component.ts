import { Component,OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ChartModule } from 'primeng/chart';


@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule, MatInputModule, MatSelectModule,ChartModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent implements OnInit {
  data: any;

  options: any;

  ngOnInit() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      this.data = {
          labels: ['Cancellation rate', 'Quality return rate', 'Average customer rate'],
          datasets: [
              {
                  data: [30, 5, 10],
                  backgroundColor: [documentStyle.getPropertyValue('--orange-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                  hoverBackgroundColor: [documentStyle.getPropertyValue('--orange-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
              }
          ]
      };


      this.options = {
          cutout: '70%',
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          }
      };
  }

}
