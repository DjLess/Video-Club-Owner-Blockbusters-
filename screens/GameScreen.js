// 1. Colores predefinidos (Paleta del Videoclub)
const COLORES = {
    fondo: "#0b132b",
    estante: "#ffb703",
    estanteTop: "#ffc940",
    aparador: "#fb8500",
    aparadorTop: "#fc9f38",
    jugador: "#8ecaed", // Tú (Azul claro)
    npc: "#ffffff",     // Clientes (Blancos)
    sombra: "rgba(0, 0, 0, 0.4)"
};

// 2. Clases base para Z-sorting y Físicas
class Entidad {
    constructor(x, y, ancho, alto) {
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
    }
    get profundidad() { return this.y + this.alto; }
    dibujar(ctx) {}
}

class Mueble extends Entidad {
    constructor(x, y, ancho, alto, colorBase, colorTop) {
        super(x, y, ancho, alto);
        this.colorBase = colorBase;
        this.colorTop = colorTop;
    }
    dibujar(ctx) {
        ctx.fillStyle = COLORES.sombra;
        ctx.fillRect(this.x + 5, this.y + 5, this.ancho, this.alto);
        ctx.fillStyle = this.colorBase;
        ctx.fillRect(this.x, this.y, this.ancho, this.alto);
        ctx.fillStyle = this.colorTop;
        ctx.fillRect(this.x, this.y - 15, this.ancho, 15);
    }
}

class Personaje extends Entidad {
    constructor(x, y, radio, color, esJugador = false) {
        super(x, y, radio * 2, radio * 2);
        this.radio = radio;
        this.color = color;
        this.esJugador = esJugador;
        this.velocidad = 1.5;
        this.objetivoX = x;
        this.objetivoY = y;
        this.tiempoEspera = 0;
        this.estaSiendoAtendido = false;
    }

    get profundidad() { return this.y + this.radio; }

    actualizar(obstaculos, anchoCanvas, altoCanvas) {
        if (this.esJugador || this.estaSiendoAtendido) return;

        if (this.tiempoEspera > 0) {
            this.tiempoEspera--;
            return;
        }

        const dx = this.objetivoX - this.x;
        const dy = this.objetivoY - this.y;
        const distancia = Math.hypot(dx, dy);

        if (distancia < 5) {
            // Caminar por la tienda de forma aleatoria
            this.objetivoX = 50 + Math.random() * (anchoCanvas - 100);
            this.objetivoY = 150 + Math.random() * (altoCanvas - 300); // Evitar la zona de UI
            this.tiempoEspera = 60 + Math.random() * 120;
        } else {
            // Sliding Collision
            let movX = (dx / distancia) * this.velocidad;
            let movY = (dy / distancia) * this.velocidad;

            this.x += movX;
            if (this.colisionaCon(obstaculos)) this.x -= movX;

            this.y += movY;
            if (this.colisionaCon(obstaculos)) this.y -= movY;
        }
    }

    colisionaCon(obstaculos) {
        for (let obs of obstaculos) {
            let testX = this.x;
            let testY = this.y;

            if (this.x < obs.x) testX = obs.x;
            else if (this.x > obs.x + obs.ancho) testX = obs.x + obs.ancho;
            
            if (this.y < obs.y) testY = obs.y;
            else if (this.y > obs.y + obs.alto) testY = obs.y + obs.alto;

            let distX = this.x - testX;
            let distY = this.y - testY;
            if ((distX * distX) + (distY * distY) <= this.radio * this.radio) {
                return true;
            }
        }
        return false;
    }

    dibujar(ctx) {
        ctx.fillStyle = COLORES.sombra;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y + this.radio - 3, this.radio, this.radio * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#1c2541";
        ctx.stroke();
    }
}

// 3. Clase Principal del Juego
class GameScreen {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Elementos UI
        this.timerBar = document.getElementById('timer-bar');
        this.dialogueBox = document.getElementById('dialogue-box');
        this.npcText = document.getElementById('npc-text');
        this.optionsContainer = document.getElementById('options-container');
        
        this.timeLeft = 20;
        this.timerInterval = null;
        this.currentCustomer = null;

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        this.inicializarMundo();

        this.loop = this.loop.bind(this);
        requestAnimationFrame(this.loop);

        // Iniciar el primer cliente real tras unos segundos de observar el sandbox
        setTimeout(() => this.startInteraction(DB.customers[0]), 2000);
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    inicializarMundo() {
        const centroX = this.canvas.width / 2;
        
        // Jugador y Mostrador
        this.jugador = new Personaje(centroX, 80, 15, COLORES.jugador, true);
        this.aparador = new Mueble(centroX - 100, 110, 200, 40, COLORES.aparador, COLORES.aparadorTop);
        
        // Generar estantes dinámicamente según el tamaño de la pantalla
        this.estantes = [
            new Mueble(centroX - 120, 250, 50, 150, COLORES.estante, COLORES.estanteTop),
            new Mueble(centroX + 70, 250, 50, 150, COLORES.estante, COLORES.estanteTop),
            new Mueble(centroX - 120, 450, 50, 150, COLORES.estante, COLORES.estanteTop),
            new Mueble(centroX + 70, 450, 50, 150, COLORES.estante, COLORES.estanteTop)
        ];

        this.obstaculos = [this.aparador, ...this.estantes];

        // NPCs "extras" para dar vida al fondo
        this.npcs = [
            new Personaje(centroX - 80, 300, 15, COLORES.npc),
            new Personaje(centroX + 80, 400, 15, COLORES.npc),
            new Personaje(centroX, 500, 15, COLORES.npc)
        ];
        
        // NPC principal que interactúa contigo
        this.clienteActivo = new Personaje(centroX, this.canvas.height + 50, 15, COLORES.npc);
        this.npcs.push(this.clienteActivo);
    }

    loop() {
        // Fondo
        this.ctx.fillStyle = COLORES.fondo;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Actualizar físicas e IA
        this.npcs.forEach(npc => npc.actualizar(this.obstaculos, this.canvas.width, this.canvas.height));

        // Z-Sorting (Ordenar para pintar de atrás hacia adelante)
        const elementosRender = [this.jugador, this.aparador, ...this.estantes, ...this.npcs];
        elementosRender.sort((a, b) => a.profundidad - b.profundidad);

        // Dibujar
        elementosRender.forEach(elemento => elemento.dibujar(this.ctx));

        // Detectar si el cliente principal llegó al mostrador para iniciar UI
        if (this.clienteActivo.estaSiendoAtendido && !this.uiActiva) {
            const distY = this.clienteActivo.y - (this.aparador.y + this.aparador.alto + 15);
            if (distY <= 5) {
                this.mostrarUI();
            } else {
                // Hacer que camine hacia el mostrador
                this.clienteActivo.y -= 2;
                this.clienteActivo.x += (this.canvas.width/2 - this.clienteActivo.x) * 0.05;
            }
        }

        requestAnimationFrame(this.loop);
    }

    startInteraction(customerData) {
        this.currentCustomer = customerData;
        this.timeLeft = 20;
        this.uiActiva = false;
        
        this.dialogueBox.className = 'hidden'; 
        this.optionsContainer.classList.add('hidden');
        
        this.timerBar.style.backgroundColor = 'var(--accent)';
        this.timerBar.style.width = '100%';

        // Traer al cliente principal desde abajo de la pantalla
        this.clienteActivo.x = this.canvas.width / 2;
        this.clienteActivo.y = this.canvas.height + 50;
        this.clienteActivo.estaSiendoAtendido = true; // Activa la lógica de aproximación en el loop
    }

    mostrarUI() {
        this.uiActiva = true;
        this.dialogueBox.classList.remove('hidden');
        this.optionsContainer.classList.remove('hidden');

        let formattedText = this.currentCustomer.text;
        this.currentCustomer.hint1_words.forEach(word => {
            formattedText = formattedText.replace(word, `<span class="hint-1">${word}</span>`);
        });
        this.currentCustomer.hint2_words.forEach(word => {
            formattedText = formattedText.replace(word, `<span class="hint-2">${word}</span>`);
        });

        this.npcText.innerHTML = formattedText;
        this.renderOptions(this.currentCustomer.options);
        
        clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => this.updateTimer(), 1000);
    }

    updateTimer() {
        this.timeLeft--;
        const percentage = (this.timeLeft / 20) * 100;
        this.timerBar.style.width = `${percentage}%`;

        if (this.timeLeft <= 5) this.timerBar.style.backgroundColor = 'red';
        else if (this.timeLeft <= 10) this.timerBar.style.backgroundColor = 'orange';

        if (this.timeLeft === 10) this.dialogueBox.classList.add('show-hint-1'); 
        if (this.timeLeft === 5) this.dialogueBox.classList.add('show-hint-2'); 

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
        
        // El cliente se va al fondo de la tienda
        this.clienteActivo.estaSiendoAtendido = false;
        this.clienteActivo.objetivoY = this.canvas.height + 100;

        setTimeout(() => {
            const randomCustomerIndex = Math.floor(Math.random() * DB.customers.length);
            this.startInteraction(DB.customers[randomCustomerIndex]);
        }, 3000);
    }
}

window.onload = () => {
    const game = new GameScreen();
};