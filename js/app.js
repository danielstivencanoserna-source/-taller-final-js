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
        <div class="bg-[#1a1a2e] border border-[#c0fa72]/20 rounded-3xl overflow-hidden card hover:border-[#c0fa72]/60 transition-all group">
            <div class="relative">
                <img src="${personaje.image}" 
                     alt="${personaje.name}" 
                     class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300">
                <div class="absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full 
                            ${personaje.status === 'Alive' ? 'bg-green-500' : personaje.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500'}">
                    ${personaje.status}
                </div>
            </div>
            
            <div class="p-5">
                <h3 class="text-xl font-bold text-white mb-1">${personaje.name}</h3>
                <p class="text-[#c0fa72]/80 text-sm">${personaje.species} • ${personaje.gender}</p>
                
                <div class="mt-4 grid grid-cols-2 gap-3 text-xs">
                    <div>
                        <span class="block text-gray-400">Origen</span>
                        <span class="text-white">${personaje.origin.name}</span>
                    </div>
                    <div>
                        <span class="block text-gray-400">Ubicación</span>
                        <span class="text-white">${personaje.location.name}</span>
                    </div>
                </div>
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

// ==================== INICIALIZACIÓN ====================
// Cuando la página cargue, mostrar algunos personajes por defecto
window.onload = () => {
    // Opcional: cargar personajes al inicio
    // buscarPersonajes();
    
    console.log('%c🚀 Rick and Morty Explorer cargado correctamente', 'color: #c0fa72; font-weight: bold');
};