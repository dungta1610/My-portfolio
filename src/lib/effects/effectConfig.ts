export interface EffectConfig {
  particles: {
    desktopCount: number;
    mobileCount: number;
    connectDistance: number;
    baseSpeed: number;
  };
  hologram: {
    baseRotationSpeed: { x: number; y: number; z: number };
    hoverRotationMultiplier: number;
    pulseFrequency: number;
    beamStrength: number;
  };
  perspectiveGrid: {
    scrollSpeedMultiplier: number;
    gridSize: string;
  };
}

export const EFFECT_CONFIG: EffectConfig = {
  particles: {
    desktopCount: 40,
    mobileCount: 15,
    connectDistance: 130,
    baseSpeed: 0.08,
  },
  hologram: {
    baseRotationSpeed: { x: 0.003, y: 0.005, z: 0.001 },
    hoverRotationMultiplier: 2.2,
    pulseFrequency: 0.003,
    beamStrength: 1.2,
  },
  perspectiveGrid: {
    scrollSpeedMultiplier: 120,
    gridSize: "50px 50px",
  },
};
