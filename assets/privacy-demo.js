/* Browser-only illustrative demo. No API, network calls, storage or real mail access. */
(function (global) {
  "use strict";
  const tokenPattern = /\[\[UNKENNTLICH\d+_X[A-F0-9]{12}\]\]/g;
  const escapeRegex = value => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const credentials = /\b(?:passwort|password|kennwort|pin|tan|otp|api[ _-]?key|secret|token)\s*[:=]|\bsk-[A-Za-z0-9_-]{16,}|-----BEGIN .*PRIVATE KEY-----/i;
  class DemoSession {
    constructor(source, namespace) {
      if (/UNKENNTLICH/i.test(source)) throw new Error("Bitte einen Ausgangstext ohne vorhandene UNKENNTLICH-Platzhalter verwenden.");
      this.source = source;
      this.pairs = new Map();
      this.namespace = namespace;
    }
    mask(start, end) {
      const original = this.source.slice(start, end);
      if (original.trim().length < 2) throw new Error("Markiere zuerst mindestens zwei Zeichen im linken Testtext.");
      const lineStart = this.source.lastIndexOf("\n", start - 1) + 1;
      const nextBreak = this.source.indexOf("\n", end);
      const context = this.source.slice(lineStart, nextBreak < 0 ? this.source.length : nextBreak);
      if (credentials.test(original) || credentials.test(context)) throw new Error("Zugangsdaten sind nicht für die reversible Demo vorgesehen. Verwende erfundene Namen, Adressen oder Kundennummern.");
      for (const existing of this.pairs.keys()) {
        if (existing !== original && (existing.includes(original) || original.includes(existing))) {
          throw new Error("Diese Markierung überschneidet sich mit einer vorherigen. Wähle getrennte Angaben oder setze die Demo zurück.");
        }
      }
      if (!this.pairs.has(original)) this.pairs.set(original, `[[UNKENNTLICH${this.pairs.size + 1}_X${this.namespace}]]`);
      return this.pairs.get(original);
    }
    protectedText() {
      if (!this.pairs.size) return this.source;
      const pattern = new RegExp([...this.pairs.keys()].sort((a,b) => b.length-a.length).map(escapeRegex).join("|"), "g");
      return this.source.replace(pattern, match => this.pairs.get(match));
    }
    template() {
      if (!this.pairs.size) throw new Error("Schütze zuerst mindestens eine Testangabe.");
      return "Guten Tag,\n\nvielen Dank für Ihre Nachricht.\nDiese feste Testvorlage übernimmt die folgenden Platzhalter:\n\n" +
        [...this.pairs.values()].map(token => "• " + token).join("\n") + "\n\nMit freundlichen Grüßen\nLilia";
    }
    restore(value) {
      const reverse = new Map([...this.pairs].map(([original, token]) => [token, original]));
      const tokens = value.match(tokenPattern) || [];
      if (tokens.some(token => !reverse.has(token)) || /UNKENNTLICH/i.test(value.replace(tokenPattern, ""))) {
        throw new Error("Unbekannter oder veränderter Platzhalter. Es wird nichts erraten. Erzeuge die Testvorlage erneut.");
      }
      return value.replace(tokenPattern, match => reverse.get(match));
    }
    clear() { this.pairs.clear(); this.source = ""; }
  }
  if (typeof module !== "undefined" && module.exports) module.exports = { DemoSession };
  if (typeof document === "undefined") return;
  const $ = id => document.getElementById(id);
  const source = $("try-source");
  if (!source) return;
  const example = "Hallo Lilia,\n\nmein Name ist Erika Beispiel. Bitte bestätige unseren Termin am Freitag um 10 Uhr.\nMeine Kundennummer lautet KUNDE-4711.\nMeine Test-IBAN: DE89 3704 0044 0532 0130 00.\n\nViele Grüße\nErika Beispiel";
  let session;
  const status = message => { $("try-status").textContent = message; };
  const namespace = () => Array.from(global.crypto.getRandomValues(new Uint8Array(6)), b => b.toString(16).padStart(2,"0")).join("").toUpperCase();
  function draw() {
    $("try-protected").value = session.protectedText();
    $("try-count").textContent = session.pairs.size + " unterschiedliche Angabe(n) lokal geschützt";
    const entries = [];
    for (const [original, token] of session.pairs) {
      const item = document.createElement("li");
      const label = document.createElement("code"); label.textContent = token;
      const value = document.createElement("span"); value.textContent = original;
      item.append(label, document.createTextNode(" → "), value); entries.push(item);
    }
    $("try-mapping").replaceChildren(...entries);
    $("try-template").disabled = !session.pairs.size;
    $("try-restore").disabled = !session.pairs.size || !$("try-response").value.trim();
  }
  function renew() {
    if (session) session.clear();
    $("try-response").value = ""; $("try-restored").value = "";
    try {
      session = new DemoSession(source.value, namespace());
      $("try-mask").disabled = false; draw();
      status("Alles bleibt in diesem Browser. Markiere zum Beispiel Erika Beispiel und klicke auf Markierung schützen.");
    } catch (error) {
      $("try-mask").disabled = true; $("try-template").disabled = true; $("try-restore").disabled = true;
      $("try-protected").value = ""; $("try-mapping").replaceChildren(); $("try-count").textContent = "Keine aktive Zuordnung";
      status(error.message);
    }
  }
  $("try-mask").addEventListener("click", () => {
    try {
      const start = source.selectionStart, end = source.selectionEnd;
      const token = session.mask(start, end);
      $("try-response").value = ""; $("try-restored").value = "";
      draw(); status(token + " angelegt. Jetzt kannst du die nächste Stelle markieren. Alle identischen Vorkommen wurden geschützt.");
    } catch (error) { status(error.message); }
  });
  $("try-template").addEventListener("click", () => {
    try {
      $("try-response").value = session.template(); $("try-restored").value = ""; draw();
      status("Feste Testvorlage erstellt – nicht von einer KI. Klicke nun auf Lokal zurückübersetzen.");
    } catch (error) { status(error.message); }
  });
  $("try-restore").addEventListener("click", () => {
    try {
      $("try-restored").value = session.restore($("try-response").value);
      status("Die bekannten Platzhalter wurden ausschließlich lokal zurückübersetzt. Es wurde nichts versendet.");
    } catch (error) { $("try-restored").value = ""; status(error.message); }
  });
  $("try-response").addEventListener("input", () => { $("try-restored").value = ""; draw(); });
  source.addEventListener("input", renew);
  $("try-reset").addEventListener("click", () => { source.value = example; renew(); });
  global.addEventListener("pagehide", () => { if (session) session.clear(); });
  source.value = example; renew();
})(typeof window !== "undefined" ? window : globalThis);
