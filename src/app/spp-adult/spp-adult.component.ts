import { Component, OnInit } from '@angular/core';
import {MainService} from '../main.service';
import {SppAdultTestResult, Test} from '../entity/test';
import {Router} from '@angular/router';
import {TestResultDialogComponent} from '../test-result-dialog/test-result-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {InfoDialogComponent} from '../info-dialog/info-dialog.component';

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
      this.mainService.getSppAdultTestData().subscribe((ans)=>{
        if(ans && ans.data) {
          this.testList.forEach((t) => {
            let find = ans.data.find(a => a.id == t.id)
            if (find && t.ansList.includes(find.ans)) t.ans = find.ans
          })
        }else {
          this.showInfoDialog()
        }
      },error => {this.loading = false},()=>this.loading = false)
      //this.testList.sort((a,b)=>a.id-b.id)
    },()=>{this.loading = false},()=>{})
  }

  get iam(){
    return this.mainService.currentChild
  }

  get myName(){
    if(!this.iam)return this.mainService.user.firstName
    else return this.iam.name
  }

  onChange(){
    this.mainService.postSppAdultData(this.testList).subscribe(()=>{

    })
  }

  showInfoDialog(){
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: `<h4>Уважаемый родитель! Предлагаемый Вам опросник содержит утверждения о воспитании детей.</h4>
  <p>"+" если Вы в общем согласны с ними, то отвечайте</p>
  <p>"-" если Вы в общем не согласны</p>
  <p>"не знаю" если очень трудно выбрать, старайтесь, чтобы таких ответов было не больше 5.</p>
  <h4>В опроснике нет "правильных" или "неправильных" утверждений. Отвечайте так, как Вы сами думаете. Этим вы поможете провести достоверное исследование.
    </h4>`
    })
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
             `<p class=\"card-text\"> <h5>(7) гиперпротекция: ${ans.gpl}</h5>
              <span style='color: darkgray; font-size: 14px'>При гиперпротекции родители уделяют ребенку крайне много времени, сил и внимания, и воспитание его стало центральным делом их жизни. </span>
           </p>` +
          `<p class=\"card-text\"> <h5>(8) гипопротекция: ${ans.gmin}</h5>
              <span style='color: darkgray; font-size: 14px'>Ситуация, при которой ребенок или подросток оказывается на периферии внимания родителя, до него «не доходят руки», родителю «не до него». Ребенок часто выпадает у них из виду. За него берутся лишь время от времени, когда случается что-то серьезное.</span>
           </p>` +
          `<p class=\"card-text\"> <h5>(8) потворствование: ${ans.ypl}</h5>
              <span style='color: darkgray; font-size: 14px'>О потворствовании мы говорим в тех случаях, когда родители стремятся к максимальному и некритическому удовлетворению любых потребностей ребенка или подростка. Они «балуют» его. Любое его желание – для них закон. Объясняя необходимость такого воспитания, родители приводят аргументы, являющиеся типичной рационализацией, – «слабость ребенка», его исключительность, желание дать ему то, чего был сам лишен в свое время родителями,что ребенок растет без отца и т.д. При потворствовании родители бессознательно проецируют на детей свои ранее не удовлетворенные потребности и ищут способы заместительного удовлетворения их за счет воспитательных действий.</span>
           </p>` +
          `<p class=\"card-text\"> <h5>(4) игнорирование потребностей: ${ans.ymin}</h5>
              <span style='color: darkgray; font-size: 14px'>Данный стиль воспитания характеризуется недостаточным стремлением родителя к удовлетворению потребностей ребенка. Чаще страдают при этом духовные потребности, особенно потребность в эмоциональном контакте, общении с родителем.</span>
           </p>` +
          `<p class=\"card-text\"> <h5>(4) чрезмерность требований-обязанностей: ${ans.tpl}</h5>
              <span style='color: darkgray; font-size: 14px'>Требования к ребенку в этом случае очень велики, непомерны, не соответствуют его возможностям и не только не содействуют полноценному развитию его личности, но, напротив, представляют риск психотравматизации.</span>
           </p>` +
          `<p class=\"card-text\"> <h5>(4) недостаточность требований-обязанностей: ${ans.tmin}</h5>
              <span style='color: darkgray; font-size: 14px'>В этом случае ребенок имеет минимальное количество обязанностей в семье. Данная особенность воспитания проявляется в высказываниях родителей о том, как трудно привлечь ребенка к какому-либо делу по дому.</span>
           </p>` +
          `<p class=\"card-text\"> <h5>(4) чрезмерность требований-запретов:  ${ans.zpl}</h5>
              <span style='color: darkgray; font-size: 14px'>В этой ситуации ребенку «все нельзя». Ему предъявляется огромное количество требований, ограничивающих его свободу и самостоятельность. У стеничных детей и подростков такое воспитание форсирует реакции оппозиции и эмансипации, у менее стеничных предопределяет развитие черт сензитивной и тревожно-мнительной (психастенической) акцентуации.Типичные высказывания родителей отражают их страх перед любыми проявлениями самостоятельности ребенка. Этот страх проявляется в резком преувеличении последствий, к которым может привести хотя бы незначительное нарушение запретов; а также в стремлении подавить самостоятельность мысли ребенка.</span>
           </p>` +
          `<p class=\"card-text\"> <h5>(3) недостаточность требований-запретов: ${ans.zmin}</h5>
              <span style='color: darkgray; font-size: 14px'>В этом случае ребенку «все можно». Даже если и существуют какие-либо запреты, ребенок или подросток легко их нарушает, зная, что с него никто не спросит. Он сам определяет круг своих друзей, время еды, прогулок, свои занятия, время возвращения вечером, вопрос о курении и об употреблении спиртных напитков. Он ни за что не отчитывается перед родителями. Родители при этом не хотят, или не могут установить какие-либо рамки в его поведении. Данное воспитание стимулирует развитие гипертимного типа личности у подростка и особенно неустойчивого типа.</span>
           </p>` +
          `<p class=\"card-text\"> <h5>(4) чрезмерность санкций: ${ans.cpl}</h5>
              <span style='color: darkgray; font-size: 14px'>(тип воспитания «жесткое обращение»). Для родителей характерны приверженность к применению строгих наказании, чрезмерное реагирование даже на незначительные нарушения поведения. Типичные высказывания родителей отражают их убеждение в полезности для детей и подростков максимальной строгости.</span>
           </p>` +
          `<p class=\"card-text\"> <h5>(4) минимальность санкций: ${ans.smin}</h5>
              <span style='color: darkgray; font-size: 14px'>Эти родители предпочитают обходиться либо вовсе без наказаний, либо применяют их крайне редко. Они уповают на поощрения, сомневаются в результативности любых наказаний.</span>
           </p>` +
          `<p class=\"card-text\"> <h5>(5) неустойчивость стиля воспитания: ${ans.n}</h5>
              <span style='color: darkgray; font-size: 14px'>Под таким воспитанием мы понимаем резкую смену стиля приемов, представляющих собой переход от очень строгого к либеральному и затем, наоборот, переход от значительного внимания к ребенку к эмоциональному отвержению его родителями.
Неустойчивость стиля воспитания, по мнению К.Леонгарда, содействует формированию таких черт характера, как упрямство, склонность противостоять любому авторитету, и является нередкой ситуацией в семьях детей и подростков с отклонениями характера.
Родители, как правило, признают факт незначительных колебаний в воспитании ребенка, однако недооценивают размах и частоту этих колебаний.
</span>
           </p>` +
          `<p class=\"card-text\"> <h5>(6) расширение сферы родительских чувств: ${ans.rrc}</h5>
              <span style='color: darkgray; font-size: 14px'>Данный источник нарушения воспитания возникает чаще всего тогда, когда супружеские отношения между родителями в силу каких-либо причин оказываются нарушенными: супруга нет – смерть, развод, либо отношения с ним не удовлетворяют родителя, играющего основную роль в воспитании несоответствие характеров, эмоциональная холодность и др.). Нередко при этом мать, реже – отец, сами того четко не осознавая, хотят, чтобы ребенок, а позже подросток стал для них чем-то большим, нежели просто ребенком. Родители хотят, чтобы он удовлетворил хотя бы часть потребностей, которые в обычной семье должны быть удовлетворены в психологических отношениях супругов, – потребность во взаимной исключительной привязанности, частично – эротические потребности.
Мать нередко отказывается от вполне реальной возможности повторного замужества. Появляется стремление отдать ребенку (подростку) – чаще противоположного пола – «все чувства, всю любовь». В детстве стимулируется эротическое отношение к родителям – ревность, детская влюбленность. Когда ребенок достигает подросткового возраста, у родителя возникает страх перед самостоятельностью подростка. Появляется стремление удержать его с помощью потворствующей или доминирующей гиперпротекции.
Стремление к расширению сферы родительских чувств за счет включения эротических потребностей в отношения матери и ребенка, как правило, ею не осознается. Эта психологическая установка проявляется косвенно, в частности в высказываниях, что ей никто не нужен, кроме сына, и в характерном противопоставлении идеализированных ею собственных отношений с сыном не удовлетворяющим ее отношениям с мужем. Иногда такие матери осознают свою ревность к подругам сына, хотя чаще они предъявляют ее в виде многочисленных придирок к ним.
</span>
           </p>` +
          `<p class=\"card-text\"> <h5>(4) предпочтение в подростке детских качеств: ${ans.pdk}</h5>
              <span style='color: darkgray; font-size: 14px'>В этом случае у родителей наблюдается стремление игнорировать повзросление детей, стимулировать у них сохранение таких детских качеств, как непосредственность, наивность, игривость. Для таких родителей подросток все еще маленький. Нередко они открыто признают, что маленькие дети вообще им нравятся больше, что с большими не так интересно. Страх или нежелание повзросления детей могут быть связаны с особенностями биографии самого родителя (он имел младшего брата или сестру, на которых в свое время переместилась любовь родителей, в связи с чем свой старший возраст воспринимался как несчастье).
Рассматривая подростка как «еще маленького», родители снижают уровень требований к нему, создавая потворствующую гиперпротекцию, тем самым стимулируя развитие психического инфантилизма.
</span>
           </p>` +
          `<p class=\"card-text\"> <h5>(5) воспитательная неуверенность родителя: ${ans.vn}</h5>
              <span style='color: darkgray; font-size: 14px'>В этом случае происходит перераспределение власти в семье между родителями и ребенком (подростком) в пользу последнего. Родитель «идет на поводу» у ребенка, уступает даже в тех вопросах, в которых уступать, по его же мнению, никак нельзя. Это происходит потому, что подросток сумел найти к своему родителю подход, нащупал его «слабое место» и добивается для себя в этой ситуации «минимум требований – максимум прав». Типичная комбинация в такой семье – бойкий, уверенный в себе подросток (ребенок), смело выдвигающий требования, и нерешительный, винящий себя во всех неудачах с ним, родитель.
Характерная черта высказываний таких родителей – признание ими массы ошибок, совершенных в воспитании. Они боятся упрямства, сопротивления своих детей и находят довольно много поводов уступить им.
</span>
           </p>` +          `<p class=\"card-text\"> <h5>(6) фобия утраты ребенка: ${ans.fy}</h5>
              <span style='color: darkgray; font-size: 14px'>«Слабое место» – повышенная неуверенность, боязнь ошибиться, преувеличенные представления о «хрупкости» ребенка, его болезненности и т.д.
Один источник таких переживаний родителей коренится в истории появления ребенка на свет – его долго ждали, обращения к врачам-гинекологам ничего не давали, родился хрупким и болезненным, с большим трудом удалось его выходить и т.д.
Еще один источник – перенесенные ребенком тяжелые заболевания, если они были длительными. Отношение родителей к ребенку или подростку формировалось под воздействием страха утраты его. Этот страх заставляет родителей тревожно прислушиваться к любым пожеланиям ребенка и спешить удовлетворить их (потворствующая гиперпротекция), в других случаях – мелочно опекать его (доминирующая гиперпротекция).
В типичных высказываниях родителей отражена их ипохондрическая боязнь за ребенка: они находят у него множество болезненных проявлений, свежи воспоминания о прошлых, даже отдаленных во времени переживаниях по поводу здоровья подростка.
</span>
           </p>` +          `<p class=\"card-text\"> <h5>(7) неразвитость родительских чувств: ${ans.nrc}</h5>
              <span style='color: darkgray; font-size: 14px'>Адекватное воспитание детей и подростков возможно лишь тогда, когда родителями движут какие-либо достаточно сильные мотивы: чувство долга, симпатия, любовь к ребенку, потребность «реализовать себя» в детях, «продолжить себя».
Слабость, неразвитость родительских чувств нередко встречается у родителей подростков с отклонениями личностного развития. Однако это явление очень редко ими осознается, а еще реже признается как таковое. Внешне оно проявляется в нежелании иметь Дело с ребенком (подростком), в плохой переносимости его общества, поверхностности интереса к его делам. Причиной неразвитости родительских чувств может быть отвержение самого родителя в детстве его родителями, то, что он сам в свое время не испытал родительского тепла.
Другой причиной НРЧ могут быть личностные особенности родителя, например выраженная шизоидность.
Замечено, что родительские чувства нередко значительно слабее развиты у очень молодых родителей, имея тенденцию усиливаться с возрастом (пример любящих бабушек и дедушек).
</span>
           </p>` +          `<p class=\"card-text\"> <h5>(4) проекция на ребёнка собственных нежелаемых качеств: ${ans.pnk}</h5>
              <span style='color: darkgray; font-size: 14px'>Причиной такого воспитания нередко бывает то, что в ребенке родитель как бы видит черты характера, которые чувствует, но не признает в самом себе. Это могут быть: агрессивность, склонность к лени, влечение к алкоголю, те или иные склонности, негативизм, про-тестные реакции, несдержанность и т.д. Ведя борьбу с такими же, истинными или мнимыми, качествами ребенка, родитель (чаще всего – отец) извлекает из этого эмоциональную выгоду для себя. Борьба с нежелаемым качеством в ком-то другом помогает ему верить, что у него данного качества нет.
Родители много и охотно говорят о своей непримиримой и постоянной борьбе с отрицательными чертами и слабостями ребенка, о мерах и наказаниях, которые они в связи с этим применяют. В высказываниях родителя сквозит неверие в ребенка, нередки инквизиторские интонации; характерным стремлением является выявить в любом поступке «истинную», т.е. плохую, причину. В качестве таковой чаще всего выступают качества, с которыми родитель неосознаваемо борется.
</span>
           </p>` +
          `<p class=\"card-text\"> <h5>(4) внесение конфликта между супругами в сферу воспитания: ${ans.vk}</h5>
              <span style='color: darkgray; font-size: 14px'>Конфликтность во взаимоотношениях между супругами – частое явление даже в относительно стабильных семьях. Нередко воспитание превращается в «поле битвы» конфликтующих родителей. Здесь они получают возможность наиболее открыто выражать недовольство друг другом, руководствуясь «заботой о благе ребенка». При этом разница во мнениях родителей чаще всего бывает диаметральной: один настаивает на весьма строгом воспитании с повышенными требованиями, запретами и санкциями, другой же родитель склонен «жалеть» ребенка, идти у него на поводу.
Характерное проявление – выражение недовольства воспитательными методами другого супруга. При этом легко обнаруживается, что каждого интересует не столько то, как воспитывать ребенка, сколько то, кто прав в воспитательных спорах. Эта шкала отражает типичные высказывания «строгой» стороны. Это связано с тем, что именно «строгая» сторона, как правило, является инициатором обращения к врачу или медицинскому психологу.
</span>
           </p>` +
          `<p class=\"card-text\"> <h5>(4) предпочтение женских качеств: ${ans.pzk}</h5>
              <span style='color: darkgray; font-size: 14px'>см. описание в "предпочтение мужских качеств"</span>
           </p>` +
          `<p class=\"card-text\"> <h5>(4) предпочтение мужских качеств: ${ans.pmk}</h5>
              <span style='color: darkgray; font-size: 14px'>Нередко отношение родителя к ребенку обусловливается не действительными особенностями ребенка, а такими чертами, которые родитель приписывает его полу, т.е. «вообще мужчинам» или «вообще женщинам». Так, при наличии предпочтения женских качеств наблюдается неосознаваемое неприятие ребенка мужского пола. В таком случае приходится сталкиваться со стереотипными суждениями о мужчинах вообще: «Мужчины в основном грубы, неопрятны. Они легко поддаются животным побуждениям, агрессивны и чрезмерно сексуальны, склонны к алкоголизму. Любой же человек, будь то мужчина или женщина, должен стремиться к противоположным качествам – быть нежным, деликатным, опрятным, сдержанным в чувствах». Именно такие качества родитель с предпочтением женских качеств видит в женщинах. Примером проявления установки предпочтения мужских качеств может служить отец, видящий массу недостатков в сыне и считающий, что таковы же и все его сверстники. В то же время этот отец «без ума» от младшей сестры мальчика, так как находит у нее одни достоинства. Под влиянием ПЖК в отношении ребенка мужского пола в данном случае формируется тип воспитания «эмоциональное отвержение». Возможен противоположный перекос с выраженной антифеминистской установкой, пренебрежением к матери ребенка, его сестрам. В этих условиях по отношению к мальчику может сформироваться воспитание по типу «потворствующая гиперпротекция».</span>
           </p>`
      });

    },()=>{this.loading = false},()=>{this.loading =false})

  }

}
