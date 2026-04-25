// ==================== APP RICK AND MORTY ====================

const resultsContainer = document.getElementById('results');
const searchInput = document.getElementById('searchInput');

// Función para limpiar resultados antes de nueva búsqueda
function limpiarResultados() {
    resultsContainer.innerHTML = '';
}

// Función para mostrar estado de carga
function mostrarCargando() {
    limpiarResultados();
    resultsContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center py-20">
            <div class="w-20 h-20 border-4 border-[#c0fa72] border-t-transparent rounded-full animate-spin"></div>
            <p class="mt-8 text-xl text-[#c0fa72]/80 font-medium">Abriendo portal dimensional...</p>
        </div>
    `;
}

// Función para mostrar error
function mostrarError(mensaje = "Error al conectar con el multiverso") {
    limpiarResultados();
    resultsContainer.innerHTML = `
        <div class="max-w-md mx-auto bg-red-950/50 border border-red-500/50 rounded-2xl p-8 text-center">
            <span class="material-symbols-outlined text-6xl text-red-400 mb-4">error</span>
            <h3 class="text-2xl font-bold text-red-300 mb-3">¡Portal fallido!</h3>
            <p class="text-red-200">${mensaje}</p>
            <button onclick="buscarPersonajes()" 
                    class="mt-6 bg-[#c0fa72] text-black px-6 py-3 rounded-full font-bold hover:bg-[#a1e65c]">
                Intentar de nuevo
            </button>
        </div>
    `;
}

// Función genérica para hacer fetch a la API
async function fetchAPI(endpoint) {
    try {
        mostrarCargando();
        const response = await fetch(`https://rickandmortyapi.com/api/${endpoint}`);

        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la petición:", error);
        mostrarError("No se pudo conectar con la API de Rick and Morty");
        return null;
    }
}

// ==================== PERSONAJES ====================
async function buscarPersonajes() {
    const query = searchInput.value.trim();
    let url = 'character';

    if (query) {
        url += `/?name=${encodeURIComponent(query)}`;
    }

    const data = await fetchAPI(url);
    if (!data || !data.results) return;

    mostrarResultadosPersonajes(data.results);
}

function mostrarResultadosPersonajes(personajes) {
    limpiarResultados();

    if (personajes.length === 0) {
        resultsContainer.innerHTML = `<p class="text-center text-xl py-10">No se encontraron personajes con ese nombre.</p>`;
        return;
    }

    const html = personajes.map(personaje => `
       <div onclick="mostrarModalPersonaje(${personaje.id})" 
         class="bg-[#1a1a2e] border border-[#c0fa72]/20 rounded-3xl overflow-hidden cursor-pointer hover:border-[#c0fa72]/60 hover:-translate-y-3 transition-all duration-300 group shadow-2xl">
        
        <div class="relative">
            <img src="${personaje.image}" 
                 alt="${personaje.name}" 
                 class="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300">
            
            <div class="absolute top-4 right-4 px-4 py-1 text-sm font-bold rounded-full 
                        ${personaje.status === 'Alive' ? 'bg-green-500 text-white' : personaje.status === 'Dead' ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'}">
                ${personaje.status}
            </div>
        </div>
        
        <!-- Información -->
        <div class="p-6">
            <h3 class="text-2xl font-bold text-white mb-2 line-clamp-2">${personaje.name}</h3>
            <p class="text-[#c0fa72] text-lg">${personaje.species}</p>
            <p class="text-gray-400 text-sm mt-1">${personaje.gender}</p>
        </div>
    </div>
`).join('');

    resultsContainer.innerHTML = html;
}

// ==================== EPISODIOS ====================
async function buscarEpisodios() {
    const data = await fetchAPI('episode');
    if (!data || !data.results) return;

    mostrarResultadosEpisodios(data.results);
}

function mostrarResultadosEpisodios(episodios) {
    limpiarResultados();

    const html = episodios.map(ep => `
        <div class="bg-[#1a1a2e] border border-[#c0fa72]/20 rounded-3xl p-6 hover:border-[#c0fa72]/60 transition-all">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <span class="text-[#c0fa72] text-sm font-mono">${ep.episode}</span>
                    <h3 class="text-lg font-bold mt-1">${ep.name}</h3>
                </div>
                <div class="text-right text-xs text-gray-400">
                    ${new Date(ep.air_date).toLocaleDateString('es-ES')}
                </div>
            </div>
            
            <div class="text-sm text-gray-300">
                Personajes: <span class="text-[#c0fa72]">${ep.characters.length}</span>
            </div>
        </div>
    `).join('');

    resultsContainer.innerHTML = html;
}

// ==================== LOCACIONES ====================
async function buscarLocaciones() {
    const data = await fetchAPI('location');
    if (!data || !data.results) return;

    mostrarResultadosLocaciones(data.results);
}

function mostrarResultadosLocaciones(locaciones) {
    limpiarResultados();

    const html = locaciones.map(loc => `
        <div class="bg-[#1a1a2e] border border-[#c0fa72]/20 rounded-3xl p-6 hover:border-[#c0fa72]/60 transition-all">
            <h3 class="text-xl font-bold text-white mb-2">${loc.name}</h3>
            <p class="text-[#c0fa72] text-sm">${loc.type}</p>
            <p class="text-gray-400 text-sm mt-1">${loc.dimension}</p>
            
            <div class="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-500">
                Residentes: ${loc.residents.length}
            </div>
        </div>
    `).join('');

    resultsContainer.innerHTML = html;
}

// ==================== MODAL PERSONAJE ====================
async function mostrarModalPersonaje(id) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');

    // Mostrar modal con spinner
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';

    modalBody.innerHTML = `
        <div class="flex items-center justify-center py-20">
            <div class="w-16 h-16 border-4 border-[#c0fa72] border-t-transparent rounded-full animate-spin"></div>
        </div>
    `;

    try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const p = await res.json();

        // Traer nombre del primer y último episodio
        const epIds = p.episode.map(e => e.split('/').pop());
        const primerEp = await fetch(p.episode[0]).then(r => r.json());
        const ultimoEp = p.episode.length > 1
            ? await fetch(p.episode[p.episode.length - 1]).then(r => r.json())
            : primerEp;

        const statusColor = p.status === 'Alive'
            ? 'bg-green-500' : p.status === 'Dead'
            ? 'bg-red-500' : 'bg-gray-500';

        modalBody.innerHTML = `
            <!-- Imagen header -->
            <div class="relative">
                <img src="${p.image}" alt="${p.name}"
                    class="w-full h-72 object-cover object-top rounded-t-3xl">
                <div class="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent rounded-t-3xl"></div>
                <div class="absolute bottom-4 left-6">
                    <span class="px-3 py-1 text-sm font-bold rounded-full ${statusColor} text-white flex items-center gap-2 w-fit">
                        <span class="w-2 h-2 rounded-full bg-white/70 inline-block"></span>
                        ${p.status}
                    </span>
                </div>
            </div>

            <!-- Info -->
            <div class="p-8">
                <h2 class="text-4xl font-black text-white mb-6">${p.name}</h2>

                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div class="bg-[#0d0d16] rounded-2xl p-4">
                        <p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Especie</p>
                        <p class="text-[#c0fa72] font-bold text-lg">${p.species}</p>
                    </div>
                    <div class="bg-[#0d0d16] rounded-2xl p-4">
                        <p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Género</p>
                        <p class="text-[#c0fa72] font-bold text-lg">${p.gender}</p>
                    </div>
                    <div class="bg-[#0d0d16] rounded-2xl p-4">
                        <p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Origen</p>
                        <p class="text-white font-semibold">${p.origin.name}</p>
                    </div>
                    <div class="bg-[#0d0d16] rounded-2xl p-4">
                        <p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Última ubicación</p>
                        <p class="text-white font-semibold">${p.location.name}</p>
                    </div>
                </div>

                <!-- Episodios -->
                <div class="bg-[#0d0d16] rounded-2xl p-4">
                    <p class="text-xs text-gray-500 uppercase tracking-widest mb-3">Apariciones</p>
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-xs text-gray-500">Primer episodio</p>
                            <p class="text-white font-semibold">${primerEp.episode} — ${primerEp.name}</p>
                        </div>
                        <div class="text-center px-4">
                            <p class="text-3xl font-black text-[#c0fa72]">${epIds.length}</p>
                            <p class="text-xs text-gray-500">episodios</p>
                        </div>
                        <div class="text-right">
                            <p class="text-xs text-gray-500">Último episodio</p>
                            <p class="text-white font-semibold">${ultimoEp.episode} — ${ultimoEp.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } catch (e) {
        modalBody.innerHTML = `<p class="text-red-400 text-center py-10">Error cargando datos del personaje.</p>`;
    }
}

function cerrarModal(event) {
    // Solo cerrar si se hace clic en el fondo oscuro
    if (event.target === document.getElementById('modal')) {
        cerrarModalBtn();
    }
}

function cerrarModalBtn() {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
}

// Cerrar con Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') cerrarModalBtn();
});

// ==================== INICIALIZACIÓN ====================
// Cuando la página cargue, mostrar algunos personajes por defecto
window.onload = () => {
    // Opcional: cargar personajes al inicio
    // buscarPersonajes();

    console.log('%c🚀 Rick and Morty Explorer cargado correctamente', 'color: #c0fa72; font-weight: bold');
};

