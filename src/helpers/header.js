import { template_home } from "../templates/template_home.js";
import { template_about } from "../templates/template_about.js";
import { template_technologies } from "../templates/template_technologies.js";
import { renderPokemonSection } from "./pokemon.js?v=7";

const routes = {
  "#Home": () => {
    $("#main").html(template_home);
    initHomeConsole();
  },
  "#About": () => {
    $("#main").html(template_about);
    initAboutInteractivity();
  },
  "#Tecnologías_usadas": () => {
    $("#main").html(template_technologies);
    initTechCosmos();
  },
  "#Personajes": () => renderPokemonSection()
};

const initHomeConsole = () => {
  const $input = $("#console_input");
  const $body = $("#console_body");

  $input.on("keypress", function(e) {
    if (e.which === 13) { // Enter
      const command = $(this).val().trim().toLowerCase();
      $(this).val("");

      if (!command) return;

      $body.append(`<p class="console-line">> ${command}</p>`);

      switch(command) {
        case 'help':
          $body.append(`
            <p class="console-line">[AYUDA] Comandos disponibles:</p>
            <p class="console-line"> - <span style="color: var(--accent-color);">status</span>: Estado del sistema.</p>
            <p class="console-line"> - <span style="color: var(--accent-color);">pokemon</span>: Ir a la PokéDex.</p>
            <p class="console-line"> - <span style="color: var(--accent-color);">clear</span>: Limpiar pantalla.</p>
          `);
          break;
        case 'status':
          $body.append(`<p class="console-line">[SISTEMA] Analizando multiverso...</p>`);
          setTimeout(() => {
            $body.append(`
              <p class="console-line"> - CPU: 42% (Normal)</p>
              <p class="console-line"> - Portal Energy: 9000+ GW</p>
              <p class="console-line"> - Estado: ESTABLE</p>
            `);
            $body.scrollTop($body[0].scrollHeight);
          }, 1000);
          break;
        case 'clear':
          $body.empty();
          break;
        case 'pokemon':
          $body.append(`<p class="console-line">[SISTEMA] Teletransportando...</p>`);
          setTimeout(() => {
            window.location.hash = "#Personajes";
          }, 1000);
          break;
        default:
          $body.append(`<p class="console-line" style="color: #ff4444;">Comando no reconocido. Escribe 'help'.</p>`);
      }

      // Auto scroll to bottom
      $body.scrollTop($body[0].scrollHeight);
    }
  });
};

const initAboutInteractivity = () => {
  // Scramble Text Effect
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  $(".scramble-text").on("mouseover", function() {
    let iteration = 0;
    const $this = $(this);
    const originalText = $this.data("text");
    clearInterval($this.data("interval"));
    
    $this.data("interval", setInterval(() => {
      $this.text(originalText.split("").map((letter, index) => {
        if(index < iteration) return originalText[index];
        return letters[Math.floor(Math.random() * 26)];
      }).join(""));
      
      if(iteration >= originalText.length) clearInterval($this.data("interval"));
      iteration += 1 / 3;
    }, 30));
  });

  // Drag and Drop Logic
  let draggedItem = null;

  $(".drag-item").on("dragstart", function(e) {
    draggedItem = this;
    setTimeout(() => $(this).css("opacity", "0.5"), 0);
  }).on("dragend", function() {
    setTimeout(() => $(this).css("opacity", "1"), 0);
    draggedItem = null;
  });

  $("#drop_zone").on("dragover", function(e) {
    e.preventDefault();
    $(this).css("border-color", "var(--accent-color)");
  }).on("dragleave", function(e) {
    $(this).css("border-color", "var(--text-secondary)");
  }).on("drop", function(e) {
    e.preventDefault();
    $(this).css("border-color", "var(--text-secondary)");
    if(draggedItem) {
      if($(this).text().trim() === "Suelta los bloques aquí") $(this).empty();
      $(this).append(draggedItem);
      checkDragWin();
    }
  });

  function checkDragWin() {
    const ids = [];
    $("#drop_zone .drag-item").each(function() { ids.push($(this).data("id")); });
    if(ids.join(",") === "1,2,3") {
      $("#drop_zone").css({ background: "rgba(0,255,136,0.1)", borderColor: "var(--accent-color)" });
      showToast("¡Secuencia SPA Correcta!");
    }
  }
};

const initTechCosmos = () => {
  let animationFrame;
  let isActive = true;
  let activePlanet = null;
  const cx = $("#tech_cosmos").width() / 2;
  const cy = $("#tech_cosmos").height() / 2;

  function animate() {
    if (!isActive) return;
    $(".orbit-node").each(function() {
      let angle = parseFloat($(this).data("angle"));
      const radius = parseFloat($(this).data("radius"));
      const speed = parseFloat($(this).data("speed"));
      
      angle += speed;
      $(this).data("angle", angle);
      
      const x = cx + radius * Math.cos(angle) - $(this).width() / 2;
      const y = cy + radius * Math.sin(angle) - $(this).height() / 2;
      
      $(this).css({ left: x + 'px', top: y + 'px' });
    });

    if (activePlanet) {
      const nodePos = activePlanet.position();
      const px = nodePos.left + activePlanet.width() / 2;
      const py = nodePos.top + activePlanet.height() / 2;
      
      // Curva Bezier Cuadrática (Q): M startX startY Q controlX controlY endX endY
      // El punto de control lo ponemos a 90 grados para que la curva sea siempre visible y flexible
      const controlX = cx + (px - cx) * 0.5 - (py - cy) * 0.3;
      const controlY = cy + (py - cy) * 0.5 + (px - cx) * 0.3;
      
      const pathData = `M ${cx},${cy} Q ${controlX},${controlY} ${px},${py}`;
      $("#laser_path").attr("d", pathData);
    }

    animationFrame = requestAnimationFrame(animate);
  }
  animate();

  $(".orbit-node").on("click", function() {
    const info = $(this).data("info");
    $("#cosmos_info").text(info).hide().fadeIn(300);
    
    activePlanet = $(this);
    $("#laser_path").css("opacity", 1);
  });

  // Cleanup on hash change
  $(window).on("hashchange", function() {
    if(window.location.hash !== "#Tecnologías_usadas") {
        isActive = false;
        cancelAnimationFrame(animationFrame);
    }
  });
};

// Mover showToast a nivel superior para que esté disponible
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

export const headerLinks = () => {
  const headerOptions = ["Home", "About", "Personajes", "Tecnologías_usadas"];
  const routeNames = ["#Home", "#About", "#Personajes", "#Tecnologías_usadas"];

  // Initialize Menu
  $("#header_menu")
    .children()
    .each((index, element) => {
      const label = headerOptions[index].replace('_', ' ');
      $(element).html(`<p>${label}</p>`);
      $(element).on("click", () => {
        window.location.hash = routeNames[index];
      });
    });

  // Add Dark/Light Mode Toggle
  if ($("#theme_toggle").length === 0) {
    $(".nav-container").append(`
      <button id="theme_toggle" class="theme-toggle" title="Cambiar Tema">
        <i class="material-icons">brightness_4</i>
      </button>
    `);

    $("#theme_toggle").on("click", () => {
      $("body").toggleClass("light-theme");
      const isLight = $("body").hasClass("light-theme");
      $("#theme_toggle i").text(isLight ? "brightness_7" : "brightness_4");
      
      // Feedback Toast (jQuery Animation)
      showToast(isLight ? "Modo Claro Activado" : "Modo Oscuro Activado");
    });
  }


  // Router
  const router = () => {
    const hash = decodeURIComponent(window.location.hash) || "#Home";
    if (routes[hash]) {
      routes[hash]();
      
      // Update active state
      $("#header_menu .header_menu_item p").css("color", "var(--text-secondary)");
      $("#header_menu .header_menu_item").each((index, element) => {
        if (routeNames[index] === hash) {
          $(element).find("p").css("color", "var(--accent-color)");
        }
      });
    }
  };

  $(window).on("hashchange", router);
  router(); // Initial load
};
