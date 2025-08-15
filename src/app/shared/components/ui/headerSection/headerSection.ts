import {Component, input} from '@angular/core';
import {ArrowRight, LucideAngularModule} from 'lucide-angular';
import {RouterLink} from '@angular/router';

@Component({
    selector: "app-header-section",
    imports: [
        LucideAngularModule,
        RouterLink
    ],
    templateUrl: "./headerSection.html"
})

export class HeaderSection {
    public readonly title = input.required<string>()
    public readonly href = input.required<string>()
    protected readonly ArrowRight = ArrowRight;
}
