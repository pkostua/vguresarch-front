import { Component, OnInit } from '@angular/core';
import {SppChildrenTestResult, Test} from '../entity/test';
import {MainService} from '../main.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-spp-children',
  templateUrl: './spp-children.component.html',
  styleUrls: ['./spp-children.component.css']
})
export class SppChildrenComponent implements OnInit {

  constructor(public mainService: MainService, private router: Router) { }
  loading: boolean = false;

  testList:Test[]
  testResult:SppChildrenTestResult | null= null

  submitted: boolean = false

  ngOnInit() {
    this.testResult = null
    this.loading = true
    this.mainService.getSppChildrenData().subscribe((ans)=>{
      this.testList = ans
      //this.testList.sort((a,b)=>a.id-b.id)
    },()=>{this.loading = false},()=>this.loading = false)
  }

  get iam(){
    return this.mainService.currentChild
  }

  get other(){
    return this.mainService.user.familyMembers.find(m=>m.name!=this.iam.name)
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
    this.mainService.postSppChildrenData(this.testList).subscribe((ans)=>{
      this.testResult = ans
      setTimeout(()=>{ window.location.hash='result'},1000)
    },()=>{},()=>{this.loading =false})

  }

}
