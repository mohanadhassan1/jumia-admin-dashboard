import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [],
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.scss'
})
export class ManageProductsComponent {

  dropDownList: number | null = null;

  // constructor() { }

  // ngOnInit(): void { }

  // toggleDropDownList(index: number): void {
  //   this.dropDownList = this.dropDownList === index ? null : index;
  // }



  sortByOptions: string[] = ['Latest', 'Oldest', 'Name', 'Due Date'];
  selectedSortBy: string = 'Latest';
  filterBy: string = 'All';
  selectedTaskId: number | null = null;





}

