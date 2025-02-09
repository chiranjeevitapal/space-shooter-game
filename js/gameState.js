export let isGameOver = false;

export function setGameOver(value) {
    console.log('Setting isGameOver to:', value);
    isGameOver = value;
}

export const performanceData = {
    missedShots: 0,
    successfulHits: 0,
    collisions: 0,
    totalThreatScore: 0,
    threatsAnalyzed: 0,
    totalSurvivalTime: 0,
    totalShotsFired: 0,
    totalDistanceMoved: 0,
    get averageThreatScore() {
        return this.threatsAnalyzed ? this.totalThreatScore / this.threatsAnalyzed : 0;
    }
};

export let strategy = {
    dodgeAggressively: false,
    focusOnShooting: true,
    balance: false,
    riskFactor: 1.0,
    firingRateAdjustment: 0,
    movementSpeedAdjustment: 0
};