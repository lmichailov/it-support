# BewerbungsCoach – öffentliche Beispieldemo

Dieses Verzeichnis kann vollständig als statische Website hochgeladen werden.
Es enthält ausschließlich fiktive Profile, Firmen und Beispielunterlagen.
Keine Dateien aus `documents/aktuell`, keine persönlichen Fotos, Zeugnisse,
Kontaktdaten oder Browserstände sind enthalten.

## Einbindung in deine Landingpage

Den gesamten Ordner beispielsweise unter `/bewerbungscoach-beispiel/` hochladen.
Danach entweder direkt auf `.../bewerbungscoach-beispiel/` verlinken oder einbetten:

```html
<iframe
  src="/bewerbungscoach-beispiel/"
  title="BewerbungsCoach mit fiktiven Beispieldaten ausprobieren"
  style="width:100%;height:1100px;border:0;border-radius:16px"
  loading="lazy"
  allow="microphone"
></iframe>
```

Für Spracheingabe benötigt die Seite HTTPS und einen kompatiblen Browser.
Bei einem iframe auf einer anderen Domain muss der Betreiber auch die
Permissions-Policy der einbettenden Seite passend einstellen. Alle Beispiele
funktionieren zusätzlich per Tastatur und über „Diktat-Beispiel einsetzen“.

Lokal ist die Demo mit dem Python-Server unter `/beispiel/` erreichbar.
Alternativ `python -m http.server 8765 --directory landingpage-demo` starten
und `http://localhost:8765/` öffnen.

## Was die Demo tatsächlich kann

Die Designfassung verwendet Kontakt-Icons nach den Motiven der vorhandenen
Vorlage: E-Mail, Telefon, Standort, Sprachen, Führerschein und Hobby.
Zusätzlich gibt es ein ATS-Textlayout mit einspaltigem Text ohne Foto, Icons
oder Tabellen, jeweils als PDF und TXT. Alle Kontaktdaten bleiben als Text
erhalten. Die Prüfung umfasst die Textextraktion und Reihenfolge; sie ist
keine universelle Garantie für jedes Bewerbersystem. Hintergrund:
https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse

Profil ansehen, vorbereiteten Stellenabgleich durchgehen, zwischen Lebenslauf
und Anschreiben wechseln, ein Beispieldiktat oder eine eigene Sprachnotiz
anzeigen, einen vorbereiteten Änderungsvorschlag prüfen und dokumentweise
übernehmen oder verwerfen. PDF-Downloads passen zur jeweiligen Beispielversion.

Es gibt keinen KI-Aufruf. Freie Anweisungen werden als Notiz angezeigt und
nicht automatisch umgeschrieben. Die Browser-Spracherkennung kann einen
Sprachdienst des Browseranbieters verwenden; dieser Hinweis ist sichtbar.
Es werden keine Texte dauerhaft gespeichert und keine eigenen Backend-APIs
angesprochen. Die abgebildete Stockfoto-Person ist weder Kundin noch Mara Beispiel.

## Textbaustein für die Angebotsseite

**Eine Bewerbung, die nach dir klingt.**
Du erzählst von deiner Erfahrung. Wir helfen dir, die passenden Beispiele für
deine Wunschstelle zu finden und daraus einen verständlichen Lebenslauf und
ein persönliches Anschreiben zu machen. Du prüfst die Vorschläge und behältst
das letzte Wort.

**CTA:** „So könnte deine Bewerbung entstehen“ – Link zu dieser Demo.

Aktuell passt dieses Versprechen zu einem begleiteten Bewerbungsservice.
Ein selbstständig arbeitendes, kommerzielles Softwareprodukt würde zusätzlich
einen vom Vorführmodus getrennten Nutzerzugang und eine Produktionsanbindung
für Dokumentverarbeitung, KI und Diktat benötigen. Die Demo behauptet diese
Funktionen nicht.

## Bildquelle

- Fotograf: Mizuno K
- Quelle: https://www.pexels.com/photo/portrait-of-a-woman-at-the-desk-in-an-office-12903198/
- Lizenz: https://www.pexels.com/license/
- Heruntergeladen: 4. November 2026
- Lokale Datei: `assets/profil-stock.jpg`

Die Pexels-Lizenz erlaubt die Verwendung unter anderem auf Websites und in
Vorlagen. Das Bild wird hier ausdrücklich als Stockfoto gezeigt; eine Empfehlung
des Angebots durch die abgebildete Person wird nicht behauptet. Der Bildnachweis
bleibt auf der Demoseite sichtbar.
