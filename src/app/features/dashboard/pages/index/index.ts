import {Component, inject, OnInit} from '@angular/core';
import {TransactionsService} from '@core/services/transactions/transaction.service';
import {PotsService} from '@core/services/pots/pot.service';
import {ArrowRight, LucideAngularModule} from 'lucide-angular';
import {Balance} from '@features/dashboard/components/balance/balance';
import {HeaderSection} from '@shared/components/ui/headerSection/headerSection';
import {Pots} from '@features/dashboard/components/pots/pots';

@Component({
    selector: 'app-home',
    imports: [
        LucideAngularModule,
        Balance,
        HeaderSection,
        Pots
    ],
    templateUrl: "./index.html"
})

export default class Home implements OnInit {
    protected readonly transactionsService = inject(TransactionsService);
    protected readonly potsService = inject(PotsService);

    ngOnInit() {
        this.transactionsService.loadTransactions()
        this.potsService.loadAllPots();
    }

    protected readonly ArrowRight = ArrowRight;
}
