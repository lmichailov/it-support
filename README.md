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


## Zwei Produkt-Tabs

- **Outlook Assistant**: vorhandene E-Mail-Demo und Produktinformationen.
- **Bewerbungscoach**: eingebettete, eigenständige Demo unter `bewerbungscoach/`.
- Direktlinks: `#outlook` und `#bewerbungscoach`.
- Umschalten funktioniert per Klick und Tastatur (Pfeile, Pos1, Ende).
- Nur fiktive Bewerbungsdaten; keine privaten Programmdateien, API-Schlüssel oder Zeugnisse.
- Der private BewerbungsCoach-Quellcode liegt in seinem eigenen Repository.

Die zusätzlichen Dateien und die neue `index.html` sind lokal vorbereitet.
Ein Push des Website-Branches würde die öffentliche Website aktualisieren.
