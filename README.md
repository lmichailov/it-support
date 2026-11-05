# Lilia Michailov IT-Support: Website

Eigenständiges Website-Repository, unabhängig vom privaten Python-Assistenten.

- Live: https://lmichailov.github.io/it-support/
- Repository: https://github.com/lmichailov/it-support
- Veröffentlichter Branch: `website-draft`.
- `index.html` kann lokal direkt geöffnet werden. Keine Installation erforderlich.
- `impressum.html` und `datenschutz.html` enthalten die freigegebenen Kontaktdaten. Bei Änderungen an tatsächlicher Verarbeitung oder Hosting überprüfen.
- Die Website-Demo in `assets/privacy-demo.js` ist eine lokale Funktionsdemo ohne OpenAI-Zugang oder Tokenkosten.
- Videos verwenden erfundene Daten und eine illustrative Oberfläche. Kein Kundenscreenshot.

## Lokal bearbeiten

Diesen Ordner in VS Code öffnen. Der frühere Ordner `landingpage` im App-Projekt ist nur noch eine nicht versionierte Sicherheitskopie.

```powershell
git status
git add -- index.html impressum.html datenschutz.html assets
git commit -m "Update website"
```

Erst ein bewusstes `git push` auf `website-draft` startet die öffentliche Aktualisierung über GitHub Pages.
Keinen API-Key, keine .env, private Lizenzdateien, Kundendaten oder Python-Auslieferungspakete aufnehmen.

## Videos neu rendern

`tools/render_demo.py` ist ein Entwicklungshelfer. Er benötigt eine lokale Python-Umgebung mit Pillow, ffmpeg und den Windows-Schriften.
Die HTML-Seite selbst benötigt diese Werkzeuge nicht. `video-skript.txt` dokumentiert die Vorführung.


## Fuenf Produkt-Tabs

- **Outlook Assistant**: vorhandene E-Mail-Demo und Produktinformationen.
- **Bewerbungscoach**: eingebettete, eigenständige Demo unter `bewerbungscoach/`.
- **Nachrichten · Team**: Konzeptdemo mit Meldung/Bildillustration und Projektübergabe.
- **Nachrichten · Privat**: Konzeptdemo mit Gruppenabsprache und Antwortidee.
- Direktlinks: `#outlook`, `#bewerbungscoach`, `#team` und `#privat`.
- Beispiel-Anker: `#team-beispiel` und `#privat-beispiel` öffnen auch das passende Tab.
- Die Nachrichten-Demos verwenden vorbereitete, fiktive Ergebnisse. Keine KI-Anfragen, Uploads, Anmeldung oder Browser-Speicherung; die Namensmaskierung ersetzt ausschließlich Demonstrationsnamen.
- Teamkonten, allgemeiner Nachrichtenimport und Fotoauswertung sind geplante Funktionen, keine Funktionen dieser Landingpage.
- Umschalten funktioniert per Klick und Tastatur (Pfeile, Pos1, Ende).
- Nur fiktive Bewerbungsdaten; keine privaten Programmdateien, API-Schlüssel oder Zeugnisse.
- Der private BewerbungsCoach-Quellcode liegt in seinem eigenen Repository.

Änderungen werden im bestehenden Website-Repository gepflegt.
Ein Push auf `website-draft` aktualisiert die öffentliche Website über GitHub Pages.


Die Erweiterung um Team und Privat wurde im Browser mit vier Tabs, Pfeiltasten/Pos1/Ende, Direktlinks, Szenariowechsel, Namensmaskierung und Zwischenablage geprüft. Die vorhandene Outlook-Markierungsdemo und der eingebettete Bewerbungscoach wurden ebenfalls geprüft. Mobilansichten: 375 und 320 Pixel ohne horizontalen Überlauf.

## Veröffentlichungsgrenze

Dieses Repository veröffentlicht die Landingpage, Browserdemos und fiktive Beispieldateien. Der private Anwendungscode wird in seinen getrennten Projektordnern gepflegt und gehört nicht in dieses Repository.

Keine privaten App-Quelldateien, Installationspakete, Konfigurationen mit Zugangsdaten, API-Schlüssel oder echten Kundendaten hinzufügen. Die Ignore-Regeln helfen bei versehentlich kopierten Dateien; sie ersetzen keine Prüfung der zur Veröffentlichung vorgesehenen Änderungen.

HTML, CSS und JavaScript der öffentlich ausgelieferten Browserdemos sind für Besucher einsehbar. `tools/render_demo.py` ist ausschließlich der öffentliche Entwicklungshelfer für die fiktiven Demo-Videos, kein privater Anwendungsreader.

Vor jedem Commit die ausgewählten Dateien und den Diff prüfen. Nur ausdrücklich benannte Website-Dateien mit `git add -- ...` aufnehmen.


## Support & Daten

- Fuenfter Produkt-Tab; Direktlink `#support`, Beispielbereich `#support-beispiel`.
- Drei Browserbeispiele: feste FAQ-Antworten, simulierte Kunden-/Betreiberansicht
  und sechs fiktive Tabellenzeilen mit Fehlwertpruefung, Kennzahlen, Balken- und Scatterplot.
- CSV-Download enthaelt ausschliesslich die sechs erfundenen Beispielzeilen.
- Keine Anmeldung, keine eigenen Uploads, keine KI, keine App-Verbindung und keine
  Speicherung in Local Storage oder Session Storage. Es wird nur der Arbeitsspeicher
  der Seite verwendet, bis sie geschlossen oder neu geladen wird.
- Die Rollenauswahl ist eine Simulation, kein Zugriffsschutz. Es werden keine
  Demo-Admin-Passwoerter oder privaten Bestell-/FAQ-Dateien veroeffentlicht.
- Der separate Python-Prototyp bleibt im privaten Projekt `ticket_system`.
  Eine oeffentliche App-Adresse ist noch nicht eingerichtet; die Landingpage
  verlinkt deshalb eine persoenliche Vorfuehrung per vorhandener Kontaktadresse.
- HTML/CSS/JavaScript der Browserdemo sind oeffentlicher Website-Code.
- Bestehender GitHub-Pages-Ablauf bleibt erhalten. Keine neue Hosting-Plattform.
