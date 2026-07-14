# Obsidian Dropdown — Prémium finomítási terv

A cél nem újraírás, hanem a meglévő `src/components/obsidian-dropdown.tsx` és a `src/styles.css` tokenrendszerének a beküldött spec szerinti kalibrálása: konzisztens tokenek, tisztább trigger/panel/option állapotok, keresés + kiválasztott állapot, reszponzív mobil viselkedés, akadálymentes billentyűzet.

Headless UI-t megtartjuk (már ad ARIA `combobox`/`menu`/`option` szemantikát, fókuszcsapdát, `Esc`, nyilak, gépelés, floating anchor pozicionálást). A változtatások főleg CSS-tokenek + két új alkomponens (`Search`, `Empty`) + `Item` "selected" prop.

## 1) Token-igazítás (`src/styles.css`)

A meglévő `:root` blokk az „Obsidian Premium Dropdown" tokenekkel él, de az accent arany (`rgb(220 180 92)`). A spec lila/indigó akcentust ajánl — kérdés lent. A konkrét számokat a spec táblázatához igazítjuk:

- `--dropdown-width-default`: `15rem` marad (≈ 240px, spec: 240px min-width) ✓
- `--dropdown-max-height`: `min(22.5rem, 42vh)` (spec: 40–42vh, 360px)
- `--radius-overlay`: `1rem` (spec: 16px panel)
- `--radius-control`: `0.75rem` (spec: 12px trigger)
- Trigger min-height: új token `--control-height: 2.75rem` (44px), a komponens `h-9` → `min-h-[var(--control-height)]`
- Option min-height: új token `--option-height: 2.5rem` (40px), mobilon `2.875rem` (46px)
- Új `--surface-selected-strong` és `--od-accent-primary-strong` a kiválasztott sor kontrasztjához
- `--focus-ring`: `0 0 0 3px` az accent-soft-ból, spec szerint 3–4px

## 2) `obsidian-dropdown.tsx` finomítások

**Trigger**
- `h-9` → `min-h-[var(--control-height)]`, padding `px-3.5`
- `aria-haspopup`, `aria-expanded` már Headless UI-tól jönnek — ellenőrzés
- `data-[open]` állapotra accent border + soft focus-ring (nem csak háttér)
- `:active` `translate-y-[1px]`

**Content (panel)**
- `rounded-[var(--radius-overlay)]`, panel padding `p-1.5`
- `backdrop-blur-xl` marad, de a `--surface-floating` átlátszóságát 96 → 92%-ra csökkentjük az üveg-hatáshoz (spec)
- `motion-reduce` már kezelt ✓

**Item**
- `min-h-[var(--option-height)]`, `px-2.5`
- Új `selected?: boolean` prop → `data-selected="true"` + accent-soft háttér + jobb szélen `Check` ikon (pipát külön `Dropdown.Check` slot vagy automatikus render, ha `selected`)
- `data-focus` (billentyűzet) és `hover` ugyanazt a `--surface-hover` háttért kapja (spec: azonos vizuális állapot)

**Új alkomponensek**
- `Dropdown.Search`: kontrollált input (value/onChange), bal oldalt search ikon slot, jobbra opcionális `⌘K` kbd. Nem `MenuItem` — sima `<div>` a panel tetején. A billentyűszűréshez a fogyasztó felel (a demó szintjén).
- `Dropdown.Empty`: "Nincs találat" placeholder, muted szöveg + ikon slot.

**Chevron**
- Új `Dropdown.Chevron` opcionális helper: `data-[open]:rotate-180`, `transition-transform 160ms` — a demóban ma inline írjuk, kiemeljük komponensbe.

## 3) Reszponzív mobil (`< 520px`)

A Headless UI `anchor` prop nem alkalmas alsó-sheet átalakításra. Két opció:
- **A (könnyű):** CSS-oldalon `@media (max-width: 520px)` a `.obsidian-dropdown-content` osztályra: `position: fixed`, `inset: auto 12px 12px 12px`, `max-height: 70vh`, `border-radius: 18px`. Az `anchor` inline stílusait `!important` felülírja. Egyszerű, pragmatikus.
- **B (tisztább):** viewport-hook + feltételes `anchor={undefined}` mobilon, portál `body`-ra + saját fixed pozicionálás.

Javaslat: **A**, mivel csak vizuális átrendezés, nem funkcionális.

## 4) `src/routes/index.tsx` demó

Egy új demókártya, ami bemutatja:
- keresőmezős dropdown ~12 opcióval,
- kiválasztott állapot pipával,
- disabled + danger option,
- "Nincs találat" empty state (élő szűréssel).

A meglévő showcase-kártyákat nem bántjuk.

## 5) Amit nem csinálunk

- Nem cseréljük le a Headless UI-t Floating UI-ra.
- Nem vezetünk be light-theme dropdown tokeneket ebben a körben (a demó dark-only), csak ha kéred.
- Nem írjuk át a globális `styles.css` shadcn-tokeneket.

## Technikai összefoglaló (mérnöki réteg)

- **Fájlok:** `src/styles.css` (tokenek + mobil media query), `src/components/obsidian-dropdown.tsx` (Trigger/Content/Item átméretezés, `Search`/`Empty`/`Chevron`/`Check` új exportok, `Item` `selected` prop), `src/routes/index.tsx` (új demókártya).
- **Nincs új dependency.** A `lucide-react` és `@headlessui/react` már fent van.
- **ARIA:** a Headless UI `Menu` roles-t ad; a `Search` input `role="searchbox"`, `aria-label="Search options"`.
- **Kockázat:** a `--surface-floating` átlátszóság csökkentése rontja a kontrasztot fényes háttéren — teszteljük a preview-ban screenshottal.

## Nyitott kérdés

Az akcentus jelenleg **arany** (`rgb(220 180 92)`). A spec **lila/indigó** (`#8e7cff`) sablonja szerint készült. Meghagyjuk az aranyat, vagy váltunk lilára? (Ezt a kiválasztott állapot, focus-ring és chevron-open szín is örökli.)
