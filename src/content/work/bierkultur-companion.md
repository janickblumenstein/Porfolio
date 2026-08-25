---
title: Companion-App für Gruppenreisen
publishDate: 2026-05-04 00:00:00
img: /assets/projects/bierkultur-companion.svg
img_alt: Bingo-Karte mit abgehakter Diagonale und einer Team-Rangliste
description: |
  Web-App für ein Wochenende mit Freunden — Challenges, Bingo, Quizrunden und Turniere mit einem gemeinsamen Punktesystem, live auf allen Handys.
tags:
  - JavaScript
  - Firebase
  - Realtime
  - Privatprojekt

# Macht den Eintrag zusätzlich zu einem Lebenslauf-Eintrag. Siehe DOKUMENTATION.md.
sideProject:
  name: Bierkultur — Companion-App für Gruppenreisen
  period: '2026'
  role: Konzeption & Entwicklung
  order: 2
  cvLine: >-
    Bierkultur — Companion-App für Gruppenreisen (JavaScript ES-Module, Firebase
    Realtime Database) mit Missionen, Bingo, Quiz- und Turniermodi,
    Live-Punktesystem und Host-Steuerung.
  bullets:
    - Punktesystem über alle Spielmodi hinweg mit Live-Leaderboard
    - Missionen und Challenges, die jede teilnehmende Person selbst ergänzen kann
    - Bingo mit Peer-Bestätigung durch zwei weitere Mitspielende statt Vertrauensbasis
    - >-
      Quiz-, Duell- und Turniermodi (Reaktion, Schiffeversenken, TicTacToe) mit
      Host-Steuerung
    - Gruppen-Voting mit sechs Abstimmungsmodi für die gemeinsame Reiseplanung
    - >-
      Modularer Aufbau — jedes Spielmodul hängt sich über eine Listener-Registry
      in den Kern ein
  stack:
    - JavaScript (ES Modules)
    - Firebase Realtime Database
    - HTML / CSS
  repoUrl: https://github.com/janickblumenstein/bluffquiz
---

## Warum

Ein Wochenendtrip mit einer grösseren Gruppe lebt von gemeinsamen Momenten — und stirbt an
Organisation. Wer schlägt was vor, wer hat welche Challenge schon gemacht, und wer liegt
eigentlich vorne?

Diese App bündelt das: ein Punktesystem, das über das ganze Wochenende läuft, und mehrere
Spielformen, die darauf einzahlen. Jede teilnehmende Person hat es auf dem Handy, alles ist
in Echtzeit synchron.

## Was drin ist

**Missionen und Challenges.** Zwölf Aufgaben sind vorgegeben, jede Person kann eigene
ergänzen. Manche zählen einmalig — die erste Person kassiert —, andere kann jede Person
einmal für sich abhaken.

**Bingo mit Peer-Bestätigung.** Eine 5×5-Karte mit regionalen Spezialitäten. Ein Feld gilt
erst, wenn zwei andere Mitspielende bestätigen. Das ist die Regel, die den Unterschied macht:
kein Vertrauensproblem, keine Diskussion.

**Spiele in zwei Klassen.** Solo-Spiele — Kopfrechnen, Schätzen, Reaktion — laufen jederzeit
und zählen nur mit reduzierter Gewichtung. Die offiziellen Runden startet ein Host, dort geht
es um die echten Punkte.

**Turniere.** Reaktionsduell, Schiffeversenken und ein Drei-Personen-TicTacToe, jeweils mit
Endabrechnung.

**Gruppen-Voting.** Sechs Abstimmungsmodi für die Frage, wohin es als Nächstes geht —
inklusive Editor für Preise und Abflugzeiten, damit die Entscheidung auf echten Zahlen fusst.

**Host-Rolle zum Weitergeben.** Die Host-Steuerung ist auf der Startseite versteckt und lässt
sich im Betrieb an eine andere Person übergeben, mit Bestätigung auf beiden Seiten. So hängt
das Wochenende nicht an einem einzigen Handy.

## Wie es gebaut ist

Bewusst schlank: reines JavaScript mit ES-Modulen, ohne Framework und ohne Build-Schritt.
Die Firebase Realtime Database hält den gemeinsamen Zustand, alle Geräte hängen an denselben
Knoten.

Jedes Spielmodul — Bingo, Missionen, Turnier, Voting — ist eine eigene Datei und meldet sich
über eine Listener-Registry beim Kern an. Ein neues Spiel dazuzunehmen heisst deshalb: eine
Datei schreiben und einhängen. Am bestehenden Code ändert sich nichts.

Die Datenbank-Regeln haben ein Ablaufdatum eingebaut. Eine Woche nach dem Trip macht die
Datenbank von selbst zu — kein vergessener offener Endpunkt.

## Was ich daraus mitnehme

Ein Punktesystem ist erstaunlich heikel. Die erste Fassung belohnte nur die Schnellsten,
worauf die Hälfte der Gruppe nach zwei Runden ausstieg. Die Gewichtung so zu justieren, dass
Mitmachen sich immer lohnt, war deutlich mehr Arbeit als die gesamte Technik — und genau die
Art Problem, die man erst im echten Einsatz sieht.

[Quellcode auf GitHub](https://github.com/janickblumenstein/bluffquiz)
