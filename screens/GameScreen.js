class GameScreen {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.timerBar = document.getElementById('timer-bar');
        this.dialogueBox = document.getElementById('dialogue-box');
        this.npcText = document.getElementById('npc-text');
        this.optionsContainer = document.getElementById('options-container');

        // Sistema de dinero y tiempo global
        this.scoreMoney = 0;
        this.gameDuration = 120;
        this.gameTimerInterval = null;
        this.isGameOver = false;

        // Temporizador de diálogo
        this.timeLeft = 20;
        this.timerInterval = null;
        this.currentCustomer = null;

        this.floatingTexts = [];

        this.mapSizeX = 12;
        this.mapSizeY = 12;

        // Posición ajustada del Video Club Owner (detrás del mostrador)
        this.sellerPos = { x: 4.5, y: 3.8, z: 0.35 };

        this.customers = [];
        this.minCustomers = 2;
        this.maxCustomers = 5;

        // Geometría del local
        this.staticObjects = [
            // Estantes lado izquierdo
            { id: 'shelf_left_1', x: 0.8, y: 1.5, z: 0, w: 0.8, d: 3.0, h: 2.0, top: "#ffc940", left: "#ffb703", right: "#cc9202" },
            { id: 'shelf_left_2', x: 0.8, y: 5.5, z: 0, w: 0.8, d: 3.0, h: 2.0, top: "#ffc940", left: "#ffb703", right: "#cc9202" },
            // Estante central principal
            { id: 'shelf_mid', x: 4.5, y: 0.8, z: 0, w: 0.8, d: 2.2, h: 2.0, top: "#ffc940", left: "#ffb703", right: "#cc9202" },
            // Estante fondo pared
            { id: 'shelf_back', x: 7.0, y: 0.8, z: 0, w: 3.0, d: 0.8, h: 2.2, top: "#ffc940", left: "#ffb703", right: "#cc9202" },
            // Cooler / Heladera
            { id: 'cooler', x: 10.2, y: 2.5, z: 0, w: 1.0, d: 2.0, h: 2.2, top: "#a5d5f2", left: "#8ecaed", right: "#63a4c4" },
            // Arcade
            { id: 'arcade', x: 10.2, y: 7.5, z: 0, w: 1.0, d: 1.5, h: 2.0, top: "#7209b7", left: "#560bad", right: "#3a0ca3" },
            // Mostrador Principal del Vendedor
            { id: 'counter', x: 3.5, y: 4.2, z: 0, w: 2.2, d: 0.8, h: 1.1, top: "#fc9f38", left: "#fb8500", right: "#c26600" }
        ];

        // Red de nodos conectada para navegación
        this.nodes = {
            'ENTRANCE': { x: 11, y: 11, neighbors: ['HALL_RIGHT'] },
            'HALL_RIGHT': { x: 11, y: 5.5, neighbors: ['ENTRANCE', 'SHELF_ARCADE', 'HALL_TOP_RIGHT', 'FRONT_CROSSROAD'] },
            'SHELF_ARCADE': { x: 11, y: 9, neighbors: ['HALL_RIGHT'], isShelf: true },
            'HALL_TOP_RIGHT': { x: 11, y: 1.5, neighbors: ['HALL_RIGHT', 'SHELF_COOLER', 'PASSED_BACK'] },
            'SHELF_COOLER': { x: 9.0, y: 2.5, neighbors: ['HALL_TOP_RIGHT'], isShelf: true },
            'PASSED_BACK': { x: 6.0, y: 1.5, neighbors: ['HALL_TOP_RIGHT', 'SHELF_BACK', 'PASSED_MID'] },
            'SHELF_BACK': { x: 7.5, y: 2.0, neighbors: ['PASSED_BACK'], isShelf: true },
            'PASSED_MID': { x: 2.5, y: 1.5, neighbors: ['PASSED_BACK', 'PASSED_LEFT_TOP'] },
            'PASSED_LEFT_TOP': { x: 2.5, y: 3.5, neighbors: ['PASSED_MID', 'SHELF_LEFT_1', 'PASSED_LEFT_MID'] },
            'SHELF_LEFT_1': { x: 2.2, y: 2.8, neighbors: ['PASSED_LEFT_TOP'], isShelf: true },
            'PASSED_LEFT_MID': { x: 2.5, y: 7.0, neighbors: ['PASSED_LEFT_TOP', 'SHELF_LEFT_2', 'FRONT_CROSSROAD'] },
            'SHELF_LEFT_2': { x: 2.2, y: 6.5, neighbors: ['PASSED_LEFT_MID'], isShelf: true },
            'FRONT_CROSSROAD': { x: 5.0, y: 9.0, neighbors: ['PASSED_LEFT_MID', 'HALL_RIGHT', 'QUEUE_1'] },
            
            // Punto de atención al frente del mostrador
            'QUEUE_1': { x: 4.5, y: 5.2, neighbors: ['FRONT_CROSSROAD'] }
        };

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
        const radius = this.tileSize / 1.8;
        
        // Sombra en el suelo
        const floorPixel = this.toIso(x, y, 0);
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
        this.ctx.beginPath();
        this.ctx.ellipse(floorPixel.x, floorPixel.y + this.tileSize * 0.1, this.tileSize * 0.35, this.tileSize * 0.18, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Esfera (Cuerpo NPC)
        this.ctx.beginPath();
        this.ctx.arc(pixel.x, pixel.y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = baseColor;
        this.ctx.fill();
        this.ctx.lineWidth = 1.5;
        this.ctx.strokeStyle = "#0b132b";
        this.ctx.stroke();

        // Brillo 3D
        this.ctx.beginPath();
        this.ctx.arc(pixel.x - this.tileSize * 0.15, pixel.y - this.tileSize * 0.15, this.tileSize / 4, 0, Math.PI * 2);
        this.ctx.fillStyle = highlightColor;
        this.ctx.fill();

        // Si lleva estuche de DVD
        if (hasDVD) {
            const dvdX = pixel.x + this.tileSize * 0.25;
            const dvdY = pixel.y - this.tileSize * 0.1;
            const dvdW = this.tileSize * 0.3;
            const dvdH = this.tileSize * 0.45;

            this.ctx.fillStyle = "#e63946";
            this.ctx.fillRect(dvdX, dvdY, dvdW, dvdH);
            this.ctx.strokeStyle = "#ffffff";
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(dvdX, dvdY, dvdW, dvdH);

            this.ctx.fillStyle = "#ffc940";
            this.ctx.fillRect(dvdX + 2, dvdY + 2, dvdW - 4, dvdH - 4);
        }
    }

    drawOwnerBehindCounter() {
        const counter = this.staticObjects.find(o => o.id === 'counter');
        const counterTopPoint = this.toIso(counter.x, counter.y + counter.d, counter.h);
        
        this.ctx.save();
        
        // Máscara de recorte (clip) que tapa el 40% inferior del dueño justo en la barra superior del mostrador
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.canvas.width, counterTopPoint.y);
        this.ctx.clip();

        // Renderizamos la esfera del dueño (60% visible)
        this.drawSphere(this.sellerPos.x, this.sellerPos.y, this.sellerPos.z, "#ff7b00", "rgba(255, 255, 255, 0.8)");
        
        this.ctx.restore();
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

        // Detalle 1: Renderizado preciso por profundidad isométrica (X + Y + Z)
        this.staticObjects.forEach(obj => {
            if (obj.id !== 'counter') {
                const depth = (obj.x + obj.w / 2) + (obj.y + obj.d / 2);
                renderList.push({
                    depth: depth,
                    render: () => this.drawBlock(obj)
                });
            }
        });

        // Vendedor
        const sellerDepth = this.sellerPos.x + this.sellerPos.y;
        renderList.push({
            depth: sellerDepth,
            render: () => this.drawOwnerBehindCounter()
        });

        // Mostrador
        const counter = this.staticObjects.find(o => o.id === 'counter');
        const counterDepth = (counter.x + counter.w / 2) + (counter.y + counter.d / 2);
        renderList.push({
            depth: counterDepth,
            render: () => this.drawBlock(counter)
        });

        // NPC Clientes
        this.customers.forEach(c => {
            const customerDepth = c.pos.x + c.pos.y;
            renderList.push({
                depth: customerDepth,
                render: () => this.drawSphere(c.pos.x, c.pos.y, 0.4, c.color, "rgba(255, 255, 255, 0.6)", c.hasDVD)
            });
        });

        // Ordenamiento por profundidad
        renderList.sort((a, b) => a.depth - b.depth);

        renderList.forEach(item => item.render());

        this.renderFloatingTexts();
    }

    spawnCustomer() {
        if (typeof DB === 'undefined' || !DB.customers || this.isGameOver) return;

        const randomData = DB.customers[Math.floor(Math.random() * DB.customers.length)];
        
        const colors = [
            "#3a86ff", "#8338ec", "#ff006e", "#fb5607", "#ff0054", 
            "#00f5d4", "#7b2cbf", "#00b4d8", "#06d6a0", "#ffb703"
        ];
        
        const newCustomer = {
            id: Math.random(),
            data: randomData,
            currentNodeKey: 'ENTRANCE',
            targetPos: null,
            path: [],
            pos: { x: this.nodes['ENTRANCE'].x, y: this.nodes['ENTRANCE'].y },
            state: 'BROWSING',
            browseCount: Math.floor(Math.random() * 4) + 3,
            pauseTimer: 0,
            color: colors[Math.floor(Math.random() * colors.length)],
            hasDVD: false
        };

        this.setRandomBrowseStep(newCustomer);
        this.customers.push(newCustomer);
    }

    // Detalle 2: Exploración profunda de todos los rincones de la tienda
    setRandomBrowseStep(customer) {
        const nodeKeys = Object.keys(this.nodes).filter(k => k !== 'ENTRANCE' && k !== 'QUEUE_1');
        const randomKey = nodeKeys[Math.floor(Math.random() * nodeKeys.length)];
        
        customer.path = this.findPath(customer.currentNodeKey, randomKey);
    }

    findPath(startKey, targetKey) {
        if (startKey === targetKey) return [];

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
            if (c.pauseTimer > 0) {
                c.pauseTimer--;
                return;
            }

            // Movimiento basado en targetPos o ruta de nodos
            let destination = c.targetPos;

            if (!destination && c.path.length > 0) {
                const nextNodeKey = c.path[0];
                destination = this.nodes[nextNodeKey];
            }

            if (destination) {
                const dx = destination.x - c.pos.x;
                const dy = destination.y - c.pos.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist > 0.08) {
                    c.pos.x += (dx / dist) * speed;
                    c.pos.y += (dy / dist) * speed;
                } else {
                    c.pos.x = destination.x;
                    c.pos.y = destination.y;

                    if (c.targetPos) {
                        c.targetPos = null;
                    } else {
                        c.currentNodeKey = c.path[0];
                        c.path.shift();
                        if (c.path.length === 0) {
                            this.handleNodeReached(c);
                        }
                    }
                }
            }
        });

        this.manageQueueLogic();
    }

    handleNodeReached(c) {
        const currentNodeObj = this.nodes[c.currentNodeKey];

        if (c.state === 'BROWSING') {
            if (currentNodeObj && currentNodeObj.isShelf) {
                c.pauseTimer = Math.floor(Math.random() * 80) + 60;
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

    // Detalle 3: Fila dinámica que ubica al 4to, 5to o N cliente exactamente detrás del anterior
    manageQueueLogic() {
        const queueCustomers = this.customers.filter(c => c.state === 'QUEUING' || c.state === 'TALKING');
        const queueBase = this.nodes['QUEUE_1'];
        const spacingY = 1.0;

        queueCustomers.forEach((c, index) => {
            const queueTarget = {
                x: queueBase.x,
                y: queueBase.y + (index * spacingY)
            };

            if (c.path.length === 0 && c.state === 'QUEUING') {
                const distToSpot = Math.hypot(queueTarget.x - c.pos.x, queueTarget.y - c.pos.y);
                if (distToSpot > 0.1) {
                    c.targetPos = queueTarget;
                }
            }

            if (index === 0 && c.state === 'QUEUING' && Math.hypot(queueBase.x - c.pos.x, queueBase.y - c.pos.y) < 0.15 && !this.isGameOver) {
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

    // Detalle 4: Desplazamiento lateral antes de encaminarse a la salida para evitar atravesar la fila
    endInteraction(success) {
        this.optionsContainer.classList.add('hidden');

        if (success) {
            const earned = 50 + (this.timeLeft * 7.5);
            this.scoreMoney += Math.round(earned);
            this.moneyDisplay.innerText = `$${this.scoreMoney}`;

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
                this.currentCustomer.currentNodeKey = 'FRONT_CROSSROAD';
                this.currentCustomer.path = this.findPath('FRONT_CROSSROAD', 'ENTRANCE');
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