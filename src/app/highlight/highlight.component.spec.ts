import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HighlightComponent } from "./highlight.component";
import { SelectedTextDirective } from "../directives/selected-text.directive";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

describe("HighlightComponent", () => {
  let component: HighlightComponent;
  let fixture: ComponentFixture<HighlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HighlightComponent, SelectedTextDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: DomSanitizer,
          useValue: {
            sanitize: (ctx, val) => val,
            bypassSecurityTrustHtml: val => val
          }
        }
      ]
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

  it("should create the list of highlighted texts by colour", () => {
    component.ngOnChanges(<any>{
      listFilteredByHighlightColour: {
        currentValue: [{ colourText: "red", text: "test" }]
      }
    });

    expect(component.listHighlightByColour).toEqual(
      component["sanitizer"].bypassSecurityTrustHtml(
        '<mark style="background:red">test</mark><br/>'
      )
    );
  });

  it("should show legend that no text was found with the colout filter asked for", () => {
    component.selectColourForFilter = "red";

    component.ngOnChanges(<any>{
      listFilteredByHighlightColour: {
        currentValue: []
      }
    });
    expect(component.listHighlightByColour).toEqual(
      "No text was highlighted with the colour selected"
    );
  });

  it("should not show legend on filter list", () => {
    component.selectColourForFilter = "";

    component.ngOnChanges(<any>{
      listFilteredByHighlightColour: {
        currentValue: []
      }
    });
    expect(component.listHighlightByColour).toEqual("");
  });

  it("should call event prevent default on drag & drop events", () => {
    var e = jasmine.createSpyObj("e", ["preventDefault"]);
    component.onDragOver(e);
    component.onDragLeave(e);
    expect(e.preventDefault).toHaveBeenCalledTimes(2);
  });

  it("should emit highlighted text", () => {
    const spy = spyOn(component.addedHighlightSelection, "emit");
    component.selectedColour = "red";
    component.highlightText({ htmlText: "test", storeText: "" });
    expect(spy).toHaveBeenCalled();
  });

  it("should show highlight error", () => {
    const spy = spyOn(component.addedHighlightSelection, "emit");
    component.selectedColour = "red";
    component.highlightText({ htmlText: "", storeText: "", error: "error" });
    expect(component.errorHighlight).toEqual("error");
  });

  it("should emit selected colout for filtering highlights", () => {
    const spy = spyOn(component.filterByColour, "emit");
    component.selectedFilter("red");
    expect(spy).toHaveBeenCalled();
  });

  it("should update the selected colour", () => {
    component.selectColor("red");
    expect(component.selectedColour).toEqual("red");
  });
});
