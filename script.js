// Quantum Canvas - Art Generator
class QuantumArtGenerator {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.particles = [];
        this.waves = [];
        this.isObserving = false;
        this.animationId = null;
        this.colors = {
            probability: '#9C27B0',
            blue: '#2196F3',
            green: '#4CAF50',
            red: '#F44336'
        };
        this.init();
    }

    init() {
        this.generateParticles();
        this.generateWaves();
        this.animate();
    }

    generateParticles() {
        this.particles = [];
        const particleCount = 150;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                color: this.getRandomColor(),
                phase: Math.random() * Math.PI * 2,
                frequency: Math.random() * 0.02 + 0.01
            });
        }
    }

    generateWaves() {
        this.waves = [];
        const waveCount = 5;
        
        for (let i = 0; i < waveCount; i++) {
            this.waves.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: 0,
                maxRadius: Math.random() * 300 + 200,
                speed: Math.random() * 2 + 1,
                opacity: Math.random() * 0.3 + 0.1,
                color: this.getRandomColor()
            });
        }
    }

    getRandomColor() {
        const colors = [this.colors.probability, this.colors.blue, this.colors.green, this.colors.red];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Draw probability waves
        this.waves.forEach(wave => {
            wave.radius += wave.speed;
            if (wave.radius > wave.maxRadius) {
                wave.radius = 0;
                wave.x = Math.random() * this.width;
                wave.y = Math.random() * this.height;
            }

            const gradient = this.ctx.createRadialGradient(
                wave.x, wave.y, 0,
                wave.x, wave.y, wave.radius
            );
            gradient.addColorStop(0, `${wave.color}${Math.floor(wave.opacity * 255).toString(16).padStart(2, '0')}`);
            gradient.addColorStop(1, `${wave.color}00`);

            this.ctx.beginPath();
            this.ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
        });

        // Draw quantum particles
        this.particles.forEach(particle => {
            // Quantum uncertainty - particles exist in multiple positions
            if (!this.isObserving) {
                // Superposition state - show multiple possible positions
                for (let i = 0; i < 3; i++) {
                    const offsetX = Math.sin(particle.phase + i * Math.PI * 2 / 3) * 10;
                    const offsetY = Math.cos(particle.phase + i * Math.PI * 2 / 3) * 10;
                    
                    this.ctx.beginPath();
                    this.ctx.arc(
                        particle.x + offsetX,
                        particle.y + offsetY,
                        particle.size * 0.5,
                        0,
                        Math.PI * 2
                    );
                    this.ctx.fillStyle = `${particle.color}66`;
                    this.ctx.fill();
                }
            } else {
                // Collapsed state - single position
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fillStyle = particle.color;
                this.ctx.fill();
            }

            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.phase += particle.frequency;

            // Boundary wrapping
            if (particle.x < 0) particle.x = this.width;
            if (particle.x > this.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.height;
            if (particle.y > this.height) particle.y = 0;
        });

        // Draw quantum field lines
        this.drawFieldLines();
    }

    drawFieldLines() {
        this.ctx.strokeStyle = `${this.colors.probability}33`;
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i < 20; i++) {
            const startX = (i * this.width) / 20;
            const startY = Math.sin(i * 0.5 + Date.now() * 0.001) * 50 + this.height / 2;
            
            this.ctx.beginPath();
            this.ctx.moveTo(startX, startY);
            
            for (let x = startX; x < this.width; x += 10) {
                const y = startY + Math.sin((x - startX) * 0.1 + Date.now() * 0.001) * 30;
                this.ctx.lineTo(x, y);
            }
            
            this.ctx.stroke();
        }
    }

    animate() {
        this.draw();
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    observe() {
        this.isObserving = !this.isObserving;
        if (this.isObserving) {
            // Collapse wave function
            this.particles.forEach(particle => {
                particle.x += (Math.random() - 0.5) * 20;
                particle.y += (Math.random() - 0.5) * 20;
            });
        }
    }

    regenerate() {
        this.generateParticles();
        this.generateWaves();
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Logo Animation
class QuantumLogo {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.particles = [];
        this.init();
    }

    init() {
        for (let i = 0; i < 20; i++) {
            this.particles.push({
                x: this.width / 2,
                y: this.height / 2,
                angle: (i / 20) * Math.PI * 2,
                radius: Math.random() * 20 + 10,
                speed: Math.random() * 0.02 + 0.01,
                size: Math.random() * 2 + 1,
                color: ['#9C27B0', '#2196F3', '#4CAF50', '#F44336'][Math.floor(Math.random() * 4)]
            });
        }
        this.animate();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw central palette icon
        this.ctx.fillStyle = '#9C27B0';
        this.ctx.beginPath();
        this.ctx.arc(this.width / 2, this.height / 2, 15, 0, Math.PI * 2);
        this.ctx.fill();

        // Draw orbiting particles
        this.particles.forEach(particle => {
            particle.angle += particle.speed;
            const x = this.width / 2 + Math.cos(particle.angle) * particle.radius;
            const y = this.height / 2 + Math.sin(particle.angle) * particle.radius;

            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(x, y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Multiverse Art Viewer
class MultiverseViewer {
    constructor(container) {
        this.container = container;
        this.artworks = [];
    }

    generateArtwork() {
        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 300;
        const ctx = canvas.getContext('2d');

        // Generate unique quantum artwork
        const colorScheme = [
            ['#9C27B0', '#2196F3'],
            ['#4CAF50', '#9C27B0'],
            ['#F44336', '#2196F3'],
            ['#9C27B0', '#4CAF50']
        ][Math.floor(Math.random() * 4)];

        // Background
        const gradient = ctx.createLinearGradient(0, 0, 300, 300);
        gradient.addColorStop(0, colorScheme[0] + '20');
        gradient.addColorStop(1, colorScheme[1] + '20');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 300, 300);

        // Quantum patterns
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * 300;
            const y = Math.random() * 300;
            const size = Math.random() * 20 + 5;
            
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fillStyle = colorScheme[Math.floor(Math.random() * 2)] + '66';
            ctx.fill();
        }

        // Wave patterns
        for (let i = 0; i < 5; i++) {
            ctx.strokeStyle = colorScheme[0] + '88';
            ctx.lineWidth = 2;
            ctx.beginPath();
            const startY = Math.random() * 300;
            ctx.moveTo(0, startY);
            for (let x = 0; x < 300; x += 10) {
                const y = startY + Math.sin(x * 0.1 + i) * 30;
                ctx.lineTo(x, y);
            }
            ctx.stroke();
        }

        return canvas;
    }

    loadUniverse(count = 6) {
        this.container.innerHTML = '';
        
        for (let i = 0; i < count; i++) {
            const item = document.createElement('div');
            item.className = 'multiverse-item';
            
            const canvas = this.generateArtwork();
            const info = document.createElement('div');
            info.className = 'multiverse-item-info';
            info.innerHTML = `
                <h4>Universe ${i + 1}</h4>
                <p>Quantum State: ${['Superposition', 'Entangled', 'Collapsed', 'Coherent'][Math.floor(Math.random() * 4)]}</p>
            `;
            
            item.appendChild(canvas);
            item.appendChild(info);
            this.container.appendChild(item);
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize quantum art generator
    const quantumCanvas = document.getElementById('quantumCanvas');
    const artGenerator = new QuantumArtGenerator(quantumCanvas);

    // Initialize logo
    const logoCanvas = document.getElementById('logoCanvas');
    new QuantumLogo(logoCanvas);

    // Initialize multiverse viewer
    const multiverseGrid = document.getElementById('multiverseGrid');
    const multiverseViewer = new MultiverseViewer(multiverseGrid);

    // Event listeners
    document.getElementById('generateBtn').addEventListener('click', () => {
        artGenerator.regenerate();
    });

    document.getElementById('observeBtn').addEventListener('click', () => {
        artGenerator.observe();
        const btn = document.getElementById('observeBtn');
        btn.textContent = artGenerator.isObserving ? 'Enter Superposition' : 'Observe State';
    });

    document.getElementById('loadMultiverseBtn').addEventListener('click', () => {
        multiverseViewer.loadUniverse(6);
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Load initial multiverse
    multiverseViewer.loadUniverse(6);
});

