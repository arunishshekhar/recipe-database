import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
    FormBuilder,
    FormArray,
} from '@angular/forms';
import { SelectItemGroup } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { quantifierUnits, recipeTypeOptions } from '../../constants';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { RecipeService } from '../../service/recipe.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Ingredient, Recipe, Steps } from '../../models/recipe';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@Component({
    selector: 'app-add-edit-recipe',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        DropdownModule,
        RadioButtonModule,
        InputGroupModule,
        InputGroupAddonModule,
        ToastModule,
        ProgressSpinnerModule
    ],
    templateUrl: './add-edit-recipe.component.html',
    styleUrl: './add-edit-recipe.component.css',
    providers: [
        MessageService
    ]
})
export class AddEditRecipeComponent {
    quantifierUnits: SelectItemGroup[] = quantifierUnits;
    recipeTypeOptions: { label: string; value: string }[] = recipeTypeOptions;

    isEditMode: boolean = false;
    recipeId: string ='';
    recipeDetails: Recipe = {} as Recipe;
    isReadonlyMode: boolean = true;
    showForm: boolean = false;
    
    constructor(
        private formBuilder: FormBuilder,
        private recipeService: RecipeService,
        private messageService: MessageService,
        private route: ActivatedRoute
    ) {
        const currentRoute = this.route?.snapshot?.routeConfig?.path?.split('/')[0];
        if  (currentRoute === 'edit') { 
            this.recipeId = this.route.snapshot.paramMap.get('id') || '';
            this.getRecipeById(this.recipeId).subscribe((value: Recipe) => {
                this.recipeDetails = value;
                this.isEditMode = true;
                this.isReadonlyMode = false;
                this.recipeForm.patchValue({...value});
                this.buildIngredients(value.ingredients);
                this.buildSteps(value.steps);
                this.showForm = true;
            });
        } else if (currentRoute === 'view') {
            this.recipeId = this.route.snapshot.paramMap.get('id') || '';
            this.getRecipeById(this.recipeId).subscribe((value: Recipe) => {
                this.recipeDetails = value;
                this.isReadonlyMode = true;
                this.recipeForm.disable();
                this.recipeForm.patchValue({...value});
                this.buildIngredients(value.ingredients);
                this.buildSteps(value.steps);
                this.showForm = true;
            });
        } else {
            this.showForm = true;
            this.isEditMode = false;
            this.isReadonlyMode = false;
        }
        
    }

    public recipeForm = new FormGroup({
        name: new FormControl('', Validators.required),
        type: new FormControl('', Validators.required),
        ingredients: this.formBuilder.array([], Validators.required),
        steps: this.formBuilder.array([], Validators.required),
    });

    public get recipeIngredients(): FormArray {
        return this.recipeForm.controls['ingredients'] as FormArray;
    }

    public get recipeSteps(): FormArray {
        return this.recipeForm.controls['steps'] as FormArray;
    }

    public addIngredient(): void {
        if (
            this.recipeIngredients.valid ||
            this.recipeIngredients.length === 0
        ) {
            const ingredient = this.formBuilder.group({
                name: ['', Validators.required],
                quantityValue: ['', Validators.required],
                quantity: ['', Validators.required],
            });

            this.recipeIngredients.push(ingredient);
        }
    }

    public deleteIngredient(index: number): void {
        this.recipeIngredients.removeAt(index);
    }

    private buildIngredients(ingredients: Ingredient[]) {
        ingredients.forEach((ingredient) => {
            const ingredientBuilder = this.formBuilder.group({
                name: [ingredient?.name, Validators.required],
                quantityValue: [ingredient?.quantityValue, Validators.required],
                quantity: [ingredient?.quantity, Validators.required],
            });

            this.recipeIngredients.push(ingredientBuilder);
        })
    }

    private buildSteps(steps: Steps[]) {
        steps.forEach((step) => {
            const stepBuilder = this.formBuilder.group({
                stepDetail: [step?.stepDetail, Validators.required],
            });

            this.recipeSteps.push(stepBuilder);
        });
    }
    public addStep(): void {
        if (this.recipeSteps.valid || this.recipeSteps.length === 0) {
            const step = this.formBuilder.group({
                stepDetail: ['', Validators.required],
            });

            this.recipeSteps.push(step);
        }
    }

    private getRecipeById(id: string) {
        return this.recipeService.getRecipe(id);
    }

    public deleteStep(index: number): void {
        this.recipeSteps.removeAt(index);
    }
    public onSubmit(): void {
        if (this.isEditMode) {
            this.recipeService.updateRecipe({...this.recipeForm.value, id: this.recipeId}).subscribe((value) => {
                this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Recipe was updated Successfully' });
            })
        } else {
            this.recipeService.createRecipe(this.recipeForm.value).subscribe((value) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Recipe was added Successfully' });
            })
        }
    }
}
