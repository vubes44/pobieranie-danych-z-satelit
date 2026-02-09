Projekt do pobierania danych z satelit
# Program do pobierania danych z satelit

Prosta aplikacja webowa do śledzenia satelit, pobierania aktualnych danych orbitalnych (TLE), wyświetlania pozycji Międzynarodowej Stacji Kosmicznej (ISS) oraz tworzenia wykresów ruchu, prędkości i wysokości.

Aplikacja składa się z 5 głównych podstron:

0. Pobieranie danych z satelit  
1. Tworzenie wykresu ruchu satelity  
2. Kalkulatory  
3. ISS  
4. Tworzenie wykresu prędkości i wysokości


## Główne możliwości

- Pobieranie aktualnych zestawów **TLE** (Two-Line Element) dla wybranych satelit  
- Wyświetlanie bieżącej pozycji ISS w czasie rzeczywistym  
- Rysowanie trajektorii / orbity na mapie (HTML Canvas)  
- Dynamiczne wykresy zmian wysokości i prędkości (Chart.js)  
- Proste kalkulatory orbitalne (prędkość, okres obiegu, itp.)  
- Dedykowana strona z informacjami o ISS (wysokość, prędkość, widoczność)

## Technologie

- **Framework**: Vue.js 3 + Vite  
- **Budowanie**: Vite + Esbuild  
- **Języki**: HTML5, CSS3, JavaScript (ESNext)  
- **Wykresy i canvas**: Chart.js, HTML Canvas  
- **Źródła danych (API)**:
  - TLE API → https://tle.ivanstanojevic.me/
  - Where The ISS At? API → https://api.wheretheiss.at/
  - Spectator Earth API → https://api.spectator.earth/ (pozycje, przeloty)
- **Narzędzia**: Visual Studio Code, GitHub, PowerShell  
- **Format**: JSON
