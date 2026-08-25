# Wartungsanleitung

Diese Seite ist so gebaut, dass jede Angabe **an genau einer Stelle** gepflegt wird.
Wenn du hier etwas änderst, aktualisiert sich alles Übrige von selbst.

---

## Die goldene Regel: wo steht was?

Es gibt nur **zwei** Orte, an denen Inhalte gepflegt werden:

| Ort | Was dort steht |
|---|---|
| `src/data/cv.ts` | Alles über **dich**: Name, Kontakt, Werdegang, Ausbildung, Kompetenzen, Sprachen, Dokumente |
| `src/content/work/*.md` | Alles über **Projekte**: eine Datei pro Projekt |

Alles andere — Startseite, beide Lebenslauf-Fassungen, Navigation, Fussbereich, Projektübersicht — liest aus diesen beiden Orten. **Fass die Seiten unter `src/pages/` nicht an, um Inhalte zu ändern.**

### Wo eine Angabe landet, wenn du sie änderst

| Du änderst … | erscheint automatisch in … |
|---|---|
| `contact.email` | Nav, Fussbereich, Kontakt-Button, beide CV-Fassungen, Unterlagen-Seite |
| `contact.linkedin` / `.github` | Nav, Fussbereich, beide CV-Fassungen |
| `contact.website` | beide CV-Fassungen, Fussbereich |
| `personal.title` | Startseiten-Titel, beide CV-Fassungen |
| `tagline` | Startseite (Text unter der Überschrift), Seitenbeschreibung |
| `profile` | beide CV-Fassungen |
| `experience` | CV-Fassungen **und** Sektion „Stationen" auf der Startseite (oberste 5) |
| `education`, `skills`, `languages`, `meta` | beide CV-Fassungen |
| `documents` | Unterlagen-Seite (`/dokumente/`) |
| Ein Projekt-Markdown | Projektübersicht, Detailseite, und — bei `sideProject` — Startseite und beide CV-Fassungen |

---

## Neues Projekt hinzufügen

**Eine einzige Datei anlegen. Sonst nichts.** Du musst das Projekt nirgendwo registrieren, verlinken oder in eine Liste eintragen.

### 1. Titelbild ablegen

Nach `public/assets/projects/` legen, z. B. `public/assets/projects/mein-projekt.png`.
Empfehlung: **1200 × 800 px**, quer. Das Bild wird beschnitten — Wichtiges gehört in die Mitte.

### 2. Markdown-Datei anlegen

`src/content/work/mein-projekt.md`. Der Dateiname wird die URL: `/work/mein-projekt/`.

```markdown
---
title: Mein Projekt — kurzer Zusatz
publishDate: 2026-08-25 00:00:00
img: /assets/projects/mein-projekt.png
img_alt: Was auf dem Bild zu sehen ist
description: |
  Ein bis zwei Sätze. Erscheinen auf der Detailseite und — bei privaten
  Projekten — als Beschreibung auf der Startseite und im Lebenslauf.
tags:
  - Next.js
  - Firebase
---

## Warum

Fliesstext in Markdown. Überschriften mit `##`.
```

Das war's. Das Projekt erscheint auf `/work/` und bekommt eine eigene Seite.

### 3. Nur bei privaten Projekten: der `sideProject`-Block

Damit ein Projekt **zusätzlich im Lebenslauf** und in der Startseiten-Sektion „Aus eigenem Antrieb" auftaucht, ergänzt du im Frontmatter:

```yaml
sideProject:
  name: Kurzname            # optional; ohne Angabe wird `title` verwendet
  period: seit 2026         # oder '2026' — Jahreszahlen in Anführungszeichen
  role: Konzeption & Entwicklung
  order: 4                  # kleinere Zahl = weiter oben; ohne Angabe: 100
  cvLine: >-
    Ein Satz für die ATS-Fassung des Lebenslaufs. Nennt Zweck und
    Technologien, ohne Formatierung.
  bullets:                  # im gestalteten CV werden die ersten drei gezeigt
    - Erster Stichpunkt
    - Zweiter Stichpunkt
  stack:                    # auf der Startseite werden die ersten vier gezeigt
    - Next.js
    - Firebase
  liveUrl: https://…        # optional
  repoUrl: https://…        # optional
```

Danach `npm run cv:pdf` ausführen, damit das PDF den neuen Eintrag enthält (siehe unten).

### 4. Optional: Screenshots auf der Detailseite

Für die grosse Scroll-Bildstrecke ergänzt du im Frontmatter:

```yaml
showcaseAspectRatio: '9 / 16'   # '9 / 16' für Handy-Screenshots, '16 / 9' für Desktop
showcases:
  - title: Überschrift der Szene
    description: Ein bis zwei Sätze dazu.
    media: /assets/showcases/mein-screenshot.png
    mediaType: image            # oder: video
    alt: Bildbeschreibung
  - title: Zweite Szene
    description: …
    media: /assets/showcases/clip.mp4
    mediaType: video
```

Bilddateien nach `public/assets/showcases/`. **Alle Szenen eines Projekts sollten dasselbe Seitenverhältnis haben**, sonst springt die Bildstrecke beim Überblenden.

Lässt du `media` weg, zeigt die Stelle einen Platzhalter — praktisch, um die Texte schon zu schreiben, bevor die Screenshots da sind.

---

## Lebenslauf anpassen

Alles in `src/data/cv.ts`. Es gibt **zwei Fassungen, aber nur eine Datenquelle** — du pflegst nie doppelt:

- **`/cv/`** — gestaltet, mit Foto und Kompetenz-Skalen. Für Menschen.
- **`/cv/ats/`** — reiner Text, keine Spalten, keine Grafik. Für Bewerbungssysteme, die PDFs maschinell auslesen.

### Kompetenz-Skalen

Die Punkte neben einer Kompetenz kommen aus `level` (1–5):

```ts
{ name: 'Power Apps', level: 4 },
{ name: 'Dataverse', level: 3 },
{ name: 'Prozessdigitalisierung' },   // ohne level → keine Punkte
```

Die Bedeutung der Stufen steht in `skillLevelLabels`. Die Legende unter den Kompetenzen zeigt automatisch nur die Stufen, die du auch tatsächlich vergeben hast.

**In der ATS-Fassung werden bewusst nur die Namen ausgegeben** — Punktegrafiken kann ein Bewerbungssystem nicht lesen und stolpert im schlimmsten Fall darüber.

### Neue Station im Werdegang

Neues Objekt **oben** in `experience` einfügen (die Liste ist chronologisch absteigend). Beim bisherigen Eintrag `current: false` setzen und `endDate` eintragen:

```ts
{
  startDate: '09/2026',
  endDate: 'heute',
  current: true,
  role: 'Neue Rolle',
  organization: 'Firma AG',
  location: 'Ort',
  bullets: ['Was du dort machst'],
},
```

Denk daran, bei einem Rollenwechsel auch `personal.title` und `tagline` nachzuziehen — das sind die beiden Stellen, die deine aktuelle Funktion in Worten wiederholen.

### Foto austauschen

`public/assets/portrait.jpg` ersetzen. Es wird auf der Startseite und im gestalteten CV verwendet.

**Vorher verkleinern**: Breite maximal ~1000 px, Hochformat, unter 200 KB. Ein Handyfoto mit 4000 px Breite bläht sonst die Seite *und* das Lebenslauf-PDF auf.

---

## Lebenslauf-PDF neu erzeugen

Die PDFs unter `public/documents/` sind **erzeugte Dateien**. Sie aktualisieren sich nicht von selbst, wenn du `cv.ts` änderst.

```bash
npm run cv:pdf
```

Das baut die Seite, rendert beide CV-Fassungen zu PDF und baut erneut (damit die Download-Buttons erscheinen). Ergebnis:

- `public/documents/lebenslauf-janick-blumenstein.pdf` — gestaltet, zum Mitschicken
- `public/documents/lebenslauf-janick-blumenstein-ats.pdf` — Textfassung für Bewerbungsportale

Einmalig nötig, falls noch nicht vorhanden:

```bash
npx playwright install chromium
```

**Immer nach einer CV-Änderung ausführen** — sonst zeigt die Website den neuen Stand, das herunterladbare PDF aber noch den alten. Das ist die einzige Stelle im ganzen Projekt, an der du an etwas denken musst.

Solange keine PDFs existieren, blenden sich die Download-Buttons von selbst aus — es entsteht kein toter Link.

---

## Dokumente hochladen (Arbeitszeugnisse, Diplome, Zertifikate)

### 1. PDF ablegen

Nach `public/documents/`, z. B. `public/documents/zeugnis-franke.pdf`.

### 2. In `cv.ts` eintragen

```ts
export const documents: DocumentEntry[] = [
  {
    title: 'Arbeitszeugnis Franke Kaffeemaschinen AG',
    category: 'Arbeitszeugnis',     // oder 'Diplom' | 'Zertifikat'
    issuer: 'Franke Kaffeemaschinen AG',
    date: '12/2023',
    file: '/documents/zeugnis-franke.pdf',
  },
];
```

Der Eintrag erscheint auf `/dokumente/`, gruppiert nach Kategorie.

**Lässt du `file` weg**, wird der Eintrag als „auf Anfrage" angezeigt, ohne Link. Praktisch, wenn ein Dokument existieren soll, aber nicht öffentlich sein darf.

### Ein Wort zur Vorsicht

Was in `public/` liegt, ist für **jeden im Internet abrufbar** — auch ohne Link darauf, sobald die Adresse bekannt ist. Arbeitszeugnisse enthalten in der Regel deine Wohnadresse, Unterschriften und Namen von Vorgesetzten.

Empfehlung: Diplome und Zertifikate öffentlich, Arbeitszeugnisse ohne `file` als „auf Anfrage". So ist es aktuell eingestellt.

---

## Was du nach jeder Änderung tust

```bash
npm run dev      # lokal anschauen unter http://localhost:4321
npm run build    # prüfen, dass alles fehlerfrei baut
```

Hast du den Lebenslauf oder ein privates Projekt angefasst, zusätzlich:

```bash
npm run cv:pdf
```

Dann committen und pushen — das Deployment übernimmt den Rest.

---

## Was absichtlich doppelt ist

Ganz ohne Wiederholung geht es nicht. Diese drei Stellen musst du bei einem Rollenwechsel von Hand nachziehen:

1. **`personal.title`** in `cv.ts` — deine Funktionsbezeichnung
2. **`tagline`** in `cv.ts` — der Satz auf der Startseite, der dieselbe Funktion in ganzen Sätzen ausdrückt
3. **`src/pages/about.astro`** — der erzählende Text über deinen Werdegang

Das sind Fliesstexte, keine Daten: Sie in Einzelteile zu zerlegen, um sie automatisch zusammenzusetzen, würde holprige Sätze erzeugen. Deshalb bleiben sie bewusst von Hand geschrieben.

Ebenfalls von Hand: die **Showcase-Sektion auf der Startseite** (`src/pages/index.astro`, Variable `showcaseScenes`). Sie zeigt drei Szenen aus dem Berufsalltag und ist nicht an ein einzelnes Projekt gebunden — zwei der drei Bildplätze sind noch leer.

---

## Verzeichnisübersicht

```
src/
  data/cv.ts              ← alles über dich
  content/work/*.md       ← ein Projekt pro Datei
  content.config.ts       ← erlaubte Felder im Projekt-Frontmatter
  lib/
    projects.ts           ← liest private Projekte aus den Markdown-Dateien
    cvPdf.ts              ← prüft beim Build, ob die PDFs existieren
  pages/                  ← Seiten; enthalten Layout, keine Inhalte
    cv.astro              ← gestalteter Lebenslauf
    cv/ats.astro          ← Fassung für Bewerbungssysteme
    dokumente.astro       ← Unterlagen
  components/             ← wiederverwendete Bausteine

public/
  assets/projects/        ← Titelbilder der Projekte
  assets/showcases/       ← Screenshots für die Bildstrecken
  assets/portrait.jpg     ← dein Foto
  documents/              ← Lebenslauf-PDFs, Zeugnisse, Diplome
  fonts/                  ← Schriften, selbst gehostet (nicht von Hand ändern)

scripts/
  generate-cv-pdf.mjs     ← erzeugt die Lebenslauf-PDFs
```
