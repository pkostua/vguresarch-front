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
      this.mainService.getSppChildrenTestData().subscribe((ans)=>{
        if(ans && ans.data) {
          this.testList.forEach((t) => {
            let find = ans.data.find(a => a.id == t.id)
            if (find) t.ans = find.ans
          })
        }
      },error => {this.loading = false},()=>this.loading = false)
      //this.testList.sort((a,b)=>a.id-b.id)
    },()=>{this.loading = false},()=>{})
  }

  get iam(){
    return this.mainService.currentChild
  }

  get other(){
    return this.mainService.user.familyMembers.find(m=>m.name!=this.iam.name)
  }

  onChange(){
    setTimeout(()=>this.mainService.postSppChildrenData(this.testList).subscribe(()=>{ }),500)
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
          `<p class=\"card-text\">
<span style='color: darkgray; font-size: 14px'>0 – 20 – низкий уровень;
21– 40% – пониженный уровень; 41– 60% – средний уровень;
61– 80% – повышенный уровень; 81 – 100% – высокий уровень.
</span>
              <h5>Общая суверенность психологического пространства по 4 шкалам: ${Math.round(ans.sft*100/46+ans.st*100/46+ans.smv*100/46+ans.sp*100/46)}%</h5>
              <span style='color: darkgray; font-size: 14px'>Психологическая (личностная) суверенность - это способность человека
контролировать, защищать и развивать свое психологическое пространство.
Она обладает такими проявлениями как активность, ответственность, креативность, рефлексивность, целеполагание, саморегуляция, самоконтроль, временная организация деятельности, внутренняя свобода, достоин-
ство, личностные смыслы, ценности, самоопределение, самодеятельность, самооценка, самовоспитание, самоидентификация, и многие другие.
Достижение суверенности (личностной автономии) представляет собой результат и фактор ненасильственного, уважительного отношения к субъекту и самого субъекта к миру.
</span>
           </p>` +
          `<p class=\"card-text\">
              <h5>суверенность физического тела: ${Math.round(ans.sft*100/11)}%</h5>
              <span style='color: darkgray; font-size: 14px'>Констатируется в отсутствие попыток нарушить его соматическое благополучие, а депривированность - в переживании дискомфорта, вызванного прикосновениями, запахами, принуждением в отправлении физиологических потребностей.
              Для ребенка тело является неприкосновенностью, попытка человека, не входящего в круг близких людей, физически воздействовать (брать за руку, обнимать и пр.) может быть расценено ребенком как насилие и выражено в негативных эмоциональных реакциях (плач, крик и пр.).</span>
           </p>` +
          `<p class=\"card-text\">
              <h5>суверенность территории: ${Math.round(ans.st*100/10)}%</h5>
              <span style='color: darkgray; font-size: 14px'>Переживание безопасности физического пространства, на котором находится человек (личной части или собственной комнаты, игровой модели жилья), а депривированность - отсутствие территориальных границ.
              Часто детям приходится слышать такие слова: «Здесь не играй, мешаешься!». У ребенка возникает закономерный вопрос: где же мне быть, жить, где мое место, в котором мне было бы безопасно? Эти тревожные мысли могут приводить к отказу от игр, от активной жизни (раз мне нет места в моем доме, то его нет нигде, я никому не нужен). Ребенок становится безразличным, пассивным, безучастным.</span>
           </p>` +
          `<p class=\"card-text\">
              <h5>суверенность вещей: ${Math.round(ans.smv*100/13)}%</h5>
              <span style='color: darkgray; font-size: 14px'>Подразумевает уважение к личной собственности человека, распоряжаться которой может только он, а депривированность - непризнание его права иметь личные вещи.
              Для ребенка важно чем-то обладать, то, что он может назвать моим. Это расширяет его границы, придает уверенности в собственных силах («теперь я отвечаю еще за что-то»). Для большинства малышей ситуация «поделиться с кем-то» оказывается стрессовой. Возникает опасение за сохранность целостности своего Я.</span>
           </p>` +
          `<p class=\"card-text\">
              <h5>суверенность привычек: ${Math.round(ans.sp*100/12)}%</h5>
              <span style='color: darkgray; font-size: 14px'>Принятие временной формы организации жизни человека, а депривированность - насильственные попытки изменить комфортный для субъекта распорядок.
              Маленький ребенок нуждается в режиме, это дает ему ощущение «понятности» мира, его устойчивости и безопасности. Изменение в распорядке дня, поступление в детский сад / школу часто оказывается стрессом для ребенка, возникает напряжение, тревога.</span>
           </p>`

      });
    },()=>{this.loading =false},()=>{this.loading =false})

  }

}
