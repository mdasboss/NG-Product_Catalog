import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService, AuthUser } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent {
   user!:AuthUser;
  loading = false;
  error = '';

  editform = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
 this.user = this.route.snapshot.data['user'];
      
// ✅ Step 3: Patch values into form
    if (this.user) {
      this.editform.patchValue({
        name: this.user.name,
        email: this.user.email
      });
    }
    

  }

  get f() {
    return this.editform.controls;
  }

  
submit() {
    // if (this.editform.invalid) {
    //   this.editform.markAllAsTouched();
    //   return;
    // }

    this.loading = true;

    // const updatedUser = this.editform.value;

    // // call PATCH API here
    // console.log('Updated user:', updatedUser);
  }


  
  // ✅ this method will be called by CanDeactivate
  canDeactivate(): boolean {
    if (this.loading) {
      return true;
    }

    if (this.editform.dirty) {
      return window.confirm(
        'You have unsaved changes. Do you really want to leave this page?'
      );
    }

    return true;
  }


}
