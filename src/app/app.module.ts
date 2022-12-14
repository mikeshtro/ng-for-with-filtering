import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FilterForOfDirective } from './filter-for.directive';
import { SimpleFilterComponent } from './simple-filter.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, FilterForOfDirective, SimpleFilterComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
