import { Component, Input } from '@angular/core';
import { Link } from '../shared/model/d3/link';

@Component({
  selector: '[linkVisual]',
  templateUrl:"./link-visual.component.html",
  styleUrls: ['./link-visual.component.scss']
})
export class LinkVisualComponent  {
  @Input('linkVisual') link: Link;
}
