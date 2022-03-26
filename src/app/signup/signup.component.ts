import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchValidatorService } from '../services/passwordMatchValidator.service';
import {  usernameValidator } from '../services/regexValidator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
signupForm!:FormGroup

  constructor(private formBuilder:FormBuilder, private http:HttpClient,
    private router:Router ,private match:passwordMatchValidatorService) { }
    //using pattern att. for regex valid.(common patterns are used)
    emailPattern =/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
    pwdPattern =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  ngOnInit(): void {
   

    //form build is a much easier way
    this.signupForm=this.formBuilder.group({
      //3 type of validation added
      // usernameValidator added in default validation from regexValidator.ts (1)
    username:["", usernameValidator],
    // default validators(2)
    email:["", Validators.pattern(this.emailPattern)],
    password:["",[Validators.required,Validators.pattern(this.pwdPattern)]],
    confirmpassword:[""],},
    {
      //custom validator(3)from passwordMatchValidator.ts
      validator:this.match.passwordMatchValidator('password','confirmpassword')
    }
    )
  }
  

  signUp(){
    //posting to db.json for fake json server
    //firstly you have to start json server for working json-server --watch db.json 
    this.http.post<any>("http://localhost:3000/signupUsers",this.signupForm.value).subscribe(res=>{
      alert("You have signed up successfully ")
      this.signupForm.reset()
      this.router.navigate(["login"]) 
      // saving data in local storage
      localStorage.setItem('user', JSON.stringify(this.signupForm));
  },err=>{
    alert("something went wrong")
  })

  }
}
