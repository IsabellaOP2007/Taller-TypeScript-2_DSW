import { series } from "./data.js";
const body = document.getElementById("elbody");
if (body) {
    body.addEventListener("click", (ev) => {
        const tr = ev.target.closest("tr");
        if (!tr)
            return;
        const id = Number(tr.dataset.id);
        const sel = series.find(s => s.num === id);
        if (sel) {
            [...body.querySelectorAll("tr")].forEach(r => r.classList.remove("table-active"));
            tr.classList.add("table-active");
            hacerCard(sel);
        }
    });
}
const promedioEl = document.getElementById("promedio");
const detalle = document.getElementById("detalle");
function hacerCard(serie) {
    if (!detalle)
        return;
    detalle.innerHTML = `
    <div class="card text-white bg-dark mb-3">
      <div class="card-header">
      Information
  </div>
      <img src="${serie.image}" class="card-img-top" alt="${serie.name}">
      <div class="card-body">
        <h5 class="card-title mb-1">${serie.name}</h5>
        <p class="text-muted mb-2">${serie.channel} • ${serie.seasons} seasons</p>
        <p class="card-text">${serie.description}</p>
        <a class="btn btn-primary" href="${serie.link}" target="_blank" rel="noopener">
          Ver más
        </a>
      </div>
    </div>
  `.trim();
}
function promedioS(lista) {
    let contador = lista.length;
    if (contador === 0)
        return 0;
    let total = 0;
    lista.forEach((serie) => total += serie.seasons);
    let promedio = total / contador;
    return promedio;
}
function crearFila(serie) {
    const tr = document.createElement("tr");
    tr.dataset.id = String(serie.num);
    tr.style.cursor = "pointer";
    tr.innerHTML = `
    <td>${serie.num}</td>
    <td>${serie.name}</td>
    <td>${serie.channel}</td>
    <td>${serie.seasons}</td>
  `.trim();
    return tr;
}
function hacerTabla(filas) {
    if (!body)
        throw new Error("No se encontró <tbody id='elbody'> en el HTML");
    body.innerHTML = "";
    const frag = document.createDocumentFragment();
    for (const tr of filas)
        frag.appendChild(tr);
    body.appendChild(frag);
}
const filas = series.map(crearFila);
hacerTabla(filas);
if (promedioEl) {
    promedioEl.textContent = `Promedio de temporadas: ${promedioS(series).toFixed(2)}`;
}
//# sourceMappingURL=main.js.map