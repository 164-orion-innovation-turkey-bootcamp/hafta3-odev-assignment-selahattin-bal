import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
signupForm!:FormGroup

  constructor(private formBuilder:FormBuilder, private http:HttpClient,
    private router:Router) { }

  ngOnInit(): void {
    this.signupForm=this.formBuilder.group({
      // validators for signup form
    username:["", Validators.required],
    email:["", [Validators.required, Validators.email]],
    password:["",[Validators.required,Validators.minLength(6)]],
   
    })
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
