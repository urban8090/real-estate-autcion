document.addEventListener('DOMContentLoaded', () => {
    const displayArea = document.getElementById('lotto-display-area');
    const generateBtn = document.getElementById('generate-btn');
    const clearBtn = document.getElementById('clear-btn');
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const themeText = document.getElementById('theme-text');

    // Theme Logic
    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeText.textContent = 'Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeText.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'light');
        }    
    }

    toggleSwitch.addEventListener('change', switchTheme, false);

    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
            themeText.textContent = 'Light Mode';
        }
    }

    // Lotto Logic
    function getBallColor(number) {
        if (number <= 10) return '#f9ca24'; 
        if (number <= 20) return '#0984e3'; 
        if (number <= 30) return '#d63031'; 
        if (number <= 40) return '#636e72'; 
        return '#00b894';                  
    }

    function generateSingleSet() {
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }

    async function displayFiveSets() {
        displayArea.innerHTML = '';
        generateBtn.disabled = true;

        for (let rowIdx = 0; rowIdx < 5; rowIdx++) {
            const numbers = generateSingleSet();
            const rowDiv = document.createElement('div');
            rowDiv.className = 'lotto-row';
            displayArea.appendChild(rowDiv);

            for (let i = 0; i < numbers.length; i++) {
                const ball = document.createElement('div');
                ball.className = 'lotto-ball';
                ball.textContent = numbers[i];
                ball.style.backgroundColor = getBallColor(numbers[i]);
                ball.style.animationDelay = `${(rowIdx * 0.2) + (i * 0.05)}s`;
                rowDiv.appendChild(ball);
                await new Promise(r => setTimeout(r, 20));
            }
        }
        generateBtn.disabled = false;
    }

    generateBtn.addEventListener('click', displayFiveSets);
    clearBtn.addEventListener('click', () => displayArea.innerHTML = '');

    // Initial load
    displayFiveSets();
});
