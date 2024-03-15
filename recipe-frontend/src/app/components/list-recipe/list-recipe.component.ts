import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../service/recipe.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Recipe } from '../../models/recipe';
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
    tap,
} from 'rxjs/operators';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
    selector: 'app-list-recipe',
    standalone: true,
    imports: [
        InputTextModule,
        CommonModule,
        ProgressSpinnerModule,
        ReactiveFormsModule,
        CardModule,
        ButtonModule,
        ToastModule,
        ConfirmDialogModule,
    ],
    templateUrl: './list-recipe.component.html',
    styleUrls: ['./list-recipe.component.css'],
    providers: [MessageService, ConfirmationService],
})
export class ListRecipeComponent implements OnInit {
    allRecipeData: Recipe[] = [];
    viewedData: Recipe[] = [];

    searchInput = new FormControl();
    loading: boolean = false;

    constructor(
        private recipeService: RecipeService,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        this.fetchAllRecipe();
    }

    ngOnInit(): void {
        this.searchInput.valueChanges
            .pipe(
                debounceTime<string>(300),
                distinctUntilChanged<string>(),
                map((value: string) => value.trim()),
                tap((value: string) => {
                    if (value.length < 3) {
                        this.viewedData = this.allRecipeData;
                    }
                }),
                filter((value: string) => value.length >= 3),
                map((value: string) =>
                    this.allRecipeData.filter((item) =>
                        item.name.toLowerCase().includes(value.toLowerCase())
                    )
                )
            )
            .subscribe((filteredData: Recipe[]) => {
                this.viewedData = filteredData;
            });
    }

    fetchAllRecipe() {
        this.loading = true;
        this.recipeService.getRecipes().subscribe((data) => {
            this.allRecipeData = data;
            this.viewedData = data;
            this.loading = false;
        });
    }

    editTheRecipe(recipeData: Recipe) {
        this.router.navigate(['edit', recipeData.id]);
    }

    deleteRecipe(id: any, event: any) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: 'p-button-danger p-button-text',
            rejectButtonStyleClass: 'p-button-text p-button-text',
            acceptIcon: 'none',
            rejectIcon: 'none',

            accept: () => {
                this.recipeService.deleteRecipe(id).subscribe((value) => {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Success',
                        detail: 'Recipe was successfully deleated',
                    });
                    this.fetchAllRecipe();
                });
            },
            reject: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Rejected',
                    detail: 'You denied Deletion',
                });
            },
        });
    }

    viewRecipe(recipeData: Recipe) {

        this.router.navigate(['view', recipeData.id]);
    }
}
