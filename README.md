# Eisenhower Matrix - Taakbeheer App

Een intuïtieve web-app voor taakbeheer gebaseerd op de Eisenhower-matrix, waarmee je taken kunt categoriseren, prioriteren en beheren via een heldere en responsieve interface.

![Eisenhower Matrix](https://img.shields.io/badge/Status-Ready-green)
![Responsive](https://img.shields.io/badge/Responsive-Yes-blue)
![No Dependencies](https://img.shields.io/badge/Dependencies-None-orange)

## 🎯 Wat is de Eisenhower-matrix?

De Eisenhower-matrix is een productiviteitstool die helpt bij het prioriteren van taken op basis van urgentie en belangrijkheid. Taken worden ingedeeld in vier kwadranten:

- **Q1: Urgent & Belangrijk** - Doe dit onmiddellijk
- **Q2: Niet Urgent & Belangrijk** - Plan dit in
- **Q3: Urgent & Niet Belangrijk** - Delegeer dit
- **Q4: Niet Urgent & Niet Belangrijk** - Elimineer dit

## ✨ Functies

### Matrix-weergave
- **2x2 Grid Layout**: Overzichtelijke weergave van alle vier kwadranten
- **Kleurcodering**:
  - Q1: Lichtrood
  - Q2: Lichtblauw
  - Q3: Lichtoranje
  - Q4: Lichtgrijs
- **Drag-and-Drop**: Sleep taken eenvoudig tussen kwadranten
- **Snelle Taak Toevoegen**: Klik op "+ Taak" in elk kwadrant

### Lijst-weergave
- **Automatische Prioritering**: Taken worden gesorteerd op prioriteit (Q1 → Q2 → Q3 → Q4)
- **Checkbox Functionaliteit**: Vink taken af als ze voltooid zijn
- **Visuele Feedback**: Voltooide taken worden doorgestreept en grijs weergegeven
- **Behoud Geschiedenis**: Voltooide taken blijven zichtbaar in de lijst

### Taakbeheer
- **Taak Toevoegen**: Voeg taken toe met:
  - Titel (verplicht)
  - Beschrijving (optioneel)
  - Geschatte tijdsduur (optioneel)
- **Taak Bewerken**: Klik op de taaktitel om details aan te passen
- **Persistente Opslag**: Alle taken worden lokaal opgeslagen in de browser

### Responsive Design
- **Desktop**: Volledig scherm met toggle-knop tussen weergaven
- **Mobiel**: Geoptimaliseerde layout met bottom navigation bar
- **Tablet**: Aanpasbare layout voor alle schermformaten

## 🚀 Aan de slag

### Installatie

1. Clone de repository:
```bash
git clone https://github.com/yourusername/Claude-Eisenhower.git
cd Claude-Eisenhower
```

2. Open `index.html` in je browser:
```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

**Dat is alles!** De app werkt direct zonder installatie van dependencies of build steps.

### 📱 Installeren als iPhone App (PWA)

De app kan geïnstalleerd worden als een volwaardige iPhone app via Safari:

#### Stap 1: Open de app in Safari
1. Host de app online (bijv. via GitHub Pages, Netlify, of Vercel)
2. Open de URL in **Safari** op je iPhone (niet Chrome!)

#### Stap 2: Voeg toe aan Home Screen
1. Tik op het **Deel-icoon** (vierkant met pijl omhoog) onderaan het scherm
2. Scroll naar beneden en tik op **"Zet op beginscherm"** of **"Add to Home Screen"**
3. Pas eventueel de naam aan (bijv. "Eisenhower")
4. Tik op **"Voeg toe"** rechtsboven

#### Stap 3: Gebruik als app
- Het app-icoon verschijnt nu op je home screen
- Open de app direct vanaf je home screen
- De app opent in volledig scherm (zonder Safari browser balk)
- Werkt ook offline na de eerste keer openen!

#### Snel Online Zetten (Gratis)

**Via GitHub Pages:**
```bash
# Push je code naar GitHub (al gedaan!)
# Ga naar Settings > Pages in je repository
# Selecteer de branch en Save
# Je app is beschikbaar op: https://username.github.io/Claude-Eisenhower
```

**Via Vercel (1-minuut setup):**
```bash
npm install -g vercel
vercel
# Volg de instructies - klaar!
```

**Via Netlify Drop:**
- Ga naar https://app.netlify.com/drop
- Sleep de hele map naar de browser
- Krijg direct een URL!

### Gebruik

#### Taak Toevoegen
1. Klik op de "+ Taak" knop in een kwadrant
2. Vul de titel in (verplicht)
3. Voeg optioneel een beschrijving en tijdsduur toe
4. Klik op "Opslaan"

#### Taak Verplaatsen
- **Desktop**: Sleep de taakkaart naar een ander kwadrant
- **Mobiel**: Bewerk de taak en wijzig het kwadrant (of gebruik desktop mode)

#### Taak Voltooien
1. Schakel naar de Lijst-weergave
2. Vink de checkbox aan naast de taak
3. De taak wordt doorgestreept en grijs weergegeven

#### Taak Bewerken
- Klik op de titel van een taak (in beide weergaven)
- Pas de details aan in de pop-up
- Klik op "Opslaan"

#### Tussen Weergaven Schakelen
- **Desktop**: Klik op de knop rechtsboven ("Toon Takenlijst" / "Toon Matrix")
- **Mobiel**: Gebruik de tab-balk onderin het scherm

## 🛠️ Technische Details

### Tech Stack
- **HTML5**: Semantische markup
- **CSS3**: Moderne styling met Flexbox en Grid
- **Vanilla JavaScript**: Geen frameworks of dependencies
- **LocalStorage API**: Clientzijdige data-opslag
- **Progressive Web App (PWA)**: Installeerbaar als native app
- **Service Worker**: Offline functionaliteit en caching

### PWA Functies
- ✅ Installeerbaar op iOS, Android en Desktop
- ✅ Werkt volledig offline na eerste laadmoment
- ✅ App-icoon op home screen
- ✅ Volledig scherm (geen browser UI)
- ✅ Snelle laadtijden door caching

### Browser Compatibiliteit
- Chrome 90+
- Firefox 88+
- Safari 14+ (iOS en macOS)
- Edge 90+

### Bestandsstructuur
```
Claude-Eisenhower/
├── index.html          # Hoofdpagina met PWA meta tags
├── styles.css          # Alle styling
├── app.js             # Applicatie logica + Service Worker registratie
├── service-worker.js   # Offline functionaliteit en caching
├── manifest.json       # PWA configuratie
├── icon.svg           # App icoon (vector)
└── README.md          # Documentatie
```

### Datastructuur
Taken worden opgeslagen in localStorage met de volgende structuur:
```javascript
{
  id: "unique-id",
  title: "Taak titel",
  description: "Optionele beschrijving",
  duration: "30 min",
  quadrant: "q1",
  completed: false,
  createdAt: 1234567890
}
```

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
  - 2x2 grid layout
  - Toggle-knop in header
  - Volledige drag-and-drop functionaliteit

- **Tablet**: 481px - 768px
  - 2x2 grid layout
  - Bottom navigation
  - Touch-friendly controls

- **Mobiel**: < 480px
  - Verticale layout (1 kolom)
  - Bottom navigation
  - Geoptimaliseerde kaartgrootte

## 🎨 Aanpassingen

### Kleuren Wijzigen
Open `styles.css` en pas de CSS variabelen aan:
```css
:root {
    --q1-color: #ffcccb;  /* Q1 kleur */
    --q2-color: #add8e6;  /* Q2 kleur */
    --q3-color: #ffd9a0;  /* Q3 kleur */
    --q4-color: #e0e0e0;  /* Q4 kleur */
    --primary-color: #4a90e2;  /* Primaire accentkleur */
}
```

### Kwadranten Hernoemen
Wijzig de titels in `index.html`:
```html
<h2>Q1: Jouw Titel</h2>
```

## 🔒 Privacy & Beveiliging

- **Lokale Opslag**: Alle data wordt lokaal opgeslagen in je browser
- **Geen Account Nodig**: Geen registratie of inloggen vereist
- **Geen Tracking**: Geen analytics of externe scripts
- **Offline Gebruik**: Werkt volledig offline na eerste laadmoment

## 🐛 Bekende Beperkingen

- Data wordt niet gesynchroniseerd tussen apparaten
- Geen backup functionaliteit (gebruik browser export)
- Drag-and-drop is beperkt op sommige mobiele browsers

## 📝 Toekomstige Verbeteringen

- [ ] Export/Import functionaliteit (JSON)
- [ ] Dark mode ondersteuning
- [ ] Taak deadlines en herinneringen
- [ ] Taak tags en filters
- [ ] Zoekfunctionaliteit
- [ ] Statistieken en productiviteitsgrafieken
- [ ] PWA ondersteuning voor offline gebruik

## 🤝 Bijdragen

Bijdragen zijn welkom! Voel je vrij om:
- Issues te openen voor bugs of feature requests
- Pull requests in te dienen
- De documentatie te verbeteren

## 📄 Licentie

Dit project is open source en beschikbaar onder de MIT License.

## 👤 Auteur

Ontwikkeld met Claude Code

---

**Happy Task Managing!** 🎯
