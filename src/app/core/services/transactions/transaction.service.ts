import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {finalize, tap} from 'rxjs';
import {environment} from '@environments/environment';

export interface Transaction {
    id: string;
    avatar: string;
    name: string;
    category_id: string;
    amount: string;
    recurring: boolean;
    created_at: string;
    created_by: string;
}

@Injectable({
    providedIn: 'root'
})
export class TransactionsService {
    private readonly http = inject(HttpClient)

    private readonly _transactions = signal<Transaction[]>([]);
    private readonly _loading = signal<boolean>(false);
    private readonly _error = signal<string | null>(null);

    public negativeAmounts = computed(() => {
        const transactions = this._transactions();
        const totalNeg = transactions
            .map(t => parseFloat(t.amount))
            .filter(amount => amount < 0)
            .reduce((sum, amount) => sum + amount, 0);

        return Math.abs(Math.round(totalNeg * 100) / 100);
    });

    public positiveAmounts = computed(() => {
        const transactions = this._transactions();
        return transactions
            .map(t => parseFloat(t.amount))
            .filter(amount => amount > 0)
            .reduce((sum, amount) => sum + amount, 0);
    });

    public currentBalance = computed(() => {
        return this.positiveAmounts() - this.negativeAmounts();
    });

    public loadTransactions(): void {
        this._loading.set(true);
        this._error.set(null);

        this.http.get<Transaction[]>(`${environment.API_URL}/transactions/all`).pipe(
            tap(data => {
                this._transactions.set(data);
            }),
            finalize(() => this._loading.set(false))
        ).subscribe();
    }
}

