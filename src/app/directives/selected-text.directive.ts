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
    console.log("this.selectedColour", this.selectedColour);
    const selectedText = window
      .getSelection()
      .anchorNode.nodeValue.substring(
        window.getSelection().anchorOffset,
        window.getSelection().focusOffset
      );
    const selectedTextStyled =
      "<mark style='background:" +
      this.selectedColour +
      "'>" +
      selectedText +
      "</mark>";
    const previousText = window
      .getSelection()
      .anchorNode.nodeValue.slice(0, window.getSelection().anchorOffset);
    const afterText = window
      .getSelection()
      .anchorNode.nodeValue.slice(
        window.getSelection().focusOffset,
        window.getSelection().anchorNode.nodeValue.length
      );
    window.getSelection().anchorNode.nodeValue =
      previousText + selectedTextStyled + afterText;
    const newText = window.getSelection().focusNode.parentElement.innerHTML;
    const newHTMLParsed = newText
      .replace("&gt;", ">")
      .replace("&lt;", "<")
      .replace("&gt;", ">")
      .replace("&lt;", "<");

    this.selectedTextEvent.emit({
      htmlText: newHTMLParsed,
      storeText: selectedText
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
