import { Component, OnInit } from '@angular/core';
import {MainService} from '../main.service';
import {SppAdultTestResult, Test} from '../entity/test';
import {Router} from '@angular/router';

@Component({
  selector: 'app-spp-adult',
  templateUrl: './spp-adult.component.html',
  styleUrls: ['./spp-adult.component.css']
})
export class SppAdultComponent implements OnInit {

  constructor(public mainService: MainService, private router: Router) { }
  loading: boolean = false;

  testList:Test[]
  testResult:SppAdultTestResult | null= null

  submitted: boolean = false

  ngOnInit() {
    this.testResult = null
    this.loading = true
    this.mainService.getSppAdultData().subscribe((ans)=>{
      this.testList = ans
      this.testList.sort((a,b)=>a.id-b.id)
    },()=>{},()=>this.loading = false)
  }

  get iam(){
    return this.mainService.currentChild
  }

  get myName(){
    if(!this.iam)return this.mainService.user.firstName
    else return this.iam.name
  }

  goBack(){
    this.router.navigate(['testRouter'])
  }

  submit(){
    this.submitted = true;
    for(let i=0; i<this.testList.length; i++){
      if(!this.testList[i].ans){
        window.location.hash='testRow'+i
        return
      }
    }
    this.loading = true
    this.mainService.postSppAdultData(this.testList, this.iam?this.iam.name:null, this.iam?this.iam.age:null, this.mainService.user.tmpUserId).subscribe((ans)=>{
      this.testResult = ans
      if(this.mainService.user.tmpUserId){
        localStorage.setItem('tmpUserId', this.mainService.user.tmpUserId)
      }
      setTimeout(()=>{window.location.hash='result'},1000)
    },()=>{this.loading = false},()=>{this.loading =false})

  }

}
