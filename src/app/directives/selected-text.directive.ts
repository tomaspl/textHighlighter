import {
  Directive,
  EventEmitter,
  ElementRef,
  OnInit,
  OnDestroy,
  Input
} from "@angular/core";

@Directive({
  selector: "[selectedText]",
  outputs: ["selectedTextEvent: selectedText"]
})
export class SelectedTextDirective implements OnInit, OnDestroy {
  @Input() selectedColour: string;
  public selectedTextEvent: EventEmitter<any>;
  private elementRef: ElementRef;
  private selectionData = [];
  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;

    this.selectedTextEvent = new EventEmitter();
  }

  ngOnInit() {
    this.elementRef.nativeElement.addEventListener(
      "mousedown",
      this.handleMousedown,
      false
    );

    document.addEventListener(
      "selectionchange",
      this.handleSelectionchange,
      false
    );
  }

  private handleMouseup = (): void => {
    document.removeEventListener("mouseup", this.handleMouseup, false);
    if (this.selectedColour) this.processSelection();
  };

  private handleMousedown = (): void => {
    document.addEventListener("mouseup", this.handleMouseup, false);
  };

  private processSelection(): void {
    const textSelected = window
      .getSelection()
      .anchorNode.nodeValue.substring(
        window.getSelection().anchorOffset,
        window.getSelection().focusOffset
      );
    const test =
      "<mark style='background:" +
      this.selectedColour +
      "'>" +
      textSelected +
      "</mark>";
    const prev = window
      .getSelection()
      .anchorNode.nodeValue.slice(0, window.getSelection().anchorOffset);
    const post = window
      .getSelection()
      .anchorNode.nodeValue.slice(
        window.getSelection().focusOffset,
        window.getSelection().anchorNode.nodeValue.length
      );
    window.getSelection().anchorNode.nodeValue = prev + test + post;
    const a = window.getSelection().focusNode.parentElement.innerHTML;
    const b = a
      .replace("&gt;", ">")
      .replace("&lt;", "<")
      .replace("&gt;", ">")
      .replace("&lt;", "<");

    this.selectedTextEvent.emit({
      htmlText: b,
      storeText: textSelected
    });
  }

  private handleSelectionchange = (): void => {
    //this.processSelection();
  };

  public ngOnDestroy(): void {
    this.elementRef.nativeElement.removeEventListener(
      "mousedown",
      this.handleMousedown,
      false
    );
    document.removeEventListener("mouseup", this.handleMouseup, false);
    document.removeEventListener(
      "selectionchange",
      this.handleSelectionchange,
      false
    );
  }
}
