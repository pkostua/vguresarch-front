import { Component, OnInit } from '@angular/core';
import {MainService} from '../main.service';
import {SppAdultTestResult, Test} from '../entity/test';
import {Router} from '@angular/router';
import {TestResultDialogComponent} from '../test-result-dialog/test-result-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-spp-adult',
  templateUrl: './spp-adult.component.html',
  styleUrls: ['./spp-adult.component.css']
})
export class SppAdultComponent implements OnInit {

  constructor(public mainService: MainService, private router: Router, public dialog: MatDialog) { }
  loading: boolean = false;

  testList:Test[]
  testResult:SppAdultTestResult | null= null

  submitted: boolean = false

  ngOnInit() {
    this.testResult = null
    this.loading = true
    this.mainService.getSppAdultData().subscribe((ans)=>{
      this.testList = ans
      //this.testList.sort((a,b)=>a.id-b.id)
    },()=>{},()=>this.loading = false)
  }

  get iam(){
    return this.mainService.currentChild
  }

  get myName(){
    if(!this.iam)return this.mainService.user.firstName
    else return this.iam.name
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
    this.mainService.postSppAdultData(this.testList).subscribe((ans)=>{
      this.testResult = ans
      if(this.mainService.currentAdult)this.mainService.currentChild.sppAdultList.push(this.mainService.currentAdult.id)
      const dialogRef = this.dialog.open(TestResultDialogComponent, {
        data: "<h5 class=\"card-title\">Результат</h5>" +
          `<p class="card-text">В скобках указано количество баллов при которых данная черта воспитания имеет место, т.е. если Вы набрали меньше баллов, чем указано в скобках, то эта черта к вам не относится. Если столько же или больше, тогда эта черта воспитания вам присуща. </p>` +
          `<p class=\"card-text\">(7) гиперпротекция: ${ans.gpl}}</p>` +
          `<p class=\"card-text\">(4) игнорирование потребностей: ${ans.ymin}</p>` +
          `<p class=\"card-text\">(4) чрезмерность требований-обязанностей: ${ans.tpl}</p>` +
          `<p class=\"card-text\">(4) недостаточность требований-обязанностей: ${ans.tmin}}</p>`+
          `<p class=\"card-text\">(4) чрезмерность требований-запретов:  ${ans.zpl}}</p>`+
          `<p class=\"card-text\">(3) недостаточность требований-запретов: ${ans.zmin}}</p>`+
          `<p class=\"card-text\">(4) чрезмерность санкций: ${ans.cpl}}</p>`+
          `<p class=\"card-text\">(4) минимальность санкций: ${ans.smin}}</p>`+
          `<p class=\"card-text\">(5) неустойчивость стиля воспитания: ${ans.n}}</p>`+
          `<p class=\"card-text\">(6) расширение сферы родительских чувств: ${ans.rrc}}</p>`+
          `<p class=\"card-text\">(4) предпочтение в подростке детских качеств: ${ans.pdk}}</p>`+
          `<p class=\"card-text\">(5) воспитательная неуверенность родителя: ${ans.vn}}</p>`+
          `<p class=\"card-text\">(6) фобия утраты ребенка: ${ans.fy}}</p>`+
          `<p class=\"card-text\">(7) неразвитость родительских чувств: ${ans.nrc}}</p>`+
          `<p class=\"card-text\">(4) проекция на ребёнка собственных нежелаемых качеств: ${ans.pnk}}</p>`+
          `<p class=\"card-text\">(4) внесение конфликта между супругами в сферу воспитания: ${ans.vk}}</p>`+
          `<p class=\"card-text\">(4) предпочтение женских качеств: ${ans.pzk}}</p>`+
          `<p class=\"card-text\">(4) предпочтение мужских качеств: ${ans.pmk}}</p>`

      });

    },()=>{this.loading = false},()=>{this.loading =false})

  }

}
