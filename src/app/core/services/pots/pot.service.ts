import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment';
import {catchError, of, tap} from 'rxjs';

export interface Pot {
    id: string;
    createdBy: string;
    name: string;
    target: number;
    total: number;
    theme: string;
    createdAt: string;
}

@Injectable({
    providedIn: 'root'
})
export class PotsService {
    private readonly http = inject(HttpClient);

    pots = signal<Pot[]>([]);
    loading = signal<boolean>(false);
    error = signal<string | null>(null);

    totalSaved = computed(() =>
        this.pots().reduce((sum, pot) => sum + (Number(pot.total) || 0), 0)
    );

    lastFourPots = computed(() =>
        [...this.pots()]
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 4)
    );

    loadAllPots() {
        this.loading.set(true);
        this.error.set(null);

        this.http.get<Pot[]>(`${environment.API_URL}/pots/all`).pipe(
            tap(data => this.pots.set(data)),
            catchError(err => {
                console.error('Erreur récupération pots', err);
                this.error.set('Impossible de charger les pots.');
                return of([]);
            }),
            tap(() => this.loading.set(false))
        ).subscribe();
    }
}
