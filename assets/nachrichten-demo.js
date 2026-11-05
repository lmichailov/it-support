'use strict';
(() => {
  const examples = {
    team: [
      {title: 'Lager: Meldung mit Bildhinweis', people: {A:'Mara Demo', B:'Jonas Demo', C:'Sam Demo'},
       messages: [
         {person:'A', text:'Im Lager vor Tor 2 liegt Wasser. Ich habe ein Bild angehängt.', image:true},
         {person:'B', text:'Ich sperre den Bereich bis 10 Uhr ab.'},
         {person:'C', text:'Ich informiere die Haustechnik.'}
       ],
       fields: [['Meldung & Ort','{A} meldet Wasser im Lager vor Tor 2.'],
                ['Wer übernimmt was?','{B}: Bereich bis 10 Uhr absperren. {C}: Haustechnik informieren.'],
                ['Was ist noch offen?','Beide Aufgaben sind zugesagt, aber noch nicht als erledigt bestätigt. Ursache und Rückmeldung der Haustechnik fehlen.'],
                ['Bildbezug','Die Illustration gehört zur Meldung von {A}. Sie belegt keine Ursache und keine Erledigung.']]},
      {title:'Projekt: eine Übergabe', people:{A:'Mara Demo',B:'Jonas Demo',C:'Sam Demo'},
       messages:[
         {person:'A',text:'Für Projekt Nord brauchen wir das Angebot bis Freitag um 16 Uhr. Wer übernimmt es?'},
         {person:'B',text:'Ich übernehme das Angebot und schicke es bis Freitag um 16 Uhr.'},
         {person:'C',text:'Der Kundentermin am Montag um 10 Uhr ist vorgeschlagen. Die Bestätigung fehlt noch.'}
       ],
       fields:[['Projekt','Projekt Nord.'],['Aufgabe & Frist','{B} übernimmt das Angebot bis Freitag, 16 Uhr. Die Fertigstellung ist noch nicht bestätigt.'],['Termin','Montag, 10 Uhr, ist vorgeschlagen. Eine Bestätigung liegt im Beispiel nicht vor.'],['Nächster Schritt','Angebot und Terminbestätigung nachhalten. Für die Terminbestätigung wurde noch niemand benannt.']]}
    ],
    privat: [
      {title:'Gruppe: eine Verabredung',people:{A:'Mara Demo',B:'Lea Demo'},
       messages:[{person:'A',text:'Donnerstag um 18 Uhr passt mir.'},{person:'B',text:'Ich schaffe erst 18:30 Uhr.'},{person:'A',text:'Dann Donnerstag um 18:30 Uhr am Bahnhof.'}],
       fields:[['Gesprächsstand','Donnerstag, 18:30 Uhr, am Bahnhof ist der letzte Vorschlag von {A}.'],['Noch offen','{B} hat die geänderte Absprache noch nicht ausdrücklich bestätigt.'],['Nächster Schritt','Die Bestätigung abwarten oder nachfragen. Eine feste Zusage beider Personen wird aus diesen Nachrichten nicht abgeleitet.']]},
      {title:'Antwort: deine eigene Idee',people:{A:'Lea Demo',I:'Meine Notiz'},
       messages:[{person:'A',text:'Wie wäre es Samstag mit einem Spaziergang?'},{person:'I',text:'Samstag passt. Frag nach der Uhrzeit.'}],
       fields:[['Worum geht es?','{A} schlägt einen Spaziergang am Samstag vor.'],['Deine Antwortidee','Zusagen und die Uhrzeit erfragen.'],['Fester Beispielentwurf','Samstag klingt gut 😊 Wann hättest du Zeit?'],['Noch offen','Eine Uhrzeit ist nicht vereinbart.']]}
    ]
  };
  for (const demo of document.querySelectorAll('[data-compass-demo]')) {
    const scenarios=examples[demo.dataset.compassDemo];
    if(!scenarios) continue;
    const select=demo.querySelector('[data-scenario]');
    const mask=demo.querySelector('[data-mask]');
    const messages=demo.querySelector('[data-messages]');
    const result=demo.querySelector('[data-result]');
    const empty=demo.querySelector('[data-empty]');
    const show=demo.querySelector('[data-show]');
    const copy=demo.querySelector('[data-copy]');
    const status=demo.querySelector('[data-status]');
    let shown=false;
    let revision=0;
    scenarios.forEach((scenario,index)=>{const option=document.createElement('option');option.value=String(index);option.textContent=scenario.title;select.append(option);});
    function person(key){return key==='I'?'Meine Notiz':mask.checked?'Person '+key:scenarios[Number(select.value)].people[key];}
    function interpolate(text){return text.replace(/\{([A-Z])\}/g,(_,key)=>person(key));}
    function render(){
      revision++;
      const scenario=scenarios[Number(select.value)];
      messages.replaceChildren();
      for(const message of scenario.messages){
        const item=document.createElement('li');item.className='compass-message';
        const name=document.createElement('strong');name.textContent=person(message.person);
        const text=document.createElement('p');text.textContent=message.text;
        item.append(name,text);
        if(message.image){
          const figure=document.createElement('figure');figure.className='compass-image';
          const image=document.createElement('img');image.src='assets/team-example.svg';image.alt='Schematische Illustration einer Wasserfläche vor Tor 2. Kein echtes Foto.';image.width=640;image.height=280;
          const caption=document.createElement('figcaption');caption.textContent='Vorbereitete Illustration · keine Fotoanalyse in dieser Demo';
          figure.append(image,caption);item.append(figure);
        }
        messages.append(item);
      }
      result.replaceChildren();
      for(const [label,body] of scenario.fields){
        const row=document.createElement('div');const dt=document.createElement('dt');const dd=document.createElement('dd');
        dt.textContent=label;dd.textContent=interpolate(body);row.append(dt,dd);result.append(row);
      }
      result.hidden=!shown;empty.hidden=shown;copy.disabled=!shown;
      show.textContent=shown?'Beispielübersicht erneut anzeigen':'Beispielübersicht anzeigen';
    }
    select.addEventListener('change',()=>{shown=false;render();status.textContent='Neues erfundenes Beispiel ausgewählt. Die Übersicht ist eine vorbereitete Vorlage.';});
    mask.addEventListener('change',()=>{render();status.textContent=mask.checked?'Fiktive Namen werden als Person A/B/C angezeigt.':'Erfundene Demonstrationsnamen sind sichtbar.';});
    show.addEventListener('click',()=>{shown=true;render();status.textContent='Vorbereitete Beispielübersicht angezeigt. Keine KI-Anfrage, keine Übertragung.';});
    copy.addEventListener('click',async()=>{
      if(!shown)return;
      const currentRevision=revision;
      const text=scenarios[Number(select.value)].title+'\n\n'+scenarios[Number(select.value)].fields.map(([label,body])=>label+': '+interpolate(body)).join('\n\n');
      try{await navigator.clipboard.writeText(text);if(revision===currentRevision)status.textContent='Die Beispielübersicht wurde kopiert.';}
      catch{if(revision===currentRevision)status.textContent='Automatisches Kopieren ist hier nicht verfügbar. Du kannst die sichtbare Übersicht markieren und kopieren.';}
    });
    render();
    status.textContent='Alle Inhalte sind erfunden. Die Übersicht zeigt eine feste Vorlage, keine KI-Auswertung.';
  }
})();
