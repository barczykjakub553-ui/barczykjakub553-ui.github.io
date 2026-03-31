let map = null;
let marker = null;
let currentTiles = [];

const GRID_SIZE = 4;
const TILE_SIZE = 96;
const IMAGE_SIZE = GRID_SIZE * TILE_SIZE;

const locateBtn = document.getElementById("locateBtn");
const checkBtn = document.getElementById("checkBtn");
const resetBtn = document.getElementById("resetBtn");
const board = document.getElementById("board");
const tray = document.getElementById("tray");
const notifications = document.getElementById("notifications");

locateBtn.addEventListener("click", handleLocateClick);
checkBtn.addEventListener("click", checkWin);
resetBtn.addEventListener("click", reshuffle);

initDropContainers();

function notify(text, type = "info") {
  const item = document.createElement("div");
  item.className = `notice ${type}`;
  item.textContent = text;
  notifications.prepend(item);
}

function initMap(lat, lon) {
  if (!map) {
    map = L.map("map", {
      zoomControl: true,
      attributionControl: true
    }).setView([lat, lon], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);
  } else {
    map.setView([lat, lon], 13);
  }

  if (marker) {
    marker.setLatLng([lat, lon]);
  } else {
    marker = L.marker([lat, lon]).addTo(map);
  }

  marker.bindPopup("Twoja lokalizacja").openPopup();
}

async function handleLocateClick() {
  if (!("geolocation" in navigator)) {
    notify("Twoja przeglądarka nie obsługuje Geolocation API.", "error");
    return;
  }

  notify("Pobieram lokalizację...", "info");

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      initMap(latitude, longitude);
      notify(`Lokalizacja OK: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`, "success");

      try {
        notify("Generuję obraz mapy do układanki...", "info");
        const mapImageDataUrl = await getLeafletMapImage();
        const tiles = await sliceImageToTiles(mapImageDataUrl, GRID_SIZE);
        currentTiles = tiles;
        renderPuzzle(tiles);
        notify("Układanka gotowa. Przeciągnij kafelki na planszę.", "success");
      } catch (err) {
        notify(`Nie udało się przygotować układanki: ${err.message}`, "error");
      }
    },
    (error) => {
      const reason = geolocationErrorToText(error);
      notify(`Błąd geolokalizacji: ${reason}`, "error");
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
}

function geolocationErrorToText(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return "brak zgody użytkownika";
    case error.POSITION_UNAVAILABLE:
      return "pozycja niedostępna";
    case error.TIMEOUT:
      return "przekroczono czas oczekiwania";
    default:
      return "nieznany problem";
  }
}

// Zwraca dataURL z aktualnego widoku mapy Leaflet (z markerem)
function getLeafletMapImage() {
  return new Promise((resolve, reject) => {
    if (!map) {
      reject(new Error("Mapa nie jest zainicjalizowana."));
      return;
    }
    // Ustaw rozmiar mapy na IMAGE_SIZE x IMAGE_SIZE na czas renderowania
    const mapDiv = document.getElementById("map");
    const prevWidth = mapDiv.style.width;
    const prevHeight = mapDiv.style.height;
    mapDiv.style.width = IMAGE_SIZE + "px";
    mapDiv.style.height = IMAGE_SIZE + "px";
    map.invalidateSize();

    // leafletImage renderuje mapę do canvas
    leafletImage(map, function(err, canvas) {
      // Przywróć rozmiar mapy
      mapDiv.style.width = prevWidth;
      mapDiv.style.height = prevHeight;
      map.invalidateSize();

      if (err) {
        reject(new Error("Nie udało się wygenerować obrazu mapy."));
        return;
      }
      try {
        const dataUrl = canvas.toDataURL("image/png");
        resolve(dataUrl);
      } catch (e) {
        reject(new Error("Nie udało się pobrać obrazu z canvas."));
      }
    });
  });
}

function sliceImageToTiles(imageDataUrl, gridSize) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        const tileWidth = Math.floor(img.width / gridSize);
        const tileHeight = Math.floor(img.height / gridSize);
        const tiles = [];

        for (let row = 0; row < gridSize; row++) {
          for (let col = 0; col < gridSize; col++) {
            const index = row * gridSize + col;

            const tileCanvas = document.createElement("canvas");
            tileCanvas.width = tileWidth;
            tileCanvas.height = tileHeight;

            const tileCtx = tileCanvas.getContext("2d");
            tileCtx.drawImage(
              img,
              col * tileWidth,
              row * tileHeight,
              tileWidth,
              tileHeight,
              0,
              0,
              tileWidth,
              tileHeight
            );

            tiles.push({
              correctIndex: index,
              dataUrl: tileCanvas.toDataURL("image/png")
            });
          }
        }

        resolve(tiles);
      } catch (e) {
        reject(new Error("Obraz wczytany, ale nie da się go pociąć (canvas)."));
      }
    };
    img.onerror = () => reject(new Error("Nie można wczytać obrazu mapy z canvas."));
    img.src = imageDataUrl;
  });
}

function renderPuzzle(tiles) {
  board.innerHTML = "";
  tray.innerHTML = "";

  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    board.appendChild(createSlot(i, "board"));
    tray.appendChild(createSlot(i, "tray"));
  }

  const shuffled = shuffle([...tiles]);

  shuffled.forEach((tileObj, i) => {
    const tileEl = createTileElement(tileObj.correctIndex, tileObj.dataUrl);
    const traySlot = tray.querySelector(`.slot[data-slot-index="${i}"]`);
    traySlot.appendChild(tileEl);
  });
}

function createSlot(index, zone) {
  const slot = document.createElement("div");
  slot.className = "slot";
  slot.dataset.slotIndex = String(index);
  slot.dataset.zone = zone;

  slot.addEventListener("dragover", (e) => {
    e.preventDefault();
    slot.classList.add("over");
  });

  slot.addEventListener("dragleave", () => {
    slot.classList.remove("over");
  });

  slot.addEventListener("drop", (e) => {
    e.preventDefault();
    slot.classList.remove("over");

    const tileId = e.dataTransfer.getData("text/plain");
    if (!tileId) return;

    const dragged = document.getElementById(tileId);
    if (!dragged) return;

    if (slot.firstElementChild) {
      const fromSlot = dragged.parentElement;
      fromSlot.appendChild(slot.firstElementChild);
    }

    slot.appendChild(dragged);
  });

  return slot;
}

function createTileElement(correctIndex, dataUrl) {
  const tile = document.createElement("div");
  tile.id = `tile-${crypto.randomUUID()}`;
  tile.className = "tile";
  tile.draggable = true;
  tile.dataset.correctIndex = String(correctIndex);
  tile.style.backgroundImage = `url("${dataUrl}")`;

  tile.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", tile.id);
  });

  return tile;
}

function initDropContainers() {
  [board, tray].forEach((container) => {
    container.addEventListener("dragover", (e) => e.preventDefault());
  });
}

function checkWin() {
  const boardSlots = board.querySelectorAll(".slot");
  let allFilled = true;
  let allCorrect = true;

  boardSlots.forEach((slot) => {
    const tile = slot.firstElementChild;
    if (!tile) {
      allFilled = false;
      allCorrect = false;
      return;
    }

    if (tile.dataset.correctIndex !== slot.dataset.slotIndex) {
      allCorrect = false;
    }
  });

  if (!allFilled) {
    notify("Najpierw umieść wszystkie 16 kafelków na planszy.", "info");
    return;
  }

  if (allCorrect) {
    notify("Brawo! Układanka ułożona poprawnie.", "success");
  } else {
    notify("Jeszcze niepoprawnie. Spróbuj dalej.", "info");
  }
}

function reshuffle() {
  if (!currentTiles.length) {
    notify("Najpierw wygeneruj układankę z lokalizacji.", "info");
    return;
  }
  renderPuzzle(currentTiles);
  notify("Kafelki przetasowane.", "info");
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
