import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputErrorDirective } from './directives/input-error.directive';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarItemComponent } from './navbar-item/navbar-item.component';
import { NavbarSubitemComponent } from './navbar-subitem/navbar-subitem.component';
import { RouterModule } from '@angular/router';
import { CenterBoxComponent } from './center-box/center-box.component';
import { RadioInputComponent } from './radio-input/radio-input.component';
import { BlockableDirective } from './directives/blockable.directive';
import { TableCrudComponent } from './table-crud/table-crud.component';
import { PaginationBarComponent } from './pagination-bar/pagination-bar.component';
import { PaginationInfoComponent } from './pagination-info/pagination-info.component';
import { SimpleSelectComponent } from './simple-select/simple-select.component';
import { ArrInputComponent } from './arr-input/arr-input.component';
import { DateRangeInputComponent } from './date-range-input/date-range-input.component';
import { NumRangeInputComponent } from './num-range-input/num-range-input.component';
import { ArrNumRangeInputComponent } from './arr-num-range-input/arr-num-range-input.component';
import { IconRadioInputComponent } from './icon-radio-input/icon-radio-input.component';
import { MobileNavbarComponent } from './mobile-navbar/mobile-navbar.component';



@NgModule({
  declarations: [
    InputErrorDirective,
    InputComponent,
    NavbarComponent,
    NavbarItemComponent,
    NavbarSubitemComponent,
    CenterBoxComponent,
    RadioInputComponent,
    BlockableDirective,
    TableCrudComponent,
    PaginationBarComponent,
    PaginationInfoComponent,
    SimpleSelectComponent,
    ArrInputComponent,
    DateRangeInputComponent,
    NumRangeInputComponent,
    ArrNumRangeInputComponent,
    IconRadioInputComponent,
    MobileNavbarComponent
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ],
  exports:[
    InputComponent,
    NavbarComponent,
    MobileNavbarComponent,
    CenterBoxComponent,
    RadioInputComponent,
    TableCrudComponent,
    PaginationBarComponent,
    PaginationInfoComponent,
    SimpleSelectComponent,
    ArrInputComponent,
    DateRangeInputComponent,
    NumRangeInputComponent,
    ArrNumRangeInputComponent,
    IconRadioInputComponent,
    
    BlockableDirective,
    InputErrorDirective,
  ]
})
export class SharedModule { }
