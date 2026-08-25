---
title: Connect — Mitmach-App für Live-Events
publishDate: 2026-06-20 00:00:00
img: /assets/projects/connect-live-event.svg
img_alt: Beamerbild, das über Verbindungslinien mit vielen Handys verbunden ist
description: |
  Echtzeit-Event-App für rund 160 gleichzeitige Gäste — Beamer-Ansicht, Abstimmung per Handy, faire Team- und Einzelwertung.
tags:
  - JavaScript
  - Firebase
  - Realtime
  - Privatprojekt
---

## Warum

Ein Abschlussabend mit rund 160 Gästen, alle sollen mitmachen können. Auf dem Beamer läuft
eine Frage, im Saal tippen alle gleichzeitig auf dem eigenen Handy mit — ohne App-Installation,
nur über einen QR-Code.

Genau dort wird es interessant. Nicht die Spiellogik ist die Herausforderung, sondern dass
160 Geräte gleichzeitig an derselben Datenbank hängen, ohne dass etwas einbricht.

## Die Aufgabe hinter der Aufgabe

Der naive Ansatz — alle Geräte abonnieren den Spielzustand samt Antworten — skaliert nicht:
jede eingehende Antwort ginge an alle 160 Geräte, und die Last wächst quadratisch.

Die Lösung liegt im Datenmodell. Die Antworten liegen in einem eigenen Knoten, den **nur das
Host-Gerät** abonniert. Die Gästegeräte hören auf einen bewusst winzigen Zustand: aktuelle
Frage plus ein gedrosselter Zähler. Damit bekommt kein Gästehandy den Antwortstrom zu sehen —
die Netzlast fällt um Grössenordnungen.

Dazu kommen die praktischen Dinge, die man erst beim zweiten Mal weiss: Bilder in zwei
Auflösungen ausliefern, damit der Beamer das grosse und die 160 Handys das kleine laden. Und
die Erkenntnis, dass der kostenlose Firebase-Plan bei 100 gleichzeitigen Verbindungen dicht
macht — vor dem Event, nicht während.

## Wertung, die nicht nur die Schnellsten belohnt

Punkte gibt es tempoabhängig, zwischen 500 und 1000 je nach Reaktionszeit, gemessen **pro
Gerät** ab Erscheinen der Frage — damit unterschiedliche Latenzen niemanden benachteiligen.

Für die Teamwertung zählt aber nicht die Summe, sondern der **Durchschnitt pro Runde**. Ein
grosses Team gewinnt so nicht automatisch, und für die einzelne Person lohnt sich das
Mitmachen auch dann, wenn sie nicht die Schnellste ist. Bei Schwarm-Fragen ohne objektive
Antwort zählt „mit der Mehrheit getippt" als richtig.

Wer sich beim Login keinem Team zuordnen will, wird automatisch dem Team mit den aktuell
wenigsten Mitgliedern zugeteilt. Die Gruppen bleiben dadurch gleich gross — Voraussetzung
dafür, dass die relative Wertung überhaupt fair ist.

## Vorher getestet, nicht gehofft

Für ein Event, das genau einmal stattfindet, ist „wird schon laufen" keine Strategie. Also
habe ich ein Lasttest-Werkzeug geschrieben: ein Node-Skript, das bis zu 300 simulierte Gäste
mit je eigener Verbindung startet, jeder mit zufälliger Reaktionszeit und einstellbarer
Teilnahmequote. Parallel dazu im Browser als Host ein Quiz starten und zusehen, ob es hält.

Das hat mehr über die Architektur verraten als jedes Nachdenken davor.

## Wie es gebaut ist

JavaScript mit ES-Modulen, Firebase Realtime Database, keine Build-Kette. Der Kern kümmert
sich um Login, Teams und Zustand; Quiz-Runner, Tap-Duell und Beamer-Ansicht sind getrennte
Module. Die Beamer-Ansicht ist dieselbe URL mit einem Parameter — kein zweites Deployment.

[Quellcode auf GitHub](https://github.com/janickblumenstein/Connect)
