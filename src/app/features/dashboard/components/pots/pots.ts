import {Component, input} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {Pot} from '@core/services/pots/pot.service';

@Component({
    selector: "app-pots",
    imports: [
        CurrencyPipe
    ],
    templateUrl: "./pots.html"
})

export class Pots {
    public readonly lastFourPots = input.required<Pot[]>()
    public readonly totalSaved = input.required<number>()
}
