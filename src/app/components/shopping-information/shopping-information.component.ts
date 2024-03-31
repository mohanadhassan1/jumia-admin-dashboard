import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-shopping-information',
  standalone: true,
  imports: [MatIconModule ,MatRadioModule,FormsModule,MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './shopping-information.component.html',
  styleUrl: './shopping-information.component.scss'
})
export class ShoppingInformationComponent {

}
