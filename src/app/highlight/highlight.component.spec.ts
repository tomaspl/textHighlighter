import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HighlightComponent } from "./highlight.component";
import { SelectedTextDirective } from "../directives/selected-text.directive";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { Store } from "@ngrx/store";
import { MockStore } from "../mocks/store.mock";

describe("HighlightComponent", () => {
  let component: HighlightComponent;
  let fixture: ComponentFixture<HighlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HighlightComponent, SelectedTextDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: Store, useClass: MockStore }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
