# CLAUDE.md — desha.at

## Projektübersicht

Website für eine österreichische Therapeutin/Coach in Wien/Langenzersdorf.
Domain: **desha.at** · Sprache: **Deutsch** · Hosting: **Vercel via GitHub**

**Angebote:** ECHO® Methode (lizenzierte Transformationsmethode), Yoga & Faszien, Klangreisen, Gruppenarbeit

---

## Tech Stack

- **HTML / CSS / JavaScript** — kein Framework, kein Build-Tool
- **Vercel** — Deployment via GitHub Push auf `main`
- **Cal.com** — Buchungs-Widget (Embed)
- **Formspree** — Kontaktformular
- **Plausible.io** — Analytics (kein Cookie-Banner nötig)
- **MailerLite** — Newsletter (empfohlen, gratis bis 1.000 Kontakte)

---

## Dateistruktur

```
desha.at/
├── index.html                        ← Home (Single-Scroll, 8 Sektionen)
├── ueber-mich.html
├── echo-methode.html
├── angebote/
│   ├── index.html                    ← Hub-Seite
│   ├── echo-session.html
│   ├── gruppenarbeit.html
│   ├── yoga-faszien.html
│   ├── klangreisen.html
│   └── online-retreat.html
├── blog/
│   └── index.html
├── kontakt.html
├── impressum.html
├── css/
│   ├── main.css                      ← Globale Styles, Variablen, Reset
│   ├── components.css                ← Wiederverwendbare Komponenten
│   └── responsive.css                ← Mobile-first Breakpoints
├── js/
│   └── main.js
└── assets/
    ├── images/
    └── fonts/
```

---

## Design-System

### Farben (CSS Custom Properties)
```css
--color-primary:    #C4775A;  /* Warmes Terrakotta */
--color-secondary:  #8A9E7F;  /* Salbeigrün */
--color-bg:         #FAF8F4;  /* Cremeweiß */
--color-text:       #2C2218;  /* Dunkelbraun */
--color-accent:     #C4985A;  /* Goldton */
--color-bg-light:   #F0EDE8;  /* Hell-Grau für Abschnitte */
```

### Typografie
- **Headlines:** Cormorant Garamond oder Playfair Display (Serif)
- **Fließtext:** Jost oder DM Sans (Sans-serif)
- H1: 52–60px Desktop / 36px Mobile
- Body: 17–18px, line-height 1.75

### Layout-Prinzipien
- **Mobile-first** — alle Styles zuerst für Mobile schreiben
- Viel Weißraum — Sektionen großzügig atmen lassen
- Ein Gedanke / eine Botschaft pro Abschnitt
- Bilder: naturnah, warm (keine Stockfoto-Ästhetik)

---

## Seitenstruktur (Navigation)

```
/ → Home
/ueber-mich
/echo-methode
/angebote → Hub
  /angebote/echo-session
  /angebote/gruppenarbeit
  /angebote/yoga-faszien
  /angebote/klangreisen
  /angebote/online-retreat
/blog
/kontakt
/impressum
```

Footer-Links: Stimmen · FAQ · Impressum · Datenschutz

---

## Seitenaufbau: Home (index.html)

8 Sektionen in dieser Reihenfolge:
1. **Hero** — Headline + Subline + CTA „Jetzt anfragen"
2. **Wer bin ich** — Kurzvorstellung + Link „Mehr über mich"
3. **ECHO® Methode Teaser** — 3 Kernaussagen + Link
4. **Angebote** — 4 Karten (ECHO Session / Gruppenarbeit / Yoga / Klangreisen)
5. **Stimmen / Testimonials** — 3 Zitat-Platzhalter
6. **Blog-Teaser** — 3 neueste Artikel (dynamisch oder statisch)
7. **Newsletter** — Formular (Vorname + E-Mail)
8. **Kontakt CTA** — „Bereit für den nächsten Schritt?" + Button

---

## Integrationen

### Cal.com Embed
```html
<div id="cal-embed"></div>
<script>
  (function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document;
    C.Cal = C.Cal || function () {
      let cal = C.Cal; let ar = arguments;
      if (!cal.loaded) {
        cal.ns = {}; cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () { p(api, arguments); };
        const namespace = ar[1];
        api.q = api.q || [];
        typeof namespace === "string" ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar);
        return;
      }
      p(cal, ar);
    };
  })(window, "https://app.cal.com/embed/embed.js", "init");
  Cal("init", { origin: "https://cal.com" });
  Cal("inline", {
    elementOrSelector: "#cal-embed",
    calLink: "DEIN-USERNAME/echo-session",  // ← Platzhalter ersetzen
  });
</script>
```

### Formspree Kontaktformular
- Action-URL: `https://formspree.io/f/DEIN-FORMSPREE-ID` ← Platzhalter ersetzen
- Felder: Vorname, E-Mail, Anliegen (Dropdown), Nachricht, DSGVO-Checkbox

---

## SEO Meta-Templates

```html
<!-- Home -->
<title>desha.at — ECHO® Methode · Yoga · Klangreisen · Wien</title>
<meta name="description" content="Ich begleite Frauen dabei, alte Muster aus der Ahnengeschichte und dem Körper zu lösen. ECHO® Methode, Yoga & Faszien, Klangreisen — in Wien/Langenzersdorf und online.">

<!-- ECHO® Methode -->
<title>ECHO® Methode — Ahnenarbeit & epigenetische Transformation | desha.at</title>
<meta name="description" content="Die ECHO® Methode verbindet Epigenetik mit alter Weisheit. Präzise, sanft, tief. Einzelsessions und Gruppen in Wien/Langenzersdorf und online.">
```

---

## DSGVO / Datenschutz

- Plausible.io Analytics → **kein Cookie-Banner nötig**
- Kein Google Analytics verwenden
- Kontaktformular: DSGVO-Checkbox ist Pflicht

---

## Offene Platzhalter (beim Befüllen ersetzen)

| Platzhalter | Bedeutung |
|---|---|
| `Monika Tatrai` | Vollständiger Name der Betreiberin |
| `[E-Mail-Adresse]` | Kontakt-E-Mail |
| `[XX €]` | Preis ECHO® Session |
| `[Ausbildung, Jahr]` | Yoga-Ausbildung |
| `[Straße, PLZ, ...]` | Adresse für Impressum |
| `DEIN-USERNAME` | Cal.com Benutzername |
| `DEIN-FORMSPREE-ID` | Formspree Formular-ID |
| `[Instrumente]` | Klangschalen, Monochord etc. |
| `[Tag, Uhrzeit, Ort]` | Yoga-Kurszeiten |

---

## Wichtige Hinweise

- **ECHO®** ist eine eingetragene Marke von Wedderhall LLC / Kaja Andrea Otto — immer mit ® schreiben
- Texte im Projektdokument sind Vorschläge — an die persönliche Stimme der Betreiberin anpassen
- Zielgruppe: Frauen (Sprache entsprechend weiblich halten)
- Standort: **Wien / Langenzersdorf, Österreich** — österreichisches Impressum (§ 5 ECG)
- Alle Seiten auf **Deutsch**
