# CONTINUE PROJECT

Project:
96-RANCH-RESTAURANT-LP

Implementation:
008 – Bossa Mode Audio Identity Layer

---

## Context

96-RANCH-RESTAURANT-LP is a live GitHub Pages restaurant landing page.

Current goal:

Add an optional audio atmosphere layer called:

# 🌴 BOSSA MODE

This should create a warm restaurant ambiance without changing the existing brand, layout, or food-storytelling flow.

---

## Objective

Implement Bossa Mode as a small optional music layer.

When activated, the site should feel like:

* Warm family restaurant
* Coffee shop lounge
* Sunset dining atmosphere
* Gentle bossa nova / soft jazz experience
* Premium but friendly local restaurant LP

This is not a redesign.

Patch only.

---

## Audio File

Expected file:

```text
assets/audio/bossa-mode.mp3
```

Rules:

* Use local audio only
* No YouTube embed
* No Spotify embed
* No external API
* No autoplay on page load
* Audio starts only after user interaction
* Audio can be swapped later by replacing the MP3 with the same filename

---

## Required Feature

Add a small Bossa Mode control.

Suggested labels:

```text
🌴 Bossa
```

or

```text
🎷 Bossa Mode
```

Placement:

* Header area, if it fits cleanly
* Or floating lower corner control
* Or near existing CTA controls

Keep it subtle.

---

## Behavior

When user activates Bossa Mode:

* Play `assets/audio/bossa-mode.mp3`
* Add `body.bossa-mode`
* Change button state to active
* Show subtle visual confirmation

When user disables Bossa Mode:

* Pause audio
* Reset audio to beginning
* Remove `body.bossa-mode`
* Return button to default state

---

## Visual Direction

When active:

* Slight warm glow
* Soft amber highlight
* Elegant restaurant lounge feeling
* No flashing
* No aggressive animation
* No cyberpunk effects
* No meme styling

This should feel calm and premium.

---

## Persistence

Use localStorage:

```text
ranch_bossa_mode
```

Restore visual state after reload.

Important:

Do not autoplay after reload.

Browser autoplay rules must be respected.

User must click again before music plays.

---

## Architecture Rules

Respect existing architecture.

Do NOT rewrite:

* Hero section
* Menu sections
* CTA buttons
* Gallery
* Story sections
* Existing animations
* Existing JS logic
* Existing responsive layout

Patch only:

* Add audio element
* Add Bossa button
* Add CSS state
* Add JS toggle logic

---

## Documentation

Create or update:

```text
docs/IMPLEMENTATION_008_BOSSA_MODE.md
```

Include:

* Feature Summary
* Audio Architecture
* Local File Path
* localStorage Flow
* Browser Autoplay Note
* Future Music Swap Rule

---

## Success Criteria

User can:

1. Open 96 Ranch LP
2. Click 🌴 Bossa Mode
3. Hear `assets/audio/bossa-mode.mp3`
4. See subtle warm active state
5. Turn music off
6. Refresh without forced autoplay
7. Replace MP3 later without code changes

---

## Output Required

Return only changed files:

* index.html
* style.css
* script.js
* docs/IMPLEMENTATION_008_BOSSA_MODE.md

No explanations.
No placeholders.
No pseudocode.

Status:

READY FOR IMPLEMENTATION_008

🌴 BOSSA MODE
