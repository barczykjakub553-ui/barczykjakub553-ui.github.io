let podpowiedz = true;
let mieszanie = false;

const GRID = 4, TILE = 96, SIZE = GRID * TILE;
let map, marker, tiles = [];
const board = document.getElementById("board"), tray = document.getElementById("tray");
const notify = (t, ty = "info") => {
  const d = document.createElement("div");
  d.className = `notice ${ty}`; d.textContent = t;
  document.getElementById("notifications").prepend(d);
};

document.getElementById("locateBtn").onclick = () => { //pobierz lokalizacje
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(async pos => {
    const { latitude: lat, longitude: lon } = pos.coords;
    if (!map) {
      map = L.map("map").setView([lat, lon], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(map);
    } else map.setView([lat, lon], 13);
    marker ? marker.setLatLng([lat, lon]) : marker = L.marker([lat, lon]).addTo(map).bindPopup("Twoja lokalizacja").openPopup();
    const img = await getMapImg();
    tiles = await sliceImg(img);
    render();
  }, e => notify("Błąd geolokalizacji", "error"));
};

document.getElementById("checkBtn").onclick = () => { //sprawdz ulozenie
  const slots = board.querySelectorAll(".slot");
  if ([...slots].some(s => !s.firstElementChild)) {
    notify('Uzupelnij pola. ', 'error');
    return;
  }
  if ([...slots].every((s, i) => s.firstElementChild.dataset.idx == i)) notify("Brawo!", "success");
  else notify("Spróbuj dalej.", "info");
};

document.getElementById("resetBtn").onclick = () => {
  if (!tiles.length) return notify("Najpierw wygeneruj układankę.", "info");
  render();
  notify("Przetasowano.", "info");
};

document.getElementById("custMap").onclick = async () => {
  if (!map) return;
  const img = await getMapImg();
  tiles = await sliceImg(img);
  render();
  notify("Układanka z widoku mapy.", "success");
};

function getMapImg() {
  return new Promise(res => {
    const m = document.getElementById("map");
    const w = m.style.width, h = m.style.height;
    m.style.width = m.style.height = SIZE + "px";
    map.invalidateSize();
    leafletImage(map, (err, c) => {
      m.style.width = w; m.style.height = h; map.invalidateSize();
      res(c.toDataURL("image/png"));
    });
  });
}

function sliceImg(url) {
  return new Promise(res => { //promise bo inaczej strona bedzie oczekiwala na wykonanie i bedzie nie responsywna
    const img = new Image();
    img.onload = () => {
      const arr = [];
      for (let r = 0; r < GRID; r++)
        for (let c = 0; c < GRID; c++) {
          const cv = document.createElement("canvas");
          cv.width = cv.height = TILE;
          cv.getContext("2d").drawImage(img, c * TILE, r * TILE, TILE, TILE, 0, 0, TILE, TILE);
          arr.push({ idx: r * GRID + c, url: cv.toDataURL("image/png") });
        }
      res(arr);
    };
    img.src = url;
  });
}

function render() {
  board.innerHTML = ""; //ukldana
  tray.innerHTML = ""; //podajnik
  for (let i = 0; i < GRID * GRID; i++) { //GRID = rozmiar, moze byc zmienny ale nie dynamiczny
    const s1 = slot(i), s2 = slot(i); //tworzy obie tablice s1 jako ukladanA oraz s2 jako podajnik
    board.appendChild(s1); tray.appendChild(s2);
  }
  shuffle([...tiles]).forEach((t, i) => {
    const el = tile(t.idx, t.url);
    tray.querySelectorAll(".slot")[i].appendChild(el);
  });
}

function slot(i) { //tworzenie slotu, id slotu jest z arg
  const d = document.createElement("div");
  d.className = "slot"; d.dataset.idx = i;
  d.ondragover = e => e.preventDefault();
  d.ondrop = e => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const el = document.getElementById(id);
    if (!el) return;
    if (d.firstElementChild) d.parentElement.appendChild(d.firstElementChild);
    d.appendChild(el);
  };
  return d;
}

function tile(idx, url) { //tworzy kafelek na podstawie obrazu, jezeli globalna podpowiedz jest wlaczona to pokazuje kolejnosc w title
  const d = document.createElement("div");
  d.id = "tile-" + Math.random();
  d.className = "tile";
  d.draggable = true;
  d.dataset.idx = idx; //id kafelka
  d.style.backgroundImage = `url("${url}")`;
  if (podpowiedz) {
    d.title = `Kafelek ${idx + 1}`;
  }
  d.ondragstart = e => e.dataTransfer.setData("text/plain", d.id);
  return d;
}


//z internetu prosta funckcja mieszajaca
//reaktywna na ,,mieszanie" ktore albo wlacza albo wylacza
function shuffle(a) {
  if (mieszanie) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  } else {
    return a;
  }
  return a;
}
