# Iteration 2 — Single Source of Truth + Showcase

Zwei Sachen sind in dieser Iteration neu:

1. **`src/data/cv.ts`** — eine einzige TypeScript-Datei mit allen CV-Daten. Hero, Stationen, ATS-CV ziehen jetzt von hier. Du pflegst nur noch **einen Ort**.
2. **`src/components/Showcase.astro`** — Apple-Style Sticky-Sektion: links bleibt das Bild, rechts scrollen die Texte vorbei, Medien cross-faden. Mit klaren Platzhaltern für deine zukünftigen Screenshots/GIFs/Videos.

## Was ist neu / was ändert sich

```
src/
├─ data/
│  └─ cv.ts                ← NEU: alle CV-Daten an einem Ort
├─ components/
│  ├─ Showcase.astro       ← NEU: sticky scroll component
│  ├─ Nav.astro            ← (aus Iteration 1)
│  ├─ Skills.astro         ← (aus Iteration 1)
│  └─ ContactCTA.astro     ← (aus Iteration 1)
└─ pages/
   ├─ index.astro          ← UPDATE: importiert cv.ts, neue Showcase-Sektion
   ├─ cv.astro             ← UPDATE: rendert komplett aus cv.ts
   └─ about.astro          ← (aus Iteration 1, bleibt narrativ)
```

## So pflegst du dein CV jetzt

**Alle Fakten** — Stationen, Daten, Bullets, Skills, Sprachen, Verfügbarkeit — stehen in `src/data/cv.ts`. Die Datei ist getypt und kommentiert, du editierst einfach Werte:

```ts
// Neue Zertifizierung dazugekommen?
export const education: Education[] = [
  {
    startDate: '11/2025',
    endDate: '',
    title: 'Microsoft Certified: Power Platform Solution Architect',
    organization: 'PL-600 bestanden',
  },
  // ...
];

// Verfügbarkeit ändert sich?
export const meta = {
  // ...
  availability: '100% verhandelbar ab 06/2026',
  availabilityShort: 'Verfügbar ab 06/2026 · 100%',
};
```

Sobald du speicherst, propagiert Astro die Änderung automatisch durch alle Seiten:

- Hero auf der Startseite (Status-Pille)
- Stationen-Sektion auf der Startseite
- Komplette Werdegang/Education/Skills/Sprachen-Sektionen auf `/cv/`
- ATS-PDF (über `/cv/?print=1`)

Keine doppelte Pflege mehr. Wenn dein nächster Job als "Senior Solution Architect" startet, änderst du **eine** Zeile in `cv.ts`, und Hero, Stationen-Karte und ATS-CV sind alle synchron.

## So fügst du Screenshots / GIFs / Videos hinzu

### 1. Asset in den richtigen Ordner

Lege deine Medien in `public/assets/showcases/` ab:

```
public/assets/showcases/
├─ service-app.mp4         (oder .webm)
├─ service-app.png         (Poster für Video)
├─ approval-flow.png
└─ powerbi-dashboard.png
```

Empfohlene Formate und Dimensionen:

| Asset-Typ                | Format                | Empfohlene Auflösung      |
| ------------------------ | --------------------- | ------------------------- |
| Mobile-App-Screenshot    | PNG / WebP            | 750 × 1624 (3× Retina)    |
| Desktop-Screenshot       | PNG / WebP            | 1280 × 800                |
| Animation einer App-UI   | **WebM** (≤2 MB)      | 1280 × 800 oder 720 × 460 |
| Animation Fallback       | MP4 (H.264)           | gleich wie WebM           |
| Animiertes GIF           | GIF (nur als Notlös.) | so klein wie möglich      |

> **Warum WebM statt GIF**: WebM ist 5–20× kleiner bei gleicher Qualität. Die Showcase nutzt automatisch `<video autoplay loop muted playsinline>` — sieht aus wie ein GIF, lädt aber wie ein Bild. Wenn deine Power Apps-Demo 8 MB als GIF wäre, sind es als WebM oft nur 400 KB.

> **WebM erstellen**: Aus einem Bildschirm-Mitschnitt (QuickTime, OBS) → mit ffmpeg oder online-tools wie [cloudconvert.com](https://cloudconvert.com) zu WebM. Quick-and-dirty:
> ```bash
> ffmpeg -i input.mov -c:v libvpx-vp9 -b:v 0 -crf 35 -an output.webm
> ```

### 2. Asset in der Showcase referenzieren

In `src/pages/index.astro`, das `showcaseScenes`-Array updaten:

```ts
const showcaseScenes = [
  {
    title: 'Apps unterwegs',
    description: 'Servicetechniker dokumentieren Einsätze direkt beim Kunden ...',
    media: '/assets/showcases/service-app.webm',  // ← Pfad eintragen
    mediaType: 'video' as const,                   // ← 'video' oder 'image'
    mediaFallback: '/assets/showcases/service-app.mp4',
    mediaFallbackType: 'video' as const,
    alt: 'Service-Techniker-App auf Smartphone',
  },
  // ...
];
```

Solange `media: ''` leer ist, zeigt die Showcase einen schicken Platzhalter mit deinen Hinweisen — du siehst sofort, wie das fertige Layout aussieht, auch ohne Asset.

### 3. Wie sich das Ding verhält

- **Desktop (≥800px)**: Links bleibt eine sticky Stage stehen, rechts scrollen die Texte vorbei. Wenn ein neuer Text in den Mittelpunkt kommt, faded das Medium auf der Stage zum nächsten — gleicher Frame, smoother Übergang. Deine "Bilder mergen ineinander"-Idee.
- **Mobile (<800px)**: Pro Szene ein Bild + Text untereinander. Kein Sticky, keine Cross-Fades — saubere lineare UX auf kleinen Screens.
- **Reduced Motion**: User mit `prefers-reduced-motion: reduce` (z.B. systemweit gesetzt für Vestibularis-Empfindliche) sehen automatisch die Mobile-Variante, auch auf Desktop. Barrierefreiheit eingebaut.

### Mehr Showcase-Sektionen?

Du kannst beliebig viele `<Showcase>`-Sektionen einfügen — z.B. eine pro Projekt-Detailseite. Jede mit eigenen Szenen und eigener Aspect Ratio. Beispiel für eine "Mobile First"-Showcase mit hochformatigen Bildern:

```astro
<Showcase
  title="Service-App in Aktion"
  scenes={[ ... ]}
  aspectRatio="9 / 16"
/>
```

Oder eine Showcase auf der Detailseite eines Projekts:

```astro
<!-- in src/pages/work/[...slug].astro nach <Content /> -->
<Showcase
  scenes={[ ... ]}
  aspectRatio="16 / 9"
/>
```

## Was du noch tun musst

1. **`BaseLayout.astro`** — `<html lang="en">` → `<html lang="de">` (eine Zeile)
2. **Lorem-Ipsum-Projekte** in `src/content/work/` löschen (alle ausser den 4 aus Iteration 1)
3. **Profilbild austauschen**: `public/assets/portrait.jpg` und `public/assets/at-work.jpg`
4. **LinkedIn-URL prüfen** in `cv.ts` (`contact.linkedin`)
5. **`public/assets/showcases/` anlegen** — sobald du Material hast, einfach reindroppen

## Lokal testen

```bash
npm run dev
```

- `http://localhost:4321/` — Startseite mit neuer Showcase
- `http://localhost:4321/cv/` — ATS-CV, jetzt aus `cv.ts` gerendert
- `http://localhost:4321/cv/?print=1` — direkter PDF-Export

## Sanity-Check: was ist jetzt DRY?

| Information               | Quelle                    | Wird gebraucht in            |
| ------------------------- | ------------------------- | ---------------------------- |
| Name, Titel               | `cv.ts → personal`        | Hero, ATS-CV, `<title>`      |
| Adresse, E-Mail, Telefon  | `cv.ts → location/contact` | Footer, ATS-CV               |
| LinkedIn                  | `cv.ts → contact.linkedin`| Nav-Socials (manuell), CV    |
| Verfügbarkeit             | `cv.ts → meta.availability`| Hero-Status, ATS-CV         |
| Werdegang                 | `cv.ts → experience`      | Stationen, ATS-CV            |
| Ausbildung                | `cv.ts → education`       | ATS-CV                       |
| Skills                    | `cv.ts → skills`          | ATS-CV                       |
| Sprachen                  | `cv.ts → languages`       | ATS-CV                       |
| Tagline / Profil          | `cv.ts → tagline / profile`| Hero, About, ATS-CV         |

`about.astro` hat eigene Prosa — die ist hand-geschrieben und bleibt das, weil es ein narrativer Text ist, nicht eine Liste von Fakten. Wenn du dort Fakten ändern musst (z.B. "über zehn Jahren Berufserfahrung"), passe sie auch in `cv.ts → profile` an.

Bei Fragen: Sag Bescheid welcher Teil als nächstes dran ist. Sinnvolle Kandidaten:

- Erste echte Showcase-Assets aufnehmen und einbinden
- Theme-Farben anpassen (das `--accent-regular` deinem alten Goldton angleichen)
- Detailseiten-Layout für ein konkretes Projekt aufpolieren
- OG-Image für LinkedIn-Vorschau bauen
