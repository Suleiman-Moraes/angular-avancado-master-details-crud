import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { CategoryService } from './../../categories/shared/category.service';
import { Category } from './../../categories/shared/category.model';
import { Entry } from './../shared/entry.model';
import { Component, OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EntryService } from '../shared/entry.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import toastr from "toastr";

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit{

  categories: Array<Category>;

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '', //Separador de milhas
    padFractionalZeros: true, // add zeros
    normalizeZeros: true,
    radix: ',' //separador de decimais
  };

  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"],
    dayNamesShort: ["Dom","Seg","Ter","Qua","Qui","Sex","Sab"],
    dayNamesMin: ["Do","Se","Te","Qu","Qu","Se","Sa"],
    monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
    monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez" ],
    today: 'Hoje',
    clear: 'Limpar'
  }

  constructor(
    protected entryService: EntryService,
    protected categoryService: CategoryService,
    protected injector: Injector
  ) {
    super(injector, new Entry(), entryService, Entry.fromJson);
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadCategories();
  }

  get typeOptions(): Array<any>{
    return Object.entries(Entry.types).map(
      ([value, text]) => {
        return{
          text: text,
          value: value
        }
      }
    )
  }

  //PRIVATES METHODS
  private loadCategories(){
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories
    );
  }

  protected buildResourceForm(): void{
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: ["expense", [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [true, [Validators.required]],
      categoryId: [null, [Validators.required]]
    });
  }

  protected createPageTitle(): string{
    return "Cadastro de Novo Lançamento";
  }

  protected editionPageTitle(): string{
    const resourceName = this.resource.name || "" ;
    return "Editando Lançamento: " + resourceName;
  }
}