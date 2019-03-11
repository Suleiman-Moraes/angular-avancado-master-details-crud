import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { CategoryService } from './../../categories/shared/category.service';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { flatMap, catchError } from 'rxjs/operators';
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
    return this.setCategoryAndSendToServer(entry, super.create.bind(this))
    /* 
    codigo verdadeiro
    return super.create(entry); 
    */
  }

  update(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.update.bind(this))
    /* 
    codigo verdadeiro
    const url = `${this.apiPath}/${entry.id}`;

    return super.update(entry); 
    */
  }

  //PRIVATE METHODS
  private setCategoryAndSendToServer(entry: Entry, sendFn: any): Observable<Entry>{
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;
        return sendFn(entry);
      }),
      catchError(this.handleError)
    );
  }
}
