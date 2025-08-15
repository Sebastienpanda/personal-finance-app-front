import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        loadChildren: () => import("@core/layouts/dashboard/dashboard.route")
    }
];
