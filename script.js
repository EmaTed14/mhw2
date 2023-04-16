/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

//Blocchi conteniori delle spunte
const containers = document.querySelectorAll('.choice-grid div');

let mappa = {};
let verifica = [];

//Contenitore con tutti i quadratini selezionati  
for (const c of containers) {
  c.addEventListener('click', selectAnswer);
}

//prende dall'htlm il titolo, contenuto, bottone
const rispo = document.querySelector('.risposta');



//Funzione generica per scegliere la foto corretta

function selectAnswer(event) {
  const container = event.currentTarget;
  const box = container.querySelector('.checkbox');//prende la cesella vuota che è stata cliccata
  box.src = "./images/checked.png";//cambia l'immagine quando clicchiamo
  //Conservare in una mappa i valori delle risposte es:happy
  mappa[container.dataset.questionId] = container.dataset.choiceId; //ho una chiave per tutti uguali(one,two,free) , ma cambia il valore es(blep, sleepy)

  container.classList.add('color'); //mette il colore
  container.classList.remove('uncolor'); //leva l'opacità

  //seleziono il padre di s che sarà il div 
  const otherAnswers = container.parentElement.querySelectorAll('div');

  for (const ans of otherAnswers) {
    if (ans.dataset.choiceId !== container.dataset.choiceId) {
      abox = ans.querySelector('.checkbox');
      abox.src = './images/unchecked.png';
      ans.classList.remove('color');
      ans.classList.add('uncolor')
    }


  }

  if (Object.keys(mappa).length === 3) {

    verify();

  }


}



function verify() {

 // console.log('sto iniziando la verifica ');
  const risultato={};
  for(let name in mappa)
  {
    const  resultkey=mappa[name];
    //console.log(resultkey);
    if(resultkey in risultato)
    {
      risultato[resultkey]++;
    }
    else
    {
    risultato[resultkey]=1;
    }

    
  }
//console.log(risultato);

let current;
for(let key in risultato)
{
  if(current === undefined)
  {
    current=key;
  }
  else if (risultato[key]>risultato[current])
  {
    current=key;
    
  }
}
if(risultato[current]===1)
{
 current=mappa['one'];
}

//console.log(current);




  //console.log('fine verifica ');
  answer(current);


  //non ci consente di fare selezioni
  for (const cont of containers) {
    cont.removeEventListener('click', selectAnswer);
  }
}



function answer(current) {
  let titolo = rispo.querySelector('.titolo');

  //console.log(titolo);

  titolo.innerHTML = RESULTS_MAP[current].title;


  let contenuto = rispo.querySelector('.testo');
  contenuto.innerHTML = RESULTS_MAP[current].contents;

  let bottone = rispo.querySelector('.ripeti');
  bottone.classList.remove('hidden'); //visualizzo il bottone

  mappa={};
  //console.log(mappa);



}

const premi = rispo.querySelector('.ripeti');
premi.addEventListener('click', repeat)



function repeat(event) {
  //console.log('ripettiiiiiii');
  rip = event.currentTarget;
  let bott = rispo.querySelector('.ripeti');
  bott.classList.add('hidden');

  let title=rispo.querySelector('.titolo');
  title.innerHTML='';

  let testo=rispo.querySelector('.testo');
  testo.innerHTML='';

  

  for (const refre of containers) {
    refre.classList.remove('color');
    refre.classList.remove('uncolor');
    const boxi = refre.querySelector('.checkbox');//prende la cesella vuota che è stata cliccata
    boxi.src = "./images/unchecked.png";
    refre.addEventListener('click', selectAnswer);

  }

  const cerchi = document.querySelector('.cerchigialli');
  window.scrollTo({top:0});
}


