# buildwithjanick.dev

Persönliche Website und Lebenslauf von Janick Blumenstein. Gebaut mit [Astro](https://astro.build), statisch ausgeliefert.

## 👉 Inhalte pflegen

**[DOKUMENTATION.md](./DOKUMENTATION.md)** erklärt Schritt für Schritt, wie du ein Projekt hinzufügst, den Lebenslauf änderst oder Dokumente hochlädst — und wo welche Angabe steht, damit du nichts doppelt pflegst.

Kurzfassung: Inhalte stehen in `src/data/cv.ts` (alles über dich) und `src/content/work/*.md` (ein Projekt pro Datei). Alles andere leitet sich daraus ab.

## Befehle

Alle Befehle im Projektstamm ausführen:

| Befehl | Wirkung |
| :--- | :--- |
| `npm install` | Abhängigkeiten installieren |
| `npm run dev` | Entwicklungsserver auf `localhost:4321` |
| `npm run build` | Produktions-Build nach `./dist/` |
| `npm run preview` | Build lokal ansehen, vor dem Deployment |
| `npm run cv:pdf` | Lebenslauf-PDFs neu erzeugen — nach jeder CV-Änderung nötig |

Für `npm run cv:pdf` einmalig `npx playwright install chromium` ausführen.

## Seiten

| Adresse | Inhalt |
| :--- | :--- |
| `/` | Startseite |
| `/work/` | Projektübersicht, `/work/<slug>/` je Detailseite |
| `/about/` | Über mich |
| `/cv/` | Lebenslauf, gestaltet — für menschliche Leser |
| `/cv/ats/` | Lebenslauf als reiner Text — für Bewerbungssysteme |
| `/dokumente/` | Lebenslauf-PDF, Arbeitszeugnisse, Diplome |

## Technisches

- **Keine externen Requests im Betrieb.** Schriften liegen unter `public/fonts/` und werden selbst ausgeliefert.
- **Zwei CV-Fassungen, eine Datenquelle.** Beide rendern aus `src/data/cv.ts` und können nicht auseinanderlaufen.
- **Private Projekte** stehen im `sideProject`-Block ihrer Markdown-Datei und erscheinen daraufhin automatisch im Lebenslauf und auf der Startseite.
