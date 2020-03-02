import { SelectedTextDirective } from "./selected-text.directive";
import { ElementRef, Directive } from "@angular/core";
describe("SelectedTextDirective", () => {
  it("should create an instance", () => {
    let element: ElementRef;
    const directive = new SelectedTextDirective(element);
    expect(directive).toBeTruthy();
  });

  /*it("should emit new HTML text with highlighrted marks", () => {
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
              localName:'div'
          }
        },
        anchorNode: { nodeValue: "Hello world!" },
        anchorOffset: 1,
        focusOffset: 4
      };
    directive["processSelection"]();
    expect(directive.selectedTextEvent.emit).toHaveBeenCalledWith({
      htmlText: 'H<mark style="background:red">ello world!</mark>',
      storeText: "ell"
    });
  });*/

  it("should add event listener for mouseup", () => {
    let element: ElementRef;
    const directive = new SelectedTextDirective(element);
    const spy = spyOn(document, "addEventListener");
    directive["handleMousedown"]();
    expect(spy).toHaveBeenCalled();
  });

  it("should add event listener for mouseup", () => {
    let element: ElementRef;
    const directive = new SelectedTextDirective(element);
    const spy = spyOn(document, "removeEventListener");
    spyOn(directive.selectedTextEvent, "emit");

    directive.selectedColour = "red";
    window.getSelection = () =>
      <any>{
        focusNode: {
          parentElement: {
            innerHTML:
              'H&lt;mark style="background:red"&gt;ello world!&lt;/mark&gt;',
            localName: "div"
          }
        },
        anchorNode: { nodeValue: "Hello world!" },
        anchorOffset: 1,
        focusOffset: 4
      };
    directive["handleMouseup"]();
    expect(spy).toHaveBeenCalled();
    expect(directive.selectedTextEvent.emit).toHaveBeenCalledWith({
      htmlText: 'H<mark style="background:red">ello world!</mark>',
      storeText: "ell"
    });
  });
});
