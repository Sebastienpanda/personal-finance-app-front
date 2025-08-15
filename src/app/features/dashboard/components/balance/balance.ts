import {Component, input} from '@angular/core';
import {CurrencyPipe} from '@angular/common';

@Component({
    selector: "app-balance",
    imports: [
        CurrencyPipe
    ],
    templateUrl: "./balance.html"
})

export class Balance {
    readonly currentBalance = input.required<number>();
    readonly positiveAmounts = input.required<number>();
    readonly negativeAmounts = input.required<number>();
}
