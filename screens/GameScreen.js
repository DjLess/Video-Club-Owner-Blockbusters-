class GameScreen {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.timerBar = document.getElementById('timer-bar');
        this.dialogueBox = document.getElementById('dialogue-box');
        this.npcText = document.getElementById('npc-text');
        this.optionsContainer = document.getElementById('options-container');

        // Sistema de partida y dinero
        this.scoreMoney = 0;
        this.gameDuration = 120;
        this.gameTimerInterval = null;
        this.isGameOver = false;

        // Temporizador de diálogo individual
        this.timeLeft = 20;
        this.timerInterval = null;
        this.currentCustomer = null;

        // Textos flotantes (+$$$)
        this.floatingTexts = [];

        this.mapSizeX = 12;
        this.mapSizeY = 12;

        // Vendedor (Detrás del mostrador x:5, y:3.8, z:0.6)
        this.sellerPos = { x: 5, y: 3.8, z: 0.6 };

        this.customers = [];
        this.minCustomers = 2;
        this.maxCustomers = 5;

        // Red ampliada de nodos para navegación realista
        this.nodes = {
            'ENTRANCE': { x: 11, y: 11, neighbors: ['HALL_RIGHT'] },
            'HALL_RIGHT': { x: 11, y: 7, neighbors: ['ENTRANCE', 'SHELF_ARCADE', 'HALL_TOP_RIGHT', 'FRONT_CROSSROAD'] },
            'SHELF_ARCADE': { x: 11, y: 9, neighbors: ['HALL_RIGHT'], isShelf: true },
            'HALL_TOP_RIGHT': { x: 11, y: 2, neighbors: ['HALL_RIGHT', 'TOP_BACK_CORRIDOR', 'SHELF_COOLER'] },
            'SHELF_COOLER': { x: 9.2, y: 2, neighbors: ['HALL_TOP_RIGHT'], isShelf: true },
            'TOP_BACK_CORRIDOR': { x: 6, y: 2, neighbors: ['HALL_TOP_RIGHT', 'SHELF_BACK_WALL', 'HALL_LEFT'] },
            'SHELF_BACK_WALL': { x: 7.5, y: 2, neighbors: ['TOP_BACK_CORRIDOR'], isShelf: true },
            'HALL_LEFT': { x: 2.2, y: 2, neighbors: ['TOP_BACK_CORRIDOR', 'SHELF_LEFT_TOP'] },
            'SHELF_LEFT_TOP': { x: 2.2, y: 3.5, neighbors: ['HALL_LEFT', 'SHELF_LEFT_MID'], isShelf: true },
            'SHELF_LEFT_MID': { x: 2.2, y: 6.5, neighbors: ['SHELF_LEFT_TOP', 'SHELF_LEFT_BOT'], isShelf: true },
            'SHELF_LEFT_BOT': { x: 2.2, y: 8.5, neighbors: ['SHELF_LEFT_MID', 'FRONT_CROSSROAD'], isShelf: true },
            'FRONT_CROSSROAD': { x: 5, y: 9, neighbors: ['SHELF_LEFT_BOT', 'QUEUE_3', 'HALL_RIGHT'] },
            
            // Puntos de Fila frente al vendedor
            'QUEUE_3': { x: 5, y: 7.8, neighbors: ['QUEUE_2', 'FRONT_CROSSROAD'] },
            'QUEUE_2': { x: 5, y: 6.6, neighbors: ['QUEUE_1', 'QUEUE_3'] },
            'QUEUE_1': { x: 5, y: 5.2, neighbors: ['QUEUE_2'] }
        };

        // Geometría optimizada para dejar pasillos amplios y realistas
        this.staticObjects = [
            // Estantes lado izquierdo (Reorganizados con espacio central)
            { x: 0.8, y: 1.5, z: 0, w: 0.8, d: 3.0, h: 2.2, type: 'block', top: "#ffc940", left: "#ffb703", right: "#cc9202" },
            { x: 0.8, y: 5.5, z: 0, w: 0.8, d: 3.0, h: 2.2, type: 'block', top: "#ffc940", left: "#ffb703", right: "#cc9202" },
            // Estante central
            { x: 3.8, y: 3.0, z: 0, w: 0.8, d: 4.0, h: 2.2, type: 'block', top: "#ffc940", left: "#ffb703", right: "#cc9202" },
            // Estante de pared al fondo
            { x: 6.5, y: 0.8, z: 0, w: 3.5, d: 0.8, h: 2.5, type: 'block', top: "#ffc940", left: "#ffb703", right: "#cc9202" },
            // Vitrina / Heladera (Fondo derecha)
            { x: 10.2, y: 2.5, z: 0, w: 1.0, d: 2.0, h: 2.4, type: 'block', top: "#a5d5f2", left: "#8ecaed", right: "#63a4c4" },
            // Maquina Arcade / Snacks
            { x: 10.2, y: 7.5, z: 0, w: 1.0, d: 1.5, h: 2.2, type: 'block', top: "#7209b7", left: "#560bad", right: "#3a0ca3" },
            // Mostrador Principal (Ajustado en altura h:1.0 para que se vea claro el vendedor)
            { x: 4.0, y: 4.2, z: 0, w: 2.0, d: 0.8, h: 1.0, type: 'block', top: "#fc9f38", left: "#fb8500", right: "#c26600" }
        ];

        this.offsetX = 0;
        this.offsetY = 0;
        this.tileSize = 40;

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        this.setupUI();

        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);

        this.startGameSession();
    }

    setupUI() {
        this.hudContainer = document.createElement('div');
        this.hudContainer.id = 'game-hud';
        this.hudContainer.style.position = 'absolute';
        this.hudContainer.style.top = '15px';
        this.hudContainer.style.right = '20px';
        this.hudContainer.style.display = 'flex';
        this.hudContainer.style.gap = '20px';
        this.hudContainer.style.fontSize = '20px';
        this.hudContainer.style.fontWeight = 'bold';
        this.hudContainer.style.color = '#fff';
        this.hudContainer.style.backgroundColor = 'rgba(11, 19, 43, 0.85)';
        this.hudContainer.style.padding = '10px 20px';
        this.hudContainer.style.borderRadius = '8px';
        this.hudContainer.style.border = '2px solid #ffb703';
        this.hudContainer.style.zIndex = '100';

        this.hudContainer.innerHTML = `
            <div>💰 <span id="money-display" style="color: #4ef037;">$0</span></div>
            <div>⏱️ <span id="global-timer-display" style="color: #ffc940;">02:00</span></div>
        `;

        document.body.appendChild(this.hudContainer);
        this.moneyDisplay = document.getElementById('money-display');
        this.globalTimerDisplay = document.getElementById('global-timer-display');
    }

    startGameSession() {
        this.scoreMoney = 0;
        this.gameDuration = 120;
        this.isGameOver = false;
        this.moneyDisplay.innerText = `$${this.scoreMoney}`;

        for (let i = 0; i < this.minCustomers; i++) {
            setTimeout(() => this.spawnCustomer(), i * 1500);
        }

        this.scheduleNextCustomerSpawn();

        clearInterval(this.gameTimerInterval);
        this.gameTimerInterval = setInterval(() => {
            this.gameDuration--;
            const mins = String(Math.floor(this.gameDuration / 60)).padStart(2, '0');
            const secs = String(this.gameDuration % 60).padStart(2, '0');
            this.globalTimerDisplay.innerText = `${mins}:${secs}`;

            if (this.gameDuration <= 0) {
                this.endGameSession();
            }
        }, 1000);
    }

    scheduleNextCustomerSpawn() {
        if (this.isGameOver) return;

        const nextSpawnTime = Math.random() * 4000 + 3000;
        setTimeout(() => {
            if (this.customers.length < this.maxCustomers) {
                this.spawnCustomer();
            }
            this.scheduleNextCustomerSpawn();
        }, nextSpawnTime);
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.offsetX = this.canvas.width / 2;
        this.offsetY = this.canvas.height * 0.15;
        this.tileSize = Math.min(this.canvas.width / 16, this.canvas.height / 18);
    }

    toIso(x, y, z = 0) {
        const isoX = (x - y) * (this.tileSize * 0.866);
        const isoY = (x + y) * (this.tileSize * 0.5) - (z * this.tileSize);
        return { x: this.offsetX + isoX, y: this.offsetY + isoY };
    }

    drawBlock(obj) {
        const { x, y, z, w, d, h, top, left, right } = obj;
        const pTop0 = this.toIso(x, y, z + h);
        const pTop1 = this.toIso(x + w, y, z + h);
        const pTop2 = this.toIso(x + w, y + d, z + h);
        const pTop3 = this.toIso(x, y + d, z + h);
        
        const pBot1 = this.toIso(x + w, y, z);
        const pBot2 = this.toIso(x + w, y + d, z);
        const pBot3 = this.toIso(x, y + d, z);

        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "#0b132b";

        this.ctx.fillStyle = top;
        this.ctx.beginPath();
        this.ctx.moveTo(pTop0.x, pTop0.y); this.ctx.lineTo(pTop1.x, pTop1.y);
        this.ctx.lineTo(pTop2.x, pTop2.y); this.ctx.lineTo(pTop3.x, pTop3.y);
        this.ctx.closePath(); this.ctx.fill(); this.ctx.stroke();

        this.ctx.fillStyle = left;
        this.ctx.beginPath();
        this.ctx.moveTo(pTop3.x, pTop3.y); this.ctx.lineTo(pTop2.x, pTop2.y);
        this.ctx.lineTo(pBot2.x, pBot2.y); this.ctx.lineTo(pBot3.x, pBot3.y);
        this.ctx.closePath(); this.ctx.fill(); this.ctx.stroke();

        this.ctx.fillStyle = right;
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

    drawSphere(x, y, z, baseColor, highlightColor, hasDVD = false) {
        const pixel = this.toIso(x, y, z);
        
        // Sombra
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
        this.ctx.beginPath();
        this.ctx.ellipse(pixel.x, pixel.y + this.tileSize * 0.2, this.tileSize * 0.35, this.tileSize * 0.18, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Esfera (Cuerpo NPC)
        this.ctx.beginPath();
        this.ctx.arc(pixel.x, pixel.y, this.tileSize / 1.8, 0, Math.PI * 2);
        this.ctx.fillStyle = baseColor;
        this.ctx.fill();
        this.ctx.lineWidth = 1.5;
        this.ctx.strokeStyle = "#0b132b";
        this.ctx.stroke();

        // Brillo
        this.ctx.beginPath();
        this.ctx.arc(pixel.x - this.tileSize * 0.15, pixel.y - this.tileSize * 0.15, this.tileSize / 4, 0, Math.PI * 2);
        this.ctx.fillStyle = highlightColor;
        this.ctx.fill();

        // Si compró la película, dibujarle la cajita de DVD a un costado
        if (hasDVD) {
            const dvdX = pixel.x + this.tileSize * 0.3;
            const dvdY = pixel.y - this.tileSize * 0.2;
            const dvdW = this.tileSize * 0.35;
            const dvdH = this.tileSize * 0.5;

            // Caja de DVD
            this.ctx.fillStyle = "#e63946";
            this.ctx.fillRect(dvdX, dvdY, dvdW, dvdH);
            this.ctx.strokeStyle = "#ffffff";
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(dvdX, dvdY, dvdW, dvdH);

            // Carátula interior
            this.ctx.fillStyle = "#ffc940";
            this.ctx.fillRect(dvdX + 2, dvdY + 2, dvdW - 4, dvdH - 4);
        }
    }

    addFloatingText(text, x, y, z, color) {
        this.floatingTexts.push({
            text: text,
            x: x,
            y: y,
            z: z,
            color: color,
            alpha: 1.0,
            offsetY: 0
        });
    }

    renderFloatingTexts() {
        this.floatingTexts.forEach((ft, index) => {
            const pixel = this.toIso(ft.x, ft.y, ft.z);
            this.ctx.save();
            this.ctx.font = 'bold 22px Arial';
            this.ctx.fillStyle = ft.color;
            this.ctx.globalAlpha = ft.alpha;
            this.ctx.shadowColor = 'black';
            this.ctx.shadowBlur = 4;
            this.ctx.fillText(ft.text, pixel.x - 20, pixel.y - 20 - ft.offsetY);
            this.ctx.restore();

            ft.offsetY += 1.2;
            ft.alpha -= 0.02;

            if (ft.alpha <= 0) {
                this.floatingTexts.splice(index, 1);
            }
        });
    }

    renderScene() {
        this.ctx.fillStyle = "#0b132b";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawFloor();

        const renderList = [];

        // Agregar Muebles
        this.staticObjects.forEach(obj => {
            renderList.push({
                depth: obj.x + obj.y + (obj.w + obj.d) / 2,
                render: () => this.drawBlock(obj)
            });
        });

        // Agregar VENDEDOR (Naranja bien visible)
        renderList.push({
            depth: this.sellerPos.x + this.sellerPos.y,
            render: () => this.drawSphere(this.sellerPos.x, this.sellerPos.y, this.sellerPos.z, "#ff7b00", "rgba(255, 255, 255, 0.8)")
        });

        // Agregar Clientes
        this.customers.forEach(c => {
            renderList.push({
                depth: c.pos.x + c.pos.y,
                render: () => this.drawSphere(c.pos.x, c.pos.y, 0.5, c.color, "rgba(255, 255, 255, 0.6)", c.hasDVD)
            });
        });

        renderList.sort((a, b) => a.depth - b.depth);
        renderList.forEach(item => item.render());

        this.renderFloatingTexts();
    }

    spawnCustomer() {
        if (typeof DB === 'undefined' || !DB.customers || this.isGameOver) return;

        const randomData = DB.customers[Math.floor(Math.random() * DB.customers.length)];
        
        // Paleta variada de colores vibrantes para cada NPC
        const colors = [
            "#3a86ff", "#8338ec", "#ff006e", "#fb5607", "#ff0054", 
            "#00f5d4", "#7b2cbf", "#00b4d8", "#06d6a0", "#ffb703"
        ];
        
        const newCustomer = {
            id: Math.random(),
            data: randomData,
            currentNodeKey: 'ENTRANCE',
            path: [],
            pos: { x: this.nodes['ENTRANCE'].x, y: this.nodes['ENTRANCE'].y },
            state: 'BROWSING',
            browseCount: Math.floor(Math.random() * 3) + 2,
            pauseTimer: 0, // Temporizador para mirar el estante
            color: colors[Math.floor(Math.random() * colors.length)],
            hasDVD: false
        };

        this.setRandomBrowseStep(newCustomer);
        this.customers.push(newCustomer);
    }

    setRandomBrowseStep(customer) {
        const currentNode = this.nodes[customer.currentNodeKey];
        const randomNeighbor = currentNode.neighbors[Math.floor(Math.random() * currentNode.neighbors.length)];
        
        if (['QUEUE_1', 'QUEUE_2', 'QUEUE_3'].includes(randomNeighbor)) {
            customer.path = [customer.currentNodeKey];
        } else {
            customer.path = [randomNeighbor];
        }
    }

    findPath(startKey, targetKey) {
        let queue = [[startKey]];
        let visited = new Set([startKey]);

        while (queue.length > 0) {
            let path = queue.shift();
            let node = path[path.length - 1];

            if (node === targetKey) return path.slice(1);

            for (let neighbor of this.nodes[node].neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push([...path, neighbor]);
                }
            }
        }
        return [];
    }

    updateCustomers() {
        const speed = 0.045;

        this.customers.forEach(c => {
            // Si está pausado observando un estante
            if (c.pauseTimer > 0) {
                c.pauseTimer--;
                return;
            }

            if (c.path.length > 0) {
                const nextNodeKey = c.path[0];
                const targetPos = this.nodes[nextNodeKey];

                const dx = targetPos.x - c.pos.x;
                const dy = targetPos.y - c.pos.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist > 0.08) {
                    c.pos.x += (dx / dist) * speed;
                    c.pos.y += (dy / dist) * speed;
                } else {
                    c.pos.x = targetPos.x;
                    c.pos.y = targetPos.y;
                    c.currentNodeKey = nextNodeKey;
                    c.path.shift();

                    if (c.path.length === 0) {
                        this.handleNodeReached(c);
                    }
                }
            }
        });

        this.manageQueueLogic();
    }

    handleNodeReached(c) {
        const currentNodeObj = this.nodes[c.currentNodeKey];

        if (c.state === 'BROWSING') {
            // Si el nodo actual es de un estante, pausar para dar sensación de elegir película
            if (currentNodeObj && currentNodeObj.isShelf) {
                c.pauseTimer = Math.floor(Math.random() * 80) + 60; // Pausa de 1 a 2.5 segundos (60-140 frames)
            }

            c.browseCount--;
            if (c.browseCount > 0) {
                this.setRandomBrowseStep(c);
            } else {
                c.state = 'QUEUING';
                c.path = this.findPath(c.currentNodeKey, 'FRONT_CROSSROAD');
            }
        } else if (c.state === 'LEAVING') {
            this.customers = this.customers.filter(item => item.id !== c.id);
            if (this.customers.length < this.minCustomers && !this.isGameOver) {
                setTimeout(() => this.spawnCustomer(), 1000);
            }
        }
    }

    manageQueueLogic() {
        const queueCustomers = this.customers.filter(c => c.state === 'QUEUING' || c.state === 'TALKING');
        const queueSpots = ['QUEUE_1', 'QUEUE_2', 'QUEUE_3'];

        queueCustomers.forEach((c, index) => {
            const targetSpot = queueSpots[Math.min(index, queueSpots.length - 1)];

            if (c.path.length === 0 && c.currentNodeKey !== targetSpot && c.state === 'QUEUING') {
                c.path = this.findPath(c.currentNodeKey, targetSpot);
            }

            if (index === 0 && c.currentNodeKey === 'QUEUE_1' && c.state === 'QUEUING' && c.path.length === 0 && !this.isGameOver) {
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
            const earned = 50 + (this.timeLeft * 7.5);
            this.scoreMoney += Math.round(earned);
            this.moneyDisplay.innerText = `$${this.scoreMoney}`;

            // Asignar que el cliente lleva su caja de DVD
            if (this.currentCustomer) {
                this.currentCustomer.hasDVD = true;
            }

            this.addFloatingText(`+$${Math.round(earned)}`, this.currentCustomer.pos.x, this.currentCustomer.pos.y, 1.2, '#4ef037');
            this.npcText.innerHTML = "¡Exacto! Esto es justo lo que buscaba. ¡Gracias!";
        } else {
            this.addFloatingText(`¡Sin Venta!`, this.currentCustomer.pos.x, this.currentCustomer.pos.y, 1.2, '#ff3333');
            this.npcText.innerHTML = "Mmm... no estoy seguro de que esto sea lo que pedí. Me voy a otro videoclub.";
        }

        setTimeout(() => {
            this.dialogueBox.classList.add('hidden');
            if (this.currentCustomer) {
                this.currentCustomer.state = 'LEAVING';
                this.currentCustomer.path = this.findPath(this.currentCustomer.currentNodeKey, 'ENTRANCE');
                this.currentCustomer = null;
            }
        }, 2000);
    }

    endGameSession() {
        this.isGameOver = true;
        clearInterval(this.gameTimerInterval);
        clearInterval(this.timerInterval);

        this.dialogueBox.classList.remove('hidden');
        this.optionsContainer.classList.add('hidden');
        this.npcText.innerHTML = `🏁 <strong>¡TIEMPO CUMPLIDO!</strong><br>La jornada ha terminado. Recaudaste un total de: <span style="color:#4ef037; font-size:24px;">$${this.scoreMoney}</span>.`;
    }
}

window.onload = () => {
    const game = new GameScreen();
};