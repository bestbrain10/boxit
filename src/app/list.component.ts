import { Component,OnInit,OnDestroy,Inject } from '@angular/core';
import { Router ,ActivatedRoute } from '@angular/router'
import { Item } from './item.module';
import { createAppStore,AppStore ,deleteDispatch} from './store';
import { Store } from 'redux';
import {ItemService} from './item.service';
@Component({
    selector: 'item-list',
    template: `
        <div class="list-group" *ngIf="items">
                <div *ngFor="let text of items | filter:search" class="list-group-item row">
                        <div class="col-md-9 col-xs-12">
                                <div class="list-group-item-heading h5"><img [src]="'http://localhost:5000/files/'+text.file" class="img img-thumbnail"/> {{text.title}}</div>
                                <p class="text-justified">{{text.content}}</p>
                                <small>{{text.createdAt | date : 'fullDate'}}</small>
                        </div>
                        <div class="col-md-3 col-xs-12">
                                <div class="btn-group pull-right">
                                        <a class="btn btn-sm btn-info" [routerLink]="['/view',text.id]"><span class="glyphicon glyphicon-bookmark"></span></a>
                                        <a class="btn btn-sm btn-primary" [routerLink]="['/edit',text.id]"><span class="glyphicon glyphicon-edit"></span></a>
                                        <button class="btn btn-sm btn-danger" (click)="del(text.id)"><span class="glyphicon glyphicon-trash"></span></button>
                                </div>
                        </div>
                </div>
        </div>
        <a *ngIf="!items.length" class="list-group-item text-center" [routerLink]="['/add']">
            <h1>No Items On Diary</h1>
            <small>Add some</small>
        </a>
    `
})
export class ListComponent implements OnInit,OnDestroy{
  items=[];
  sub;
  search;
  constructor(@Inject(AppStore) private store: Store<Item[]>, private itemService: ItemService,private router: Router, private route: ActivatedRoute){
        this.store.subscribe(()=>{
          this.readState();
      }) 
      this.readState();   
  }

readState(){
    const state: Item[] = this.store.getState();
    this.items = state;
}
      
del(id){
        if(confirm('Are you sure you want to delete Item?')){
            this.itemService.delete(id).subscribe((data)=>{
                this.store.dispatch(deleteDispatch(id));
                this.router.navigate(['/']);
            })
        }
    }

  ngOnInit(){
     this.sub = this.route.queryParams.subscribe(params => {
      this.search = params['search'] || '';
    }); 
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}