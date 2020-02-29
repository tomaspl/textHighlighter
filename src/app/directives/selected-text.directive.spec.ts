import { SelectedTextDirective } from "./selected-text.directive";
import { ElementRef } from "@angular/core";
describe("SelectedTextDirective", () => {
  it("should create an instance", () => {
    let element: ElementRef;
    const directive = new SelectedTextDirective(element);
    expect(directive).toBeTruthy();
  });
});
