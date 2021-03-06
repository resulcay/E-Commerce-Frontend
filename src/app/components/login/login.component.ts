import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup(
    {
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    }
  )
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group(
      {
        email: ["", Validators.required],
        password: ["", Validators.required],
      }
    )
  }

  login() {
    if (this.loginForm.valid) {

      //  console.log(this.loginForm.value)

      let loginModel = Object.assign({}, this.loginForm.value)

      this.authService.login(loginModel).subscribe(
        response => {
          if (response.success) {
            this.toastrService.success(response.message, "Successfuly Logged In")
            localStorage.setItem("token", response.data.token)
          }
        }, onError => {
          this.toastrService.error(onError.error, "Error While Logging In")

        }
      )
    }
  }

}
