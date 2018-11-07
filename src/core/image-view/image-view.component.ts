import { Component, OnInit, Input } from '@angular/core';
import { CacheService } from 'src/app/cache.service';
import { ShelterService, IImage } from 'src/app/shelter/shelter.service';
import { Buffer } from 'buffer';
import { mergeMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss'],
  providers: [ShelterService]
})
export class ImageViewComponent implements OnInit {
  @Input() shelterId: string;
  images: { file: IImage, url: any }[] = [];
  downloading = false;
  constructor(private cache: CacheService, private shelterService: ShelterService) { }

  loadImage(fileData: IImage): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const data = Buffer.from(fileData.data);
      const blob = new Blob([data], { type: <string>fileData.contentType });
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = reader.result;
        this.images.push({ file: fileData, url: src });
      };
      reader.onloadend = (e) => {
        resolve();
      };
      reader.onerror = (err) => {
        reject(err);
      };
      reader.onabort = (e) => {
        reject(e);
      };

      reader.readAsDataURL(blob);
    });

  }

  initializeImages(images: IImage[]) {
    const promises = [];
    images.forEach(image => {
      promises.push(this.loadImage(image));
    });
    return Promise.all(promises);
  }

  ngOnInit() {
    if (this.shelterId) {
      this.downloading = true;
      this.shelterService.getImagesByShelter(this.shelterId).pipe(
        mergeMap(images => images),
        mergeMap(image => this.shelterService.getFile((<any>image)._id))
      )
        .forEach(async image => {
          await this.loadImage(image);
        })
        .then(() => {
          this.downloading = false;
        });
    }
  }

  getFirstImages(): { file: IImage, url: any }[] {
    if (!this.downloading) {
      return this.images.slice(0, 3);
    } else {
      return [];
    }
  }

}
