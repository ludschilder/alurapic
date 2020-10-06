import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PhotosModule } from "../photos.module";
import { Photo } from './photo';


const API = 'http://localhost:3000';

@Injectable({
    providedIn: 'root'
})

export class PhotoService{

    
    //Forma de tornar o http uma propriedade de forma não otimizada
    // http: HttpClient;
    // constructor(http: HttpClient){
    //     this.http = http;
    // }

    //O Parâmetro public, torna o http uma propriedade da classe
    constructor(private http: HttpClient){
        
    }

    listFromUser(userName: string){
        return this.http
        .get<Photo[]>(API + '/' + userName + '/photos');
    }

    listFromUserPaginated(userName: string, page: number){
        const params = new HttpParams()
        .append('page', page.toString());

        return this.http
        .get<Photo[]>(API + '/' + userName + '/photos', {params});
    }

    
}