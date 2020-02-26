import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { MatCardModule } from "@angular/material/card";
import { StoreModule, combineReducers } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import {
  colour,
  initialState,
  initialStateApp
} from "./reducers/filter.reducer";
import { state } from "@angular/animations";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatCardModule,
    StoreModule.forRoot({
      state: combineReducers({ colour })
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}