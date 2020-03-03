import { SelectedTextDirective } from "./selected-text.directive";
import { ElementRef, Directive } from "@angular/core";
describe("SelectedTextDirective", () => {
  it("should create an instance", () => {
    let element: ElementRef;
    const directive = new SelectedTextDirective(element);
    expect(directive).toBeTruthy();
  });

  it("should add event listener for mouseup", () => {
    let element: ElementRef;
    const directive = new SelectedTextDirective(element);
    const spy = spyOn(document, "addEventListener");
    directive["handleMousedown"]();
    expect(spy).toHaveBeenCalled();
  });

  it("should emit highlight done successfully", () => {
    let element: ElementRef;
    const directive = new SelectedTextDirective(element);
    spyOn(directive.selectedTextEvent, "emit");
    directive.selectedColour = "red";
    window.getSelection = () =>
      <any>{
        focusNode: {
          parentElement: {
            innerHTML:
              'H&lt;mark style="background:red"&gt;ello world!&lt;/mark&gt;',
            localName: "div"
          },
          nodeValue: "Hello world!"
        },
        anchorNode: { nodeValue: "Hello world!" },
        anchorOffset: 1,
        focusOffset: 4
      };
    directive["handleMouseup"]();
    expect(directive.selectedTextEvent.emit).toHaveBeenCalledWith({
      htmlText: 'H<mark style="background:red">ello world!</mark>',
      storeText: "ell"
    });
  });

  it("should emit error because text highlighted is being highlighted again", () => {
    let element: ElementRef;
    const directive = new SelectedTextDirective(element);
    spyOn(directive.selectedTextEvent, "emit");
    directive.selectedColour = "red";
    window.getSelection = () =>
      <any>{
        focusNode: {
          parentElement: {
            innerHTML:
              'H&lt;mark style="background:red"&gt;ello world!&lt;/mark&gt;',
            localName: "div"
          },
          nodeValue: "Hello world!2"
        },
        anchorNode: { nodeValue: "Hello world!" },
        anchorOffset: 1,
        focusOffset: 4
      };
    directive["handleMouseup"]();
    expect(directive.selectedTextEvent.emit).toHaveBeenCalledWith({
      htmlText: "",
      storeText: "",
      error: "Previous highlight exists on selected text"
    });
  });

  it("should emit error because text is being selected without choose colour", () => {
    let element: ElementRef;
    const directive = new SelectedTextDirective(element);
    spyOn(directive.selectedTextEvent, "emit");
    directive.selectedColour = null;
    window.getSelection = () =>
      <any>{
        focusNode: {
          parentElement: {
            innerHTML:
              'H&lt;mark style="background:red"&gt;ello world!&lt;/mark&gt;',
            localName: "div"
          },
          nodeValue: "Hello world!"
        },
        anchorNode: { nodeValue: "Hello world!" },
        anchorOffset: 1,
        focusOffset: 4
      };
    directive["handleMouseup"]();
    expect(directive.selectedTextEvent.emit).toHaveBeenCalledWith({
      htmlText: "",
      storeText: "",
      error: "No color selected"
    });
  });
});
