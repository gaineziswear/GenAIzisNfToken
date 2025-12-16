# Revised Design Theme: Data-Dense Professional (StockIntel Style)

The user has provided a clear visual target (attachments `home_page.png`, `other_features.png`) and a CSS file (`styles.css`) which, despite being generic, implies a preference for a clean, structured, and data-dense dark theme, moving away from the previous "futuristic" glow effects.

## Aesthetic Goal
The new theme must be **professional, data-dense, and dark-themed**, prioritizing readability and information hierarchy, similar to professional trading terminals.

## Color Palette Extraction and Definition
Based on the attached images, the primary colors are a deep, dark blue/black background with white/light gray text and vibrant green/red for price movements.

| Color Name | Hex Value (Approx.) | Tailwind CSS Variable | Usage |
| :--- | :--- | :--- | :--- |
| **Background** | `#0A1121` | `--background` | Main page background (Deep Navy Blue) |
| **Card/Panel** | `#111827` | `--card` | Component backgrounds (Slightly lighter dark blue) |
| **Foreground** | `#F9FAFB` | `--foreground` | Primary text color (Off-White) |
| **Primary Accent** | `#3B82F6` | `--primary` | Buttons, active states, borders (Vibrant Blue) |
| **Success/Gain** | `#10B981` | `--success` | Positive price movements (Vibrant Green) |
| **Danger/Loss** | `#EF4444` | `--danger` | Negative price movements (Vibrant Red) |
| **Border/Muted** | `#374151` | `--border` | Separators, muted text (Dark Gray/Blue) |

## Key Design Principles

1.  **Information Density:** Maximize the amount of relevant data visible without clutter. Use compact tables and grids.
2.  **Hierarchy via Color:** Use the vibrant blue (`--primary`) for interactive elements and the green/red (`--success`/`--danger`) for immediate visual feedback on performance.
3.  **Clean Typography:** Use a standard, highly readable sans-serif font (like Inter) with clear weight differences for titles and data.
4.  **Structured Layout:** Implement a clear two-column layout for the dashboard (main content and sidebar/signals), as suggested by the `home_page.png` and the `styles.css` grid.

## Functional Integration (GenAIzintel-Trading)

The `GenAIzintel-Trading` repository focuses on:
*   **Explainable AI (XAI):** Providing rationale for predictions.
*   **Backtesting:** Strategy testing engine.
*   **Portfolio Analysis:** Detailed performance tracking.
*   **Market Scanning:** Opportunity identification.

**Decision:** The existing PulseTrade application already covers Strategy AI, Autonomous Trade, and Market Pulse. The most valuable additions to integrate are the **Explainable AI (XAI)** concept into the strategy rationale and the **Portfolio Analysis** structure to enhance the dashboard's core metrics. The existing Genkit flows can be adapted to output more XAI-focused rationales.

The next phase will involve applying these color and layout changes to the Next.js application.
