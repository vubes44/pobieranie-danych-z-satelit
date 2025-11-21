const calculateSpeed = (radius, angle, time) => {
  const circumference = 2 * Math.PI * radius;
  const distance = (angle / 360) * circumference;
  const speed = distance / time;
  return speed;
};

const diagonal = (lon1, lat1, lon2, lat2) => {
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  return (
    R *
    2 *
    Math.asin(
      Math.sqrt(
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
      )
    )
  );
};

const calculateSpeedCoordinates = (lon1, lat1, lon2, lat2, time) => {
  const distance = diagonal(lon1, lat1, lon2, lat2);
  const speed = distance / time;
  return speed;
};

const calculateDistance = (width0, length0, width1, length1) => {
  const deltaWidth = width1 - width0;
  const deltaLength = length1 - length0;
  return Math.sqrt(deltaWidth * deltaWidth + deltaLength * deltaLength);
};

let resultDiv = document.getElementById("wynik_predkosc");
document.getElementById("oblicz_predkosc").addEventListener("click", () => {
  const radio = parseFloat(document.getElementById("promien_a").value);
  const angle = parseFloat(document.getElementById("kat_a").value);
  const time = parseFloat(document.getElementById("czas_a").value);
  const speed = calculateSpeed(radio, angle, time);
  resultDiv.innerHTML = `wynik: ${speed} m/s`;
});

let resultDiv2 = document.getElementById("wynik_droga");
document.getElementById("oblicz_droge").addEventListener("click", () => {
  const width0 = parseFloat(document.getElementById("szerokosc_0_b").value);
  const length0 = parseFloat(document.getElementById("dlugosc_0_b").value);
  const width1 = parseFloat(document.getElementById("szerokosc_1_b").value);
  const length1 = parseFloat(document.getElementById("dlugosc_1_b").value);
  const distance = calculateDistance(width0, length0, width1, length1);
  resultDiv2.innerHTML = `${distance} °`;
});

let resultDiv3 = document.getElementById("wynik_predkosc_wspolrzedne");
document
  .getElementById("oblicz_predkosc_wspolrzedne")
  .addEventListener("click", () => {
    const lon1 = parseFloat(document.getElementById("dlugosc_0_c").value);
    const lat1 = parseFloat(document.getElementById("szerokosc_0_c").value);
    const lon2 = parseFloat(document.getElementById("dlugosc_1_c").value);
    const lat2 = parseFloat(document.getElementById("szerokosc_1_c").value);
    const time = parseFloat(document.getElementById("czas_c").value);
    const speed = calculateSpeedCoordinates(lon1, lat1, lon2, lat2, time);
    resultDiv3.innerHTML = `wynik: ${speed} m/s`;
  });
