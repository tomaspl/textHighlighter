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
  public selectedColour: string;
  public listHighlightByColour: any;
  public userText: SafeHtml;
  public selectColourForFilter: string;
  public errorHighlight: string;
  @Input() coloursForHighlight: Array<ColourConfiguration>;
  @Input() listFilteredByHighlightColour: Array<ColourSelection>;
  @Output() addedHighlightSelection = new EventEmitter<ColourSelection>();
  @Output() filterByColour = new EventEmitter<string>();

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.listFilteredByHighlightColour.currentValue.length > 0) {
      const mappedFilteredHighlights = this.mapFilteredHighlights(
        simpleChanges.listFilteredByHighlightColour.currentValue
      );
      this.listHighlightByColour = this.sanitizer.bypassSecurityTrustHtml(
        mappedFilteredHighlights
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

  public onDragOver($event) {
    $event.preventDefault();
  }

  public onDragLeave($event) {
    $event.preventDefault();
  }

  public selectColor(colour) {
    this.selectedColour = colour;
  }
  public selectedFilter(colour) {
    this.selectColourForFilter = colour;
    this.filterByColour.emit(colour);
  }

  public highlightText($event) {
    if ($event.htmlText !== "") {
      this.errorHighlight = "";
      this.userText = this.sanitizer.bypassSecurityTrustHtml($event.htmlText);
      this.addedHighlightSelection.emit({
        colourText: this.selectedColour,
        text: $event.storeText,
        htmlText: $event.htmlText
      });
    } else {
      this.errorHighlight = $event.error;
    }
  }

  private mapFilteredHighlights(list) {
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
