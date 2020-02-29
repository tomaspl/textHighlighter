import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { Store, StateObservable } from "@ngrx/store";
import { MockStore } from "./mocks/store.mock";
import { SelectedTextDirective } from "./directives/selected-text.directive";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, SelectedTextDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: Store, useClass: MockStore }]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'textHighlighter'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("Text Highlighter");
  });

  it("should render title", () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector(".content span").textContent).toContain(
      "Text Highlighter"
    );
  });
});
