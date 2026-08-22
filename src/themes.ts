/**
 * Theme Presets & Visual Styling Engine for Antigravity Cards
 * Encapsulates 10 built-in aesthetic themes with scoped CSS and custom variable definitions.
 */

import { css, CSSResult } from 'lit';
import { ThemePreset, AntigravityCardConfig } from './types';

export interface ThemeDefinition {
  name: ThemePreset;
  label: string;
  cssClass: string;
  generateStyles: (config: AntigravityCardConfig) => string;
}

export const THEME_PRESETS: Record<string, ThemeDefinition> = {
  default: {
    name: 'default' as any,
    label: 'Default (Card Colors)',
    cssClass: 'theme-default',
    generateStyles: () => '',
  },
  glassmorphism: {
    name: 'glassmorphism',
    label: 'Frosted Glassmorphism',
    cssClass: 'theme-glassmorphism',
    generateStyles: (config) => {
      const blur = config.glassmorphism_blur ?? 16;
      const opacity = config.glassmorphism_opacity ?? 0.25;
      return `
        --theme-backdrop-filter: blur(${blur}px);
        --theme-background: rgba(255, 255, 255, ${opacity});
        --theme-border: 1px solid rgba(255, 255, 255, 0.2);
        --theme-box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
      `;
    },
  },
  neumorphism: {
    name: 'neumorphism',
    label: 'Soft Neumorphism',
    cssClass: 'theme-neumorphism',
    generateStyles: (config) => {
      const depth = config.neumorphism_depth ?? 6;
      return `
        --theme-background: var(--card-background-color, #e0e5ec);
        --theme-box-shadow: ${depth}px ${depth}px ${depth * 2}px rgba(163, 177, 198, 0.6),
                            -${depth}px -${depth}px ${depth * 2}px rgba(255, 255, 255, 0.8);
        --theme-border: none;
      `;
    },
  },
  cyberpunk: {
    name: 'cyberpunk',
    label: 'Cyberpunk Neon',
    cssClass: 'theme-cyberpunk',
    generateStyles: (config) => {
      const glow = config.cyberpunk_glow ?? '#00f0ff';
      return `
        --theme-background: #0d0f18;
        --theme-border: 2px solid ${glow};
        --theme-box-shadow: 0 0 15px ${glow}44, inset 0 0 10px ${glow}22;
        --primary-text-color: #00f0ff;
        --secondary-text-color: #ff003c;
      `;
    },
  },
  aurora: {
    name: 'aurora',
    label: 'Nordic Aurora',
    cssClass: 'theme-aurora',
    generateStyles: () => `
      --theme-background: linear-gradient(135deg, rgba(32, 78, 95, 0.8), rgba(67, 154, 134, 0.7), rgba(164, 219, 178, 0.6));
      --theme-backdrop-filter: blur(20px);
      --theme-border: 1px solid rgba(255, 255, 255, 0.3);
      --primary-text-color: #ffffff;
      --secondary-text-color: rgba(255, 255, 255, 0.85);
    `,
  },
  oled: {
    name: 'oled',
    label: 'OLED Pitch Black',
    cssClass: 'theme-oled',
    generateStyles: () => `
      --theme-background: #000000;
      --theme-border: 1px solid #1f1f1f;
      --theme-box-shadow: none;
      --primary-text-color: #ffffff;
      --secondary-text-color: #888888;
    `,
  },
  sunset: {
    name: 'sunset',
    label: 'Sunset Gradient',
    cssClass: 'theme-sunset',
    generateStyles: () => `
      --theme-background: linear-gradient(135deg, #ff512f, #dd2476);
      --theme-border: none;
      --theme-box-shadow: 0 10px 20px rgba(221, 36, 118, 0.3);
      --primary-text-color: #ffffff;
      --secondary-text-color: rgba(255, 255, 255, 0.9);
    `,
  },
  flat: {
    name: 'flat',
    label: 'Minimal Flat',
    cssClass: 'theme-flat',
    generateStyles: () => `
      --theme-background: var(--card-background-color, #242424);
      --theme-border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.08));
      --theme-box-shadow: none;
    `,
  },
  material_you: {
    name: 'material_you',
    label: 'Material You Pill',
    cssClass: 'theme-material-you',
    generateStyles: () => `
      --theme-background: var(--primary-color-light, rgba(98, 0, 234, 0.12));
      --theme-border: none;
      --theme-box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      --ha-card-border-radius: 28px;
    `,
  },
  retro_synth: {
    name: 'retro_synth',
    label: '80s Synthwave',
    cssClass: 'theme-retro-synth',
    generateStyles: () => `
      --theme-background: linear-gradient(180deg, #2b1055, #7597de);
      --theme-border: 2px solid #ff007f;
      --theme-box-shadow: 0 0 20px rgba(255, 0, 127, 0.4);
      --primary-text-color: #ffe6ff;
      --secondary-text-color: #00ffff;
    `,
  },
  minimal: {
    name: 'minimal',
    label: 'Minimalist Clean',
    cssClass: 'theme-minimal',
    generateStyles: () => `
      --theme-background: transparent;
      --theme-border: none;
      --theme-box-shadow: none;
    `,
  },
  custom: {
    name: 'custom',
    label: 'Custom Styling',
    cssClass: 'theme-custom',
    generateStyles: () => ``,
  },
};

export function getThemeStaticStyles(): CSSResult {
  return css`
    .theme-glassmorphism {
      backdrop-filter: var(--theme-backdrop-filter, blur(16px));
      -webkit-backdrop-filter: var(--theme-backdrop-filter, blur(16px));
      background: var(--theme-background, rgba(255, 255, 255, 0.25));
      border: var(--theme-border, 1px solid rgba(255, 255, 255, 0.2));
      box-shadow: var(--theme-box-shadow, 0 8px 32px 0 rgba(0, 0, 0, 0.2));
    }
    .theme-neumorphism {
      background: var(--theme-background, #e0e5ec);
      box-shadow: var(--theme-box-shadow);
      border: none;
    }
    .theme-cyberpunk {
      background: var(--theme-background, #0d0f18);
      border: var(--theme-border, 2px solid #00f0ff);
      box-shadow: var(--theme-box-shadow);
    }
    .theme-aurora {
      background: var(--theme-background);
      backdrop-filter: var(--theme-backdrop-filter, blur(20px));
      -webkit-backdrop-filter: var(--theme-backdrop-filter, blur(20px));
      border: var(--theme-border);
    }
    .theme-oled {
      background: #000000;
      border: var(--theme-border, 1px solid #1f1f1f);
      box-shadow: none;
    }
    .theme-sunset {
      background: var(--theme-background);
      box-shadow: var(--theme-box-shadow);
      border: none;
    }
    .theme-flat {
      background: var(--theme-background, #242424);
      border: var(--theme-border);
      box-shadow: none;
    }
    .theme-material-you {
      background: var(--theme-background);
      border-radius: var(--ha-card-border-radius, 28px);
    }
    .theme-retro-synth {
      background: var(--theme-background);
      border: var(--theme-border);
      box-shadow: var(--theme-box-shadow);
    }
    .theme-minimal {
      background: transparent;
      border: none;
      box-shadow: none;
    }
  `;
}
