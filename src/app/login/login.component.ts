import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

public loginForm!: FormGroup

  constructor(private formBuilder:FormBuilder,private http:HttpClient,
    private router:Router) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      //validators for login
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    //getting data from json and checking input matching
    this.http.get<any>("http://localhost:3000/signupUsers").subscribe(res=>{
     const user= res.find((a:any)=>{
      return a.email===this.loginForm.value.email && a.password===this.loginForm.value.password
     })
     if(user){
       alert("Login successful")
       this.loginForm.reset()
       localStorage.setItem('user', JSON.stringify(user));
       // if login succesful routing to homepage
       this.router.navigate(["homepage"])
     }
       else{
         alert("User not found")
     }
    },err=>{
      alert("Something went wrong")
    })
  }
}
