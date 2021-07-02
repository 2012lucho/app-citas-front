import { Component, OnInit, Input} from '@angular/core';

import { ImageDataModel } from './image.data.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  @Input() imageData: Array<ImageDataModel> = [];

  public slideOpts:any = {
    initialSlide: 1,
    speed: 400
  };

  constructor() {}

  ngOnInit(): void {
  }
}
