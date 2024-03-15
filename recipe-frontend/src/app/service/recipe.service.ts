import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe';

@Injectable({
    providedIn: 'root',
})
export class RecipeService {
    private apiUrl = 'http://localhost:3000/recipe-api';

    constructor(private http: HttpClient) {}

    // GET request
    getRecipes(queryParams?: any): Observable<any> {
        let params = new HttpParams();

        if (queryParams) {
            Object.keys(queryParams).forEach((key) => {
                params = params.set(key, queryParams[key]);
            });
        }
        return this.http.get(`${this.apiUrl}/getRecipes`, { params });
    }

    // GET request
    getRecipe(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/getRecipe/${id}`);
    }

    // POST request
    createRecipe(data: any): Observable<any> {
        const headers = new HttpHeaders().set(
            'Content-Type',
            'application/json'
        );
        return this.http.post(`${this.apiUrl}/createRecipe`, data, { headers });
    }

    // PUT request
    updateRecipe(data: any): Observable<any> {
        const headers = new HttpHeaders().set(
            'Content-Type',
            'application/json'
        );
        return this.http.patch(`${this.apiUrl}/updateRecipe/${data.id}`, data, {
            headers,
        });
    }

    // DELETE request
    deleteRecipe(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/deleteRecipe/${id}`);
    }
}
