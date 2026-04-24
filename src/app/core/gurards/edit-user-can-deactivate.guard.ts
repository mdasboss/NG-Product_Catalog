import { CanDeactivateFn } from '@angular/router';
import { EditUserComponent } from '../../features/auth/pages/edit-user/edit-user.component';

export const editUserCanDeactivateGuard: CanDeactivateFn<EditUserComponent> =
  (component) => {
    return component.canDeactivate();
  };
``