# Camera Movement & AI Video Generation Reference

This guide details camera movement terminology, physics-accurate prompting, transitions, and sound effects cues for video generation engines like Runway Gen-3 Alpha, Kling AI, Luma Dream Machine, Sora, and Pika.

---

## 1. Shot Framing & Angles Cheatsheet

| Shot Term | Abbreviation | Framing Definition | Emotional Impact / Use Case |
| :--- | :--- | :--- | :--- |
| **Extreme Wide Shot** | EWS | Subject is tiny in an immense landscape. | Scale, loneliness, epic grandeur, world-building. |
| **Wide Shot / Master** | WS | Full body visible with generous head and foot room. | Geography, establishes action and spatial relationship. |
| **Cowboy Shot** | CS | Mid-thigh to head. Origin: westerns (holster visible). | Heroic, ready for action, assertive presence. |
| **Medium Shot** | MS | Waist up. | Standard conversational shot, natural and balanced. |
| **Medium Close-Up** | MCU | Chest / armpits to top of head. | Emotional engagement without claustrophobia. |
| **Close-Up** | CU | Full face filling frame (chin to forehead). | Intense emotion, intimacy, psychological tension. |
| **Extreme Close-Up** | ECU | Specific detail only: eyes, lips, finger on trigger. | Hyper-focus, extreme intimacy, tension, detail reveal. |
| **Low Angle / Worm's Eye** | Low Angle | Looking up at subject from below. | Power, dominance, authority, looming presence. |
| **High Angle / Bird's Eye** | High Angle | Looking down at subject from above. | Vulnerability, helplessness, bird's-eye overview. |
| **Dutch Angle / Canted** | Dutch | Horizon tilted diagonally (5° to 30°). | Unease, psychological imbalance, danger, chaos. |
| **Over-the-Shoulder** | OTS | Camera behind Person A looking past their shoulder at Person B. | Dialogue, interpersonal tension, connection. |
| **Point of View** | POV | Camera replaces the eyes of the character. | Immersion, terror, first-person empathy. |

---

## 2. Dynamic Camera Movements for AI Video Models

When prompting for AI video engines (Runway Gen-3, Kling, Luma), structure camera directions explicitly in square brackets or separate motion sentences.

### Primary Movement Vocabulary

1. **Dolly In / Push-In:**
   - *Prompt:* `[Camera: Slow deliberate push-in toward the protagonist's eyes, smooth optical tracking, zero shake]`
   - *Feel:* Rising realization, growing tension, intimacy.

2. **Dolly Out / Pull-Back:**
   - *Prompt:* `[Camera: Smooth dolly out revealing the massive surrounding Egyptian desert dunes and ancient ruins]`
   - *Feel:* Isolation, scale, unveiling hidden context.

3. **Tracking Shot / Follow Shot:**
   - *Prompt:* `[Camera: Steadicam tracking laterally alongside subject as they sprint through a bustling crowded Cairo street market, continuous fluid motion]`
   - *Feel:* Urgency, kinetic energy, immersion.

4. **Orbit / 360 Arc Shot:**
   - *Prompt:* `[Camera: 180-degree smooth circular orbit around the subject standing atop a cliff at sunset, cinematic parallax]`
   - *Feel:* Moment of transformation, triumph, frozen-in-time gravity.

5. **Crane / Jib Shot:**
   - *Prompt:* `[Camera: Crane boom shot ascending from street level up to the 10th floor balcony, tilting down]`
   - *Feel:* Elevating perspective, transitional scale.

6. **FPV Drone Shot:**
   - *Prompt:* `[Camera: Fast dynamic FPV drone dive down the side of a glass skyscraper, banking sharply through neon street canyons]`
   - *Feel:* Adrenaline, high velocity, modern tech feel.

7. **Crash Zoom (Snap Zoom):**
   - *Prompt:* `[Camera: Rapid crash zoom into character's shocked face, dynamic whip motion blur]`
   - *Feel:* Quentin Tarantino / 70s action, sudden surprise, comedy or shock.

8. **Whip Pan (Swish Pan):**
   - *Prompt:* `[Camera: Rapid horizontal whip pan from left to right, high-speed motion blur transitioning into next scene]`
   - *Feel:* High tempo transition, energetic scene change.

---

## 3. Cinematic Transitions for Multi-Shot Sequences

| Transition Name | Visual Mechanics | Ideal For |
| :--- | :--- | :--- |
| **Match Cut** | Cut between two different objects/actions with identical shape or motion (e.g., spinning coffee cup -> spinning car wheel). | Visual cleverness, thematic connection, high-retention ads. |
| **Whip Transition** | Rapid swish pan that blurs completely at mid-point, revealing the next scene as it comes to a stop. | Fast-paced Instagram Reels, TikToks, sports ads. |
| **Zoom-Through Transition** | Camera zooms into a dark iris, keyhole, or window until frame goes black or white, emerging into new scene. | Premium luxury transitions, storytelling jumps. |
| **Invisible Wipe / Object Wipe** | A person walking past or a pillar moving across the lens wipes the frame clean to reveal the next location. | Seamless storytelling, magic realism ads. |
| **Speed Ramp (Time Remap)** | Normal speed -> extreme slow motion (120fps/1000fps) at peak action -> snap back to high speed. | Product launches, beverage pour, fitness/fashion reels. |

---

## 4. Sound Effects (SFX) & Foley Direction

Sound design makes or breaks video impact. When writing video scripts, always specify the audio layers:

### Audio Layer Structure:
1. **Ambience / Room Tone:** Background world noise (e.g., distant Cairo street traffic, Cairo wind rustling palm trees, low hum of server room).
2. **Foley (Diegetic Action):** Realistic movement sounds (footsteps on cobblestone, leather jacket creak, ice cube clinking in glass).
3. **Sound Effects (Non-diegetic Accents):**
   - *Whoosh / Swish:* Fast airy swoosh on camera moves and wipes.
   - *Cinematic Hit / Sub-Boom:* Low-frequency 40Hz bass impact at dramatic hooks or title drops.
   - *Riser / Tension Builder:* Rising tonal screech or synth wave leading up to a climax or beat drop.
   - *Glitch / Tape Stop:* Abrupt audio interruption for shock or comedic timing.
4. **Music Score & Beats:**
   - *Egyptian Trap / Mahraganat modern hybrid:* 808 sub-bass, microtonal oriental synth lead, driving 130-140 BPM rhythm.
   - *Cinematic Orchestral:* Heavy cellos, Hans Zimmer-style brass horns, epic percussion.
   - *Lofi / Chillhop:* Vinyl crackle, muted electric piano, relaxed head-nodding groove.
   - *Corporate Uplifting Pop:* Staccato acoustic guitar, clean claps, cheerful glockenspiel.
