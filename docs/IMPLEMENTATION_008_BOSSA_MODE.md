# IMPLEMENTATION 008 — BOSSA MODE

## Feature Summary

Bossa Mode is an optional audio atmosphere layer for the 96-RANCH-RESTAURANT-LP landing page.

When activated it plays a local looping bossa nova / soft jazz MP3, adds a warm amber ambient glow to the page, and animates the palm tree icon in the nav button. When deactivated, audio stops and all visual state resets.

This is a patch-only implementation. No existing sections, animations, or JS logic were modified.

---

## Audio Architecture

- Single `<audio>` element with `id="bossaAudio"`, `loop`, `preload="none"`
- Source: `assets/audio/bossa-mode.mp3` (local, relative path)
- Played via `audio.play()` inside `toggleBossa()` — only on user interaction
- Paused and rewound to `currentTime = 0` on deactivation

---

## Local File Path

```text
assets/audio/bossa-mode.mp3
```

To swap the music later: replace this file with a new MP3 of the same filename. No code changes required.

---

## localStorage Flow

| Action              | localStorage key        | Value |
|---------------------|-------------------------|-------|
| User activates      | `ranch_bossa_mode`      | `'1'` |
| User deactivates    | key removed             | —     |
| On page load        | key read in `init()`    | visual state only restored |

Visual state (body class, button active state) is restored on reload.

**Audio is never autoplayed on reload.** User must click 🌴 Bossa again for music to play.

---

## Browser Autoplay Note

All modern browsers block audio autoplay without prior user interaction. `audio.play()` is called inside a user-triggered click handler so it is permitted. The `.catch()` handler silently swallows any remaining block (e.g. low-power mode on iOS) without breaking the UI state.

---

## Visual State

| State    | Effect                                                         |
|----------|----------------------------------------------------------------|
| Active   | `body.bossa-mode` class added                                  |
| Active   | `bossa-btn.active` — amber border, glow, icon sway animation   |
| Active   | `body::before` radial warm amber gradient overlay (fixed)      |
| Active   | Nav bottom border warm tint                                     |
| Inactive | All above removed, audio paused and reset                       |

---

## Future Music Swap Rule

Replace `assets/audio/bossa-mode.mp3` with any compatible MP3.
- File must be named `bossa-mode.mp3`
- Placed in `assets/audio/`
- No HTML, CSS, or JS changes needed

---

## Files Changed

- `index.html` — audio element, Bossa button (desktop nav + mobile nav drawer)
- `style.css` — `.bossa-btn`, `body.bossa-mode`, warm ambient overlay, sway animation
- `script.js` — `toggleBossa()`, `setBossaActive()`, `restoreBossaState()`
- `docs/IMPLEMENTATION_008_BOSSA_MODE.md` — this file
