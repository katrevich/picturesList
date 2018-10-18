import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { File, Entry } from '@ionic-native/file';
import { normalizeURL } from 'ionic-angular';
import { Platform } from 'ionic-angular';

const STORAGE_KEY = 'images';

export enum ImageType {
  CAMERA,
  GALLERY
}

export interface Image {
  url: string,
  type: ImageType,
}

@Injectable()
export class ImagesProvider {
  images: Image[] = [];

  constructor(
    private nativeStorage: NativeStorage,
    private file: File,
    private platform: Platform,
  ) {
    this.platform.ready().then(() => {
      this.getImages();
    })
  }

  async getImages() {
    try {
      const images = await this.nativeStorage.getItem(STORAGE_KEY);
      this.images = images.map((image: Image) => ({...image, url: normalizeURL(image.url)}));
      console.log(this.images);
    } catch (e) {
      console.log('error: ', e);
    }
  }

  async saveImage(tempImageURI: string, type: ImageType) {
    let i = tempImageURI.lastIndexOf('/');
    let dirName = tempImageURI.substr(0, i);
    let fileName = tempImageURI.substr(i + 1);
    try {
      const entry: Entry = await this.file.copyFile(dirName, fileName, this.file.dataDirectory, new Date().getTime() + fileName);
      const url = entry.nativeURL;
      await this.nativeStorage.setItem(STORAGE_KEY, [...this.images, {
        url,
        type
      }]);
      this.getImages();
    } catch (e) {
      console.log('set item error')
      console.log(e);
      throw new Error(e);
    }
  }

  async removeItem(index: number) {
    const updatedImages = [
      ...this.images.slice(0, index),
      ...this.images.slice(index + 1)
    ];
    
    try {
      await this.nativeStorage.setItem(STORAGE_KEY, updatedImages);
      await this.getImages();
    } catch (e) {
      console.log('error: ', e);
    }
  }

}
