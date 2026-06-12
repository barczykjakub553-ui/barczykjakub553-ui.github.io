// Baza pytań — Prezentacja 1: Struktura, treść i semantyka (HTML/CSS)
// Format: { q: pytanie, a: [odpowiedzi], correct: indeks poprawnej (0-3) }
// Kolejne prezentacje będą dopisywane do tej samej tablicy.

const CATEGORY_RANGES = [
    { name: "HTML — wprowadzenie",          count: 16 },
    { name: "Obrazki, hiperłącza, multimedia", count: 12 },
    { name: "Listy i tabele",               count: 8  },
    { name: "Semantyka HTML5",              count: 10 },
    { name: "Formularze",                   count: 16 },
    { name: "Podstawy CSS i kaskadowość",   count: 6  },
    { name: "Pseudoklasy i pseudoelementy", count: 8  },
    { name: "Transform i transition",       count: 3  },
    { name: "@media i RWD",                 count: 4  },
    { name: "Flexbox",                      count: 7  },
    { name: "CSS Grid",                     count: 4  },
    { name: "Preprocesory CSS / LESS",      count: 7  },
    { name: "JavaScript — podstawy",        count: 22 },
    { name: "PHP — podstawy",               count: 16 },
    { name: "PHP — OOP i bazy danych",      count: 11 },
    { name: "Node.js i Express.js",         count: 10 },
    { name: "TypeScript — podstawy",        count: 12 },
    { name: "PHP — HTTP, Regex i Web Services", count: 12 }
];

const QUESTIONS = [
    // ===== PREZENTACJA 1: HTML — wprowadzenie =====
    {
        q: "Który deklaracja DOCTYPE jest poprawna dla HTML5?",
        a: ["<!DOCTYPE HTML5>", "<!DOCTYPE html>", "<!DOCTYPE html PUBLIC \"-//W3C//DTD\">", "<DOCTYPE html>"],
        correct: 1
    },
    {
        q: "Do czego służy atrybut <code>lang</code> w znaczniku <code>&lt;html&gt;</code>?",
        a: ["Określa język programowania strony", "Określa główny język dokumentu (ważne m.in. dla czytników ekranu)", "Definiuje kodowanie znaków", "Ustawia format daty"],
        correct: 1
    },
    {
        q: "Który ze znaczników NIE wymaga zamknięcia w HTML5?",
        a: ["<code>&lt;p&gt;</code>", "<code>&lt;div&gt;</code>", "<code>&lt;br&gt;</code>", "<code>&lt;span&gt;</code>"],
        correct: 2
    },
    {
        q: "Które kodowanie znaków jest obecnie najbardziej zalecane?",
        a: ["Windows-1250", "ISO-8859-2", "UTF-8", "ASCII"],
        correct: 2
    },
    {
        q: "Co zawiera sekcja <code>&lt;head&gt;</code>?",
        a: ["Główną widoczną treść strony", "Metadane, tytuł, dołączenia CSS i JS", "Stopkę strony", "Tylko logo i menu"],
        correct: 1
    },
    {
        q: "Co zawiera sekcja <code>&lt;body&gt;</code>?",
        a: ["Metadane i tytuł", "Całą widoczną treść strony", "Tylko skrypty JavaScript", "Wyłącznie style CSS"],
        correct: 1
    },
    {
        q: "Jak HTML traktuje wiele kolejnych białych znaków?",
        a: ["Każdy jest osobno renderowany", "Wszystkie traktowane są jako jeden biały znak", "Są ignorowane całkowicie", "Tworzą nowe linie"],
        correct: 1
    },
    {
        q: "Który znacznik oznacza tekst pogrubiony wizualnie (bez znaczenia semantycznego)?",
        a: ["<code>&lt;strong&gt;</code>", "<code>&lt;bold&gt;</code>", "<code>&lt;b&gt;</code>", "<code>&lt;em&gt;</code>"],
        correct: 2
    },
    {
        q: "Który znacznik oznacza tekst o silnym znaczeniu (semantyczne pogrubienie)?",
        a: ["<code>&lt;b&gt;</code>", "<code>&lt;strong&gt;</code>", "<code>&lt;i&gt;</code>", "<code>&lt;mark&gt;</code>"],
        correct: 1
    },
    {
        q: "Który znacznik oznacza kursywę wizualną?",
        a: ["<code>&lt;em&gt;</code>", "<code>&lt;italic&gt;</code>", "<code>&lt;i&gt;</code>", "<code>&lt;cursive&gt;</code>"],
        correct: 2
    },
    {
        q: "Który znacznik oznacza wyróżnienie semantyczne (emphasis)?",
        a: ["<code>&lt;i&gt;</code>", "<code>&lt;em&gt;</code>", "<code>&lt;strong&gt;</code>", "<code>&lt;mark&gt;</code>"],
        correct: 1
    },
    {
        q: "Ile razy na stronie powinien wystąpić znacznik <code>&lt;h1&gt;</code>?",
        a: ["Co najmniej trzy razy", "Dokładnie jeden raz", "Dowolnie wiele razy", "Nie powinien być używany"],
        correct: 1
    },
    {
        q: "Jaka jest encja HTML znaku <code>&amp;</code>?",
        a: ["<code>&amp;and;</code>", "<code>&amp;amp;</code>", "<code>&amp;ampersand;</code>", "<code>&amp;et;</code>"],
        correct: 1
    },
    {
        q: "Jaka jest encja twardej spacji (non-breaking space)?",
        a: ["<code>&amp;space;</code>", "<code>&amp;sp;</code>", "<code>&amp;nbsp;</code>", "<code>&amp;hsp;</code>"],
        correct: 2
    },
    {
        q: "Jaka jest poprawna składnia komentarza HTML?",
        a: ["<code>// komentarz</code>", "<code>/* komentarz */</code>", "<code>&lt;!-- komentarz --&gt;</code>", "<code># komentarz</code>"],
        correct: 2
    },
    {
        q: "Który znacznik służy do grupowania fragmentu tekstu w linii (inline) w celu stylowania?",
        a: ["<code>&lt;div&gt;</code>", "<code>&lt;section&gt;</code>", "<code>&lt;span&gt;</code>", "<code>&lt;p&gt;</code>"],
        correct: 2
    },

    // ===== Obrazki, hiperłącza, multimedia =====
    {
        q: "Która właściwość CSS definiuje ramkę elementu?",
        a: ["<code>frame</code>", "<code>outline</code>", "<code>border</code>", "<code>edge</code>"],
        correct: 2
    },
    {
        q: "Która właściwość CSS zaokrągla rogi elementu?",
        a: ["<code>corner-radius</code>", "<code>border-round</code>", "<code>border-radius</code>", "<code>round</code>"],
        correct: 2
    },
    {
        q: "Co oznacza margines zewnętrzny w CSS?",
        a: ["<code>padding</code>", "<code>margin</code>", "<code>spacing</code>", "<code>gap</code>"],
        correct: 1
    },
    {
        q: "Co oznacza margines wewnętrzny (odstęp od krawędzi do treści) w CSS?",
        a: ["<code>margin</code>", "<code>padding</code>", "<code>inset</code>", "<code>gap</code>"],
        correct: 1
    },
    {
        q: "Która właściwość CSS odpowiada za przezroczystość elementu?",
        a: ["<code>transparency</code>", "<code>opacity</code>", "<code>alpha</code>", "<code>visible</code>"],
        correct: 1
    },
    {
        q: "Która właściwość CSS pozwala na opływanie tekstu wokół obrazka?",
        a: ["<code>position</code>", "<code>float</code>", "<code>flow</code>", "<code>wrap</code>"],
        correct: 1
    },
    {
        q: "Co oznacza wartość <code>position: absolute</code>?",
        a: ["Pozycjonowanie względem miejsca renderowania", "Pozycjonowanie względem strony lub najbliższego elementu z position: relative", "Element pozostaje w przepływie dokumentu", "Element ma stałą pozycję podczas przewijania"],
        correct: 1
    },
    {
        q: "Co oznacza wartość <code>position: relative</code>?",
        a: ["Pozycjonowanie względem viewportu", "Przesunięcie względem miejsca, gdzie element zostałby wyrenderowany", "Pełne pozycjonowanie absolutne", "Element znika z dokumentu"],
        correct: 1
    },
    {
        q: "Do czego służy właściwość <code>z-index</code>?",
        a: ["Do indeksowania elementów dla SEO", "Do określania kolejności nakładania elementów (im wyższa wartość, tym bliżej oczu)", "Do sortowania listy", "Do animacji ruchu w osi Z"],
        correct: 1
    },
    {
        q: "Który znacznik HTML służy do tworzenia hiperłącza?",
        a: ["<code>&lt;link&gt;</code>", "<code>&lt;a&gt;</code>", "<code>&lt;href&gt;</code>", "<code>&lt;url&gt;</code>"],
        correct: 1
    },
    {
        q: "Który atrybut określa adres docelowy linku?",
        a: ["<code>src</code>", "<code>link</code>", "<code>href</code>", "<code>url</code>"],
        correct: 2
    },
    {
        q: "Jak wymusić otwarcie linku w nowej zakładce?",
        a: ["<code>new=\"true\"</code>", "<code>target=\"_blank\"</code>", "<code>open=\"new\"</code>", "<code>tab=\"new\"</code>"],
        correct: 1
    },

    // ===== Listy i tabele =====
    {
        q: "Który znacznik tworzy listę numerowaną?",
        a: ["<code>&lt;ul&gt;</code>", "<code>&lt;ol&gt;</code>", "<code>&lt;nl&gt;</code>", "<code>&lt;list&gt;</code>"],
        correct: 1
    },
    {
        q: "Który znacznik tworzy listę wypunktowaną (nieuporządkowaną)?",
        a: ["<code>&lt;ul&gt;</code>", "<code>&lt;ol&gt;</code>", "<code>&lt;bl&gt;</code>", "<code>&lt;list&gt;</code>"],
        correct: 0
    },
    {
        q: "Który znacznik oznacza element listy?",
        a: ["<code>&lt;item&gt;</code>", "<code>&lt;li&gt;</code>", "<code>&lt;el&gt;</code>", "<code>&lt;point&gt;</code>"],
        correct: 1
    },
    {
        q: "Który znacznik definiuje tabelę?",
        a: ["<code>&lt;grid&gt;</code>", "<code>&lt;tab&gt;</code>", "<code>&lt;table&gt;</code>", "<code>&lt;data&gt;</code>"],
        correct: 2
    },
    {
        q: "Który znacznik definiuje wiersz tabeli?",
        a: ["<code>&lt;td&gt;</code>", "<code>&lt;tr&gt;</code>", "<code>&lt;th&gt;</code>", "<code>&lt;row&gt;</code>"],
        correct: 1
    },
    {
        q: "Który znacznik definiuje zwykłą komórkę tabeli?",
        a: ["<code>&lt;tr&gt;</code>", "<code>&lt;th&gt;</code>", "<code>&lt;td&gt;</code>", "<code>&lt;cell&gt;</code>"],
        correct: 2
    },
    {
        q: "Do czego służy atrybut <code>colspan</code>?",
        a: ["Do łączenia kilku kolumn w jedną komórkę", "Do łączenia kilku wierszy w jedną komórkę", "Do określania szerokości kolumny", "Do koloru tła kolumny"],
        correct: 0
    },
    {
        q: "Do czego służy atrybut <code>rowspan</code>?",
        a: ["Do łączenia kilku kolumn w jedną komórkę", "Do łączenia kilku wierszy w jedną komórkę", "Do określania wysokości wiersza", "Do numerowania wierszy"],
        correct: 1
    },

    // ===== Semantyka HTML5 =====
    {
        q: "Który znacznik HTML5 oznacza główną treść strony?",
        a: ["<code>&lt;content&gt;</code>", "<code>&lt;main&gt;</code>", "<code>&lt;primary&gt;</code>", "<code>&lt;body&gt;</code>"],
        correct: 1
    },
    {
        q: "Który znacznik HTML5 oznacza nawigację?",
        a: ["<code>&lt;menu&gt;</code>", "<code>&lt;navigation&gt;</code>", "<code>&lt;nav&gt;</code>", "<code>&lt;links&gt;</code>"],
        correct: 2
    },
    {
        q: "Który znacznik HTML5 reprezentuje kompletną, samodzielną treść (np. wpis na blogu)?",
        a: ["<code>&lt;article&gt;</code>", "<code>&lt;section&gt;</code>", "<code>&lt;content&gt;</code>", "<code>&lt;post&gt;</code>"],
        correct: 0
    },
    {
        q: "Który znacznik HTML5 oznacza treści luźno powiązane (sidebar, reklamy)?",
        a: ["<code>&lt;sidebar&gt;</code>", "<code>&lt;aside&gt;</code>", "<code>&lt;side&gt;</code>", "<code>&lt;extra&gt;</code>"],
        correct: 1
    },
    {
        q: "Który znacznik HTML5 oznacza obszar nagłówkowy?",
        a: ["<code>&lt;head&gt;</code>", "<code>&lt;header&gt;</code>", "<code>&lt;heading&gt;</code>", "<code>&lt;top&gt;</code>"],
        correct: 1
    },
    {
        q: "Który znacznik HTML5 oznacza stopkę?",
        a: ["<code>&lt;bottom&gt;</code>", "<code>&lt;footer&gt;</code>", "<code>&lt;foot&gt;</code>", "<code>&lt;end&gt;</code>"],
        correct: 1
    },
    {
        q: "Który znacznik HTML5 jest generyczną sekcją dokumentu?",
        a: ["<code>&lt;div&gt;</code>", "<code>&lt;section&gt;</code>", "<code>&lt;block&gt;</code>", "<code>&lt;part&gt;</code>"],
        correct: 1
    },
    {
        q: "Które znaczniki są używane do oznaczania ilustracji wraz z podpisem?",
        a: ["<code>&lt;img&gt;</code> + <code>&lt;caption&gt;</code>", "<code>&lt;figure&gt;</code> + <code>&lt;figcaption&gt;</code>", "<code>&lt;picture&gt;</code> + <code>&lt;label&gt;</code>", "<code>&lt;image&gt;</code> + <code>&lt;desc&gt;</code>"],
        correct: 1
    },
    {
        q: "Które znaczniki tworzą element rozwijany (collapsible)?",
        a: ["<code>&lt;collapse&gt;</code> + <code>&lt;title&gt;</code>", "<code>&lt;details&gt;</code> + <code>&lt;summary&gt;</code>", "<code>&lt;accordion&gt;</code> + <code>&lt;head&gt;</code>", "<code>&lt;toggle&gt;</code> + <code>&lt;label&gt;</code>"],
        correct: 1
    },
    {
        q: "Dlaczego warto używać znaczników semantycznych zamiast <code>&lt;div&gt;</code>?",
        a: ["Ze względu na lepszą wydajność", "Aby zwiększyć dostępność (accessibility)", "Bo <code>&lt;div&gt;</code> jest przestarzały", "Aby strona ładowała się szybciej"],
        correct: 1
    },

    // ===== PREZENTACJA 2: Formularze =====
    {
        q: "Który znacznik HTML służy do tworzenia formularza?",
        a: ["<code>&lt;input&gt;</code>", "<code>&lt;form&gt;</code>", "<code>&lt;fieldset&gt;</code>", "<code>&lt;data&gt;</code>"],
        correct: 1
    },
    {
        q: "Do czego służy atrybut <code>action</code> w znaczniku <code>&lt;form&gt;</code>?",
        a: ["Określa rodzaj akcji formularza", "Wskazuje adres, pod który zostaną przesłane dane", "Definiuje sposób walidacji", "Wybiera metodę szyfrowania"],
        correct: 1
    },
    {
        q: "Do czego służy atrybut <code>method</code> w znaczniku <code>&lt;form&gt;</code>?",
        a: ["Definiuje sposób wysyłki danych (np. GET lub POST)", "Wskazuje plik do uruchomienia", "Określa kodowanie znaków", "Ustala metodę walidacji"],
        correct: 0
    },
    {
        q: "Czym charakteryzuje się metoda <code>GET</code> w formularzach?",
        a: ["Dane wysyłane są w ciele zapytania", "Dane są zakodowane w pasku adresu URL", "Dane są szyfrowane automatycznie", "Dane są zapisywane na serwerze"],
        correct: 1
    },
    {
        q: "Czym charakteryzuje się metoda <code>POST</code> w formularzach?",
        a: ["Dane są wysyłane w pasku adresu URL", "Dane są wysyłane w ciele zapytania (body, payload)", "Dane są zapisywane wyłącznie lokalnie", "Dane nie są nigdzie wysyłane"],
        correct: 1
    },
    {
        q: "Jak utworzyć przycisk wysyłki formularza?",
        a: ["<code>&lt;input type=\"send\"&gt;</code>", "<code>&lt;input type=\"submit\"&gt;</code>", "<code>&lt;button type=\"send\"&gt;</code>", "<code>&lt;send&gt;</code>"],
        correct: 1
    },
    {
        q: "Który typ pola <code>&lt;input&gt;</code> maskuje wprowadzane znaki?",
        a: ["<code>text</code>", "<code>hidden</code>", "<code>password</code>", "<code>secret</code>"],
        correct: 2
    },
    {
        q: "Który znacznik służy do wprowadzania długich, wieloliniowych tekstów?",
        a: ["<code>&lt;input type=\"longtext\"&gt;</code>", "<code>&lt;textarea&gt;</code>", "<code>&lt;multiline&gt;</code>", "<code>&lt;text&gt;</code>"],
        correct: 1
    },
    {
        q: "Który typ pola umożliwia wybór jednej opcji z grupy?",
        a: ["<code>checkbox</code>", "<code>radio</code>", "<code>select</code>", "<code>option</code>"],
        correct: 1
    },
    {
        q: "Który typ pola pozwala zaznaczyć wiele wartości jednocześnie?",
        a: ["<code>radio</code>", "<code>checkbox</code>", "<code>select</code>", "<code>multi</code>"],
        correct: 1
    },
    {
        q: "Który znacznik tworzy listę rozwijaną?",
        a: ["<code>&lt;dropdown&gt;</code>", "<code>&lt;select&gt;</code>", "<code>&lt;list&gt;</code>", "<code>&lt;combo&gt;</code>"],
        correct: 1
    },
    {
        q: "Do czego służy znacznik <code>&lt;label&gt;</code>?",
        a: ["Tworzy nowe pole formularza", "Opisuje znaczenie pól formularza i może być powiązany z kontrolką", "Zastępuje znacznik <code>&lt;p&gt;</code>", "Tworzy nagłówek sekcji"],
        correct: 1
    },
    {
        q: "Który atrybut <code>&lt;label&gt;</code> wiąże go z polem po identyfikatorze?",
        a: ["<code>id</code>", "<code>for</code>", "<code>name</code>", "<code>target</code>"],
        correct: 1
    },
    {
        q: "Który typ pola służy do wysyłania plików?",
        a: ["<code>upload</code>", "<code>file</code>", "<code>attach</code>", "<code>multipart</code>"],
        correct: 1
    },
    {
        q: "Jakie kodowanie formularza jest wymagane przy wysyłce plików?",
        a: ["<code>text/plain</code>", "<code>application/x-www-form-urlencoded</code>", "<code>multipart/form-data</code>", "<code>application/json</code>"],
        correct: 2
    },
    {
        q: "Który atrybut oznacza pole jako wymagane?",
        a: ["<code>mandatory</code>", "<code>required</code>", "<code>must</code>", "<code>need</code>"],
        correct: 1
    },

    // ===== Podstawy CSS i kaskadowość =====
    {
        q: "Który ze sposobów stylowania ma najwyższy priorytet w kaskadzie?",
        a: ["Zewnętrzny plik CSS", "Style w <code>&lt;style&gt;</code> w <code>&lt;head&gt;</code>", "Style w atrybucie <code>style=\"...\"</code>", "Style wbudowane przeglądarki"],
        correct: 2
    },
    {
        q: "Jaka jest poprawna składnia zbioru reguł CSS?",
        a: ["<code>selektor: { właściwość = wartość; }</code>", "<code>selektor { właściwość: wartość; }</code>", "<code>selektor [ właściwość = wartość ]</code>", "<code>selektor = { właściwość: wartość }</code>"],
        correct: 1
    },
    {
        q: "Jaki selektor CSS odpowiada klasie o nazwie <code>abc</code>?",
        a: ["<code>#abc</code>", "<code>.abc</code>", "<code>abc</code>", "<code>*abc</code>"],
        correct: 1
    },
    {
        q: "Jaki selektor CSS odpowiada identyfikatorowi o nazwie <code>abc</code>?",
        a: ["<code>.abc</code>", "<code>#abc</code>", "<code>@abc</code>", "<code>$abc</code>"],
        correct: 1
    },
    {
        q: "Jak zapisać jedną regułę CSS dla wielu selektorów jednocześnie?",
        a: ["Rozdzielić selektory średnikiem", "Rozdzielić selektory przecinkiem (np. <code>p, h1, h2 { ... }</code>)", "Rozdzielić selektory kropką", "Umieścić w nawiasach klamrowych"],
        correct: 1
    },
    {
        q: "Co dzieje się, gdy element pasuje do wielu reguł CSS z konfliktującymi wartościami?",
        a: ["Stosowana jest pierwsza reguła", "Stosowana jest reguła o najwyższej specyficzności, a przy remisie ostatnia wartość", "Wszystkie reguły są ignorowane", "Stosowane są wartości średnie"],
        correct: 1
    },

    // ===== Pseudoklasy i pseudoelementy =====
    {
        q: "Która pseudoklasa odpowiada za stan najechania myszą?",
        a: ["<code>:active</code>", "<code>:focus</code>", "<code>:hover</code>", "<code>:over</code>"],
        correct: 2
    },
    {
        q: "Która pseudoklasa dotyczy elementu w momencie kliknięcia?",
        a: ["<code>:click</code>", "<code>:active</code>", "<code>:pressed</code>", "<code>:down</code>"],
        correct: 1
    },
    {
        q: "Która pseudoklasa wybiera pole formularza, w którym ustawiony jest kursor?",
        a: ["<code>:selected</code>", "<code>:focus</code>", "<code>:current</code>", "<code>:active</code>"],
        correct: 1
    },
    {
        q: "Która pseudoklasa wybiera odwiedzony link?",
        a: ["<code>:done</code>", "<code>:visited</code>", "<code>:old</code>", "<code>:seen</code>"],
        correct: 1
    },
    {
        q: "Która pseudoklasa wybiera zaznaczone pola typu checkbox lub radio?",
        a: ["<code>:selected</code>", "<code>:active</code>", "<code>:checked</code>", "<code>:on</code>"],
        correct: 2
    },
    {
        q: "Która pseudoklasa wybiera pola z błędnymi wartościami?",
        a: ["<code>:wrong</code>", "<code>:error</code>", "<code>:invalid</code>", "<code>:bad</code>"],
        correct: 2
    },
    {
        q: "Czym różnią się pseudoelementy od pseudoklas w zapisie?",
        a: ["Pseudoelementy używają jednego dwukropka, pseudoklasy dwóch", "Pseudoelementy używają dwóch dwukropków (<code>::</code>), pseudoklasy jednego (<code>:</code>)", "Pseudoelementy używają @, pseudoklasy :", "Nie ma różnicy w zapisie"],
        correct: 1
    },
    {
        q: "Który pseudoelement pozwala wstawić treść przed elementem?",
        a: ["<code>::pre</code>", "<code>::before</code>", "<code>::prepend</code>", "<code>::start</code>"],
        correct: 1
    },

    // ===== Transform i transition =====
    {
        q: "Która funkcja <code>transform</code> obraca element?",
        a: ["<code>spin()</code>", "<code>turn()</code>", "<code>rotate()</code>", "<code>angle()</code>"],
        correct: 2
    },
    {
        q: "Do czego służy właściwość <code>transition</code>?",
        a: ["Do natychmiastowej zmiany właściwości", "Do płynnych zmian właściwości w określonym czasie", "Do tłumaczenia tekstu", "Do animacji 3D"],
        correct: 1
    },
    {
        q: "Która z poniższych NIE jest podwłaściwością <code>transition</code>?",
        a: ["<code>transition-delay</code>", "<code>transition-duration</code>", "<code>transition-property</code>", "<code>transition-color</code>"],
        correct: 3
    },

    // ===== @media i RWD =====
    {
        q: "Do czego służy reguła <code>@media</code> w CSS?",
        a: ["Do osadzania multimediów", "Do definiowania różnych zbiorów reguł dla różnych typów urządzeń i rozmiarów ekranu", "Do importowania plików dźwiękowych", "Do oznaczania metadanych"],
        correct: 1
    },
    {
        q: "Co oznacza skrót RWD?",
        a: ["Random Web Design", "Responsive Web Design", "Rapid Web Development", "Reactive Web Display"],
        correct: 1
    },
    {
        q: "Która cecha mediów sprawdza minimalną szerokość pola widzenia?",
        a: ["<code>width-min</code>", "<code>min-width</code>", "<code>min-screen</code>", "<code>viewport-min</code>"],
        correct: 1
    },
    {
        q: "Jaka jest poprawna składnia media query?",
        a: ["<code>@media screen { min-width: 600px; ... }</code>", "<code>@media screen and (min-width: 600px) { ... }</code>", "<code>@media(screen, 600px) { ... }</code>", "<code>@media [screen=600px] { ... }</code>"],
        correct: 1
    },

    // ===== Flexbox =====
    {
        q: "Jak włączyć Flexbox na kontenerze?",
        a: ["<code>display: flexbox;</code>", "<code>display: flex;</code>", "<code>layout: flex;</code>", "<code>position: flex;</code>"],
        correct: 1
    },
    {
        q: "Która właściwość określa kierunek ułożenia elementów flex?",
        a: ["<code>flex-axis</code>", "<code>flex-direction</code>", "<code>flex-order</code>", "<code>direction</code>"],
        correct: 1
    },
    {
        q: "Która z poniższych NIE jest dopuszczalną wartością <code>flex-direction</code>?",
        a: ["<code>row</code>", "<code>column</code>", "<code>row-reverse</code>", "<code>diagonal</code>"],
        correct: 3
    },
    {
        q: "Która właściwość kontroluje, czy elementy flex zawijają się do nowej linii?",
        a: ["<code>flex-break</code>", "<code>flex-wrap</code>", "<code>flex-line</code>", "<code>wrap-mode</code>"],
        correct: 1
    },
    {
        q: "Która właściwość wyrównuje elementy flex w poziomie (wzdłuż osi głównej)?",
        a: ["<code>align-items</code>", "<code>justify-content</code>", "<code>text-align</code>", "<code>flex-align</code>"],
        correct: 1
    },
    {
        q: "Która właściwość wyrównuje elementy flex w pionie (wzdłuż osi poprzecznej)?",
        a: ["<code>justify-content</code>", "<code>align-items</code>", "<code>vertical-align</code>", "<code>align-self</code>"],
        correct: 1
    },
    {
        q: "Do czego służy właściwość <code>flex-grow</code>?",
        a: ["Określa minimalny rozmiar elementu", "Określa, jak bardzo element może się rozciągnąć względem innych", "Określa kierunek wzrostu", "Określa kolor elementu"],
        correct: 1
    },

    // ===== CSS Grid =====
    {
        q: "Jak włączyć CSS Grid na kontenerze?",
        a: ["<code>display: table;</code>", "<code>display: grid;</code>", "<code>layout: grid;</code>", "<code>grid: on;</code>"],
        correct: 1
    },
    {
        q: "Która właściwość definiuje kolumny w CSS Grid?",
        a: ["<code>grid-columns</code>", "<code>grid-template-columns</code>", "<code>columns</code>", "<code>grid-cols</code>"],
        correct: 1
    },
    {
        q: "Co oznacza jednostka <code>fr</code> w CSS Grid?",
        a: ["Frame", "Fraction (część dostępnej przestrzeni)", "Free-row", "Frequency"],
        correct: 1
    },
    {
        q: "Która właściwość pozwala nazywać obszary siatki w CSS Grid?",
        a: ["<code>grid-areas</code>", "<code>grid-template-areas</code>", "<code>grid-names</code>", "<code>area-template</code>"],
        correct: 1
    },

    // ===== Preprocesory CSS / LESS =====
    {
        q: "Czym jest preprocesor CSS?",
        a: ["Programem do kompresji CSS", "Narzędziem rozszerzającym możliwości CSS, kompilowanym do zwykłego CSS", "Edytorem CSS w przeglądarce", "Walidatorem składni CSS"],
        correct: 1
    },
    {
        q: "Czy poprawny kod CSS jest jednocześnie poprawnym kodem LESS/SASS?",
        a: ["Nie, są to zupełnie inne języki", "Tak, poprawny CSS = poprawny LESS/SASS", "Tylko w wersji LESS", "Tylko po dodatkowej konwersji"],
        correct: 1
    },
    {
        q: "Jakim symbolem oznacza się zmienną w LESS?",
        a: ["<code>$</code>", "<code>@</code>", "<code>#</code>", "<code>%</code>"],
        correct: 1
    },
    {
        q: "Jak importuje się inny plik w LESS?",
        a: ["<code>@include \"style.less\"</code>", "<code>@import \"style.less\"</code>", "<code>#import \"style.less\"</code>", "<code>require(\"style.less\")</code>"],
        correct: 1
    },
    {
        q: "W jakiej jednostce zwracany jest wynik operacji matematycznej w LESS?",
        a: ["W jednostce najbardziej z prawej strony", "W jednostce najbardziej z lewej strony", "Zawsze w pikselach", "Zawsze bez jednostki"],
        correct: 1
    },
    {
        q: "Czym są domieszki (mixiny) w preprocesorach CSS?",
        a: ["Sposobem łączenia plików HTML", "Zbiorami reguł, które można wstawiać (mieszać) do innych selektorów", "Komentarzami wieloliniowymi", "Sposobem deklarowania zmiennych"],
        correct: 1
    },
    {
        q: "Do czego służy serwis <code>caniuse.com</code>?",
        a: ["Do nauki HTML", "Do sprawdzenia, czy dany element/właściwość jest wspierany przez przeglądarki", "Do hostingu stron", "Do tworzenia projektów"],
        correct: 1
    },

    // ===== PREZENTACJA 3: JavaScript — podstawy =====
    {
        q: "Jaki standard opisuje, jak JavaScript powinien działać?",
        a: ["W3C Standard", "ECMAScript", "ISO-JavaScript", "WebScript"],
        correct: 1
    },
    {
        q: "Jaki jest związek między językami Java i JavaScript?",
        a: ["JavaScript jest podzbiorem Java", "JavaScript bazuje na składni Java", "Brak powiązania między Java i JavaScript", "Oba są produktami Sun Microsystems"],
        correct: 2
    },
    {
        q: "Co oznacza wartość <code>NaN</code> w JavaScript?",
        a: ["Null and Nothing", "Not a Number", "Negative and Null", "Not a Node"],
        correct: 1
    },
    {
        q: "W jakim rodzaju cudzysłowów działa interpolacja ciągów (<code>${}</code>) w JavaScript?",
        a: ["W cudzysłowach podwójnych", "W apostrofach", "W grawisach (backtick `)", "W nawiasach okrągłych"],
        correct: 2
    },
    {
        q: "Czym różni się operator <code>===</code> od <code>==</code> w JavaScript?",
        a: ["=== sprawdza tylko typ", "=== wyłącza automatyczną konwersję typów (strict equality)", "=== jest używane tylko dla stringów", "Nie ma różnicy"],
        correct: 1
    },
    {
        q: "Jaki jest wynik <code>\"5\" + 1</code> w JavaScript?",
        a: ["<code>6</code>", "<code>\"51\"</code>", "<code>\"6\"</code>", "Błąd runtime"],
        correct: 1
    },
    {
        q: "Jaki jest wynik <code>\"5\" - 1</code> w JavaScript?",
        a: ["<code>\"4\"</code>", "<code>\"51\"</code>", "<code>4</code>", "<code>NaN</code>"],
        correct: 2
    },
    {
        q: "Jaki jest wynik <code>false == 0</code> w JavaScript?",
        a: ["<code>false</code>", "<code>true</code>", "<code>undefined</code>", "<code>NaN</code>"],
        correct: 1
    },
    {
        q: "Które dwie wartości reprezentują brak wartości w JavaScript?",
        a: ["<code>empty</code> i <code>void</code>", "<code>null</code> i <code>undefined</code>", "<code>none</code> i <code>nothing</code>", "<code>false</code> i <code>0</code>"],
        correct: 1
    },
    {
        q: "Co oznacza 'type coercion' w JavaScript?",
        a: ["Ręczna konwersja typów przez programistę", "Automatyczna konwersja typów przez silnik JS", "Błąd niezgodności typów", "Sprawdzanie typów w czasie kompilacji"],
        correct: 1
    },
    {
        q: "Jak zadeklarować zmienną z zasięgiem blokowym w JavaScript?",
        a: ["<code>var</code>", "<code>let</code>", "<code>dim</code>", "<code>define</code>"],
        correct: 1
    },
    {
        q: "Co się stanie, gdy zadeklarujemy <code>var</code> wewnątrz bloku <code>{}</code>?",
        a: ["Zmienna będzie dostępna tylko wewnątrz bloku", "Zmienna będzie dostępna poza blokiem (var ignoruje zasięg blokowy)", "Wystąpi błąd kompilacji", "Zmienna zostanie stałą"],
        correct: 1
    },
    {
        q: "Jak zadeklarować stałą w JavaScript?",
        a: ["<code>final</code>", "<code>immutable</code>", "<code>const</code>", "<code>static</code>"],
        correct: 2
    },
    {
        q: "Jaką składnię ma operator ternarny (ternary) w JavaScript?",
        a: ["<code>if ? a : b</code>", "<code>warunek ? wartość_true : wartość_false</code>", "<code>warunek ?? wartość_true : wartość_false</code>", "<code>warunek then a else b</code>"],
        correct: 1
    },
    {
        q: "Jak wygląda deklaracja funkcji w postaci arrow function?",
        a: ["<code>function(x) => { ... }</code>", "<code>(x) => { ... }</code>", "<code>x -> { ... }</code>", "<code>lambda(x): { ... }</code>"],
        correct: 1
    },
    {
        q: "Co robi instrukcja <code>break</code> wewnątrz pętli?",
        a: ["Przechodzi do następnej iteracji", "Przerywa pętlę całkowicie", "Restartuje pętlę od początku", "Wychodzi z funkcji"],
        correct: 1
    },
    {
        q: "Do czego służy pętla <code>for...of</code>?",
        a: ["Iteruje po właściwościach obiektu", "Iteruje po elementach kolekcji / tablicy", "Iteruje dokładnie n razy", "Iteruje po kluczach obiektu"],
        correct: 1
    },
    {
        q: "Jak dodać element na koniec tablicy w JavaScript?",
        a: ["<code>array.add()</code>", "<code>array.append()</code>", "<code>array.push()</code>", "<code>array.insert()</code>"],
        correct: 2
    },
    {
        q: "Co robi metoda <code>split(\",\")</code> na ciągu tekstowym?",
        a: ["Łączy elementy tablicy w ciąg", "Rozbija ciąg na tablicę według podanego separatora", "Dzieli liczbę", "Usuwa podany znak z ciągu"],
        correct: 1
    },
    {
        q: "Jak połączyć elementy tablicy w jeden ciąg tekstowy?",
        a: ["<code>[].concat(sep)</code>", "<code>[].merge(sep)</code>", "<code>[].join(sep)</code>", "<code>[].toString(sep)</code>"],
        correct: 2
    },
    {
        q: "Jak definiuje się obiekt w JavaScript?",
        a: ["<code>Object.create()</code> — jedyna poprawna metoda", "Przez literał: <code>{ klucz: wartość, ... }</code>", "Przez instrukcję <code>new Object klucz:wartość end</code>", "Jako funkcję ze słowem kluczowym <code>object</code>"],
        correct: 1
    },
    {
        q: "Jak w JavaScript bezpiecznie odwołać się do właściwości, gdy obiekt może być <code>null</code> lub <code>undefined</code>?",
        a: ["<code>obj.prop</code> (standard)", "<code>obj?.prop</code> — opcjonalny dostęp (optional chaining)", "<code>obj!.prop</code> — non-null assertion", "<code>obj??prop</code> — nullish chaining"],
        correct: 1
    },
    {
        q: "Jak zapisać wyrażenie regularne w JavaScript?",
        a: ["<code>\"abc\"</code> lub <code>[abc]</code>", "<code>new RegExp(\"abc\")</code> lub <code>/abc/</code>", "<code>regex(\"abc\")</code> lub <code>(abc)</code>", "<code>/abc/</code> lub <code>\"abc\"</code>"],
        correct: 1
    },

    // ===== PHP — podstawy =====
    {
        q: "Jaka jest poprawna para znaczników otwierającego i zamykającego blok kodu PHP?",
        a: ["<code>&lt;php&gt;</code> … <code>&lt;/php&gt;</code>", "<code>&lt;?php</code> … <code>?&gt;</code>", "<code>{php}</code> … <code>{/php}</code>", "<code>&lt;script type=\"text/php\"&gt;</code>"],
        correct: 1
    },
    {
        q: "Jak oznacza się zmienne w PHP?",
        a: ["Prefiksem <code>@</code>", "Prefiksem <code>$</code>", "Prefiksem <code>&amp;</code>", "Bez żadnego prefiksu"],
        correct: 1
    },
    {
        q: "Czy nazwy zmiennych w PHP są wrażliwe na wielkość liter (case sensitive)?",
        a: ["Nie, <code>$A</code> i <code>$a</code> to ta sama zmienna", "Tak, <code>$A</code> i <code>$a</code> to różne zmienne", "Tylko zmienne globalne są case sensitive", "Zależy od ustawień php.ini"],
        correct: 1
    },
    {
        q: "Jaki operator PHP służy do łączenia (konkatenacji) ciągów tekstowych?",
        a: ["<code>+</code>", "<code>*</code>", "<code>.</code>", "<code>@</code>"],
        correct: 2
    },
    {
        q: "W którym rodzaju cudzysłowów odbywa się interpolacja zmiennych w PHP?",
        a: ["Apostrof: <code>'$zmienna'</code>", "Cudzysłów podwójny: <code>\"$zmienna\"</code>", "Backtick: <code>`$zmienna`</code>", "Interpolacja nie istnieje w PHP"],
        correct: 1
    },
    {
        q: "Co robi operator <code>===</code> w PHP?",
        a: ["Sprawdza tylko równość wartości (z konwersją typów)", "Sprawdza równość wartości i typów bez automatycznej konwersji", "Sprawdza wyłącznie typ", "Przypisuje wartość"],
        correct: 1
    },
    {
        q: "Co robi operator <code>??</code> (null coalesce) w PHP?",
        a: ["Sprawdza, czy wartość jest różna od zera", "Zwraca lewą wartość jeśli nie jest NULL, w przeciwnym razie prawą", "Neguje wartość logiczną", "Łączy dwa ciągi tekstowe"],
        correct: 1
    },
    {
        q: "Czym jest tablica w PHP?",
        a: ["Strukturą o stałym rozmiarze z wartościami tego samego typu", "Strukturą mapującą klucze na wartości (hash map)", "Typem prostym", "Listą jednokierunkową"],
        correct: 1
    },
    {
        q: "Jak dodać element na koniec tablicy PHP bez podawania klucza?",
        a: ["<code>$arr.push($val)</code>", "<code>$arr[] = $val;</code>", "<code>$arr.add($val)</code>", "<code>array_add($arr, $val)</code>"],
        correct: 1
    },
    {
        q: "Jaka funkcja PHP zwraca liczbę elementów tablicy?",
        a: ["<code>length()</code>", "<code>size()</code>", "<code>count()</code>", "<code>num()</code>"],
        correct: 2
    },
    {
        q: "Jaka jest składnia pętli <code>foreach</code> iterującej po wartościach tablicy?",
        a: ["<code>foreach ($array, $value) {}</code>", "<code>foreach ($array as $value) {}</code>", "<code>for ($array => $value) {}</code>", "<code>each ($array) as $value {}</code>"],
        correct: 1
    },
    {
        q: "Jaka jest składnia pętli <code>foreach</code> dająca dostęp jednocześnie do klucza i wartości?",
        a: ["<code>foreach ($array as $key, $value) {}</code>", "<code>foreach ($array as $key => $value) {}</code>", "<code>foreach ($array[$key] as $value) {}</code>", "<code>for ($key in $array) as $value {}</code>"],
        correct: 1
    },
    {
        q: "Jaka jest różnica między <code>include</code> a <code>require</code> w PHP?",
        a: ["Brak różnicy", "include zwraca ostrzeżenie (warning) przy błędzie, require — błąd krytyczny zatrzymujący skrypt", "require obsługuje wyłącznie pliki PHP", "include wykonuje plik tylko raz"],
        correct: 1
    },
    {
        q: "Co zawiera superglobalna tablica <code>$_GET</code> w PHP?",
        a: ["Parametry zapytania POST", "Parametry przesłane w adresie URL (query string)", "Dane z ciasteczek", "Zmienne sesji"],
        correct: 1
    },
    {
        q: "Jaką funkcją rozpoczyna się lub wznawia sesję w PHP?",
        a: ["<code>session_create()</code>", "<code>session_init()</code>", "<code>session_start()</code>", "<code>start_session()</code>"],
        correct: 2
    },
    {
        q: "Jak całkowicie zniszczyć sesję w PHP?",
        a: ["<code>session_clear()</code>", "<code>session_destroy()</code>", "<code>unset($_SESSION)</code>", "<code>session_end()</code>"],
        correct: 1
    },

    // ===== PHP — OOP i bazy danych =====
    {
        q: "Jaka metoda pełni rolę konstruktora w PHP 5, 7 i 8?",
        a: ["<code>NazwaKlasy()</code>", "<code>__construct()</code>", "<code>__init__()</code>", "<code>constructor()</code>"],
        correct: 1
    },
    {
        q: "Które słowo kluczowe w PHP zabrania nadpisywania klasy lub metody w klasach potomnych?",
        a: ["<code>sealed</code>", "<code>locked</code>", "<code>final</code>", "<code>static</code>"],
        correct: 2
    },
    {
        q: "Jakie trzy poziomy widoczności (modyfikatory dostępu) są dostępne w PHP?",
        a: ["<code>public</code>, <code>private</code>, <code>local</code>", "<code>private</code>, <code>protected</code>, <code>public</code>", "<code>open</code>, <code>closed</code>, <code>restricted</code>", "<code>internal</code>, <code>external</code>, <code>public</code>"],
        correct: 1
    },
    {
        q: "Jak z metody klasy potomnej wywołać nadpisywaną metodę klasy bazowej?",
        a: ["<code>base::myFunction()</code>", "<code>parent::myFunction()</code>", "<code>super::myFunction()</code>", "<code>this->parent->myFunction()</code>"],
        correct: 1
    },
    {
        q: "Czym jest klasa abstrakcyjna w PHP?",
        a: ["Klasą z wyłącznie prywatnymi metodami", "Klasą bazową, z której nie można bezpośrednio tworzyć instancji", "Klasą implementującą interfejs", "Klasą zawierającą tylko metody statyczne"],
        correct: 1
    },
    {
        q: "Co gwarantuje interfejs w PHP?",
        a: ["Że klasa nie może mieć konstruktora", "Że określone metody będą dostępne w klasie implementującej", "Że klasa nie może być dziedziczona", "Że wszystkie metody będą statyczne"],
        correct: 1
    },
    {
        q: "Co to są Traits w PHP?",
        a: ["Stałe klasowe dziedziczone w hierarchii", "Metody anonimowe zwracane przez funkcję", "Mechanizm grupowania właściwości i metod importowanych do klasy słowem <code>use</code>", "Interfejsy z domyślną implementacją"],
        correct: 2
    },
    {
        q: "Co to są Prepared Statements w PDO?",
        a: ["Statyczne zapytania SQL wbudowane w kod źródłowy", "Zapytania kompilowane na serwerze, do których przy wielokrotnym użyciu podstawiane są tylko parametry", "Szablony HTML z osadzonym SQL", "Gotowe funkcje PHP do pobierania danych"],
        correct: 1
    },
    {
        q: "Dlaczego Prepared Statements zwiększają bezpieczeństwo aplikacji?",
        a: ["Szyfrują dane przed wysłaniem do bazy", "Chronią przed SQL injection — dane przekazywane są przez parametry, nie wewnątrz zapytania", "Wymagają uwierzytelnienia przy każdym zapytaniu", "Automatycznie logują wszystkie zapytania"],
        correct: 1
    },
    {
        q: "Jakie cztery właściwości zapewniają transakcje w bazie danych (skrót ACID)?",
        a: ["Szybkość, bezpieczeństwo, dostępność, skalowalność", "Atomowość, spójność, izolacja, trwałość", "Prostota, wydajność, niezawodność, przenośność", "Enkapsulacja, dziedziczenie, polimorfizm, abstrakcja"],
        correct: 1
    },
    {
        q: "Jaką składnią wyrzuca się wyjątek w PHP?",
        a: ["<code>raise new Exception();</code>", "<code>throw new Exception();</code>", "<code>error new Exception();</code>", "<code>reject new Exception();</code>"],
        correct: 1
    },

    // ===== Node.js i Express.js =====
    {
        q: "Czym jest Node.js według oficjalnej definicji?",
        a: ["Frameworkiem JavaScript do budowania interfejsów użytkownika", "Otwartoźródłowym, wieloplatformowym środowiskiem uruchomieniowym dla JavaScript", "Kompilatorem JavaScript do kodu maszynowego", "Menedżerem pakietów dla projektów webowych"],
        correct: 1
    },
    {
        q: "Na jakim silniku JavaScript oparty jest Node.js?",
        a: ["SpiderMonkey (Firefox)", "JavaScriptCore (Safari)", "V8 (Chrome, Edge)", "Hermes (React Native)"],
        correct: 2
    },
    {
        q: "Jaką architekturę wątków stosuje Node.js?",
        a: ["Wielowątkową — każde żądanie w osobnym wątku", "Jednowątkową z modelem event-driven i non-blocking I/O", "Wieloprocesorową — osobny proces dla każdego klienta", "Hybrydową — wątki i procesy mieszane"],
        correct: 1
    },
    {
        q: "Co oznacza \"non-blocking I/O\" w Node.js?",
        a: ["Operacje wejścia/wyjścia są wykonywane synchronicznie w kolejności", "Zasoby są zwalniane podczas oczekiwania, a wątek może obsługiwać inne żądania", "Operacje I/O są blokowane do czasu ukończenia", "Wiele wątków wykonuje operacje I/O równolegle"],
        correct: 1
    },
    {
        q: "Czym jest 'Callback Hell' (piekło callbacków)?",
        a: ["Błąd rzucany gdy callback zwraca wyjątek", "Głęboko zagnieżdżone, trudne w utrzymaniu wywołania zwrotne", "Nieskończona pętla wywołań zwrotnych", "Brak obsługi błędów w callbackach"],
        correct: 1
    },
    {
        q: "Czym jest obiekt Promise w JavaScript?",
        a: ["Funkcją asynchroniczną automatycznie kompilowaną przez silnik JS", "Obiektem reprezentującym wynik operacji asynchronicznej, który może zakończyć się sukcesem (resolve) lub błędem (reject)", "Składnią skrótową dla funkcji anonimowych", "Typem danych do przechowywania wartości opcjonalnych"],
        correct: 1
    },
    {
        q: "Od którego standardu ECMAScript pochodzi składnia <code>async/await</code>?",
        a: ["ES2015 (ES6)", "ES2016 (ES7)", "ES2017 (ES8)", "ES2019 (ES10)"],
        correct: 2
    },
    {
        q: "Czym jest CommonJS (CJS) w Node.js?",
        a: ["Frameworkiem do testowania aplikacji Node.js", "Domyślnym, synchronicznym systemem modułów Node.js opartym na <code>require()</code> i <code>module.exports</code>", "Specyfikacją ECMAScript dla modułów asynchronicznych", "Narzędziem do kompilacji TypeScript"],
        correct: 1
    },
    {
        q: "Czym jest <code>package.json</code> w projekcie Node.js?",
        a: ["Plikiem konfiguracyjnym serwera HTTP", "Manifestem projektu zawierającym m.in. nazwę, wersję, zależności i skrypty", "Plikiem blokady wersji pakietów (lock file)", "Listą dostępnych modułów wbudowanych Node.js"],
        correct: 1
    },
    {
        q: "Czym jest Express.js?",
        a: ["Pełnoprawnym frameworkiem MVC z wbudowaną bazą danych", "Minimalistycznym, nieopiniowanym (unopinionated) frameworkiem webowym dla Node.js", "Alternatywą dla Node.js do uruchamiania JS po stronie serwera", "Biblioteką do tworzenia aplikacji desktopowych"],
        correct: 1
    },

    // ===== TypeScript — podstawy =====
    {
        q: "Kto stworzył TypeScript?",
        a: ["Google", "Microsoft", "Meta", "Apple"],
        correct: 1
    },
    {
        q: "Czym jest transpilacja TypeScript do JavaScript?",
        a: ["Kompilacja TS do kodu maszynowego", "Konwersja składni TS do składni JS (nie kompilacja)", "Minifikacja pliku JS", "Konwersja HTML do JS"],
        correct: 1
    },
    {
        q: "Co TypeScript wprowadza do JavaScript?",
        a: ["Obsługę wielowątkowości", "Typy statyczne", "Wbudowane bazy danych", "Kompilację do kodu maszynowego"],
        correct: 1
    },
    {
        q: "Kiedy TypeScript wykrywa błędy typów?",
        a: ["Podczas wykonania programu (runtime)", "Podczas kompilacji (przed uruchomieniem)", "Dopiero przy wdrożeniu na serwer", "Tylko w trybie debugowania"],
        correct: 1
    },
    {
        q: "Jak nazywa się główny plik konfiguracyjny TypeScript?",
        a: ["<code>typescript.json</code>", "<code>tsconfig.json</code>", "<code>ts.config.js</code>", "<code>tsconfig.xml</code>"],
        correct: 1
    },
    {
        q: "Jaka jest cecha typu <code>unknown</code> w TypeScript?",
        a: ["Wyłącza całkowicie kontrolę typów", "Akceptuje wszystkie wartości, ale wymaga sprawdzenia typu przed użyciem innych operacji", "Reprezentuje brak wartości zwracanej przez funkcję", "Może przechowywać wyłącznie null lub undefined"],
        correct: 1
    },
    {
        q: "Jaka jest cecha typu <code>any</code> w TypeScript?",
        a: ["Wymaga sprawdzenia typu przed użyciem", "Wyłącza kontrolę typów dla danej zmiennej — dopuszcza wszystkie operacje", "Dopuszcza tylko wartości liczbowe i tekstowe", "Reprezentuje unię wszystkich typów prymitywnych"],
        correct: 1
    },
    {
        q: "Który typ TypeScript oznacza, że funkcja nie zwraca żadnej wartości?",
        a: ["<code>null</code>", "<code>undefined</code>", "<code>void</code>", "<code>never</code>"],
        correct: 2
    },
    {
        q: "Który typ TypeScript oznacza funkcję, która nigdy nie zwraca wartości (np. nieskończona pętla)?",
        a: ["<code>void</code>", "<code>null</code>", "<code>undefined</code>", "<code>never</code>"],
        correct: 3
    },
    {
        q: "Jak oznaczyć opcjonalną właściwość obiektu w TypeScript?",
        a: ["Przedrostkiem <code>opt:</code> przed nazwą", "Przyrostkiem <code>?</code> po nazwie właściwości", "Słowem kluczowym <code>optional</code>", "Domyślną wartością <code>undefined</code>"],
        correct: 1
    },
    {
        q: "Co to jest <code>enum</code> w TypeScript?",
        a: ["Specjalny podtyp tablicy o stałym rozmiarze", "Struktura mapująca klucze na wartości liczbowe lub tekstowe", "Alias dla typu union", "Interfejs z wyliczonymi właściwościami"],
        correct: 1
    },
    {
        q: "Jak zapisuje się parametry generyczne (polimorficzne) w TypeScript?",
        a: ["W nawiasach okrągłych, np. <code>(T)</code>", "W nawiasach ostrych, np. <code>&lt;T&gt;</code>", "Prefiksem <code>gen_</code>, np. <code>gen_T</code>", "W nawiasach kwadratowych, np. <code>[T]</code>"],
        correct: 1
    },

    // ===== PHP — HTTP, Regex i Web Services =====
    {
        q: "Do czego służy funkcja <code>header()</code> w PHP?",
        a: ["Wczytuje nagłówki z pliku", "Wysyła nagłówki HTTP do przeglądarki", "Odczytuje nagłówki żądania klienta", "Tworzy nagłówek HTML dokumentu"],
        correct: 1
    },
    {
        q: "Która superglobalna tablica PHP zawiera informacje o żądaniu HTTP, takie jak User-Agent, Host i Accept-Language?",
        a: ["<code>$_REQUEST</code>", "<code>$_HTTP</code>", "<code>$_SERVER</code>", "<code>$_ENV</code>"],
        correct: 2
    },
    {
        q: "Co zwraca funkcja <code>preg_match()</code> w PHP?",
        a: ["Tablicę wszystkich dopasowań w ciągu", "Ciąg po zamianie dopasowań", "0 lub 1 (false/true) — czy wzorzec pasuje do ciągu", "Indeks pierwszego dopasowania"],
        correct: 2
    },
    {
        q: "Co robi funkcja <code>preg_replace()</code> w PHP?",
        a: ["Kompiluje i zapamiętuje wyrażenie regularne", "Wyszukuje fragmenty tekstu pasujące do wzorca i zastępuje je podaną wartością", "Dzieli tekst na tablicę według wzorca", "Zwraca listę wszystkich dopasowań"],
        correct: 1
    },
    {
        q: "Na czym polega zachłanność (greedy) wyrażeń regularnych w PHP?",
        a: ["Dopasowanie tylko pierwszego znaku pasującego do wzorca", "Domyślne wybieranie jak największej liczby znaków pasujących do wzorca", "Ignorowanie białych znaków przy dopasowaniu", "Dopasowanie od końca ciągu tekstowego"],
        correct: 1
    },
    {
        q: "Jak wyłączyć zachłanność kwantyfikatora w wyrażeniu regularnym PHP?",
        a: ["Dodając <code>!</code> po kwantyfikatorze", "Dodając <code>?</code> po kwantyfikatorze, np. <code>.*?</code>", "Dodając modyfikator <code>/g</code>", "Używając grupy nienazwanej <code>(?:)</code>"],
        correct: 1
    },
    {
        q: "Co oznacza modyfikator <code>i</code> w funkcji <code>preg_match('/wzorzec/i', $text)</code>?",
        a: ["Tryb odwróconego wyszukiwania", "Wyszukiwanie bez uwzględniania wielkości liter (case insensitive)", "Tryb wieloliniowy (multiline)", "Izolacja grup przechwytujących"],
        correct: 1
    },
    {
        q: "Kiedy wartości ustawione przez <code>setcookie()</code> stają się dostępne w tablicy <code>$_COOKIE</code>?",
        a: ["Natychmiast po wywołaniu <code>setcookie()</code>", "Dopiero przy następnym żądaniu HTTP od przeglądarki", "Po wywołaniu <code>session_start()</code>", "Po jawnym odświeżeniu nagłówków HTTP"],
        correct: 1
    },
    {
        q: "Czym jest SOAP (Simple Object Access Protocol)?",
        a: ["Prostym protokołem REST opartym na formacie JSON", "Standardem W3C do wymiany ustrukturyzowanych wiadomości w formacie XML (kopert SOAP), stworzonym jako następnik RPC", "Biblioteką PHP do obsługi baz danych", "Formatem serializacji danych będącym alternatywą dla JSON"],
        correct: 1
    },
    {
        q: "Czym charakteryzują się usługi RESTful w odróżnieniu od SOAP?",
        a: ["Używają wyłącznie XML do przesyłania danych", "Są prostsze, używają wbudowanych metod HTTP (GET, POST, PUT, DELETE) i obsługują wiele formatów danych (JSON, XML, ...)", "Wymagają pliku WSDL do każdego wywołania", "Obsługują wyłącznie zapytania GET i POST"],
        correct: 1
    },
    {
        q: "Co robi funkcja <code>json_encode()</code> w PHP?",
        a: ["Sprawdza poprawność składniową danych JSON", "Zamienia obiekt lub tablicę PHP na ciąg tekstowy w formacie JSON", "Wczytuje plik JSON z dysku do zmiennej", "Dekoduje zakodowane nagłówki JSON z żądania HTTP"],
        correct: 1
    }
];
