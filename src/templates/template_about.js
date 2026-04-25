export const template_about = `
<div class="container_home animate__animated animate__fadeIn">
    
    <!-- Real About Content -->
    <div class="custom-card" style="grid-column: 1 / -1; margin-bottom: 1rem;">
        <h2 style="color: var(--accent-color); margin-bottom: 1rem;"><i class="material-icons" style="vertical-align: middle;">info</i> Propósito de ULTRA SPA</h2>
        <p style="font-size: 1.1rem; line-height: 1.6; color: var(--text-primary);">
            ULTRA SPA nació con un objetivo claro: demostrar que no se necesitan frameworks modernos complejos como React o Vue para construir una aplicación web fluida, interactiva y estéticamente superior.
            <br><br>
            Utilizando exclusivamente <strong>jQuery</strong> para la manipulación extrema del DOM y <strong>Vanilla CSS</strong> con variables para el diseño Glassmorphism, hemos construido un enrutador interno (SPA) que consume la <strong>PokeAPI</strong> en tiempo real. Esto elimina las recargas de página por completo, ofreciendo la experiencia de una aplicación nativa, rápida y ligera.
        </p>
    </div>

    <!-- Interactive Sections -->
    <div class="custom-card" style="grid-column: 1 / -1; text-align: center;">
        <h2 class="card-title scramble-text" data-text="Animación Matrix jQuery" style="font-size: 2.5rem; color: var(--accent-color); cursor: crosshair; display: inline-block;">Animación Matrix jQuery</h2>
        <p style="font-size: 1.1rem; color: var(--text-secondary);">Pasa el cursor sobre el título para ver el efecto criptográfico.</p>
    </div>
    
    <div class="custom-card" style="grid-column: 1 / -1;">
        <h3 style="color: var(--accent-color); margin-bottom: 1rem;"><i class="material-icons" style="vertical-align: middle;">extension</i> Constructor Lógico de esta SPA (Drag & Drop)</h3>
        <p>Arrastra los bloques al área de ensamblaje en el orden exacto en que funciona esta aplicación por dentro.</p>
        
        <div id="drag_container" style="display: flex; gap: 1rem; margin-top: 1rem; background: rgba(0,0,0,0.3); padding: 1.5rem; border-radius: 12px; min-height: 80px; border: 1px solid var(--glass-border);">
            <div class="drag-item" draggable="true" data-id="1" style="background: #ff4444; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: grab; font-weight: bold; box-shadow: 0 4px 10px rgba(255,68,68,0.3);">1. Router (hashchange)</div>
            <div class="drag-item" draggable="true" data-id="2" style="background: #ffbd2e; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: grab; font-weight: bold; color: #000; box-shadow: 0 4px 10px rgba(255,189,46,0.3);">2. API Fetch (AJAX)</div>
            <div class="drag-item" draggable="true" data-id="3" style="background: #27c93f; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: grab; font-weight: bold; color: #000; box-shadow: 0 4px 10px rgba(39,201,63,0.3);">3. DOM Render (jQuery)</div>
        </div>
        
        <div id="drop_zone" style="margin-top: 2rem; border: 2px dashed var(--text-secondary); padding: 3rem; border-radius: 12px; text-align: center; color: var(--text-secondary); transition: all 0.3s ease; display: flex; gap: 1rem; justify-content: center; align-items: center; min-height: 100px;">
            Suelta los bloques aquí
        </div>
    </div>
</div>
`;