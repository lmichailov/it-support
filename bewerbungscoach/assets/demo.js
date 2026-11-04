'use strict';
(() => {
  const $=id=>document.getElementById(id);
  const state={step:'profile',document:'letter',layout:'design',applied:{letter:false,cv:false},drafts:{letter:'',cv:''},recognition:null};
  const sample='Ergänze mein eigenes KI-Projekt: Ich habe für einen ehrenamtlichen Verein einen kleinen Assistenten gebaut, der häufige Fragen aus einem Handbuch beantwortet. Bitte im Anschreiben nach dem Absatz über meine Python-Kurse einbauen.';
  const proposal={letter:'In einem eigenen KI-Projekt entwickelte ich für einen ehrenamtlichen Verein einen Assistenten, der häufige Fragen anhand eines Handbuchs beantwortet. Dabei sammelte ich praktische Erfahrung darin, Informationen für eine KI-Anwendung aufzubereiten und die Antworten auf ihre Verständlichkeit zu prüfen.',cv:'Eigenes KI-Projekt: Frage-Antwort-Assistent für einen ehrenamtlichen Verein auf Grundlage eines Handbuchs; Aufbereitung der Informationen und Prüfung der Antworten auf Verständlichkeit.'};
  const create=(tag,text,className)=>{const element=document.createElement(tag);if(text)element.textContent=text;if(className)element.className=className;return element;};
  function stop(){state.recognition?.stop();}
  function navigate(step){stop();state.step=step;for(const panel of document.querySelectorAll('.panel'))panel.hidden=panel.id!==step;for(const button of document.querySelectorAll('[data-step]'))button.setAttribute('aria-pressed',String(button.dataset.step===step));$('demo-status').textContent='';}
  function showDocument(){
    const cv=state.document==='cv',ats=state.layout==='ats';$('paper-photo').hidden=!cv||ats;$('document-paper').classList.toggle('ats-layout',ats);$('ats-info').hidden=!ats;$('text-link').hidden=!ats;for(const button of document.querySelectorAll('[data-layout]'))button.setAttribute('aria-pressed',String(button.dataset.layout===state.layout));
    for(const button of document.querySelectorAll('[data-doc]'))button.setAttribute('aria-pressed',String(button.dataset.doc===state.document));
    $('open-editor').textContent=`Zum ${cv?'Lebenslauf':'Anschreiben'} etwas ergänzen`;
    $('version-badge').textContent=state.applied[state.document]?'Beispiel · Ergänzung übernommen':'Beispiel · Ausgangsfassung';
    $('pdf-link').href=`downloads/${cv?'Lebenslauf':'Anschreiben'}_Mara_Beispiel${state.applied[state.document]?'_ergaenzt':''}${ats?'_ATS':''}.pdf`;$('text-link').href=$('pdf-link').getAttribute('href').replace('.pdf','.txt');
    const content=$('document-body');content.replaceChildren();
    const p=text=>content.append(create('p',text));const heading=text=>content.append(create('h4',text));
    if(cv){heading('Profil');p('Data Analystin und IT-Trainerin mit Erfahrung in Python, Datenaufbereitung und verständlicher Wissensvermittlung.');heading('Berufserfahrung');content.append(create('h5','IT-Trainerin · Beispielakademie (fiktiv)'));content.append(create('p','2023–2026','entry-date'));p('Python-Kurse mit praktischen Übungen; verständliche Erklärung technischer Konzepte.');content.append(create('h5','Data Analystin · Musterwerk Digital (fiktiv)'));content.append(create('p','2019–2023','entry-date'));p('Datenaufbereitung mit Python und SQL; Zusammenarbeit an REST-Schnittstellen.');if(state.applied.cv){heading('Eigenes KI-Projekt');content.append(create('p',proposal.cv,'added'));}heading('Studium');p('B.Sc. Wirtschaftsinformatik · Hochschule Beispielstadt (fiktiv), 2015–2019');heading('Kenntnisse & Interessen');p('Python · SQL · REST APIs · Deutsch (Muttersprache) · Englisch (B2) · Wandern & Fotografie');}
    else{p('Nordlicht Lernwerk · Beispielunternehmen');heading('Bewerbung als KI- & Automatisierungscoach');p('Liebes Nordlicht-Team,');p('Menschen technische Zusammenhänge verständlich zu machen und gemeinsam praktische Lösungen zu entwickeln, begeistert mich. Als KI- und Automatisierungscoach möchte ich meine Erfahrung aus Datenanalyse und Lehre bei Ihnen einbringen.');p('An der Beispielakademie unterrichtete ich Python-Kurse. Dabei verband ich technische Grundlagen mit praktischen Übungen und half Teilnehmenden, eigene Lösungswege zu entwickeln.');if(state.applied.letter)content.append(create('p',proposal.letter,'added'));p('Aus meiner Tätigkeit bei Musterwerk Digital bringe ich außerdem Erfahrung mit Datenaufbereitung und REST-Schnittstellen mit. Diese Kenntnisse möchte ich für alltagstaugliche Automatisierung einsetzen und weiter ausbauen.');p('Gerne erläutere ich Ihnen meine Motivation im persönlichen Gespräch.');p('Mit freundlichen Grüßen\nMara Beispiel');}
  }
  function openEditor(){state.drafts[state.document]||='';$('instruction').value=state.drafts[state.document];$('editor-title').textContent=state.document==='cv'?'Was soll in den Lebenslauf?':'Was soll ins Anschreiben?';$('sample-quote').textContent=state.document==='cv'?sample.replace('im Anschreiben nach dem Absatz über meine Python-Kurse','im Lebenslauf unter „Eigene Projekte“'):sample;$('proposal').hidden=true;$('voice-status').textContent='';$('editor').showModal();$('instruction').focus();}
  for(const button of document.querySelectorAll('[data-step]'))button.onclick=()=>navigate(button.dataset.step);
  for(const button of document.querySelectorAll('[data-go]'))button.onclick=()=>navigate(button.dataset.go);
  for(const button of document.querySelectorAll('[data-doc]'))button.onclick=()=>{state.document=button.dataset.doc;showDocument();};
  $('matching-add').onclick=()=>{navigate('documents');state.document='letter';showDocument();openEditor();};
  for(const button of document.querySelectorAll('[data-layout]'))button.onclick=()=>{state.layout=button.dataset.layout;showDocument();};
  $('open-editor').onclick=openEditor;
  $('instruction').oninput=()=>{state.drafts[state.document]=$('instruction').value;$('proposal').hidden=true;};
  $('play-example').onclick=()=>{stop();$('instruction').value=$('sample-quote').textContent;state.drafts[state.document]=$('instruction').value;$('proposal').hidden=true;$('voice-status').textContent='Beispiel eingefügt. Du kannst es wie ein Transkript lesen und bearbeiten.';};
  $('suggest').onclick=()=>{stop();if(!$('instruction').value.trim()){$('voice-status').textContent='Setze das Diktat-Beispiel ein oder schreibe eine Notiz.';return;}$('proposal-text').textContent=proposal[state.document];const custom=$('instruction').value.trim()!==$('sample-quote').textContent.trim();$('free-note').hidden=!custom;$('note-text').textContent=custom?$('instruction').value:'';$('proposal').hidden=false;$('accept').focus();};
  $('accept').onclick=()=>{state.applied[state.document]=true;$('editor').close();showDocument();$('demo-status').textContent='Beispielergänzung übernommen. Die andere Unterlage bleibt unverändert.';};
  $('discard').onclick=()=>{$('proposal').hidden=true;$('voice-status').textContent='Vorschlag verworfen. Das Dokument wurde nicht geändert.';};
  $('editor').addEventListener('close',()=>{stop();$('open-editor').focus();});
  $('dictate').onclick=()=>{
    const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!Recognition){$('voice-status').textContent='Dein Browser unterstützt hier keine Spracherkennung. Nutze das Diktat-Beispiel oder tippe deine Notiz.';return;}
    if(state.recognition)return;
    const recognition=new Recognition();state.recognition=recognition;recognition.lang='de-DE';recognition.continuous=true;recognition.interimResults=false;
    const base=$('instruction').value.trim();let spoken='';
    recognition.onresult=event=>{for(let i=event.resultIndex;i<event.results.length;i++)if(event.results[i].isFinal)spoken+=' '+event.results[i][0].transcript;$('instruction').value=[base,spoken.trim()].filter(Boolean).join(' ');state.drafts[state.document]=$('instruction').value;$('proposal').hidden=true;};
    recognition.onstart=()=>{$('dictate').disabled=true;$('stop-dictation').hidden=false;$('voice-status').textContent='Du kannst sprechen. Beende die Aufnahme, wenn du fertig bist.';};
    recognition.onerror=()=>{$('voice-status').textContent='Die Spracherkennung ist nicht verfügbar oder wurde nicht freigegeben. Dein bisheriger Text bleibt erhalten.';};
    recognition.onend=()=>{state.recognition=null;$('dictate').disabled=false;$('stop-dictation').hidden=true;};
    try{recognition.start();}catch{state.recognition=null;$('voice-status').textContent='Aufnahme konnte nicht gestartet werden. Nutze das Diktat-Beispiel.';}
  };
  $('stop-dictation').onclick=stop;
  $('reset').onclick=()=>{stop();state.applied={letter:false,cv:false};state.drafts={letter:'',cv:''};state.document='letter';state.layout='design';$('instruction').value='';$('proposal').hidden=true;showDocument();navigate('profile');};
  window.addEventListener('pagehide',stop);showDocument();
})();
