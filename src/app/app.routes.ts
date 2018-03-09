import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashboardComponent } from './pages/dashboard.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent}
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
