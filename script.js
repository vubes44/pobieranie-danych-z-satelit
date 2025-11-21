const API_KEY = "EkgzDLYujYKx7oRRsiL6BY";
const BASE_URL = "https://api.spectator.earth/satellite/";

function diagonal(lon1, lat1, lon2, lat2) {
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function calculateSpeed(lon1, lat1, lon2, lat2, time) {
  const distance = diagonal(lon1, lat1, lon2, lat2);
  const speed = distance / time;
  return speed;
}

async function fetchSatellites(maxId = 100) {
  document.getElementById("wypisane_dane_satelit").innerHTML = "";
  const container = document.getElementById("wypisane_dane_satelit");
  const canvas = document.getElementById("satelitaCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let id = 1; id <= maxId; id++) {
    try {
      const response = await fetch(`${BASE_URL}${id}/?api_key=${API_KEY}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const props = data.properties;
      const geo = data.geometry;
      if (geo?.coordinates?.length === 3) {
        const [lon, lat, alt] = geo.coordinates;
        const [lon2, lat2] = geo.coordinates;

        container.innerHTML += `<a href='#'> <div class='satelita'> <h3>${
          props.name
        }</h3> <strong>ID:</strong> ${
          data.id
        }<br> <strong>Platforma:</strong> ${
          props.platform ?? "brak"
        }<br> <strong>NORAD ID:</strong> ${
          props.norad_id
        }<br> <strong>Tryby:</strong> ${props.modes
          .map((m) => m.name)
          .join(
            ", "
          )}<br> <strong>Współrzędne:</strong> <br>D: ${lon}<br> S: ${lat}<br> W: ${alt}<br> 
            <strong>Prędkość</strong>: ${calculateSpeed(
              lon2,
              lat2,
              lon,
              lat,
              60
            )} m/s</div> </a>`;
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const x = ((lon + 180) / 360) * canvasWidth;
        const y = canvasHeight - ((lat + 90) / 180) * canvasHeight;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.font = "22px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(props.name, x + 15, y - 5);
        ctx.fillText(`H: ${alt}`, x + 15, y + 20);
      } else {
        container.innerHTML += `<a href='#'> <div class='satelita'> <h3>${
          props.name
        }</h3> <strong>ID:</strong> ${
          data.id
        }<br> <strong>Platforma:</strong> ${
          props.platform ?? "brak"
        }<br> <strong>NORAD ID:</strong> ${
          props.norad_id
        }<br> <strong>Tryby:</strong> ${props.modes
          .map((m) => m.name)
          .join(
            ", "
          )}<br> <strong>Współrzędne:</strong> brak danych<br> </div> </a> `;
      }
    } catch (err) {
      if (!err.message.includes("404")) {
        console.error(`Błąd dla ID ${id}:`, err.message);
      }
    }
  }
}
fetchSatellites();
setInterval(fetchSatellites, 60000);
document.getElementById("odswiez").onclick = function () {
  fetchSatellites();
};
