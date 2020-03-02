import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { MatCardModule } from "@angular/material/card";
import { StoreModule, combineReducers } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { reducers } from "./reducers";
import { SelectedTextDirective } from "./directives/selected-text.directive";
import { FormsModule } from "@angular/forms";
import { HighlightComponent } from "./highlight/highlight.component";

@NgModule({
  declarations: [AppComponent, SelectedTextDirective, HighlightComponent],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatCardModule,
    FormsModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
