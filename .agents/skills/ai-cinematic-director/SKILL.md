---
name: ai-cinematic-director
description: Master AI Cinematographer and Creative Director for generative AI images and videos. Provides specialized expertise on cameras, lenses, shot types, lighting setups, camera movements, storyboarding, character consistency, color grading, sound design (SFX/Foley), transitions, and VFX.
---

# AI Cinematic Director & Visual Prompt Engineer

Use this skill whenever you need to conceptualize, direct, and write production-grade prompts and production blueprints for:
1. **Generative AI Images** (Midjourney, Flux, Stable Diffusion, DALL-E, Ideogram).
2. **Generative AI Videos** (Runway Gen-3 Alpha, Kling AI, Luma Dream Machine, OpenAI Sora, Pika).
3. **Cinematic Storyboards & Shot Lists** (Ad campaigns, commercial reels, short films, social videos).

---

## 1. Core Cinematographic Architecture

When directing an AI image or video, structure your prompts and visual directives with the **7 Cinematographic Pillars**:

```
[1. Subject & Pose] + [2. Location & Set Design] + [3. Camera & Lens Optics] + [4. Lighting Setup & Atmosphere] + [5. Color Grade & Film Stock] + [6. Camera Motion (for Video)] + [7. Audio & SFX Cues]
```

### Detailed Pillar Breakdown:
1. **Subject & Pose:**
   - Define anatomy, body language, facial micro-expressions, eyeline (looking off-camera, intense eye contact with viewer, relaxed candid glance).
   - Character consistency lock: age, heritage, facial structure, grooming, wardrobe materials and textures.
2. **Location & Set Design:**
   - Architectural style (e.g., modern Cairo high-rise, rustic Khan el-Khalili stone alleyway, minimalist concrete brutalism).
   - Foreground, midground, background depth layers. Surface textures (wet pavement, brushed metal, weathered limestone).
3. **Camera & Lens Optics:**
   - Camera body (e.g., ARRI Alexa 35, Hasselblad H6D-100c, RED V-Raptor, 35mm film).
   - Lens & Focal length (e.g., Cooke Anamorphic 50mm T2.3, 85mm f/1.4 prime, 24mm ultra-wide probe lens).
   - Aperture & Depth of field (e.g., razor shallow f/1.4 creamy bokeh vs deep focus f/11).
   - See [cameras-and-lenses.md](references/cameras-and-lenses.md).
4. **Lighting Setup & Atmosphere:**
   - Direction & Technique: Rembrandt lighting, Three-point commercial lighting, Chiaroscuro high-contrast, Butterfly beauty light.
   - Quality & Source: Soft diffuse octabox, harsh direct desert sunlight, practical tungsten desk lamps, neon sign glow.
   - Atmosphere: Volumetric sunbeams (Tyndall effect), atmospheric haze, dust motes, rain reflections.
   - See [lighting-and-setups.md](references/lighting-and-setups.md).
5. **Color Grading & Visual Tone:**
   - LUT / Film stock: Kodak Vision3 500T, CineStill 800T, Teal & Orange blockbuster, Bleach Bypass, Kodachrome vintage.
   - Color temperature (Kelvin), shadow tint, highlight roll-off.
6. **Camera Movement (AI Video Only):**
   - Precise dynamic motion: Slow dolly push-in, lateral tracking shot, 180° orbit arc, crane ascending shot, dynamic FPV drone dive, whip pan.
   - See [camera-movement-and-video-prompts.md](references/camera-movement-and-video-prompts.md).
7. **Sound Design, Foley & Music (AI Video & Ads):**
   - Layered audio: Environmental room tone, tactile diegetic foley, dramatic cinematic hits/whooshes, voiceover pacing, musical genre.

---

## 2. Standard Output Workflow for Prompts

### For Single Image Generation:
Provide:
- **Concept & Mood:** One-sentence artistic intent.
- **Midjourney / Flux Prompt (English):** Fully formatted with technical camera, lighting, and aspect ratio tags (e.g., `--ar 16:9 --v 6.1` or `--ar 9:16`).
- **Prompt Anatomy Breakdown:** Clear callouts of Camera, Lens, Lighting, and Set details used.
- **Negative Prompt / Guardrails:** Things to exclude (e.g., `plastic skin, distorted hands, oversaturated, amateur photography`).

### For AI Video Generation & Commercials:
Provide:
- **Project Overview:** Objective, target audience, format (9:16 for Reels/Stories, 16:9 for Cinema/YouTube).
- **Multi-Shot Storyboard Matrix:** Using the table format from [storyboard-and-production-templates.md](references/storyboard-and-production-templates.md):
  - Shot #, Shot Type & Framing, Visual Scene Prompt, Camera Movement command, Lighting/Atmosphere, SFX & Audio Layers, Dialogue/VO (Bilingual: Arabic & English), Transition.
- **Runway Gen-3 / Kling AI Prompts:** Formatted with motion prompts in brackets.
- **Audio & Music Direction:** Exact track style, BPM, foley moments.

---

## 3. Bilingual English & Arabic Directives

When creating work for the Egyptian and Arab markets:
- Write visual generation prompts in **English** (since current diffusion and video foundation models have maximum latent-space comprehension in English).
- Write **Voiceovers (VO), Dialogue, On-Screen Captions (OCR/Text Overlays), and Creative Storyboards** in **authentic Egyptian Arabic (العامية المصرية)** accompanied by English translations.
- Incorporate authentic local cultural details: contemporary Egyptian architecture, Cairo lighting moods, genuine Egyptian character features, wardrobe (modern streetwear, smart casual, or traditional baladi), and local lifestyle cues.
