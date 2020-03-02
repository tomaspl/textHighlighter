import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { Store, StateObservable } from "@ngrx/store";
import { MockStore } from "./mocks/store.mock";
import { SelectedTextDirective } from "./directives/selected-text.directive";
import { HighlightState } from "./models/models";

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, SelectedTextDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: Store, useClass: MockStore }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should dispatch highlighted text", () => {
    let store = TestBed.get<Store<{ state: HighlightState }>>(Store);
    const spy = spyOn(store, "dispatch");
    component.addedHighlightSelection({});
    expect(spy).toHaveBeenCalled();
  });

  it("should dispatch filter highlighted colour", () => {
    let store = TestBed.get<Store<{ state: HighlightState }>>(Store);
    const spy = spyOn(store, "dispatch");
    component.filterByColour("");
    expect(spy).toHaveBeenCalled();
  });
});
