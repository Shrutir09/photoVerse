/**
 * Core Photosynthesis Logic
 * Calculates photosynthesis rate, oxygen, plant health, and environment balance
 */

export function calculatePhotosynthesis(sunlight, co2, temperature, environment = null) {
  // Prevent division by zero
  if (temperature === 0) temperature = 1;
  
  // Adjust sunlight based on ambient light sensor if available
  let effectiveSunlight = sunlight
  if (environment && environment.ambientLight !== null && environment.ambientLight !== undefined) {
    // Convert ambient light (lux) to sunlight percentage (0-100)
    // Typical indoor: 100-500 lux, outdoor: 10,000-100,000 lux
    const lightPercent = Math.min(100, Math.max(0, (environment.ambientLight / 1000) * 10))
    // Blend user control with ambient light (70% user control, 30% ambient)
    effectiveSunlight = (sunlight * 0.7) + (lightPercent * 0.3)
  }
  
  // Core formula: photosynthesisRate = (sunlight * co2) / temperature
  let rate = (effectiveSunlight * co2) / temperature;
  
  // Apply environment effects if available
  if (environment) {
    // High AQI → plant growth slows (reduce rate by up to 30%)
    if (environment.aqi !== null && environment.aqi !== undefined) {
      const aqiPenalty = Math.min(0.3, (environment.aqi / 500) * 0.3);
      rate *= (1 - aqiPenalty);
    }
    
    // Low oxygen → photosynthesis decreases (reduce rate by up to 20%)
    if (environment.oxygenLevel < 60) {
      const oxygenPenalty = (60 - environment.oxygenLevel) / 60 * 0.2;
      rate *= (1 - oxygenPenalty);
    }
    
    // High greenery → boosts oxygen and photosynthesis (increase rate by up to 15%)
    if (environment.greeneryIndex > 60) {
      const greeneryBoost = ((environment.greeneryIndex - 60) / 40) * 0.15;
      rate *= (1 + greeneryBoost);
    }
    
    // Rain → boosts growth (increase rate by up to 10%)
    if (environment.rainfall > 0) {
      const rainBoost = Math.min(0.1, environment.rainfall / 10 * 0.1);
      rate *= (1 + rainBoost);
    }
    
    // Low ambient light → weak plant (if sensor available)
    if (environment.ambientLight !== null && environment.ambientLight < 100) {
      const lightPenalty = (100 - environment.ambientLight) / 100 * 0.15;
      rate *= (1 - lightPenalty);
    }
  }
  
  // Clamp rate to 0-100
  const clampedRate = Math.max(0, Math.min(100, rate));
  
  return clampedRate;
}

export function calculateOxygen(photosynthesisRate, environment = null) {
  // Oxygen output is directly proportional to photosynthesis rate
  let oxygen = photosynthesisRate;
  
  // Apply environment effects if available
  if (environment) {
    // Base oxygen from environment (if available)
    if (environment.oxygenLevel) {
      // Blend environment oxygen with photosynthesis oxygen
      oxygen = (oxygen * 0.7) + (environment.oxygenLevel * 0.3);
    }
    
    // High greenery boosts oxygen
    if (environment.greeneryIndex > 60) {
      const greeneryBoost = ((environment.greeneryIndex - 60) / 40) * 10;
      oxygen += greeneryBoost;
    }
  }
  
  return Math.round(Math.max(0, Math.min(100, oxygen)));
}

export function getPlantHealth(photosynthesisRate) {
  if (photosynthesisRate < 30) {
    return {
      status: 'poor',
      emoji: '🌱',
      color: 'text-red-500',
      bgColor: 'bg-red-500/20',
    };
  } else if (photosynthesisRate >= 30 && photosynthesisRate <= 70) {
    return {
      status: 'average',
      emoji: '🌿',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/20',
    };
  } else {
    return {
      status: 'healthy',
      emoji: '🌳',
      color: 'text-green-500',
      bgColor: 'bg-green-500/20',
    };
  }
}

export function getEnvironmentBalance(photosynthesisRate) {
  if (photosynthesisRate < 30) {
    return {
      status: 'imbalanced',
      emoji: '❌',
      color: 'text-red-500',
      bgColor: 'bg-red-500/20',
    };
  } else if (photosynthesisRate >= 30 && photosynthesisRate <= 70) {
    return {
      status: 'moderate',
      emoji: '⚠️',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/20',
    };
  } else {
    return {
      status: 'balanced',
      emoji: '✅',
      color: 'text-green-500',
      bgColor: 'bg-green-500/20',
    };
  }
}

export function calculateAll(sunlight, co2, temperature, environment = null) {
  const photosynthesisRate = calculatePhotosynthesis(sunlight, co2, temperature, environment);
  const oxygen = calculateOxygen(photosynthesisRate, environment);
  const plantHealth = getPlantHealth(photosynthesisRate);
  const environmentBalance = getEnvironmentBalance(photosynthesisRate);
  
  return {
    photosynthesisRate: Math.round(photosynthesisRate * 100) / 100,
    oxygen,
    plantHealth,
    environmentBalance,
  };
}

