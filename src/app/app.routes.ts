import { Routes } from '@angular/router';
import { PlayerFormComponent } from './components/player-form/player-form.component';
import { CheckIn } from './pages/check-in/check-in';
export const routes: Routes = [
    {
        path: 'check-in', 
        component: CheckIn
    }
];
