// Helper para gestionar la PokéDex con PokeAPI y funciones avanzadas
export const renderPokemonSection = () => {
    $("#main").html(`
        <div class="pokemon-section animate__animated animate__fadeIn">
            <h1 class="text-center glow-text" style="font-family: var(--font-heading); font-weight: 800; color: var(--accent-color); margin-bottom: 2rem;">
                PokéDex Interdimensional
            </h1>

            <!-- Controls Container -->
            <div class="controls-container">
                <div class="search-wrapper">
                    <i class="material-icons search-icon">search</i>
                    <input type="text" id="poke_search" placeholder="Buscar Pokémon por nombre o ID...">
                </div>
                
                <div class="filter-wrapper">
                    <select id="poke_type_filter" class="browser-default">
                        <option value="">Todos los Tipos</option>
                    </select>
                </div>

                <button class="btn-random" id="btn_random_poke">
                    <i class="material-icons">casino</i> Aleatorio
                </button>
            </div>

            <!-- Team Section -->
            <div id="team_container" class="team-container animate__animated animate__fadeIn">
                <h3 class="team-title"><i class="material-icons">stars</i> Mi Equipo Multiversal (<span id="team_count">0</span>/6)</h3>
                <div id="team_grid" class="team-grid"></div>
            </div>

            <!-- Pokémon Grid -->
            <div id="poke_grid" class="poke-grid"></div>

            <!-- Loading Spinner -->
            <div id="poke_loader" class="text-center" style="display: none; margin-top: 3rem;">
                <div class="preloader-wrapper big active">
                    <div class="spinner-layer spinner-green-only">
                        <div class="circle-clipper left"><div class="circle"></div></div>
                        <div class="gap-patch"><div class="circle"></div></div>
                        <div class="circle-clipper right"><div class="circle"></div></div>
                    </div>
                </div>
                <p style="margin-top: 1rem; color: var(--text-secondary);">Sincronizando con el servidor...</p>
            </div>

            <!-- Modal for Details -->
            <div id="poke_modal" class="poke-modal" style="display: none;">
                <div class="poke-modal-content animate__animated">
                    <span class="close-modal">&times;</span>
                    <div id="poke_modal_body"></div>
                </div>
            </div>
        </div>
    `);

    initPokemonLogic();
};

const initPokemonLogic = () => {
    const $grid = $("#poke_grid");
    const $loader = $("#poke_loader");
    const $search = $("#poke_search");
    const $filter = $("#poke_type_filter");

    // Load Team from LocalStorage
    updateTeamUI();

    // Fetch Types
    $.ajax({
        url: "https://pokeapi.co/api/v2/type",
        type: "GET",
        dataType: "json"
    }).done((data) => {
        data.results.forEach(type => {
            $filter.append(`<option value="${type.name}">${type.name.toUpperCase()}</option>`);
        });
    });

    // Initial Load (First 20)
    loadPokemonList();

    // Search Event
    let debounceTimer;
    $search.on("input", function() {
        clearTimeout(debounceTimer);
        const query = $(this).val().trim().toLowerCase();
        debounceTimer = setTimeout(() => {
            if (query) searchPokemon(query);
            else loadPokemonList();
        }, 300);
    });

    // Filter Event
    $filter.on("change", function() {
        const selectedType = $(this).val();
        if (selectedType) loadPokemonByType(selectedType);
        else loadPokemonList();
    });

    // Random Button
    $("#btn_random_poke").on("click", () => {
        const randomId = Math.floor(Math.random() * 898) + 1;
        showPokemonModal(randomId);
    });

    // Close Modal
    $(".close-modal").on("click", () => {
        $("#poke_modal").fadeOut(300);
    });

    $(window).on("click", (e) => {
        if ($(e.target).is("#poke_modal")) $("#poke_modal").fadeOut(300);
    });
};

const loadPokemonList = () => {
    const $grid = $("#poke_grid");
    const $loader = $("#poke_loader");
    
    $grid.empty();
    $loader.show();

    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon?limit=12",
        type: "GET",
        dataType: "json"
    }).done((data) => {
        $loader.hide();
        data.results.forEach(pokemon => {
            const id = pokemon.url.split('/').filter(Boolean).pop();
            renderInstantCard(id, pokemon.name);
        });
    }).fail(() => {
        $loader.hide();
        $grid.html('<p style="color: #ff4444;" class="text-center">Error al conectar.</p>');
    });
};

const loadPokemonByType = (type) => {
    const $grid = $("#poke_grid");
    const $loader = $("#poke_loader");
    
    $grid.empty();
    $loader.show();

    $.ajax({
        url: `https://pokeapi.co/api/v2/type/${type}`,
        type: "GET",
        dataType: "json"
    }).done((data) => {
        $loader.hide();
        // Get first 12
        const limited = data.pokemon.slice(0, 12);
        limited.forEach(p => {
            const id = p.pokemon.url.split('/').filter(Boolean).pop();
            renderInstantCard(id, p.pokemon.name);
        });
    }).fail(() => {
        $loader.hide();
    });
};

const searchPokemon = (query) => {
    const $grid = $("#poke_grid");
    const $loader = $("#poke_loader");
    
    $grid.empty();
    $loader.show();

    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${query}`,
        type: "GET",
        dataType: "json"
    }).done((pokemon) => {
        $loader.hide();
        renderInstantCard(pokemon.id, pokemon.name, pokemon);
    }).fail(() => {
        $loader.hide();
        $grid.html('<p style="color: #ff4444; grid-column: 1/-1;" class="text-center">Pokémon no encontrado.</p>');
    });
};

// Renderiza la tarjeta AL INSTANTE sin esperar a la API de detalles
const renderInstantCard = (id, name, fullData = null) => {
    const $grid = $("#poke_grid");
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    
    const $card = $(`
        <div class="poke-card animate__animated animate__fadeInUp" data-id="${id}" data-name="${name}">
            <div class="poke-id">#${id.toString().padStart(3, '0')}</div>
            <div class="poke-img-container">
                <img src="${imageUrl}" alt="${name}" loading="lazy" class="poke-main-img">
            </div>
            <div class="poke-name">${name.toUpperCase()}</div>
            <div class="poke-types" id="types_${id}">
                <!-- Loaded dynamically -->
            </div>
            <button class="btn-catch" data-id="${id}" data-name="${name}">
                <i class="material-icons">add_circle</i> Atrapar
            </button>
        </div>
    `);

    // Click to open modal (except button)
    $card.on("click", function(e) {
        if (!$(e.target).closest(".btn-catch").length) {
            showPokemonModal(id);
        }
    });

    // Catch Button Logic
    $card.find(".btn-catch").on("click", function() {
        addToTeam(id, name, imageUrl);
    });

    $grid.append($card);

    // Fetch types in the background
    if (fullData) {
        renderTypes(id, fullData.types);
    } else {
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${id}`,
            type: "GET",
            dataType: "json"
        }).done((pokemon) => {
            renderTypes(id, pokemon.types);
        });
    }

    // Apply 3D Tilt Effect
    applyTiltEffect($card);
};

const typeColors = {
    normal: '#A8A77A', fire: '#EE8130', water: '#6390F0', electric: '#F7D02C',
    grass: '#7AC74C', ice: '#96D9D6', fighting: '#C22E28', poison: '#A040A0',
    ground: '#E2BF65', flying: '#A98FF3', psychic: '#F95587', bug: '#A8B820',
    rock: '#B6A136', ghost: '#705898', dragon: '#6F35FC', dark: '#705746',
    steel: '#B7B7CE', fairy: '#D685AD'
};

const renderTypes = (id, types) => {
    const $container = $(`#types_${id}`);
    $container.empty();
    types.forEach(t => {
        $container.append(`<span class="type-badge type-${t.type.name}">${t.type.name}</span>`);
    });

    // Dynamic Glow based on Type
    if (types.length > 0) {
        const primaryType = types[0].type.name;
        const color = typeColors[primaryType] || '#00ff88';
        $container.closest('.poke-card').css('--type-color', color);
    }
};

// Efecto 3D Tilt interactivo con color dinámico
const applyTiltEffect = ($element) => {
    $element.on("mousemove", function(e) {
        const $card = $(this);
        const color = $card.css('--type-color') || 'var(--accent-color)';
        const offset = $card.offset();
        const x = e.pageX - offset.left;
        const y = e.pageY - offset.top;
        const centerX = $card.outerWidth() / 2;
        const centerY = $card.outerHeight() / 2;
        const deltaX = x - centerX;
        const deltaY = y - centerY;
        const percentX = deltaX / centerX;
        const percentY = deltaY / centerY;
        const deg = 15;

        $card.css({
            transform: `perspective(1000px) rotateX(${-percentY * deg}deg) rotateY(${percentX * deg}deg) scale3d(1.05, 1.05, 1.05)`,
            boxShadow: `0 15px 30px ${color}`
        });
    }).on("mouseleave", function() {
        $(this).css({
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            boxShadow: 'none',
            transition: 'all 0.5s ease'
        });
    });
};

// Team Builder Logic
const getTeam = () => JSON.parse(localStorage.getItem("pokeTeam")) || [];

const addToTeam = (id, name, image) => {
    let team = getTeam();
    if (team.length >= 6) {
        showToast("¡Tu equipo está lleno! Libera a uno primero.");
        return;
    }
    if (team.find(p => p.id === id)) {
        showToast("¡Este Pokémon ya está en tu equipo!");
        return;
    }

    team.push({ id, name, image });
    localStorage.setItem("pokeTeam", JSON.stringify(team));
    updateTeamUI();
    showToast(`¡${name.toUpperCase()} atrapado!`);
};

const removeFromTeam = (id) => {
    let team = getTeam();
    team = team.filter(p => p.id !== id);
    localStorage.setItem("pokeTeam", JSON.stringify(team));
    updateTeamUI();
};

const updateTeamUI = () => {
    const team = getTeam();
    const $teamGrid = $("#team_grid");
    const $teamCount = $("#team_count");
    
    $teamCount.text(team.length);
    $teamGrid.empty();

    if (team.length === 0) {
        $teamGrid.html('<p class="text-center" style="grid-column: 1/-1; color: var(--text-secondary);">No tienes Pokémon en tu equipo.</p>');
        return;
    }

    team.forEach(p => {
        const $item = $(`
            <div class="team-item animate__animated animate__zoomIn">
                <img src="${p.image}" alt="${p.name}">
                <div class="team-item-name">${p.name.toUpperCase()}</div>
                <button class="btn-release" data-id="${p.id}">
                    <i class="material-icons">remove_circle</i>
                </button>
            </div>
        `);

        $item.find(".btn-release").on("click", () => {
            removeFromTeam(p.id);
        });

        $teamGrid.append($item);
    });
};

const showPokemonModal = (idOrName) => {
    const $modal = $("#poke_modal");
    const $modalBody = $("#poke_modal_body");
    
    $modalBody.html('<p class="text-center">Cargando...</p>');
    $modal.fadeIn(300);

    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${idOrName}`,
        type: "GET",
        dataType: "json"
    }).done((pokemon) => {
        const sprite = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
        
        $modalBody.html(`
            <div class="modal-poke-header">
                <h2>${pokemon.name.toUpperCase()}</h2>
                <div class="poke-types">
                    ${pokemon.types.map(t => `<span class="type-badge type-${t.type.name}">${t.type.name}</span>`).join('')}
                </div>
            </div>
            <div class="modal-poke-content">
                <div class="modal-poke-img">
                    <img src="${sprite}" alt="${pokemon.name}">
                </div>
                <div class="modal-poke-stats">
                    <h3>Estadísticas Base</h3>
                    ${pokemon.stats.map(s => `
                        <div class="stat-row">
                            <span class="stat-name">${s.stat.name.replace('-', ' ').toUpperCase()}</span>
                            <span class="stat-value">${s.base_stat}</span>
                            <div class="stat-bar-container">
                                <div class="stat-bar" data-val="${s.base_stat}"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `);

        setTimeout(() => {
            $(".stat-bar").each(function() {
                const val = $(this).data("val");
                const percentage = Math.min((val / 255) * 100, 100);
                $(this).animate({ width: `${percentage}%` }, 800);
            });
        }, 100);

    }).fail(() => {
        $modalBody.html('<p style="color: #ff4444;" class="text-center">Error.</p>');
    });
};

const showToast = (message) => {
    const $toast = $(`
      <div class="custom-toast animate__animated animate__fadeInUp">
        <i class="material-icons">info</i>
        <span>${message}</span>
      </div>
    `);
    $("body").append($toast);
    setTimeout(() => {
      $toast.addClass("animate__fadeOutDown");
      setTimeout(() => $toast.remove(), 500);
    }, 2000);
};
