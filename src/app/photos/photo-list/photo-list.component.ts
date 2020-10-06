import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, } from 'rxjs/operators';

import { Photo } from '../photo/photo';
// import { timeStamp } from 'console';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})

export class PhotoListComponent implements OnInit , OnDestroy{

  photos : Photo[] = [];
  filter: string = '';
  debounce: Subject<string> = new Subject<string>();
  hasMore: boolean = true;
  currentPage = 1;
  userName: string = '';

  nome = 'Ludwig';


  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService
  ){}


  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.params.userName;
    this.photos = this.activatedRoute.snapshot.data['photos'];
    this.debounce
        .pipe(debounceTime(300))
        .subscribe(filter => this.filter = filter);
      //this.debouce.next('f')
      //this.debouce.subscribe(value => alert(value));
  }
  ngOnDestroy(): void {
    this.debounce.unsubscribe();
    // throw new Error('Metodo não implementado');
  }

  load(){
    this.photoService
    .listFromUserPaginated(this.userName, ++this.currentPage)
    .subscribe(photos => {
      this.photos = this.photos.concat(photos);
      if(!photos.length)
        this.hasMore = false;
    });
  }

        // const userName = this.activatedRoute
        // .snapshot
        // .params
        // .userName;

        // this.photoService
        // .listFromUser(userName)
        // .subscribe(photos => this.photos = photos);
}
