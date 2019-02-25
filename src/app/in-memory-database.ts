import { InMemoryDbService } from "angular-in-memory-web-api";
import { Category } from './pages/categories/shared/category.model';

export class InMemoryDbService implements InMemoryDbService{
    createDb(){
        const categories: Category[] = [
            { id: 1, name: "Moradia", description: "" },
            { id: 2, name: "Saúde", description: "" },
            { id: 3, name: "Lazer", description: "" },
            { id: 4, name: "Salário", description: "" },
            { id: 5, name: "Freelas", description: "" },
        ];

        return { categories }
    }
}