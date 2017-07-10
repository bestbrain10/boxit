import { Component ,OnInit,OnDestroy,Inject} from '@angular/core';
import { createAppStore, addDispatch, updateDispatch,AppStore} from './store';
import {Router, ActivatedRoute } from '@angular/router';
import {Store} from 'redux';
import { Item } from './item.module';
import {ItemService} from './item.service';
@Component({
    selector: 'item-form',
    template: `
    <div class="alert alert-danger" *ngIf="error">
    {{error}}
    </div>
        <form class="panel panel-primary" #mainForm="ngForm"  (ngSubmit)="submit()">
                <div class="panel-heading">    
                <div class="form-group" >
                    <input maxlength="100" minlength="4" type="text" class="form-control" [(ngModel)]="item.title" name="title"  placeholder="Enter Entry Title" title="Title" required/>
                </div>
                </div>
                
                <label class="jumbotron" style="width:100%;cursor:pointer">
                    <img  class="img img-responsive"   [attr.src]="imgsrc"  #img/>
                    <span *ngIf="img.src.length < 23" class="h3" style="text-align:center">Upload An Image <span class="glyphicon glyphicon-cloud-upload "></span></span>
                    <input type="file" name="file" style="display:none"  (change)="preview($event,img)" />
                </label>
                <div class="panel-body">
                <textarea maxlength="450" minlength="20" name="content" class="form-control" placeholder="Enter Entry Content" [(ngModel)]="item.content" title="content" required></textarea>
                <small>Minimum of 20 characters. {{item.content.length}} Entered</small>
                </div>
                
                <div class="panel-footer">
                <button class="btn btn-primary btn-block" [disabled]="mainForm.pristine || mainForm.invalid">Save</button>
                </div>
        </form>     
    `
})

export class FormComponent implements OnInit, OnDestroy{
    item: Item = new Item(<Item>{});
    imgsrc;
    fd: FormData= new FormData();
    submit(){
        this.fd.set('content',this.item.content);
        this.fd.set('title',this.item.title);
        if(this.id){
            this.itemService.put(this.id,this.fd).subscribe((data)=>{
                this.store.dispatch(updateDispatch(this.id,data));
                this.router.navigate(['/']);
            },(err)=>console.log('failed: ',err));
        }else{
            this.itemService.post(this.fd).subscribe((data)=>{
                this.store.dispatch(addDispatch(data));
                this.router.navigate(['/']);
            },(err)=>console.log('failed: ',err));
        }
        return false;
    }
    sub;
    id;
    items;
    constructor(@Inject(AppStore)private store : Store<Item[]>,private itemService: ItemService,private route:ActivatedRoute,private router: Router){
    store.subscribe(() => this.readState());
    this.readState();
  }

  readState() {
    const state: Item[] = this.store.getState();
    this.items = state;
    if(this.id){
        this.item = this.items.find((item)=>{return this.id == item.id;});
        this.imgsrc  = (this.item.file)?"http://localhost:5000/files/"+this.item.file: null;
    }
  }
    mode: String;
    ngOnInit(){
      this.sub = this.route.params.subscribe(params => {
        this.id = +params['id']; 
        this.readState();
      });
    }

    ngOnDestroy(){
        if(this.sub){
            this.sub.unsubscribe();
        }
    }
error;
changed = false;
    preview(e,img){
        let file = e.target.files[0];
        if(file.type.search("image") !== -1){
            this.changed = true;
            this.error = undefined;
            this.fd.set('file',file);
            img.file = file;
            var reader = new FileReader();
            reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
            reader.readAsDataURL(file);
        }else{
            this.error = "File Not Supported please select a valid Image";
        }
        
    }

}