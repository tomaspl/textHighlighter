import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import {
  Component,
  ViewEncapsulation,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges
} from "@angular/core";
import { ColourSelection, ColourConfiguration } from "../models/models";
@Component({
  selector: "app-highlight",
  templateUrl: "./highlight.component.html",
  styleUrls: ["./highlight.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class HighlightComponent implements OnInit, OnChanges {
  @Input() coloursForHighlight: Array<ColourConfiguration>;
  @Input() listFilteredByHighlightColour: Array<ColourSelection>;
  @Output() addedHighlightSelection = new EventEmitter<ColourSelection>();
  @Output() filterByColour = new EventEmitter<string>();

  selectedColour: string;
  listHighlightByColour: any;
  userText: SafeHtml;
  selectColourForFilter: string;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.listFilteredByHighlightColour.currentValue.length > 0) {
      this.listHighlightByColour = this.sanitizer.bypassSecurityTrustHtml(
        this.mapFilteredHighlights(
          simpleChanges.listFilteredByHighlightColour.currentValue
        )
      );
    } else {
      this.listHighlightByColour = this.selectColourForFilter
        ? "No text was highlighted with the colour selected"
        : "";
    }
  }

  ngOnInit() {
    document.addEventListener("dragstart", function(event) {
      event.preventDefault();
    });
  }

  onDragOver($event) {
    $event.preventDefault();
  }

  onDragLeave($event) {
    $event.preventDefault();
  }

  selectColor(colour) {
    this.selectedColour = colour;
  }
  selectedFilter(colour) {
    this.selectColourForFilter = colour;
    this.filterByColour.emit(colour);
  }

  highlightText($event) {
    this.userText = this.sanitizer.bypassSecurityTrustHtml($event.htmlText);
    this.addedHighlightSelection.emit({
      colourText: this.selectedColour,
      text: $event.storeText,
      htmlText: $event.htmlText
    });
  }

  mapFilteredHighlights(list) {
    let listString = "";
    list.forEach(element => {
      listString +=
        '<mark style="background:' +
        element.colourText +
        '">' +
        element.text +
        "</mark><br/>";
    });

    return listString;
  }
}
