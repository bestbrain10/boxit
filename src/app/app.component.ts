import { Component ,OnInit,OnDestroy,Inject} from '@angular/core';
import { createAppStore, addDispatch, updateDispatch,AppStore} from './store';
import {Router, ActivatedRoute } from '@angular/router';
import {Store} from 'redux';
import { Item } from './item.module';
import {ItemService} from './item.service';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="boxcontainer">
          <a class="navbar-brand" [routerLink]="['/']" style="display:inline-block">
            <span class="glyphicon glyphicon-home"></span>
          </a>
            <input type="text" (keydown.enter)="goto(search.value)" #search>
          <a class="navbar-brand" [routerLink]="['/add']" style="float:right;display:inline-fluid">
            <span class="glyphicon glyphicon-plus"></span>
          </a>
      </div>
    </nav>
    <div class="boxcontainer" style="margin-top:100px">
       <router-outlet></router-outlet>
    </div>
    <div class="modal fade" id="tweet-modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header bg-danger">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
          <h4 class="modal-title ">Are you sure you want to delete item?</h4>
      </div>
    <div class="modal-body">Modal content
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" datadismiss="modal">
      Close
      </button>
      <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
  `,
  styles: [`
   .navbar-header{
            width:100%
        }
        input[type="text"]{
            width:78%;
            height:50px
        }
        @media(max-width: 750px){
          input[type="text"]{
            width:65%;
          }
        }

  `]
})
export class AppComponent implements OnInit, OnDestroy{
  search: String;
  sub;
  items;
  goto(v){
    this.router.navigate(['/'], { queryParams: { search: v } });
  }
  constructor(@Inject(AppStore)private store : Store<Item[]>,private itemService: ItemService,private route:ActivatedRoute,private router: Router){
    this.itemService.all().subscribe((data)=>{
      for(let d of data){
        this.store.dispatch(addDispatch(d));
      }
    });

      this.store.subscribe(()=>{
          this.readState();
      }) 
      this.readState();   
  }

readState(){
    const state: Item[] = this.store.getState();
    this.items = state;
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
