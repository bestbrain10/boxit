import { Routes,RouterModule } from '@angular/router';
import { DetailComponent } from './detail.component';
import { ListComponent } from './list.component';
import { FormComponent} from './form.component';
import { pageNotFoundComponent } from './pagenotfound.component';
export const routes: Routes = [
    {
        path: 'edit/:id',
        component: FormComponent
    },
    {
        path: 'add',
        component: FormComponent
    },{
        path: 'view/:id',
        component: DetailComponent
    },{
        path: 'search/:term',//find a way to get the search parameter
        component: ListComponent
    },{
        path: '',
        component: ListComponent
    },{
        path: '**',
        component: pageNotFoundComponent
    }
];

