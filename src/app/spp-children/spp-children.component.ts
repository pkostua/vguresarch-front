import { Component, OnInit } from '@angular/core';
import {SppChildrenTestResult, Test} from '../entity/test';
import {MainService} from '../main.service';
import {Router} from '@angular/router';
import {TestResultDialogComponent} from '../test-result-dialog/test-result-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-spp-children',
  templateUrl: './spp-children.component.html',
  styleUrls: ['./spp-children.component.css']
})
export class SppChildrenComponent implements OnInit {

  constructor(public mainService: MainService, private router: Router, public dialog: MatDialog) { }
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
      this.mainService.currentChild.hasSppChildren = true
      const dialogRef = this.dialog.open(TestResultDialogComponent, {
        data: "<h5 class=\"card-title\">Результат</h5>" +
          `<p class=\"card-text\">суверенность физического тела: ${ans.sft}}</p>` +
          `<p class=\"card-text\">суверенность территории: ${ans.st}</p>` +
          `<p class=\"card-text\">суверенность мира вещей: ${ans.smv}</p>` +
          `<p class=\"card-text\">суверенность привычек: ${ans.sp}}</p>`
      });
    },()=>{this.loading =false},()=>{this.loading =false})

  }

}
