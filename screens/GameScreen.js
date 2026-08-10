class GameScreen {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.timerBar = document.getElementById('timer-bar');
        this.dialogueBox = document.getElementById('dialogue-box');
        this.npcText = document.getElementById('npc-text');
        this.optionsContainer = document.getElementById('options-container');
        
        this.timeLeft = 20;
        this.timerInterval = null;
        this.currentCustomer = null;

        // Tamaño del mapa (12x12 para dar más profundidad)
        this.mapSizeX = 12;
        this.mapSizeY = 12;

        // Vendedor (Fijo detrás del mostrador x:5, y:4, z:0.5)
        this.sellerPos = { x: 5, y: 4.2 };

        // Lista de clientes activos en la tienda
        this.customers = [];
        this.maxCustomers = 3;

        // Puntos navegables para exploración (Pasillos libres de la tienda)
        this.waypoints = [
            { x: 2, y: 2 }, { x: 2, y: 5 }, { x: 2, y: 8 },
            { x: 4, y: 2 }, { x: 4, y: 8 },
            { x: 7, y: 2 }, { x: 7, y: 6 }, { x: 7, y: 9 },
            { x: 9, y: 3 }, { x: 9, y: 7 }
        ];

        // Puntos de la fila frente al mostrador (x:5, y:5)
        this.queuePositions = [
            { x: 5, y: 6.2 }, // Atendiéndose
            { x: 5, y: 7.5 }, // 1° en fila
            { x: 5, y: 8.8 }  // 2° en fila
        ];

        // Offset y escalado isometrico
        this.offsetX = 0;
        this.offsetY = 0;
        this.tileSize = 40;

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);

        // Generar clientes iniciales
        this.initCustomerPool();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Desplazamiento ajustado para dar más aire vertical sin tapar botones
        this.offsetX = this.canvas.width / 2;
        this.offsetY = this.canvas.height * 0.18; // Elevado para dar espacio vertical
        
        // Ajuste adaptativo de tamaño de tile
        this.tileSize = Math.min(this.canvas.width / 16, this.canvas.height / 18);
    }

    toIso(x, y, z = 0) {
        const isoX = (x - y) * (this.tileSize * 0.866);
        const isoY = (x + y) * (this.tileSize * 0.5) - (z * this.tileSize);
        return { x: this.offsetX + isoX, y: this.offsetY + isoY };
    }

    drawBlock(x, y, z, w, d, h, colorTop, colorLeft, colorRight) {
        const pTop0 = this.toIso(x, y, z + h);
        const pTop1 = this.toIso(x + w, y, z + h);
        const pTop2 = this.toIso(x + w, y + d, z + h);
        const pTop3 = this.toIso(x, y + d, z + h);
        
        const pBot1 = this.toIso(x + w, y, z);
        const pBot2 = this.toIso(x + w, y + d, z);
        const pBot3 = this.toIso(x, y + d, z);

        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "#0b132b";

        // Cara superior
        this.ctx.fillStyle = colorTop;
        this.ctx.beginPath();
        this.ctx.moveTo(pTop0.x, pTop0.y); this.ctx.lineTo(pTop1.x, pTop1.y);
        this.ctx.lineTo(pTop2.x, pTop2.y); this.ctx.lineTo(pTop3.x, pTop3.y);
        this.ctx.closePath(); this.ctx.fill(); this.ctx.stroke();

        // Cara izquierda
        this.ctx.fillStyle = colorLeft;
        this.ctx.beginPath();
        this.ctx.moveTo(pTop3.x, pTop3.y); this.ctx.lineTo(pTop2.x, pTop2.y);
        this.ctx.lineTo(pBot2.x, pBot2.y); this.ctx.lineTo(pBot3.x, pBot3.y);
        this.ctx.closePath(); this.ctx.fill(); this.ctx.stroke();

        // Cara derecha
        this.ctx.fillStyle = colorRight;
        this.ctx.beginPath();
        this.ctx.moveTo(pTop1.x, pTop1.y); this.ctx.lineTo(pTop2.x, pTop2.y);
        this.ctx.lineTo(pBot2.x, pBot2.y); this.ctx.lineTo(pBot1.x, pBot1.y);
        this.ctx.closePath(); this.ctx.fill(); this.ctx.stroke();
    }

    drawFloor() {
        for (let i = 0; i < this.mapSizeX; i++) {
            for (let j = 0; j < this.mapSizeY; j++) {
                const p1 = this.toIso(i, j);
                const p2 = this.toIso(i + 1, j);
                const p3 = this.toIso(i + 1, j + 1);
                const p4 = this.toIso(i, j + 1);

                // Alfombra de entrada en la zona x:10..11, y:10..11
                if (i >= 10 && j >= 10) {
                    this.ctx.fillStyle = "#e63946";
                } else {
                    this.ctx.fillStyle = (i + j) % 2 === 0 ? "#1c2541" : "#151c33"; 
                }

                this.ctx.beginPath();
                this.ctx.moveTo(p1.x, p1.y); this.ctx.lineTo(p2.x, p2.y);
                this.ctx.lineTo(p3.x, p3.y); this.ctx.lineTo(p4.x, p4.y);
                this.ctx.closePath(); this.ctx.fill();
            }
        }
    }

    drawSphere(x, y, z, baseColor, highlightColor) {
        const pixel = this.toIso(x, y, z);
        
        // Sombra proyectada
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
        this.ctx.beginPath();
        this.ctx.ellipse(pixel.x, pixel.y + this.tileSize * 0.2, this.tileSize * 0.35, this.tileSize * 0.18, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Esfera principal
        this.ctx.beginPath();
        this.ctx.arc(pixel.x, pixel.y, this.tileSize / 1.8, 0, Math.PI * 2);
        this.ctx.fillStyle = baseColor;
        this.ctx.fill();
        this.ctx.lineWidth = 1.5;
        this.ctx.strokeStyle = "#0b132b";
        this.ctx.stroke();

        // Reflejo de brillo
        this.ctx.beginPath();
        this.ctx.arc(pixel.x - this.tileSize * 0.15, pixel.y - this.tileSize * 0.15, this.tileSize / 4, 0, Math.PI * 2);
        this.ctx.fillStyle = highlightColor;
        this.ctx.fill();
    }

    renderScene() {
        this.ctx.fillStyle = "#0b132b";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawFloor();

        // Estanterías lado Izquierdo (Amarillo/Accent)
        this.drawBlock(1, 1, 0, 0.8, 3.5, 2.5, "#ffc940", "#ffb703", "#cc9202");
        this.drawBlock(1, 5, 0, 0.8, 3.5, 2.5, "#ffc940", "#ffb703", "#cc9202");
        
        // Estanterías Centrales (Pasillos)
        this.drawBlock(3, 3, 0, 0.8, 4.5, 2.5, "#ffc940", "#ffb703", "#cc9202");

        // Estanterías Fondo / Pared
        this.drawBlock(6, 1, 0, 4, 0.8, 3.0, "#ffc940", "#ffb703", "#cc9202");

        // Heladera / Vitrina de bebidas (Azul claro)
        this.drawBlock(10, 3, 0, 1.2, 2.5, 3, "#a5d5f2", "#8ecaed", "#63a4c4");

        // Arcades / Máquina de snacks (Violeta)
        this.drawBlock(10, 7, 0, 1.2, 1.5, 2.8, "#7209b7", "#560bad", "#3a0ca3");

        // Mostrador Principal L
        this.drawBlock(4, 5, 0, 2.5, 1, 1.5, "#fc9f38", "#fb8500", "#c26600");

        // Dibujar al VENDEDOR (Esfera Naranja detrás del mostrador)
        this.drawSphere(this.sellerPos.x, this.sellerPos.y, 0.5, "#ffb703", "rgba(255, 255, 255, 0.7)");

        // Dibujar a los Clientes (Ordenados por profundidad ISO y=x+y)
        const sortedCustomers = [...this.customers].sort((a, b) => (a.pos.x + a.pos.y) - (b.pos.x + b.pos.y));
        sortedCustomers.forEach(customer => {
            this.drawSphere(customer.pos.x, customer.pos.y, 0.5, customer.color, "rgba(255, 255, 255, 0.6)");
        });
    }

    initCustomerPool() {
        for (let i = 0; i < this.maxCustomers; i++) {
            setTimeout(() => {
                this.spawnCustomer();
            }, i * 2500);
        }
    }

    spawnCustomer() {
        const randomData = DB.customers[Math.floor(Math.random() * DB.customers.length)];
        const colors = ["#ffffff", "#e0e1dd", "#48cae4", "#90e0ef", "#f72585"];
        
        const newCustomer = {
            id: Math.random(),
            data: randomData,
            pos: { x: 11, y: 11 }, // Entrada
            target: this.getRandomWaypoint(),
            state: 'BROWSING', // BROWSING, QUEUING, TALKING, LEAVING
            browseCount: Math.floor(Math.random() * 2) + 1, // Pasillos a visitar antes de comprar
            color: colors[Math.floor(Math.random() * colors.length)]
        };

        this.customers.push(newCustomer);
    }

    getRandomWaypoint() {
        return { ...this.waypoints[Math.floor(Math.random() * this.waypoints.length)] };
    }

    updateCustomers() {
        const speed = 0.05;

        this.customers.forEach((c) => {
            // Movimiento hacia su target
            const dx = c.target.x - c.pos.x;
            const dy = c.target.y - c.pos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 0.08) {
                c.pos.x += (dx / dist) * speed;
                c.pos.y += (dy / dist) * speed;
            } else {
                c.pos.x = c.target.x;
                c.pos.y = c.target.y;
                this.handleCustomerArrival(c);
            }
        });

        // Actualizar posiciones de la fila
        this.updateQueuePositions();
    }

    handleCustomerArrival(c) {
        if (c.state === 'BROWSING') {
            c.browseCount--;
            if (c.browseCount > 0) {
                c.target = this.getRandomWaypoint();
            } else {
                c.state = 'QUEUING';
            }
        } else if (c.state === 'LEAVING') {
            // Eliminar cliente cuando llega a la salida y crear uno nuevo
            this.customers = this.customers.filter(item => item.id !== c.id);
            setTimeout(() => this.spawnCustomer(), 2000);
        }
    }

    updateQueuePositions() {
        // Filtrar clientes esperando o conversando
        const queue = this.customers.filter(c => c.state === 'QUEUING' || c.state === 'TALKING');

        queue.forEach((c, index) => {
            const targetPos = this.queuePositions[Math.min(index, this.queuePositions.length - 1)];
            c.target = targetPos;

            // Si es el primero en la fila y no ha empezado la charla
            if (index === 0 && c.state === 'QUEUING' && c.pos.x === targetPos.x && c.pos.y === targetPos.y) {
                c.state = 'TALKING';
                this.startInteraction(c);
            }
        });
    }

    animate() {
        this.updateCustomers();
        this.renderScene();
        requestAnimationFrame(this.animate);
    }

    startInteraction(customer) {
        this.currentCustomer = customer;
        this.timeLeft = 20;

        this.dialogueBox.classList.remove('hidden');
        this.optionsContainer.classList.remove('hidden');

        this.timerBar.style.backgroundColor = 'var(--accent)';
        this.timerBar.style.width = '100%';

        let formattedText = customer.data.text;
        customer.data.hint1_words.forEach(word => {
            formattedText = formattedText.replace(word, `<span class="hint-1">${word}</span>`);
        });
        customer.data.hint2_words.forEach(word => {
            formattedText = formattedText.replace(word, `<span class="hint-2">${word}</span>`);
        });

        this.npcText.innerHTML = formattedText;
        this.renderOptions(customer.data.options);

        clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => this.updateTimer(), 1000);
    }

    updateTimer() {
        if (!this.currentCustomer || this.currentCustomer.state !== 'TALKING') return;

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
                const isCorrect = (id === this.currentCustomer.data.correctMovieId);
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

        if (this.currentCustomer) {
            this.currentCustomer.state = 'LEAVING';
            this.currentCustomer.target = { x: 11, y: 11 }; // Salida de la tienda
        }

        setTimeout(() => {
            this.dialogueBox.classList.add('hidden');
            this.currentCustomer = null;
        }, 2500);
    }
}

window.onload = () => {
    const game = new GameScreen();
};