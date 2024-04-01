import { Component } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';



@Component({
  selector: 'app-payment-information',
  standalone: true,
  imports: [MatRadioModule,MatExpansionModule,FormsModule,MatFormFieldModule, MatInputModule,MatIconModule,MatSelectModule],
  templateUrl: './payment-information.component.html',
  styleUrl: './payment-information.component.scss'
})
export class PaymentInformationComponent {
  value: boolean = false;
  selectedPanel!: string; // Define the variable here

  expandPanel() {
    // This function will be called when the radio button value changes
    // You can perform any additional logic here if needed
  }
 

  onSubmit(){}
}
