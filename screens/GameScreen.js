class GameScreen {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.timerBar = document.getElementById('timer-bar');
        this.dialogueBox = document.getElementById('dialogue-box');
        this.npcText = document.getElementById('npc-text');
        this.optionsContainer = document.getElementById('options-container');
        
        this.timeLeft = 40;
        this.timerInterval = null;
        this.currentCustomer = null;

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Iniciar el prototipo
        this.startInteraction(DB.customers[0]);
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.drawIsometricRoom(); // Dibujar entorno básico
    }

    drawIsometricRoom() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Aquí irá la lógica de dibujo del grid isométrico, estantes y el mostrador
        this.ctx.fillStyle = "#1c2541";
        this.ctx.fillRect(this.canvas.width/4, this.canvas.height/4, this.canvas.width/2, 50);
        this.ctx.fillStyle = "#ffffff";
        this.ctx.font = "20px Arial";
        this.ctx.fillText("Mostrador Isométrico (WIP)", this.canvas.width/4 + 10, this.canvas.height/4 + 30);
    }

    startInteraction(customerData) {
        this.currentCustomer = customerData;
        this.timeLeft = 40;
        this.dialogueBox.className = ''; // Limpiar clases de pistas
        
        // Procesar texto para envolver las pistas en spans
        let formattedText = customerData.text;
        
        customerData.hint1_words.forEach(word => {
            formattedText = formattedText.replace(word, `<span class="hint-1">${word}</span>`);
        });
        customerData.hint2_words.forEach(word => {
            formattedText = formattedText.replace(word, `<span class="hint-2">${word}</span>`);
        });

        this.npcText.innerHTML = formattedText;
        this.renderOptions(customerData.options);
        
        this.optionsContainer.classList.remove('hidden');
        
        // Iniciar temporizador
        clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => this.updateTimer(), 1000);
    }

    updateTimer() {
        this.timeLeft--;
        const percentage = (this.timeLeft / 40) * 100;
        this.timerBar.style.width = `${percentage}%`;

        // Lógica de colores del temporizador
        if (this.timeLeft <= 10) this.timerBar.style.backgroundColor = 'red';
        else if (this.timeLeft <= 20) this.timerBar.style.backgroundColor = 'orange';

        // Lógica de Pistas (Hints)
        if (this.timeLeft === 20) {
            this.dialogueBox.classList.add('show-hint-1'); // Primeras pistas a los 20s
        }
        if (this.timeLeft === 10) {
            this.dialogueBox.classList.add('show-hint-2'); // Segundas pistas a los 30s transcurridos (quedan 10s)
        }

        if (this.timeLeft <= 0) {
            clearInterval(this.timerInterval);
            this.endInteraction(false); // Se acabó el tiempo
        }
    }

    renderOptions(movieIds) {
        this.optionsContainer.innerHTML = '';
        movieIds.forEach(id => {
            const movie = DB.movies[id];
            const btn = document.createElement('div');
            btn.className = 'dvd-option';
            btn.innerHTML = `<strong>${movie.title}</strong><br><small>${movie.genre}</small>`;
            
            btn.addEventListener('click', () => {
                clearInterval(this.timerInterval);
                const isCorrect = (id === this.currentCustomer.correctMovieId);
                this.endInteraction(isCorrect);
            });
            
            this.optionsContainer.appendChild(btn);
        });
    }

    endInteraction(success) {
        this.optionsContainer.classList.add('hidden');
        if (success) {
            this.npcText.innerHTML = "¡Exacto! Esto es justo lo que buscaba. ¡Gracias!";
        } else {
            this.npcText.innerHTML = "Mmm... no estoy seguro de que esto sea lo que pedí. Me voy a otro videoclub.";
        }
        
        // Siguiente cliente a los 3 segundos (Lógica de prueba)
        setTimeout(() => {
            this.startInteraction(DB.customers[1]);
        }, 3000);
    }
}

// Inicializar el juego cuando el DOM cargue
window.onload = () => {
    const game = new GameScreen();
};