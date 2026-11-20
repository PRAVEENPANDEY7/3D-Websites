export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'Premium Tea' | 'Daily Tea' | 'Special Blend';
  description: string;
  tagline: string;
  notes: string[];
  profiles: {
    strength: number; // 0 - 100
    aroma: number;
    body: number;
    warmth: number;
  };
  brewing: {
    temp: string;
    steepTime: string;
    milkRatio: string;
    kulhadPairing: string;
  };
  accentColor: string;
}

export interface SensoryNote {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface Pillar {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  visualTag: string;
}
