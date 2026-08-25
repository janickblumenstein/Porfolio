---
title: ShedSync — Inventar für Werkstatt und Haushalt
publishDate: 2026-07-04 00:00:00
img: /assets/projects/shedsync.svg
img_alt: Regalraster mit Kisten und einem QR-Etikett
description: |
  Eigenentwickeltes Inventarsystem für Werkzeug, Material und Vorräte — mit Lagerortverwaltung, Bestandsführung, Verleih und Bluetooth-Etikettendruck.
tags:
  - Next.js
  - TypeScript
  - Firebase
  - Android
  - Privatprojekt

# Macht den Eintrag zusätzlich zu einem Lebenslauf-Eintrag. Siehe DOKUMENTATION.md.
sideProject:
  name: ShedSync
  period: seit 2026
  role: Konzeption & Entwicklung
  order: 1
  cvLine: >-
    ShedSync — Inventar- und Lagerverwaltungssystem (Next.js, React, TypeScript,
    Firebase, Capacitor/Android) mit Lagerort-Hierarchie, Bestands- und
    Verleihverwaltung, QR-/EAN-Scanner und Bluetooth-Etikettendruck.
  bullets:
    - Hierarchische Lagerortverwaltung mit QR-Etiketten je Ort und Gegenstand
    - >-
      Drei Bestandsmodi (Stückzahl, Füllstand-Ampel, ohne Bestand) inkl.
      Mindestbestand und automatischer Nachbestell-Liste
    - Verleih-Center mit Ausleih- und Rückgabestatus je Gegenstand
    - Barcode-/QR-Scanner mit EAN-Suche und automatischem Befüllen der Stammdaten
    - >-
      Direktdruck auf Brother PT-P710BT über Bluetooth aus der Android-App, mit
      Browser-Fallback
    - >-
      Mandantenfähig über Workspaces — dieselbe Codebasis für mehrere Haushalte
      oder Werkstätten
  stack:
    - Next.js 16
    - React 19
    - TypeScript
    - Tailwind CSS
    - Firebase / Firestore
    - Capacitor (Android)
    - Vercel
  liveUrl: https://shedsync.vercel.app
  repoUrl: https://github.com/janickblumenstein/Inventory-Hub
---

## Warum

Wer kennt es nicht: Das gute Stechbeitel-Set ist irgendwo. Der Akku für die Flex auch. Und ob
noch genug 6er-Dübel da sind, weiss man erst im Baumarkt — meistens falsch.

ShedSync ist meine Antwort darauf. Ein System, das Werkzeug, Verbrauchsmaterial und
Lebensmittelvorräte gleichermassen erfasst, jedem Gegenstand einen Lagerort gibt und
rechtzeitig meldet, wenn etwas nachbestellt werden muss. Entstanden ist es als privates
Projekt — genutzt wird es täglich.

## Was es kann

**Lagerorte statt Suchen.** Orte sind hierarchisch aufgebaut: Werkstatt → Regal → Kiste. Jeder
Ort bekommt ein eigenes QR-Etikett. Scannen zeigt sofort, was drin sein sollte.

**Bestand, wie es zur Sache passt.** Nicht alles lässt sich sinnvoll zählen. Deshalb gibt es
drei Modi: exakte Stückzahl mit Mindestbestand, eine Füllstand-Ampel von *Voll* bis *Leer* für
Schrauben und Verbrauchsmaterial, oder gar keine Bestandsführung für Kisten, deren Inhalt nur
beschrieben ist. Alles, was unter den Mindestbestand fällt, landet automatisch auf der
Nachbestell-Liste.

**Verleih-Center.** Wer hat die Bohrmaschine? Ausgeliehene Gegenstände sind mit Person und
Datum erfasst, die Rückgabe ist ein Klick.

**Scanner statt Tippen.** Barcode und QR direkt über die Handykamera. Bei EAN-Codes sucht die
App die Produktdaten und füllt die Stammdaten selbst aus.

**Etiketten per Knopfdruck.** Die Android-App druckt über Bluetooth direkt auf einen Brother
PT-P710BT. Im Browser greift automatisch ein Druck-Fallback — dieselbe Codebasis, zwei Wege.

**Mandantenfähig.** Alle Daten liegen unter einem Workspace. Damit läuft dieselbe Anwendung
für mehrere Haushalte oder Werkstätten, ohne dass sich etwas vermischt.

## Wie es gebaut ist

Next.js 16 mit React 19 und TypeScript, Tailwind CSS fürs UI, Firebase/Firestore als
Datenhaltung, deployed auf Vercel. Die Android-App ist eine Capacitor-Hülle, die die gehostete
Web-App lädt und nur die nativen Teile beisteuert — den Bluetooth-Druck. Der Vorteil: ein
Codebestand, und Web-Updates sind sofort auch in der App. Ein neuer Build ist nur nötig, wenn
sich am nativen Teil etwas ändert.

Die druckerspezifische Logik liegt bewusst in genau einer Datei. Ein anderes Etikettenmodell
zu unterstützen, heisst dort einen Adapter zu ergänzen — nicht die halbe App anzufassen.

## Was ich daraus mitnehme

Der Reiz lag nicht in der Technik allein, sondern in derselben Frage wie im Beruf: Welcher
Ablauf ist so mühsam, dass er ohne Werkzeug einfach nicht gemacht wird? Bestandsführung
gehört dazu — sobald das Erfassen länger dauert als der Griff ins Regal, passiert es nicht.
Deshalb sind Scanner, Etikettendruck und die Füllstand-Ampel die eigentlichen Kernfunktionen
und nicht das Datenmodell dahinter.

[Live-Anwendung ansehen](https://shedsync.vercel.app) ·
[Quellcode auf GitHub](https://github.com/janickblumenstein/Inventory-Hub)
