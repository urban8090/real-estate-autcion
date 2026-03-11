document.addEventListener('DOMContentLoaded', () => {
    const lottoContainer = document.getElementById('lotto-container');
    const generateBtn = document.getElementById('generate-btn');
    const clearBtn = document.getElementById('clear-btn');

    function getBallColor(number) {
        if (number <= 10) return '#f9ca24'; // Yellow
        if (number <= 20) return '#0984e3'; // Blue
        if (number <= 30) return '#d63031'; // Red
        if (number <= 40) return '#636e72'; // Gray
        return '#00b894';                  // Green
    }

    function generateLottoNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }

    async function displayNumbers(numbers) {
        lottoContainer.innerHTML = '';
        for (let i = 0; i < numbers.length; i++) {
            const number = numbers[i];
            const ball = document.createElement('div');
            ball.className = 'lotto-ball';
            ball.textContent = number;
            ball.style.backgroundColor = getBallColor(number);
            
            // Add staggered delay
            ball.style.animationDelay = `${i * 0.1}s`;
            
            lottoContainer.appendChild(ball);
            // Small pause for visual effect
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }

    generateBtn.addEventListener('click', async () => {
        generateBtn.disabled = true;
        const numbers = generateLottoNumbers();
        await displayNumbers(numbers);
        generateBtn.disabled = false;
    });

    clearBtn.addEventListener('click', () => {
        lottoContainer.innerHTML = '';
    });

    // Initial generation for a nice first impression
    const initialNumbers = generateLottoNumbers();
    displayNumbers(initialNumbers);
});
