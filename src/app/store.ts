import { InjectionToken,Inject } from '@angular/core';
import { createStore,Action,Reducer,Store, StoreEnhancer, compose} from 'redux';
import { Item } from './item.module';
import {Http,Response} from '@angular/http';
import { ItemService } from './item.service';
export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const UPDATE_ITEM = "UPDATE_ITEM";


let initialState: Item[] =  [];
//should be ajax populated


interface addItemAction extends Action{
    item: Item;
}

interface deleteItemAction extends Action{
    id: number;
}

interface updateItemAction extends Action{
    item: Object;
    id: number;
}

let reducer: Reducer<Item[]> = (state: Item[] = initialState, action: Action)=>{
    switch(action.type){
        case ADD_ITEM:
        return  state.concat((<addItemAction>action).item);
        case DELETE_ITEM:
        return state.filter(item=>{ return item.id !== (<deleteItemAction>action).id});
        case UPDATE_ITEM:
        return state.map((item) => {
            if (item.id === (<updateItemAction>action).id) {
                return Object.assign({}, item, (<updateItemAction>action).item)
            } 
                return item
            })
        default:
        return state;
    }
}


const devtools: StoreEnhancer<Item[]> = window['deToolsExtension']? window['devToolsExtension'](): f=> f;
export function createAppStore(): Store<Item[]>{
    return createStore<Item[]>(reducer,compose(devtools));
}


export function deleteDispatch(id){
    return {type: DELETE_ITEM, id: id} as deleteItemAction;
}

export function addDispatch(item: Item){
    return {type: ADD_ITEM,
    item: item
    } as addItemAction;
}

export function updateDispatch(id: number,item: Object){
    return {type: UPDATE_ITEM,
    id: id,
    item: item
    } as updateItemAction;
}

export const AppStore = new InjectionToken('App.store');

export const appStoreProviders = [
   { provide: AppStore, useFactory: createAppStore }
];
