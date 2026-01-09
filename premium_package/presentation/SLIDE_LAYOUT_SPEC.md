# Slide Layout Specification
## Tokyo Night Split-Screen Template

### Overview
This document defines the layout specifications for split-screen presentation slides using the Tokyo Night theme. Use this as a reference for creating consistent, visually balanced slides.

### Quick Start
For ready-to-use code templates, see: **`SLIDE_TEMPLATES.html`**

---

## Base Dimensions

| Property | Value | Notes |
|----------|-------|-------|
| Slide Width | 1920px | Reveal.js configured width |
| Slide Height | 1080px | Reveal.js configured height |
| Container Width | 960px | Half of slide (50/50 split) |
| Container Height | 1080px | Full height |

---

## Split-Screen Layout

### Structure
```html
<section>
    <div class="split-screen">
        <div class="split-image [hero]">
            <img src="images/slide_image.png" alt="Description">
        </div>
        <div class="split-content [centered]">
            <!-- Text content here -->
        </div>
    </div>
</section>
```

### CSS Classes
- `.split-screen` - Parent grid container (2 columns)
- `.split-image` - Left container for image
- `.split-image.hero` - Full opacity variant (for title slides)
- `.split-content` - Right container for text (left-aligned)
- `.split-content.centered` - Centered text variant (for title slides)

---

## Image Container Specifications

### Dimensions
| Property | Value |
|----------|-------|
| Container Size | 960px × 1080px |
| Padding | 60px (all sides) |
| Inner Space | 840px × 960px |

### Image Positioning
| Property | Value |
|----------|-------|
| Horizontal | Centered (`justify-content: center`) |
| Vertical | Centered (`align-items: center`) |
| Object Fit | `contain` (maintains aspect ratio) |
| Default Opacity | 0.7 (70%) |
| Hero Opacity | 1.0 (100%) |

### Recommended Image Aspect Ratios
| Ratio | Dimensions | Best For |
|-------|------------|----------|
| 1:1 (Square) | 840px × 840px | Title slides, hero images |
| 7:8 (Portrait) | 840px × 960px | Maximum fill |
| 16:9 (Landscape) | 840px × 472px | Content slides |

### Image Centering Math (1:1 Square)
```
Container inner height: 960px
Image height: 840px
Remaining space: 120px
Top gap: 60px
Bottom gap: 60px

Image center from container top: 60px (padding) + 60px (gap) + 420px (half image) = 540px
```

---

## Text Container Specifications

### Dimensions
| Property | Value |
|----------|-------|
| Container Size | 960px × 1080px |
| Base Padding | 60px (all sides) |

### Standard Layout (`.split-content`)
- Vertical: Centered (`justify-content: center`)
- Horizontal: Left-aligned (`align-items: flex-start`)
- Use for: Content slides with lists, forms, etc.

### Centered Layout (`.split-content.centered`)
| Property | Value |
|----------|-------|
| Padding Top | 267px |
| Horizontal | Centered (`align-items: center`) |
| Text Align | Center |
| Vertical | Start from top (`justify-content: flex-start`) |

**Purpose:** Positions the main title word (e.g., "Playbook") at the vertical center (540px) to align with image center.

---

## Typography Scale

### Headings
| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Logo Text | 2.2rem | 700 | `--text-primary` |
| Main Title (h1) | 3.5rem | 800 | `--text-heading` |
| Section Title (h2) | 2.5rem | 700 | `--text-heading` |
| Subsection (h3) | 2rem | 600 | `--text-heading` |

### Body
| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Subtitle | 1.3rem | 400 | `--text-secondary` |
| Body Text | 1.1rem | 400 | `--text-primary` |
| Badge | 1rem | 400 | `--accent-purple` |
| Hint Text | 0.9rem | 400 | `--text-muted` |

---

## Color Palette (Tokyo Night)

### Backgrounds
| Variable | Hex | Usage |
|----------|-----|-------|
| `--bg-primary` | #16161e | Main background |
| `--bg-surface` | #1f2335 | Cards, elevated surfaces |
| `--bg-highlight` | #292e42 | Hover states |

### Text
| Variable | Hex | Usage |
|----------|-----|-------|
| `--text-heading` | #ffffff | Headings |
| `--text-primary` | #e8eaf6 | Body text |
| `--text-secondary` | #c0caf5 | Subtitles |
| `--text-muted` | #787c99 | Hints, labels |

### Accents
| Variable | Hex | Usage |
|----------|-----|-------|
| `--accent-purple` | #c49bff | Primary/Brand, CTAs |
| `--accent-cyan` | #89ddff | Information, links |
| `--accent-green` | #a6e3a1 | Success, growth |
| `--accent-red` | #ff7a93 | Warning, constraints |
| `--accent-orange` | #ffb86c | Action items |

---

## Slide 1 Template (Title Slide)

### HTML Structure
```html
<section>
    <div class="split-screen">
        <div class="split-image hero">
            <img src="images/slide01_hero_title.png" alt="Hero Image">
        </div>
        <div class="split-content centered">
            <div class="logo-glow">
                <span class="logo-text">brand<span class="accent-purple">.name</span></span>
            </div>
            <h1 class="main-title">
                Title Line One<br>
                <span class="gradient-text">Key Word</span>
            </h1>
            <p class="subtitle">Subtitle or tagline goes here</p>
            <div class="badge-container">
                <span class="badge glow">Badge Text</span>
            </div>
            <div class="scroll-hint">
                <i data-lucide="arrow-right"></i> Press → to continue
            </div>
        </div>
    </div>
</section>
```

### Key Alignment
- **Image center:** 540px from container top
- **"Key Word" center:** ~540px from container top (aligned with image)
- **Horizontal:** Both containers centered

---

## Content Slide Template

### HTML Structure
```html
<section>
    <div class="split-screen">
        <div class="split-image">
            <img src="images/slide_image.png" alt="Description">
        </div>
        <div class="split-content">
            <h2>Section <span class="accent-cyan">Title</span></h2>
            <div class="constraints-list">
                <!-- List items -->
            </div>
            <div class="callout-box">
                <!-- Call to action or summary -->
            </div>
        </div>
    </div>
</section>
```

---

## Single Container Layout (CTA/About Slides)

Use this layout for slides that don't need a split-screen (CTA, toolkit, about pages).

### HTML Structure
```html
<section>
    <div class="cta-slide">
        <h2>Slide Title</h2>

        <p class="cta-intro">Introductory text</p>
        <h3 class="series-name gradient-text">Featured Content</h3>

        <div class="content-grid">
            <!-- Cards, buttons, or other content -->
        </div>

        <a href="#" class="cta-button glow-button">
            <i data-lucide="play"></i> Call to Action
        </a>
    </div>
</section>
```

### CSS Properties (`.cta-slide`)
| Property | Value |
|----------|-------|
| Display | `flex` |
| Direction | `column` |
| Align Items | `center` |
| Justify Content | `center` |
| Text Align | `center` |
| Width | `100%` |
| Height | `100%` |
| Padding | `60px` |

### Use Cases
- **Slide 10:** CTA - "Your Next Step"
- **Slide 11:** Toolkit - "Get the Full Toolkit"
- **Slide 12:** About - Brand/closing slide

### Key Features
- All content vertically and horizontally centered
- No image container
- Full-width layout
- Ideal for calls-to-action, summaries, and closing slides

---

## Image Generation Guidelines

### For Title Slides (1:1 Square)
```
Prompt structure:
- Style header (Tokyo Night theme)
- Central visual with glow effects
- Professional figure (if applicable)
- Abstract geometric background
- Accent colors: Purple (#c49bff), Cyan (#89ddff)
- Dark background (#1a1b26)
```

### CLI Command
```bash
python tools/nb_image/nb-image.py \
  --prompt-file prompts/slide_name.txt \
  --out-dir assets/art/batch_folder \
  --aspect 1:1 \
  --count 1
```

---

## Spacing Reference

| Variable | Value | Pixels (base 16px) |
|----------|-------|-------------------|
| `--space-xs` | 0.5rem | 8px |
| `--space-sm` | 1rem | 16px |
| `--space-md` | 1.5rem | 24px |
| `--space-lg` | 2rem | 32px |
| `--space-xl` | 3rem | 48px |

---

## Checklist for New Slides

### Split-Screen Slides (with image)
- [ ] Use `split-screen` layout
- [ ] Choose appropriate image aspect ratio (1:1 recommended)
- [ ] Set image opacity (hero: 100%, content: 70%)
- [ ] Use `centered` class for title slides
- [ ] Align key text element with image center
- [ ] Center headers with `style="justify-content: center; width: 100%;"`

### Single Container Slides (CTA/About)
- [ ] Use `cta-slide` class
- [ ] All content automatically centered
- [ ] No image needed

### All Slides
- [ ] Apply consistent typography scale
- [ ] Use accent colors for emphasis
- [ ] Add Lucide icons where appropriate
- [ ] Test at 100% zoom in Reveal.js

---

## Workflow for Creating New Presentations

### Step 1: Set Up Structure
1. Copy the base HTML structure from an existing presentation or `SLIDE_TEMPLATES.html`
2. Include required dependencies:
   - Reveal.js CSS and JS
   - Lucide Icons CDN
   - Tokyo Night CSS (`css/tokyo-night.css`)

### Step 2: Create Slides
1. Open `SLIDE_TEMPLATES.html` for code examples
2. Choose the appropriate layout:
   - **Two-Container (Split-Screen)** for content with visuals
   - **One-Container (Centered)** for CTA/about slides
3. Copy the template and customize content

### Step 3: Generate Images
1. Write prompts following the Tokyo Night style guide:
   ```
   Tokyo Night style illustration. Dark navy background (#1a1b26)
   with neon accent colors. Clean minimalist geometric design with
   subtle glow effects on key elements...

   [Your specific visual description]

   Accent colors: Purple (#c49bff), Cyan (#89ddff), Green (#a6e3a1)
   ```

2. Generate images using CLI:
   ```bash
   python tools/nb_image/nb-image.py \
     --prompt-file prompts/your_prompt.txt \
     --out-dir assets/art/your_batch \
     --aspect 1:1 \
     --count 1
   ```

3. Copy generated images to `presentation/images/`

### Step 4: Fine-Tune Layout
1. Center headers: `style="justify-content: center; width: 100%;"`
2. Center text: `style="text-align: center; width: 100%;"`
3. Adjust padding if content overflows
4. Test at 100% zoom

### Step 5: Initialize Lucide Icons
Add this script after Reveal.js initialization:
```javascript
lucide.createIcons();
Reveal.on('slidechanged', () => {
    lucide.createIcons();
});
```

---

## File Reference

| File | Purpose |
|------|---------|
| `index.html` | Main presentation file |
| `css/tokyo-night.css` | Theme styles |
| `js/interactions.js` | Interactive elements |
| `images/` | Slide images |
| `SLIDE_LAYOUT_SPEC.md` | This specification document |
| `SLIDE_TEMPLATES.html` | Ready-to-use code templates |
