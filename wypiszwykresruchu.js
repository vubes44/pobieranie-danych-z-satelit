const API_KEY = "AAtvpD6uSh6ZCVanp9qRxz";
const BASE_URL = "https://api.spectator.earth/satellite/";

function updateClock() {
  const now = new Date();
  const formattedTime = now
    .toISOString()
    .replace("T", " ")
    .substring(0, 23)
    .replace(/-/g, ":");
  document.getElementById("zegar").textContent = formattedTime;
}

async function fetchPosition(satelliteId) {
  try {
    const res = await fetch(`${BASE_URL}${satelliteId}/?api_key=${API_KEY}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const props = data.properties || {};
    const geo = data.geometry;
    if (!geo || !geo.coordinates) return null;

    let coord = null;
    if (
      Array.isArray(geo.coordinates) &&
      typeof geo.coordinates[0] === "number"
    ) {
      coord = geo.coordinates;
    } else if (
      Array.isArray(geo.coordinates) &&
      Array.isArray(geo.coordinates[0])
    ) {
      coord = geo.coordinates[geo.coordinates.length - 1];
    }
    if (!coord || typeof coord[0] !== "number" || typeof coord[1] !== "number")
      return null;
    const now = new Date();
    const formattedTime = now
      .toISOString()
      .replace("T", " ")
      .substring(0, 23)
      .replace(/-/g, ":");

    document.getElementById(
      "tabela_wspolrzednych"
    ).innerHTML += `<td>${formattedTime}</td><td>${coord[0]}</td><td>${coord[1]}</td><td>${coord[2]}</td>`;
    document.getElementById("nazwaSatelity").textContent = `ID ${satelliteId} ${
      props.name || satelliteId
    }`;

    return {
      lon: coord[0],
      lat: coord[1],
      alt: coord.length >= 3 ? coord[2] : undefined,
      name: props.name || satelliteId,
    };
  } catch (err) {
    if (!String(err.message).includes("404")) {
      console.error(
        `Błąd pobierania pozycji dla ID ${satelliteId}:`,
        err.message
      );
    }
    return null;
  }
}

function renderPath(canvas, path) {
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  if (!Array.isArray(path) || path.length === 0) return;

  const project = ({ lon, lat }) => {
    const x = ((lon + 180) / 360) * w;
    const y = h - ((lat + 90) / 180) * h;
    return { x, y };
  };

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#ff5722";
  const p0 = project(path[0]);
  ctx.moveTo(p0.x, p0.y);
  for (let i = 1; i < path.length; i++) {
    const p = project(path[i]);
    ctx.lineTo(p.x, p.y);
  }
  ctx.stroke();

  for (let i = 0; i < path.length; i++) {
    const p = project(path[i]);
    if (i === 0) {
      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
      ctx.fill();
    } else if (i === path.length - 1) {
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 6, 0, 2 * Math.PI);
      ctx.fill();
    } else {
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  ctx.font = "16px Arial";
  ctx.fillStyle = "black";
  const first = path[0];
  const last = path[path.length - 1];
  const pf = project(first);
  const pl = project(last);
  ctx.fillText(`${first.name}`, pf.x + 8, pf.y - 8);
  ctx.fillText(`${last.name}`, pl.x + 8, pl.y - 8);
  if (first.alt !== undefined)
    ctx.fillText(`H: ${Math.round(first.alt)}`, pf.x + 8, pf.y + 12);
  if (last.alt !== undefined)
    ctx.fillText(`H: ${Math.round(last.alt)}`, pl.x + 8, pl.y + 12);
}

async function drawChart(satelliteId) {
  const canvas = document.getElementById("satelliteChart");
  if (!canvas) return;

  if (window._satelliteAnimationInterval) {
    clearInterval(window._satelliteAnimationInterval);
    window._satelliteAnimationInterval = null;
  }
  if (window._satelliteMinuteInterval) {
    clearInterval(window._satelliteMinuteInterval);
    window._satelliteMinuteInterval = null;
  }
  window._satellitePrevPosition = null;
  window._satellitePath = [];

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const first = await fetchPosition(satelliteId);
  if (!first) {
    alert("Brak satelity");
    return;
  }
  window._satellitePrevPosition = first;
  window._satellitePath.push(first);
  renderPath(canvas, window._satellitePath);

  window._satelliteMinuteInterval = setInterval(async () => {
    const current = await fetchPosition(satelliteId);
    if (!current) {
      console.warn("Brak danych");
      return;
    }

    window._satellitePath.push(current);
    renderPath(canvas, window._satellitePath);

    window._satellitePrevPosition = current;
  }, 60_000);
}

document.getElementById("pokaz_wykres").onclick = () => {
  let satelliteId = document.getElementById("sat_id").value;
  if (!satelliteId) {
    alert("Niepoprawne ID satelity");
    return;
  }

  drawChart(satelliteId);
};

async function fetchSatelliteIndex() {
  try {
    const res = await fetch(`${BASE_URL}?api_key=${API_KEY}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const features = data.features || (Array.isArray(data) ? data : []);
    const index = {};

    if (Array.isArray(features)) {
      features.forEach((f) => {
        const props = f.properties || {};
        const id =
          f.id ||
          props.id ||
          props.satellite_id ||
          props.norad_id ||
          props.norad_cat_id;
        const name =
          props.name || props.title || f.name || (id ? `${id}` : null);
        if (id && name) index[name] = id;
      });
    }

    return index;
  } catch (err) {
    console.error("Błąd pobierania listy", err.message || err);
    return {};
  }
}

setInterval(updateClock, 1);
