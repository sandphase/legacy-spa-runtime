export const template_technologies = `
<div class="container_home animate__animated animate__fadeIn">
    <div class="custom-card" style="grid-column: 1 / -1; text-align: center;">
        <h2 style="color: var(--accent-color); margin-bottom: 1rem;"><i class="material-icons" style="vertical-align: middle;">language</i> Cosmos Tecnológico</h2>
        <p style="color: var(--text-secondary); margin-bottom: 2rem;">Un sistema solar interactivo animado matemáticamente con jQuery. Haz clic en los planetas.</p>
        
        <div id="tech_cosmos" style="position: relative; width: 100%; height: 450px; overflow: hidden; border-radius: 16px; background: radial-gradient(circle at center, rgba(59, 76, 202, 0.15) 0%, transparent 80%); border: 1px solid var(--glass-border);">
            
            <div class="sun-node" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 80px; height: 80px; background: var(--accent-color); border-radius: 50%; box-shadow: 0 0 40px var(--accent-color); display: flex; align-items: center; justify-content: center; font-weight: 800; color: #000; z-index: 10; font-size: 1.2rem;">
                SPA
            </div>
            
            <div class="orbit-node" data-angle="0" data-radius="130" data-speed="0.015" data-info="JavaScript ES6: Promesas, Arrow Functions, Módulos." style="position: absolute; width: 60px; height: 60px; background: #ffbd2e; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; font-weight: bold; color: #000; box-shadow: 0 0 20px #ffbd2e; cursor: pointer;">
                ES6
            </div>
            <div class="orbit-node" data-angle="90" data-radius="180" data-speed="0.01" data-info="jQuery 3.6: Manipulación extrema del DOM y animaciones matemáticas." style="position: absolute; width: 60px; height: 60px; background: #27c93f; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; font-weight: bold; color: #000; box-shadow: 0 0 20px #27c93f; cursor: pointer;">
                jQuery
            </div>
            <div class="orbit-node" data-angle="180" data-radius="220" data-speed="0.008" data-info="PokeAPI: Consumo de datos RESTful interdimensionales." style="position: absolute; width: 60px; height: 60px; background: #ff4444; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: bold; color: #fff; box-shadow: 0 0 20px #ff4444; cursor: pointer;">
                API
            </div>
            <div class="orbit-node" data-angle="270" data-radius="100" data-speed="0.02" data-info="CSS3 Moderno: Glassmorphism, Variables, Flexbox, Grid y Animaciones." style="position: absolute; width: 50px; height: 50px; background: #00bcd4; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: bold; color: #000; box-shadow: 0 0 15px #00bcd4; cursor: pointer;">
                CSS
            </div>

            <!-- Laser container -->
            <svg id="cosmos_laser" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;">
                <path id="laser_path" fill="none" stroke="var(--accent-color)" stroke-width="3" opacity="0" stroke-dasharray="10,5" style="transition: opacity 0.3s ease;" />
            </svg>
        </div>
        
        <div id="cosmos_info" style="margin-top: 1.5rem; min-height: 40px; font-weight: 600; font-size: 1.1rem; color: var(--accent-color); padding: 1rem; background: rgba(0,0,0,0.3); border-radius: 8px;">
            Iniciando simulador orbital...
        </div>
    </div>
</div>
`;