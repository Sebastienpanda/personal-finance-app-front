import {Routes} from '@angular/router';
import Dashboard from './dashboard';

const routes: Routes = [{
    path: "",
    component: Dashboard,
    children: [
        {
            path: "",
            loadComponent: () => import("@features/dashboard/pages/index/index")
        }
    ]
}]

export default routes
