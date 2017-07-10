import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { Item } from './item.module';
@Injectable()
export class ItemService {
    
    constructor (private http: Http) {
        
    }
    url =(str='')=>{
        return "http://localhost:5000/api/"+str;
    }; 

    get(id: number): Observable<any> {
        return this.http.get(this.url(`${id}`)).map((response) => response.json());
    }

    all(): Observable<any> {
        return this.http.get(this.url()).map((response) => response.json());
    }

    post(obj: Object): Observable<any>{
        return this.http.post(this.url(),obj).map((response)=>response.json());
    }

    put(id: number,obj: Object){
        return this.http.put(this.url(`${id}`),obj).map((response)=>response.json());
    }

    delete(id: number){
        return this.http.delete(this.url(`${id}`)).map((response)=>response.json());
    }
}