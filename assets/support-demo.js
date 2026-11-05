'use strict';
(() => {
  const root = document.getElementById('support-demo');
  if (!root) return;
  const get = id => document.getElementById(id);
  const euro = value => new Intl.NumberFormat('de-DE', {style:'currency',currency:'EUR'}).format(value);
  // All examples below are invented for this public marketing page.
  const faq = {
    delivery: 'Fiktiver Beispielshop: Die Standardlieferung dauert 2–4 Werktage. Für diese Vorführung wird keine echte Sendung abgefragt.',
    return: 'Fiktiver Beispielshop: Unbenutzte Artikel können innerhalb von 30 Tagen zurückgegeben werden. Das ist eine Beispielantwort, keine Rückgaberegel dieses IT-Angebots.',
    payment: 'Fiktiver Beispielshop: Zahlung per Rechnung oder Kreditkarte. Diese Demo wickelt keine Zahlungen ab.'
  };
  const orders = [
    ['DEMO-1001','A','Versendet',180], ['DEMO-1002','A','In Bearbeitung',95], ['DEMO-1003','B','Zugestellt',240]
  ];
  const data = [
    ['Beispiel 1','Beratung',180,70],['Beispiel 2','Design',95,30],
    ['Beispiel 3','Beratung',240,85],['Beispiel 4','Design',160,55],
    ['Beispiel 5','Schulung',320,110],['Beispiel 6','Schulung',null,45]
  ];
  function rows(target, items) {
    target.replaceChildren();
    for (const item of items) {
      const tr = document.createElement('tr');
      for (const value of item) { const td = document.createElement('td'); td.textContent = String(value); tr.append(td); }
      target.append(tr);
    }
  }
  root.querySelectorAll('[data-support-mode]').forEach(button => {
    button.addEventListener('click', () => {
      root.querySelectorAll('[data-support-mode]').forEach(other => {
        const active = other === button;
        other.setAttribute('aria-pressed', String(active));
        get('support-' + other.dataset.supportMode).hidden = !active;
      });
    });
  });
  get('support-answer-button').addEventListener('click', () => {
    get('support-answer').textContent = faq[get('support-question').value];
  });
  function showOrders() {
    const admin = get('support-role').value === 'admin';
    const visible = orders.filter(order => admin || order[1] === 'A');
    rows(get('support-order-rows'), visible.map(order => [...order.slice(0,3), euro(order[3])]));
    get('support-order-summary').textContent = `${admin ? 'Betreiberansicht' : 'Kundenansicht A'}: ${visible.length} Beispielbestellungen · ${euro(visible.reduce((sum,order) => sum+order[3],0))} Gesamtbetrag.`;
  }
  get('support-role').addEventListener('change', showOrders);
  showOrders();
  rows(get('support-data-rows'), data.map(row => [row[0],row[1],row[2] === null ? 'Fehlt' : euro(row[2]),euro(row[3])]));
  const values = data.filter(row => row[2] !== null).map(row => row[2]).sort((a,b) => a-b);
  const metrics = [['Zeilen',data.length],['Spalten',4],['Fehlende Werte',data.length-values.length]];
  for (const [label,value] of metrics) {
    const item = document.createElement('div'), dt = document.createElement('dt'), dd = document.createElement('dd');
    dt.textContent = label; dd.textContent = String(value); item.append(dt,dd); get('support-metrics').append(item);
  }
  get('support-statistics').textContent = `Umsatz aus ${values.length} ausgefüllten Werten: Minimum ${euro(values[0])} · Maximum ${euro(values.at(-1))} · Mittelwert ${euro(values.reduce((a,b)=>a+b,0)/values.length)} · Median ${euro(values[Math.floor(values.length/2)])}. Der fehlende Umsatz wird nicht als null Euro gezählt.`;
  function showChart() {
    let drawing = '';
    if (get('support-chart').value === 'categories') {
      const totals = new Map();
      for (const row of data) if (row[2] !== null) totals.set(row[1],(totals.get(row[1]) || 0)+row[2]);
      const maximum = Math.max(...totals.values());
      [...totals].forEach(([label,value],i) => {
        const y = 45+i*78;
        drawing += `<text x="15" y="${y+22}">${label}</text><rect x="115" y="${y}" width="${value/maximum*330}" height="32" rx="5" fill="#195e53"/><text x="${125+value/maximum*330}" y="${y+22}">${value} €</text>`;
      });
      get('support-chart-note').textContent = 'Summen je Kategorie: Beratung 420 €, Design 255 €, Schulung 320 €. Der fehlende Umsatz bleibt ausgelassen.';
    } else {
      drawing = '<path d="M75 25V245H525" fill="none" stroke="#5c6b63"/><text x="240" y="290">Umsatz in €</text><text x="10" y="16">Kosten in €</text>';
      for (let value=0;value<=400;value+=100) drawing += `<text x="${75+value}" y="268">${value}</text>`;
      for (let value=0;value<=120;value+=40) drawing += `<text x="28" y="${250-value*1.7}">${value}</text>`;
      for (const row of data) if (row[2] !== null) drawing += `<circle cx="${75+row[2]}" cy="${245-row[3]*1.7}" r="7" fill="#195e53"><title>${row[0]}: Umsatz ${row[2]} €, Kosten ${row[3]} €</title></circle>`;
      get('support-chart-note').textContent = 'Fünf Punkte aus fünf vollständigen Umsatz-Kosten-Paaren. Ein Punkt entspricht einer Beispielzeile. Ein Zusammenhang beweist keine Ursache.';
    }
    // SVG content uses only the fixed fictional constants above, never visitor input.
    get('support-chart-output').innerHTML = `<svg viewBox="0 0 580 310" role="img" aria-label="${get('support-chart').value === 'categories' ? 'Umsatz nach Kategorie, Werte stehen im folgenden Hinweis' : 'Scatterplot der fünf Umsatz-Kosten-Paare aus der Beispieltabelle'}">${drawing}</svg>`;
  }
  get('support-chart').addEventListener('change', showChart);
  showChart();
  get('support-download').addEventListener('click', () => {
    const csv = '\ufeffAuftrag;Kategorie;Umsatz_EUR;Kosten_EUR\r\n'+data.map(row => row.map(value => value === null ? '' : String(value).replace('.',',')).join(';')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
    const link = document.createElement('a'); link.href = url; link.download = 'fiktive-beispieldaten.csv';
    document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url),1000);
    get('support-download-status').textContent = 'Der Download der sechs fiktiven Beispielzeilen wurde angefordert.';
  });
})();
