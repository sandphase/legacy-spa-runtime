export const template_home = `
<div class="container_home animate__animated animate__fadeIn">

    <div class="custom-card animate__animated animate__fadeInUp" style="grid-column: 1 / -1;">
        <div class="card-title">
            <i class="material-icons">stars</i> 
            <span>Bienvenidos al Multiverso SPA</span>
        </div>
        <p style="font-size: 1.1rem; margin-bottom: 1rem;">
            Esta aplicación ha sido rediseñada para ofrecer una experiencia visualmente impactante y fluida. 
            Explora las diferentes secciones utilizando el menú superior.
        </p>
        <p style="color: var(--accent-color); font-weight: 600;">
            ¡Prepárate para un viaje interdimensional!
        </p>
    </div>

    <!-- Interactive Console -->
    <div class="custom-card animate__animated animate__fadeInUp" style="grid-column: 1 / -1; animation-delay: 0.1s;">
        <div class="card-title">
            <i class="material-icons">terminal</i> 
            <span>Consola del Multiverso (Interactiva)</span>
        </div>
        <div class="console-box">
            <div class="console-header">
                <span class="console-dot red"></span>
                <span class="console-dot yellow"></span>
                <span class="console-dot green"></span>
                <span class="console-title">portal_os v1.0.0</span>
            </div>
            <div class="console-body" id="console_body">
                <p class="console-line">[SISTEMA] Conexión establecida con la Ciudadela.</p>
                <p class="console-line">[SISTEMA] Escribe <span style="color: var(--accent-color);">help</span> para ver comandos disponibles.</p>
            </div>
            <div class="console-input-wrapper">
                <span class="console-prompt">></span>
                <input type="text" id="console_input" placeholder="Escribe un comando y presiona Enter..." autocomplete="off">
            </div>
        </div>
    </div>

    <div class="custom-card animate__animated animate__fadeInUp" style="animation-delay: 0.2s;">
        <div class="card-title">
            <i class="material-icons">info</i> 
            <span>Sección: About</span>
        </div>
        <p>
            Descubre el propósito detrás de este proyecto y cómo se combinan tecnologías clásicas con diseño moderno.
        </p>
    </div>

    <div class="custom-card animate__animated animate__fadeInUp" style="animation-delay: 0.3s;">
        <div class="card-title">
            <i class="material-icons">face</i> 
            <span>Pokémon Dex</span>
        </div>
        <p>
            Conéctate con la PokéAPI para invocar y atrapar criaturas directamente desde el multiverso.
        </p>
    </div>

    <div class="custom-card animate__animated animate__fadeInUp" style="animation-delay: 0.4s;">
        <div class="card-title">
            <i class="material-icons">code</i> 
            <span>Tecnologías</span>
        </div>
        <p>
            Una muestra de que herramientas como jQuery, combinadas con CSS moderno, pueden crear interfaces premium.
        </p>
    </div>

</div>
`;
