class GameScreen {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.timerBar = document.getElementById('timer-bar');
        this.dialogueBox = document.getElementById('dialogue-box');
        this.npcText = document.getElementById('npc-text');
        this.optionsContainer = document.getElementById('options-container');
        
        this.timeLeft = 20; // Tiempos reducidos a la mitad
        this.timerInterval = null;
        this.currentCustomer = null;

        // Variables de animación y posicionamiento isométrico
        this.npcPos = { x: -2, y: 10 }; // Inicia fuera de la tienda
        this.npcTarget = { x: 5, y: 5 }; // Coordenada del mostrador
        this.npcMoving = false;
        
        // Offset y tamaño de cuadrícula
        this.offsetX = 0;
        this.offsetY = 0;
        this.tileSize = 40;

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Bind del loop de animación
        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);

        // Iniciar el juego
        this.startInteraction(DB.customers[0]);
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Centrar la cuadrícula isométrica
        this.offsetX = this.canvas.width / 2;
        this.offsetY = this.canvas.height / 4;
        this.tileSize = Math.min(this.canvas.width, this.canvas.height) / 15;
    }

    // Matemática básica para convertir coordenadas 2D (x, y, z) a Isométricas
    toIso(x, y, z = 0) {
        const isoX = (x - y) * (this.tileSize * 0.866); // cos(30)
        const isoY = (x + y) * (this.tileSize * 0.5) - (z * this.tileSize); // sin(30) - altura
        return { x: this.offsetX + isoX, y: this.offsetY + isoY };
    }

    // Dibujar un bloque 3D (estantes, mostrador)
    drawBlock(x, y, z, w, d, h, colorTop, colorLeft, colorRight) {
        const pTop0 = this.toIso(x, y, z + h);
        const pTop1 = this.toIso(x + w, y, z + h);
        const pTop2 = this.toIso(x + w, y + d, z + h);
        const pTop3 = this.toIso(x, y + d, z + h);
        
        const pBot0 = this.toIso(x, y, z);
        const pBot1 = this.toIso(x + w, y, z);
        const pBot2 = this.toIso(x + w, y + d, z);
        const pBot3 = this.toIso(x, y + d, z);

        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "#0b132b"; // Borde color de fondo

        // Cara superior
        this.ctx.fillStyle = colorTop;
        this.ctx.beginPath(); this.ctx.moveTo(pTop0.x, pTop0.y); this.ctx.lineTo(pTop1.x, pTop1.y);
        this.ctx.lineTo(pTop2.x, pTop2.y); this.ctx.lineTo(pTop3.x, pTop3.y); this.ctx.closePath();
        this.ctx.fill(); this.ctx.stroke();

        // Cara izquierda
        this.ctx.fillStyle = colorLeft;
        this.ctx.beginPath(); this.ctx.moveTo(pTop3.x, pTop3.y); this.ctx.lineTo(pTop2.x, pTop2.y);
        this.ctx.lineTo(pBot2.x, pBot2.y); this.ctx.lineTo(pBot3.x, pBot3.y); this.ctx.closePath();
        this.ctx.fill(); this.ctx.stroke();

        // Cara derecha
        this.ctx.fillStyle = colorRight;
        this.ctx.beginPath(); this.ctx.moveTo(pTop1.x, pTop1.y); this.ctx.lineTo(pTop2.x, pTop2.y);
        this.ctx.lineTo(pBot2.x, pBot2.y); this.ctx.lineTo(pBot1.x, pBot1.y); this.ctx.closePath();
        this.ctx.fill(); this.ctx.stroke();
    }

    drawFloor() {
        const size = 10;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const p1 = this.toIso(i, j);
                const p2 = this.toIso(i + 1, j);
                const p3 = this.toIso(i + 1, j + 1);
                const p4 = this.toIso(i, j + 1);

                // Patrón de tablero de ajedrez usando la paleta base
                this.ctx.fillStyle = (i + j) % 2 === 0 ? "#1c2541" : "#151c33"; 
                this.ctx.beginPath();
                this.ctx.moveTo(p1.x, p1.y); this.ctx.lineTo(p2.x, p2.y);
                this.ctx.lineTo(p3.x, p3.y); this.ctx.lineTo(p4.x, p4.y);
                this.ctx.closePath();
                this.ctx.fill();
            }
        }
    }

    renderScene() {
        // Limpiar y pintar fondo oscuro
        this.ctx.fillStyle = "#0b132b";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawFloor();

        // Estanterías (Amarillo/Accent)
        this.drawBlock(1, 1, 0, 1, 6, 2.5, "#ffc940", "#ffb703", "#cc9202");
        this.drawBlock(3, 1, 0, 1, 6, 2.5, "#ffc940", "#ffb703", "#cc9202");
        
        // Heladera/Vitrina (Azul claro/Hint-1)
        this.drawBlock(8, 1, 0, 1.5, 2, 3, "#a5d5f2", "#8ecaed", "#63a4c4");

        // Mostrador principal (Naranja/Hint-2)
        this.drawBlock(5, 5, 0, 2, 1, 1.5, "#fc9f38", "#fb8500", "#c26600");

        // Dibujar NPC (Esfera flotando ligeramente)
        const npcPixel = this.toIso(this.npcPos.x, this.npcPos.y, 0.5);
        
        // Sombra de la esfera
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        this.ctx.beginPath();
        this.ctx.ellipse(npcPixel.x, npcPixel.y + this.tileSize * 0.2, this.tileSize * 0.4, this.tileSize * 0.2, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Cuerpo de la esfera
        this.ctx.beginPath();
        this.ctx.arc(npcPixel.x, npcPixel.y, this.tileSize / 1.8, 0, Math.PI * 2);
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fill();
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "#1c2541";
        this.ctx.stroke();

        // Reflejo de la esfera para dar volumen
        this.ctx.beginPath();
        this.ctx.arc(npcPixel.x - this.tileSize * 0.15, npcPixel.y - this.tileSize * 0.15, this.tileSize / 4, 0, Math.PI * 2);
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        this.ctx.fill();
    }

    animate() {
        if (this.npcMoving) {
            const dx = this.npcTarget.x - this.npcPos.x;
            const dy = this.npcTarget.y - this.npcPos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Velocidad de movimiento
            if (dist > 0.1) {
                this.npcPos.x += (dx / dist) * 0.08;
                this.npcPos.y += (dy / dist) * 0.08;
            } else {
                this.npcMoving = false;
                
                // Si llegó al mostrador (x=5, y=5), inicia la UI
                if (this.npcTarget.x === 5 && this.npcTarget.y === 5) {
                    this.dialogueBox.classList.remove('hidden');
                    this.optionsContainer.classList.remove('hidden');
                }
            }
        }

        this.renderScene();
        requestAnimationFrame(this.animate);
    }

    startInteraction(customerData) {
        this.currentCustomer = customerData;
        this.timeLeft = 20; // 20 Segundos
        
        // Ocultar UI mientras el cliente camina
        this.dialogueBox.className = 'hidden'; 
        this.optionsContainer.classList.add('hidden');
        
        // Resetear barra de timer al color original
        this.timerBar.style.backgroundColor = 'var(--accent)';
        this.timerBar.style.width = '100%';

        // Resetear posición del cliente y mandarlo al mostrador
        this.npcPos = { x: -2, y: 10 };
        this.npcTarget = { x: 5, y: 5 };
        this.npcMoving = true;
        
        // Procesar textos y envolver pistas
        let formattedText = customerData.text;
        customerData.hint1_words.forEach(word => {
            formattedText = formattedText.replace(word, `<span class="hint-1">${word}</span>`);
        });
        customerData.hint2_words.forEach(word => {
            formattedText = formattedText.replace(word, `<span class="hint-2">${word}</span>`);
        });

        this.npcText.innerHTML = formattedText;
        this.renderOptions(customerData.options);
        
        // Iniciar temporizador
        clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => this.updateTimer(), 1000);
    }

    updateTimer() {
        // Pausar el reloj si el NPC está caminando hacia el mostrador
        if (this.npcMoving) return; 

        this.timeLeft--;
        const percentage = (this.timeLeft / 20) * 100;
        this.timerBar.style.width = `${percentage}%`;

        // Colores del reloj
        if (this.timeLeft <= 5) this.timerBar.style.backgroundColor = 'red';
        else if (this.timeLeft <= 10) this.timerBar.style.backgroundColor = 'orange';

        // Lógica de Pistas con tiempos reducidos
        if (this.timeLeft === 10) {
            this.dialogueBox.classList.add('show-hint-1'); 
        }
        if (this.timeLeft === 5) {
            this.dialogueBox.classList.add('show-hint-2'); 
        }

        // Fin del tiempo
        if (this.timeLeft <= 0) {
            clearInterval(this.timerInterval);
            this.endInteraction(false); 
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
        
        // Mandar al NPC hacia la salida
        this.npcTarget = { x: 12, y: -2 }; 
        this.npcMoving = true;

        // Llamar al siguiente cliente tras 3 segundos
        setTimeout(() => {
            const randomCustomerIndex = Math.floor(Math.random() * DB.customers.length);
            this.startInteraction(DB.customers[randomCustomerIndex]);
        }, 3000);
    }
}

window.onload = () => {
    const game = new GameScreen();
};