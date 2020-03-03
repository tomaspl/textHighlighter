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
  public selectedTextEvent: EventEmitter<any>;

  private elementRef: ElementRef;

  @Input() selectedColour: string;

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
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.removeEventListener(
      "mousedown",
      this.handleMousedown,
      false
    );
    document.removeEventListener("mouseup", this.handleMouseup, false);
  }
  private notPreviouslyHighlightedText(focusNode, anchorNode) {
    return (
      focusNode.parentElement.localName !== "mark" &&
      anchorNode.nodeValue === focusNode.nodeValue &&
      anchorNode.nodeValue
    );
  }

  private hasTextSelected(selection) {
    return selection.anchorOffset - selection.focusOffset !== 0;
  }

  private handleMouseup = (): void => {
    document.removeEventListener("mouseup", this.handleMouseup, false);
    if (
      this.selectedColour &&
      this.notPreviouslyHighlightedText(
        window.getSelection().focusNode,
        window.getSelection().anchorNode
      )
    ) {
      this.processSelection();
    } else {
      if (this.hasTextSelected(window.getSelection())) {
        this.selectedTextEvent.emit({
          htmlText: "",
          storeText: "",
          error: this.getSelectionError(window.getSelection())
        });
      }
    }
  };
  private getSelectionError(selection) {
    if (selection.anchorNode.nodeValue !== selection.focusNode.nodeValue)
      return "Previous highlight exists on selected text";
    if (
      !this.selectedColour &&
      selection.anchorOffset !== selection.focusOffset
    )
      return "No color selected";
  }
  private handleMousedown = (): void => {
    document.addEventListener("mouseup", this.handleMouseup, false);
  };

  private getSelectedText() {
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

    return {
      selectedText,
      newNodeValue: previousText + selectedTextStyled + afterText
    };
  }

  private processSelection(): void {
    const { selectedText, newNodeValue } = this.getSelectedText();
    window.getSelection().anchorNode.nodeValue = newNodeValue;
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
}
