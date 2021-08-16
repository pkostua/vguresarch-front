import { Component, OnInit } from '@angular/core';
import {MainService} from '../main.service';
import {Router} from '@angular/router';
import { Test} from '../entity/test';
import {Anketa} from '../entity/anketa';
import {TestResultDialogComponent} from '../test-result-dialog/test-result-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-anketa',
  templateUrl: './anketa.component.html',
  styleUrls: ['./anketa.component.css']
})
export class AnketaComponent implements OnInit {

  constructor(public mainService: MainService, private router: Router, public dialog: MatDialog) { }
  loading: boolean = false;

  testList:Test[]
  testResult:Anketa | null= null

  submitted: boolean = false

  ngOnInit() {
    this.testResult = null
    this.loading = true
    this.mainService.getAnketaData().subscribe((ans)=>{
      this.testList = ans
      this.mainService.getAnketaTestData().subscribe((ans)=>{
        if(ans) {
          this.testList.forEach((t) => {
            let find = ans.find(a => a.type == t.id)
            if (find) t.ans = find.ans
          })
        }
      },error => {this.loading = false},()=>this.loading = false)
      //this.testList.sort((a,b)=>a.id-b.id)
    },()=>{this.loading = false},()=>{})
  }

  goBack(){
    this.router.navigate(['testRouter'])
  }
  onChange(){
    setTimeout(()=>this.mainService.postAnketaData(this.testList).subscribe(()=>{}), 500)

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
    this.mainService.postAnketaData(this.testList).subscribe((ans)=>{
      this.mainService.currentChild.hasAnketa = true
      const dialogRef = this.dialog.open(TestResultDialogComponent, {
        data: "<h5 class=\"card-title\">Результат</h5>" +
          `<p class=\"card-text\">

              <h5>Общая суверенность психологического пространства по 6 шкалам: ${ans.sft+ans.st+ans.smv+ans.sp+ans.ss+ans.sts} из 30</h5>
              <span style='color: darkgray; font-size: 14px'> Данный опросник находится на стадии тестирования и по гипотезе автора представляет собой возможности развития суверенности ребёнка дома в кругу семьи. Результаты по шкалам опросника показывают, в какой степени используются пути, где ребёнок может развивать свою суверенность тем самым укрепляя свою активность, ответственность, креативность, самоконтроль, внутреннюю свободу, достоинство, самооценку и многое другое.
Для развития у ребёнка суверенности необходимы условия и среда, где он может действовать самостоятельно, которые может считать своим пространством, развивать, защищать и беречь его. Таким образом формируются качества, необходимые для взрослой ответственной жизни.

</span>
           </p>` +
          `<p class=\"card-text\">
              <h5>Суверенность физического тела: ${ans.sft} из 5</h5>
              <span style='color: darkgray; font-size: 14px'>Собственное тело — это первое измерение психологического пространства личности. Человек открывает его раньше другой реальности и учится им пользоваться благодаря развитию сенсорики и моторики. Насилие над телом может выражаться в нарушении базовых потребностей в пище или комфорте: насильное кормление, неудобная поза, жестокое обращение — все это различные формы внедрения в личное жизненное пространство человека. Прочность телесных границ, возникающая как результат ненасильственного взаимодействия с миром и становится основой самоидентификации.</span>
           </p>` +
          `<p class=\"card-text\">
              <h5>Суверенность территории: ${ans.st} из 5</h5>
              <span style='color: darkgray; font-size: 14px'>Ребёнку необходима собственная территория, где он может чувствовать себя полноценным хозяином, иметь возможность самостоятельно распоряжаться ею и своими предметами там. Кроме того, ребёнок должен считать и дом, где он проживает – своим, тогда он будет бережно к нему относиться, беречь его от других людей и дом будет для него психологической опорой, дающей возможность психологической реабилитации.</span>
           </p>` +
          `<p class=\"card-text\">
              <h5>Суверенность вещей: ${ans.smv} из 5</h5>
              <span style='color: darkgray; font-size: 14px'>Ребенку необходимы личные вещи, они могут иметь особый психологический смысл, могут быть заместителем социального объекта (например, мягкая игрушка может принимать роль близкого друга), могут обозначать статус ребёнка, а одежда - это первый физический барьер между его телом и окружающим миром (в незнакомой ситуации ребёнок может отказаться раздеваться, если чувствует страх, потому что одежда - это его защита). Кроме того, вещи это и орудия деятельности, и свободное распоряжение ими, а также разнообразие в выборе, помогут ребёнку в развитии различных навыков и умений.</span>
           </p>` +
          `<p class=\"card-text\">
              <h5>Суверенность привычек: ${ans.sp} из 5</h5>
              <span style='color: darkgray; font-size: 14px'>Так как дети, обычно, действуют по распорядку дня, установленному взрослыми, им важно хотя бы знать что и когда произойдёт, чтобы иметь возможность планировать своё время. Также, в это измерение включены последовательность и продолжительность действий. Последовательность может показывать статус ребёнка в семье, например, если ему ничего нельзя делать первым (понижение статуса и, как следствие, самооценки), либо излишне задавая ему порядок действия. А постоянное поторапливание или замедление ребёнка депривируют (насильно изменяют) его темпоритм. </span>
           </p>`+
          `<p class=\"card-text\">
              <h5>Суверенность социальных связей: ${ans.sp} из 5</h5>
              <span style='color: darkgray; font-size: 14px'>У ребёнка должна быть возможность самостоятельно выбирать свой круг общения. Это касается не только друзей, но и родственников. Так воспитывается способность человека к настоящим близким отношениям, избирательность связей, а также, ответственность за отношения.</span>
           </p>`+
          `<p class=\"card-text\">
              <h5>Суверенность вкусов и ценностей: ${ans.sp} из 5</h5>
              <span style='color: darkgray; font-size: 14px'>Это последнее измерение суверенности, которое позже остальных начинает развиваться в жизни ребенка. Оно касается его личных предпочтений и взращивает способность неконформного поведения, то есть самостоятельно выбранного поведения, даже если оно отличается (но не обязательно) от поведения большинства. </span>
           </p>`

      });
      this.testResult = ans
    },()=>{this.loading =false},()=>{this.loading =false})

  }

}
