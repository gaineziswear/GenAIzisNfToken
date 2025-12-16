# PulseTrade Design Theme: Quantum Pulse

The new design theme aims for a **futuristic, professional, and novel** aesthetic, moving beyond the standard dark mode to a "Cyber-Financial" look.

## 1. Color Palette: "Electric Grid"

The palette uses a deep, dark base with vibrant, electric accents to convey high-tech precision and energy.

| Variable | Description | Hex Value | HSL Value (Approx.) | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Primary** | Electric Cyan/Blue, the main interactive color. | `#00E0FF` | `hsl(187, 100%, 50%)` | Buttons, active links, primary charts. |
| **Secondary** | Deep Violet/Indigo, used for subtle depth and contrast. | `#5C33FF` | `hsl(259, 100%, 50%)` | Secondary buttons, background gradients, subtle accents. |
| **Background** | Deep Space Black, providing a high-contrast, professional base. | `#0A0A0A` | `hsl(0, 0%, 4%)` | Main application background. |
| **Foreground** | Crisp White/Light Gray, ensuring readability. | `#F0F0F0` | `hsl(0, 0%, 94%)` | Text, icons. |
| **Card/Surface** | Slightly lighter dark gray, for component separation. | `#141414` | `hsl(0, 0%, 8%)` | Card backgrounds, sidebars. |
| **Accent** | Neon Green, used for positive indicators (gains, open market). | `#00FF80` | `hsl(150, 100%, 50%)` | Profit indicators, success messages. |
| **Destructive** | Electric Red, used for negative indicators (losses, closed market). | `#FF3366` | `hsl(345, 100%, 60%)` | Loss indicators, error messages. |

## 2. Typography: "Digital Precision"

We will use a combination of a clean, modern sans-serif for body text and a distinct, geometric font for headlines to achieve a futuristic feel.

| Font Family | Usage | Style |
| :--- | :--- | :--- |
| **Space Grotesk** | Headlines, Titles (`font-headline`) | Geometric, slightly condensed, futuristic. |
| **Inter** | Body Text, UI Elements (`font-body`) | Highly readable, professional, modern sans-serif. |
| **Fira Code** | Code Blocks, Data Displays (`font-code`) | Monospaced, for a data-driven, terminal-like feel. |

## 3. Novel Design Elements

*   **Subtle Grid Overlay:** A very faint, dark-on-dark grid pattern on the main background to evoke a "digital blueprint" or "trading matrix."
*   **Glow Effects:** Primary elements (buttons, active tabs, charts) will use a subtle box-shadow with the primary color (`#00E0FF`) to create a soft, electric glow.
*   **Border Radius:** Use a slightly smaller, more angular border radius for a sharper, more technical look.
*   **Data Visualization:** Charts will utilize the primary and accent colors with transparent fills to create a "holographic" data display effect.

This theme will be implemented by modifying the `tailwind.config.ts` and `src/app/globals.css` files.
