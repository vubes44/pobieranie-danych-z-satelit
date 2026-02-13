<h1>Program do pobierania danych z satelit</h1>

<img width="1920" height="913" alt="satelity pnh" src="https://github.com/user-attachments/assets/95f86245-d065-4faa-a111-2e717e7950e3" />PROGRAM DO POBIERANIA DANYCH SATELIT

Projekt do pobierania danych z satelit
Aplikacja webowa do śledzenia satelit, pobierania aktualnych danych orbitalnych (TLE), wyświetlania pozycji Międzynarodowej Stacji Kosmicznej (ISS) oraz tworzenia wykresów ruchu, prędkości i wysokości.

Aplikacja składa się z 5 głównych podstron:

0. Pobieranie danych z satelit  
1. Tworzenie wykresu ruchu satelity  
2. Kalkulatory  np. do prędko<ci
ści satelity, prędkości kątowej, różnicy położenia
3. ISS (wykres, wysokość)
4. Tworzenie wykresu prędkości i wysokości z użyciem chart.js
   .
![download](https://github.com/user-attachments/assets/b89ddfb6-1fe7-45f3-9902-faa0a2de24df)
.

Główne możliwości

Pobieranie aktualnych zestawów **TLE** (Two-Line Element) dla wybranych satelit  
- Wyświetlanie bieżącej pozycji ISS w czasie rzeczywistym  
- Rysowanie trajektorii / orbity na mapie (HTML Canvas)  
- Dynamiczne wykresy zmian wysokości i prędkości (Chart.js)  
- Proste kalkulatory orbitalne (prędkość, okres obiegu, itp.)  
- Dedykowana strona z informacjami o ISS (wysokość, prędkość, widoczność)

Technologie

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
  
![Landsat 8](https://github.com/user-attachments/assets/c397472c-bfc4-4399-9e91-0a78aa076098)


INNE WAŻNE

jak działają dane orbitalne (TLE)?
TLE (Two-Line Element) to zestaw danych opisujących orbitę satelity.
Na ich podstawie można obliczyć:

aktualną pozycję satelity,

wysokość nad Ziemią,

prędkość orbitalną,

okres obiegu,

przewidywaną trajektorię.

Aplikacja pobiera aktualne TLE z zewnętrznego API i przelicza je na współrzędne geograficzne w czasie rzeczywistym.


<img width="1692" height="551" alt="kalkulatory" src="https://github.com/user-attachments/assets/84151add-07a3-45e4-999e-5d1440c33b08" />
