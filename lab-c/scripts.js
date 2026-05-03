let podpowiedz = true;
let mieszanie = false;

const GRID = 4, TILE = 96, SIZE = GRID * TILE; //rozmiary
let map, marker, tiles = [];
//boardy oba, tak naprawde divy z dziecmi canvas
const board = document.getElementById("board"), tray = document.getElementById("tray");
const notify = (t, ty = "info") => {
  const d = document.createElement("div");
  d.className = `notice ${ty}`; d.textContent = t;
  document.getElementById("notifications").prepend(d);
};

document.getElementById("locateBtn").onclick = () => { //pobierz lokalizacje
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(async pos => {
    const { latitude: lat, longitude: lon } = pos.coords; //dane do init
    if (!map) { //tworzenie mapy jak jej brak
      map = L.map("map").setView([lat, lon], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(map);
    } else { //aktualizacja istniejacej mapy
      map.setView([lat, lon], 13);
    }
    marker ? marker.setLatLng([lat, lon]) : marker = L.marker([lat, lon]).addTo(map).bindPopup("Twoja lokalizacja").openPopup();
    const img = await getMapImg();
    tiles = await sliceImg(img);
    render();
  }, e => notify("Error geolokalizacji", "error"));
};

document.getElementById("checkBtn").onclick = () => { //sprawdz ulozenie
  const slots = board.querySelectorAll(".slot");
  if ([...slots].some(s => !s.firstElementChild)) { //jezeli nie ma wszystkich klockow
    notify('Uzupelnij pola. ', 'error');
    return;
  }
  //klocki sa, czy odpowiednio?
  if ([...slots].every((s, i) => s.firstElementChild.dataset.idx == i)) notify("Brawo!", "success");
  //klocki sa ale nie ma ulozenia
  else notify("Spróbuj dalej.", "info");
};

document.getElementById("resetBtn").onclick = () => {
  if (!tiles.length) return notify("najpierw ukladanka.", "info");
  render();
};

document.getElementById("custMap").onclick = async () => { //ukladanka z customowego widoku
  if (!map) return; //musi byc mapa
  //logika taka sama jak podstawowo przy geokolokalizacji
  const img = await getMapImg();
  tiles = await sliceImg(img);
  render();
};

function getMapImg() {
  return new Promise(res => { //musi byc promise bo inaczej beda problemy z kolejnoscia
    const m = document.getElementById("map");
    const w = m.style.width;
    const h = m.style.height;
    m.style.width = m.style.height = SIZE + "px";
    leafletImage(map, (err, c) => {
      m.style.width = w; m.style.height = h; map.invalidateSize();
      res(c.toDataURL("image/png"));
    });
  });
}

function sliceImg(url) {
  return new Promise(res => { //promise bo inaczej strona bedzie oczekiwala na wykonanie i bedzie nie responsywna
    const img = new Image(); //image z html
    img.onload = () => {
      const arr = [];
      for (let r = 0; r < GRID; r++)
        for (let c = 0; c < GRID; c++) {
          const cv = document.createElement("canvas"); //dla r oraz c tworzymy nowy canvas, nastepnie rysujemy drawImage
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
  shuffle([...tiles]).forEach((t, i) => { //algorytm z internetu, nie znam go  sorry
    const el = tile(t.idx, t.url);
    tray.querySelectorAll(".slot")[i].appendChild(el);
  });
}

function slot(i) { //tworzenie slotu, id slotu jest z arg
  const d = document.createElement("div");
  d.className = "slot"; d.dataset.idx = i;
  d.ondragover = e => e.preventDefault();
  d.ondrop = e => {
    e.preventDefault(); //stopujemy natywnie zachowanie strony, przewaznie takie samo ale np safari dziala inaczej (idk)
    const id = e.dataTransfer.getData("text/plain");
    const el = document.getElementById(id); //html element
    if (!el) {
      return;
    }
    if (d.firstElementChild) {
      d.parentElement.appendChild(d.firstElementChild);
    }
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
  d.style.backgroundImage = `url("${url}")`; //obraz kafelka czyli w zasadzie kafelek z funkcji image ktora przyjmuje link do arg
  if (podpowiedz) {
    d.title = `kafel ${idx + 1}`;
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
