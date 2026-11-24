# Storyboard & Video Production Blueprint for AI Video

This reference provides production-ready templates for multi-shot video generation, character consistency management, color grading profiles, and VFX integration.

---

## 1. Character Consistency Strategy in AI Workflows

One of the greatest challenges in GenAI video is keeping a protagonist identical across multiple shots, angles, and scenes. Follow this 4-pillar system:

### Pillar 1: The Anchor Descriptor Lock
Create an explicit, immutable textual description of the character that is pasted identically into EVERY prompt:
> **Example Character Lock:** `[Karim: 29-year-old Egyptian tech entrepreneur, sharp defined jawline, light olive skin, short faded buzzcut black hair, neatly trimmed stubble beard, athletic build, wearing a matte black minimalist tailored crewneck sweater and gunmetal titanium watch]`

### Pillar 2: Distinctive Landmark Features
Give characters unique, easy-to-track visual anchors:
- Specific eyewear (e.g. `matte black round tortoiseshell glasses`)
- Distinctive hairstyle or silver streak
- Signature jacket or jewelry

### Pillar 3: Reference Image & Face Seed Pipeline
1. Generate a master front-facing portrait, a 45° 3/4 angle portrait, and a full-body action shot.
2. In tools like Midjourney, use `--cref [URL]` with `--cw 100` (or lower `--cw 20` to change clothing while locking the face).
3. In Stable Diffusion / Flux, utilize IP-Adapter or FaceID LoRAs.
4. In Kling / Runway Gen-3, use the image-to-video mode feeding the locked master image as Frame 1.

---

## 2. Professional Multi-Shot Storyboard Matrix

When directing a video, output scenes using this standardized production table:

| Shot # | Shot Type & Angle | Visual Content & Scene Description | Camera Movement | Lighting & Mood | SFX & Foley Audio | Dialogue / Voiceover (VO) | Transition |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **01** | ECU (Extreme Close-Up) | An Egyptian barista pouring steamed milk into rich dark espresso, creating intricate latte art. | Slow macro dolly push-in | Warm morning sunlight streaming sideways, warm golden hues | Deep milk frother hiss, crisp ceramic cup clink | VO: "كل فكرة عظيمة... بتبدأ بلحظة تركيز." ("Every great idea... begins with a moment of focus.") | Match cut on swirl motion |
| **02** | Medium Shot (MS) | Young female founder staring at her laptop screen, sudden smile breaking across her face. | Subtle tracking arc from 45° to profile | Soft diffused daylight from window, cool blue screen fill | Ambient cafe murmur, keystrokes, gentle acoustic guitar riser | VO: "ولما تلاقي الشغف، الطريق بيبدأ ينور قدامك." ("And when you find passion, the road lights up.") | Whip pan right |
| **03** | Low-Angle Wide (WS) | Modern Cairo co-working space, team gathering around a whiteboard celebrating, high energy. | Fast steadicam push-in | Vibrant tungsten ceiling pendants + large glass windows showing Cairo skyline | Energetic room laughter, marker squeak, punchy drum beat drop | VO: "من القاهرة لكل العالم... مشروعك يقدر يوصل." ("From Cairo to the world... your venture can reach.") | Fade to logo |

---

## 3. Color Grading & Look Profiles (LUTs)

Use these color grading styles to unify video sequences:

| Grading Style | Visual Color Signature | Aesthetic / Tone |
| :--- | :--- | :--- |
| **Teal & Orange (Blockbuster Look)** | Cool teal/cyan in shadows and midtones, warm saturated amber/orange in skin tones and highlights. | High energy, Hollywood blockbuster, modern premium commercial. |
| **Bleach Bypass (Silver Retention)** | High contrast, desaturated colors (~30-50%), crushed blacks, emphasized textures and skin pores. | Gritty realism, military, crime drama, documentary, raw energy. |
| **Kodachrome 64 Vintage** | Deep red and yellow saturation, rich cyan skies, high contrast, warm retro feel. | Nostalgic 70s/80s travelogue, classic Egyptian cinema golden era. |
| **CineStill 800T (Night Cinema)** | Prominent red halation around bright practical lights, cool tungsten-balanced cyan shadows. | Moody rainy streets, urban nightlife, neon cafes, intimate night scenes. |
| **Monochrome Film Noir** | Black and white, rich silver gradations, high contrast, deep blacks, subtle film grain. | Mystery, timeless elegance, luxury fashion, historical drama. |

---

## 4. Visual Effects (VFX) & Atmosphere Prompting

Inject realistic physical phenomena into video prompts to prevent "AI plastic" smoothness:
- **Atmospheric Particles:** `floating dust motes illuminated by sunbeam, micro-embers drifting upward from bonfire, fine sand mist caught in Egyptian desert wind`
- **Optical Artefacts:** `anamorphic lens flare, subtle chromatic aberration at frame edges, realistic optical barrel distortion, authentic 35mm film gate weave`
- **Fluid & Motion Dynamics:** `hyper-realistic water splash with micro-droplets frozen at 1000fps, kinetic fabric ripple in wind, smoke dispersion with natural fluid dynamics`
