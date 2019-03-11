import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { CategoryService } from './../../categories/shared/category.service';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry>{

  constructor(
    protected injector: Injector,
    //gambizinha do back
    private categoryService: CategoryService
  ) {
    super("api/entries", injector, Entry.fromJson);
  }

  create(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;
        return super.create(entry);
      })
    )
    /* 
    codigo verdadeiro
    return super.create(entry); 
    */
  }

  update(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;
        return super.update(entry);
      })
    )
    /* 
    codigo verdadeiro
    const url = `${this.apiPath}/${entry.id}`;

    return super.update(entry); 
    */
  }
}
