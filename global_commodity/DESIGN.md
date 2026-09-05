---
name: Global Commodity
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#ffe2ab'
  on-secondary: '#402d00'
  secondary-container: '#ffbf00'
  on-secondary-container: '#6d5000'
  tertiary: '#d0cdce'
  on-tertiary: '#303031'
  tertiary-container: '#b4b2b3'
  on-tertiary-container: '#454546'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#ffdfa0'
  secondary-fixed-dim: '#fbbc00'
  on-secondary-fixed: '#261a00'
  on-secondary-fixed-variant: '#5c4300'
  tertiary-fixed: '#e5e2e3'
  tertiary-fixed-dim: '#c8c6c7'
  on-tertiary-fixed: '#1b1b1c'
  on-tertiary-fixed-variant: '#474647'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-lg:
    fontFamily: Noto Serif
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Noto Serif
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin: 48px
  container-max: 1280px
---

## Brand & Style

This design system is built for the high-stakes world of raw material brokerage, where trust and tangibility are paramount. The personality is authoritative yet welcoming, utilizing a **Tactile Modernist** style. This approach combines the cleanliness of modern corporate interfaces with physical metaphors—subtle 3D depth, weight, and "materiality"—to reflect the physical commodities (metals, minerals, energy) that the business handles.

The emotional goal is to evoke a sense of "Old World" reliability through "New World" technology. The dark environment provides a premium, low-glare backdrop that suggests exclusivity and focus, while the warm gold accents signify value and prosperity.

Animations should be purposeful and "heavy," featuring eased transitions that suggest the inertia of physical objects rather than flighty, lightweight web elements.

## Colors

The palette is anchored in a "Deep Charcoal" ecosystem to provide a sophisticated, high-contrast foundation. 

*   **Primary (Warm Gold):** Used for key actions and brand markers. It represents excellence and the "gold standard" of service.
*   **Secondary (Rich Amber):** Employed for interactive states, highlights, and data visualization, adding warmth to the dark canvas.
*   **Neutrals:** A range of charcoals and near-blacks are used to define depth and hierarchy without resorting to pure black, which can feel flat.

The color application follows a 60-30-10 rule: 60% deep charcoals (backgrounds), 30% ambers/muted golds (accents and borders), and 10% high-vibrancy gold (CTAs).

## Typography

The typography strategy relies on the contrast between tradition and efficiency.

**Noto Serif** is selected for headlines to convey the heritage and seriousness of a global brokerage. It should be used with tighter letter-spacing in larger formats to create a "locked-in," editorial feel.

**Manrope** serves as the functional workhorse. Its geometric but slightly condensed nature makes it highly readable for the complex data tables and logistics information typical of raw material brokerage. Labels and small metadata should use Manrope in all-caps with generous letter-spacing to maintain a clean, organized hierarchy.

## Layout & Spacing

This design system utilizes a **Fixed Grid** model for desktop to maintain a sense of structured, architectural stability. The layout is based on a 12-column grid with a substantial 48px outer margin to give the content "room to breathe," enhancing the premium feel.

The spacing rhythm follows an 8px base unit. Component internal padding should be generous (typically 16px or 24px) to ensure the 3D depth effects and shadows do not feel cramped. Layouts should prioritize vertical storytelling, using large gutters to separate distinct service offerings or material categories.

## Elevation & Depth

To achieve the "3D-inspired" look, this design system moves away from flat design in favor of **Soft Skeuomorphism**. Depth is communicated through:

1.  **Beveled Edges:** Subtle 1px inner highlights on the top edge of cards and buttons to simulate a light source from above.
2.  **Dual-Shadows:** Each elevated element uses a sharp, dark shadow for "weight" and a softer, amber-tinted ambient glow to suggest the reflection of the gold accents.
3.  **Tonal Stacking:** Surfaces that are "higher" in elevation are rendered in slightly lighter charcoals (e.g., a card at #252526 sitting on a background of #121212).
4.  **Interactive Depth:** On hover, buttons should appear to "sink" slightly (reducing shadow spread and scale) to mimic a physical click.

## Shapes

The shape language is disciplined and professional. We use **Soft (0.25rem)** roundedness for standard UI elements like input fields and small buttons. This creates a modern look without losing the "hard" edge of the industrial sector.

Larger containers and cards may use `rounded-lg` (0.5rem) to soften the overall interface, but sharp 90-degree intersections should be maintained for structural grid lines to emphasize the "global" and "logistical" nature of the brand.

## Components

### 3D Buttons
Primary buttons feature a subtle vertical gradient (from a rich amber to a deep gold) with a 1px top border of #FFE082 to simulate a light-catching edge. The text is high-contrast charcoal for maximum legibility.

### Material Cards
Cards used for raw material listings should feature a subtle "brushed metal" texture overlay at 2% opacity. They use the elevation system to appear slightly raised from the background, with the "Gold Standard" amber glow appearing only on hover.

### Inputs & Selects
Form fields are recessed (inset shadows) to create a "carved" look in the UI. This reinforces the idea of data entry as a concrete, permanent action.

### Global Progress Trackers
A custom component for the brokerage: A "Shipment Timeline" that uses metallic-styled nodes and a glowing amber line to represent the flow of goods across the globe.

### Interactive Charts
Data visualizations should utilize the Rich Amber palette against the Deep Charcoal background, using blurred "glow" lines instead of flat strokes to maintain the premium, high-tech aesthetic.