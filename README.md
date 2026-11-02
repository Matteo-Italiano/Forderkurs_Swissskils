# Förderkurs SwissSkills — Web Technologies

Vorbereitung auf die **ICTskills / SwissSkills 2023, Trade 17 — Web Technologies**.
Dieses Repo enthält das offizielle Übungsmaterial (`ictskills-preparation-tasks-2023-web-tech/`)
und unsere Lösungen dazu.

---

## 📊 Stand

| | Modul / Task | Was | Status |
|---|---|---|---|
| **Speed Challenge** | | | |
| 1 | Array to markdown list | JS | ✅ gelöst |
| 2 | Rgb to hex | JS | ✅ gelöst |
| 3 | Accessibility | HTML/CSS | ✅ gelöst |
| 4 | String hash | JS | ⬜ offen |
| 5 | SQL Queries | SQL | ⬜ offen |
| 6 | SkillNews | HTML/CSS (Responsive) | ⬜ offen |
| 7 | Robot dog walking distance | JS | ⬜ offen |
| 8 | Regex | Regex | ⬜ offen |
| **Hauptmodule** | | | |
| A | Landing Page | HTML/CSS | ⬜ offen |
| B | CSS Selectors | HTML/CSS | ⬜ offen |
| C | Battleship | Frontend / Vanilla JS | ✅ gelöst |
| D | Pixel Canvas API | Backend (Node **oder** PHP) | ⬜ offen |

**4 von 12** Tasks sind durch. Die Speed Challenge ist der schnellste Weg zu Übung,
die vier Hauptmodule sind das, was am Wettkampf wirklich zählt.

---

## ✅ Was wir schon gemacht haben

### Task 1 — Array to markdown list
`speedchallenge/work/task1/src/arrayToMarkdownList.js`

Array von Strings → Markdown-Liste. Gelöst mit `map()` + `join('\n')`.

### Task 2 — Rgb to hex
`speedchallenge/work/task2/src/rgbToHex.js`

RGB-Werte → Hex-Farbe inkl. führendem `#`.
Kniff: `toString(16)` liefert bei Werten < 16 nur eine Stelle — darum `padStart(2, '0')`.

### Task 3 — Accessibility
`speedchallenge/work/task3/src/index.html`

Eine Bootstrap-Seite mit kaputter Barrierefreiheit reparieren, **ohne das Layout zu verändern**.
Die acht von axe-core gemeldeten Verstösse und was wir dagegen gemacht haben:

| Verstoss | Fix |
|---|---|
| `html-lang-valid` | `lang="english"` → `lang="en"` (BCP-47-Tag, nicht der Sprachname) |
| `document-title` | `<title>` ergänzt |
| `meta-refresh` | Auto-Refresh entfernt — reisst Leute aus dem Kontext, die mehr Zeit brauchen |
| `image-alt` | `alt=""` am Hero-Bild (dekorativ, die Headline darüber trägt die Aussage) |
| `landmark-one-main` | Inhalt in `<main>` gepackt |
| `region` | damit liegt jetzt *jeder* Inhalt in einer Landmark (`header` / `main` / `footer`) |
| `label` | `<label id="name">` → `<label for="name">` — ein Label verbindet sich über `for`, nicht über `id` |
| `duplicate-id-active` | fällt mit demselben Fix weg: Label und Input hatten beide `id="name"` |

Dazu noch `aria-hidden="true"` am Logo-SVG, damit Screenreader es nicht doppelt vorlesen —
der Linktext daneben sagt bereits dasselbe.

> Geprüft mit axe-core gegen die Seite: vorher 6 Violations, nachher 0.
> Die offizielle Cypress-Suite konnte lokal nicht laufen (kein Chrome installiert).

### Hauptmodul C — Battleship
`work/frontend/src/` — `util.js`, `grid.js`, `player.js`, `ai-player.js`, `game-state.js`

Battleship gegen eine KI, komplett in Vanilla JS. Alle 24 TODOs sind weg, ausserhalb
von `src/` wurde nichts angefasst.

| Datei | Was drin steckt |
|---|---|
| `util.js` | Schachnotation ↔ Koordinaten. Format `^[A-Za-z]\d+$`, danach erst die Bounds — die Reihenfolge entscheidet, welcher Error fliegt. |
| `grid.js` | Baut Legende + Tiles ins DOM, findet/markiert Tiles, zählt Treffer. |
| `player.js` | Schiffe über `ShipGenerator.generateShips()` und ab damit ins Grid. |
| `ai-player.js` | Würfelt eine Zelle im **gegnerischen** Grid, würfelt neu solange schon markiert, klickt nach 250 ms. |
| `game-state.js` | Zugwechsel, Siegprüfung, Dialog. |

Drei Dinge, die nicht offensichtlich waren:

- **Die Tile-Reihenfolge im DOM ist die Bewertung.** Die Tests holen sich `querySelectorAll('button')[index]`
  und vergleichen mit `findTile()`. Also müssen die Tiles zeilenweise (`y` aussen, `x` innen) angelegt werden,
  sonst stimmt kein einziger Index.
- **Das Grid-Layout macht CSS allein** — aber nur, wenn die Legende *vor* den Tiles ins DOM kommt.
  `base.css` nutzt `grid-auto-flow: dense`; kommen die Tiles zuerst, fressen sie die Legendenspalte auf.
  Gesetzt wird lediglich `repeat(width + 1, 1fr)` / `repeat(height + 1, 1fr)` — das `+1` ist die Legende.
- **`setPlayers` deaktiviert das eigene Grid** und aktiviert das des Gegners. Klingt verkehrt herum,
  ist aber richtig: geklickt wird immer beim Gegner.

> Verifiziert mit einer nachgebauten Testsuite (56 Assertions, gespiegelt aus den fünf Cypress-Specs,
> gegen jsdom) sowie Layout- und Vollspiel-Durchläufen im echten Headless-Chrome:
> Tracks stimmen (11×11 bzw. 15×13), jede Legende und jedes Tile sitzt in der richtigen Zelle,
> und drei komplette Partien enden sauber mit "Player wins!" / "AI wins!".
> Die offizielle Cypress-Suite selbst lief lokal nicht (kein Linux-Chrome im WSL).

---

## ⬜ Was noch offen ist

### Speed Challenge

- **Task 4 — String hash** · `task4/src/stringHash.js` gibt noch `[0, 0, 0]` zurück.
- **Task 5 — SQL** · `task5/src/query1.sql` und `query2.sql` sind leer. Braucht eine laufende MySQL/MariaDB (siehe `config.json`).
- **Task 6 — SkillNews** · Die Seite steht, aber `styles.css` hat **keine einzige Media Query**. Das ist der ganze Task: responsive machen.
- **Task 7 — Robot dog** · `walk()` gibt `0; // @todo` zurück. Ladestationen entlang einer Strecke, wie weit kommt der Hund.
- **Task 8 — Regex** · Vier Regexes, alle noch `/TODO/`. Die letzte (Schweizer Telefonnummern mit `+41`, `0041`, Leerzeichen) ist die happigste.

### Hauptmodule

- **Landing Page** & **CSS Selectors** (`work/htmlcss/`) · noch komplett im Startzustand.
- **Pixel Canvas API** (`work/backend/`) · wahlweise Node (`src-node/`) oder PHP (`src-php/`). Statische Files werden noch nicht ausgeliefert, die Routen fehlen.

---

## 🚀 Loslegen

Jeder Task ist ein eigenes Projekt mit eigenen Dependencies:

```bash
cd ictskills-preparation-tasks-2023-web-tech/speedchallenge/work/task4
npm install      # bzw. composer install bei den PHP-Tasks
npm test         # Tests laufen lassen
npm start        # Watch-Mode / Cypress UI
```

Die HTML/CSS- und Cypress-Tasks brauchen ein installiertes **Chrome**.

## 📁 Aufbau

```
ictskills-preparation-tasks-2023-web-tech/
├── readme/              # Aufgabenstellung als PDF (Instructions + 3 Module)
├── speedchallenge/
│   ├── readme/          # index.html mit allen 8 Speed-Challenge-Aufgaben
│   ├── material/        # Regex-Cheatsheet
│   └── work/task1..8/   # ← hier wird gearbeitet
└── work/
    ├── htmlcss/         # Landing Page + CSS Selectors
    ├── frontend/        # Battleship
    └── backend/         # Pixel Canvas API (Node oder PHP)
```

Die Aufgabenstellung steht jeweils als `README.mdx` im Task-Ordner und als PDF in `readme/`.
