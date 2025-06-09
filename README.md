# Inselabenteuer

Ein Spiel über ein Abenteuer auf einer Insel.

## Entwicklung

1. Repository klonen
2. `npm install` ausführen
3. `npm start` zum lokalen Starten des Spiels

## Release-Prozess

Dieses Projekt verwendet GitHub Actions für den automatisierten Release-Prozess:

1. Navigiere zu "Actions" im GitHub-Repository
2. Wähle den "Build and Release" Workflow
3. Klicke auf "Run workflow"
4. Wähle den Release-Typ:
   - `patch` für Bugfixes (z.B. 1.0.0 -> 1.0.1)
   - `minor` für neue Features (z.B. 1.0.0 -> 1.1.0)
   - `major` für grundlegende Änderungen (z.B. 1.0.0 -> 2.0.0)
5. Klicke auf "Run workflow"

Der Workflow erledigt automatisch folgende Aufgaben:
- Erhöht die Version in package.json
- Generiert einen CHANGELOG.md aus den Git-Commits
- Baut die Anwendung für Mac und Windows
- Erstellt einen neuen GitHub Release mit den Installations-Dateien

## Changelog

Der Changelog wird automatisch aus den Commit-Nachrichten generiert. Jeder Eintrag im Changelog hat das Format:
- Commit-Nachricht (Commit-Hash)

Es gibt keine speziellen Anforderungen an das Format der Commit-Nachrichten. Schreibe einfach aussagekräftige und kurze Beschreibungen der Änderungen.
