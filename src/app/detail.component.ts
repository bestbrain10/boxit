import { Component ,OnInit,OnDestroy,Inject} from '@angular/core';
import { createAppStore, addDispatch, updateDispatch,AppStore,deleteDispatch} from './store';
import {Router, ActivatedRoute } from '@angular/router';
import {Store} from 'redux';
import { Item } from './item.module';
import {ItemService} from './item.service';
@Component({
    selector: 'detail',
    template: `
        <div class="panel panel-info">
                <div class="panel-heading">
                        {{item.title}}
                </div>
                <div class="jumbotron">
                        <img [src]="'http://localhost:5000/files/'+item.file" class="img img-thumbnail">
                </div>
                <div class="panel-body">
                        {{item.content}}
                </div>
                <div class="panel-footer">
                        <div class="btn-group">
                                <a class="btn btn-primary " [routerLink]="['/edit',item.id]"><span class="glyphicon glyphicon-edit"></span></a>
                                <button class="btn btn-danger" (click)="del(item.id)"><span class="glyphicon glyphicon-trash"></span></button>
                        </div>
                </div>
       </div>
    `,
})

export class DetailComponent implements OnInit, OnDestroy{
    item: Item;
    sub;
    id: number;
    items: Item[];
    
    ngOnInit(){
      this.sub = this.route.params.subscribe(params => {
        this.id = +params['id']; 
        this.readState();
      });
      
    }

    del(id){
        if(confirm('Are you sure you want to delete Item?')){
            this.itemService.delete(id).subscribe((data)=>{
                this.store.dispatch(deleteDispatch(id));
                this.router.navigate(['/']);
            })
        }
    }

    ngOnDestroy(){
        this.sub.unsubscribe();
    }

constructor(@Inject(AppStore)private store : Store<Item[]>,private itemService: ItemService,private route:ActivatedRoute,private router: Router){
    this.store.subscribe(() => this.readState());
    this.readState();
}

  readState() {
    const state: Item[] = this.store.getState();
    this.items = state;
    this.item = this.items.find((e)=>{return e.id == this.id});
  }
}