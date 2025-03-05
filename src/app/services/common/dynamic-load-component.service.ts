import {  Injectable, ViewContainerRef } from '@angular/core';
import { BasketsComponent } from 'src/app/ui/components/baskets/baskets.component';

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadComponentService {

  // ViewContainerRef : dinamik olarak yüklenecek componenti içerisinde barındıran containerdır.(her dinamik yükleme  sürecinde önceki viewleri cleare etmemiz gerekir. )

  constructor() { }

  async loadComponent(component : ComponentType , viewContainerRef : ViewContainerRef){
    let _component : any = null;
    switch(component){
      case ComponentType.BasketsComponent:
        _component = (await import("../../ui/components/baskets/baskets.component")).BasketsComponent;
        break;

    }
    viewContainerRef.clear();
    return viewContainerRef.createComponent(_component);
  }
}

export enum ComponentType{
  BasketsComponent
}
