export async function getLLMFeedback(performanceData) {
    const prompt = `
        Game Summary:
        - Missed Shots: ${performanceData.missedShots}
        - Successful Hits: ${performanceData.successfulHits}
        - Collisions: ${performanceData.collisions}

        Based on this performance, suggest one of the following strategies:
        - "Focus on shooting"
        - "Dodge more aggressively"
        - "Balance shooting and dodging"

        Provide ONLY the strategy, nothing else.
    `;

    try {
        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'llama2',
                prompt: prompt,
                stream: false
            })
        });

        const data = await response.json();
        if (data && data.response) {
            return cleanLLMResponse(data.response.trim());
        } else {
            return 'No feedback';
        }
    } catch (error) {
        console.error('Error getting feedback from LLaMA 2:', error);
        return 'No feedback';
    }
}

function cleanLLMResponse(response) {
    // Extract the core strategy from the response
    const match = response.match(/(Focus on shooting|Dodge more aggressively|Balance shooting and dodging)/i);
    return match ? match[1] : 'Balance shooting and dodging';  // Default to balance if unclear
}
