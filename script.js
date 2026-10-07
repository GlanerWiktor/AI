const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const dialog = document.querySelector('.project-dialog');
const demoStage = dialog.querySelector('[data-demo-stage]');
let demoTimers = [];

const projectData = {
  atlas: {
    title: 'AtlasDesk',
    headline: 'Wsparcie techniczne znajduje odpowiedź wraz ze źródłem w kilka sekund.',
    client: 'Zanonimizowany klient · producent automatyki przemysłowej · serwis w 5 krajach',
    summary: 'Zespół wsparcia otrzymał copilota, który łączy instrukcje, zgłoszenia serwisowe, nagrania i dane produktowe. Pracownik nie dostaje tylko odpowiedzi — widzi także dokument, wersję i fragment, na których została oparta.',
    challenge: 'Eksperci tracili czas na przeszukiwanie kilku rozproszonych systemów, a nowi pracownicy długo dochodzili do samodzielności.',
    solution: 'Multimodalny RAG z grafem produktów, cytowaniem źródeł, historią decyzji i automatyczną ewaluacją odpowiedzi.',
    result: '41% krótszy czas odpowiedzi',
    story: [
      { title: 'Wiedza rosła szybciej niż zespół wsparcia', body: 'Każde urządzenie miało instrukcje, biuletyny, nagrania szkoleniowe i historię zgłoszeń. Gdy klient zgłaszał błąd, konsultant musiał ustalić model, wersję sterownika i konfigurację, a następnie przeszukać kilka repozytoriów. Najbardziej doświadczeni inżynierowie stawali się wąskim gardłem, bo tylko oni pamiętali, gdzie znajduje się właściwa procedura.' },
      { title: 'Zwykłe wyszukiwanie znajdowało słowa, a nie rozwiązania', body: 'Numery błędów bywały zapisane inaczej, filmy nie miały transkrypcji, a podobne modele korzystały z różnych procedur. Potrzebny był system, który rozumie relacje między produktem, wersją, objawem i wcześniejszym rozwiązaniem — bez mieszania instrukcji dla różnych urządzeń.' },
      { title: 'Copilot łączy pytanie z pełnym kontekstem produktu', body: 'AtlasDesk rozpoznaje intencję pytania, ustala właściwy produkt i przeszukuje dokumenty, zgłoszenia oraz transkrypcje. Graf wiedzy pilnuje zależności między wersjami, a warstwa RAG składa odpowiedź z fragmentów o najwyższej zgodności. Konsultant może od razu otworzyć każde cytowane źródło.' },
      { title: 'Zaufanie powstaje dzięki cytowaniom i kontroli jakości', body: 'Odpowiedzi bez wystarczającego potwierdzenia są oznaczane do eskalacji zamiast uzupełniane przez model. Zestaw pytań testowych sprawdza poprawność po każdej aktualizacji, a ocena konsultantów zasila kolejne iteracje. Organizacja może rozszerzać bazę o następne produkty i języki bez zmiany sposobu pracy zespołu.' }
    ],
    tags: ['Graph RAG', 'Multimodal AI', 'Knowledge graph', 'Evals']
  },
  claim: {
    title: 'ClaimFlow',
    headline: 'Agent przygotowuje kompletną sprawę, zanim ekspert podejmie decyzję.',
    client: 'Zanonimizowany klient · ubezpieczyciel majątkowy · zespół likwidacji szkód',
    summary: 'ClaimFlow czyta formularze, polisy, zdjęcia i kosztorysy, sprawdza kompletność sprawy oraz przygotowuje rekomendację. Ostateczna decyzja pozostaje po stronie eksperta, który otrzymuje pełne uzasadnienie i ślad działań agenta.',
    challenge: 'Każda sprawa wymagała ręcznego porównania wielu formularzy, załączników i reguł biznesowych.',
    solution: 'Agent rozpoznaje dokumenty, wykrywa braki, uruchamia reguły i przedstawia uzasadnioną rekomendację ekspertowi.',
    result: '3,2× szybsze przygotowanie sprawy',
    story: [
      { title: 'Ekspert zaczynał każdą sprawę od ręcznego porządkowania dokumentów', body: 'Zgłoszenia przychodziły z różnych kanałów i często zawierały niekompletne lub niespójne informacje. Przed oceną zasadności roszczenia pracownik musiał nazwać pliki, przepisać dane, porównać zakres polisy i sprawdzić, czy klient dostarczył wszystkie załączniki.' },
      { title: 'Największym problemem nie była decyzja, tylko przygotowanie materiału', body: 'Znaczna część czasu eksperta znikała na czynnościach, które nie wymagały jego osądu. Prosta automatyzacja nie wystarczała, ponieważ dokumenty różniły się układem, a wymagane kroki zależały od rodzaju szkody, produktu i warunków konkretnej polisy.' },
      { title: 'Agent prowadzi sprawę przez kontrolowany proces', body: 'ClaimFlow klasyfikuje dokumenty, wydobywa pola, porównuje wartości i uruchamia właściwe reguły. Jeżeli czegoś brakuje, przygotowuje konkretną prośbę do klienta. Gdy materiał jest kompletny, przedstawia ekspertowi rekomendację wraz z listą reguł i dowodów, które wpłynęły na wynik.' },
      { title: 'Człowiek zatwierdza, a system zachowuje pełny ślad', body: 'Agent nie wypłaca świadczenia samodzielnie. Ekspert może zaakceptować rekomendację, zmienić ją lub cofnąć proces do uzupełnienia. Każdy odczyt, zastosowana reguła i korekta są zapisywane, dzięki czemu rozwiązanie można audytować i bezpiecznie rozszerzać na kolejne rodzaje roszczeń.' }
    ],
    tags: ['Agentic AI', 'Document AI', 'Human-in-the-loop', 'Audit log']
  },
  pulse: {
    title: 'MarketPulse',
    headline: 'Tysiące opinii z 18 języków zamieniają się w jeden brief decyzyjny.',
    client: 'Zanonimizowany klient · międzynarodowy zespół produktowy · 18 rynków',
    summary: 'MarketPulse porządkuje rozmowy, recenzje, ankiety i raporty, a następnie wykrywa tematy, których częstotliwość lub znaczenie zaczynają rosnąć. Zespół produktu otrzymuje krótki brief z cytatami, skalą zjawiska i poziomem pewności.',
    challenge: 'Zespół produktu otrzymywał tysiące rozproszonych opinii, transkrypcji i raportów z wielu rynków.',
    solution: 'Pipeline klasyfikuje tematy, wykrywa nowe wzorce i generuje brief z cytowaniami i poziomem pewności.',
    result: '18 języków w jednym procesie',
    story: [
      { title: 'Najważniejsze sygnały ginęły między rynkami i formatami', body: 'Lokalne zespoły zbierały recenzje, wywiady, wyniki ankiet i obserwacje konkurencji. Materiał docierał w różnych językach i częstotliwościach, więc centralny zespół widział głównie najgłośniejsze opinie, a nie wzorce powtarzające się w całym portfelu.' },
      { title: 'Samo tłumaczenie nie rozwiązywało problemu', body: 'Te same potrzeby były opisywane innymi słowami zależnie od kraju, kanału i rodzaju klienta. Klasyczne raportowanie liczyło wzmianki, ale nie potrafiło połączyć znaczeniowo podobnych wypowiedzi ani odróżnić chwilowego szumu od trendu, który powinien wpłynąć na roadmapę.' },
      { title: 'System szuka tematów, zmian i dowodów', body: 'MarketPulse normalizuje dane, rozpoznaje język i tworzy wspólną przestrzeń znaczeniową. Grupuje wypowiedzi w tematy, śledzi ich dynamikę i wskazuje nietypowe odchylenia. Generowany brief zawiera nie tylko podsumowanie, ale także reprezentatywne cytaty i informacje o źródłach.' },
      { title: 'Badacz zachowuje kontrolę nad interpretacją', body: 'Każdy automatycznie nazwany trend może zostać połączony, rozdzielony lub odrzucony przez analityka. Zespół widzi liczebność próby i poziom pewności, dzięki czemu nie traktuje pojedynczej wypowiedzi jak faktu rynkowego. Ten sam proces można uruchamiać cyklicznie i porównywać kolejne okresy.' }
    ],
    tags: ['NLP', 'Multilingual AI', 'Topic discovery', 'Synthetic research']
  },
  guard: {
    title: 'ModelGuard',
    headline: 'Jedna warstwa kontroli zatrzymuje regresje AI przed użytkownikiem.',
    client: 'Zanonimizowany klient · organizacja regulowana · kilka produktów opartych na LLM',
    summary: 'ModelGuard daje zespołom wspólny sposób oceny poprawności, zgodności ze źródłami, danych osobowych, tonu i kosztu. Każda zmiana modelu lub promptu przechodzi przez te same kryteria przed wdrożeniem.',
    challenge: 'Każdy zespół oceniał modele inaczej, przez co porównywanie jakości i regresji było praktycznie niemożliwe.',
    solution: 'Katalog zestawów testowych, automatyczne ewaluacje, red-teaming i monitoring jakości odpowiedzi na produkcji.',
    result: '94% odpowiedzi zgodnych z kryteriami',
    story: [
      { title: 'Szybki rozwój AI stworzył niewidoczny dług jakościowy', body: 'Zespoły budowały asystentów dla różnych procesów, korzystając z innych modeli, promptów i metod oceny. Testy opierały się głównie na kilku ręcznie sprawdzonych rozmowach. Nikt nie potrafił jednoznacznie powiedzieć, czy nowa wersja była lepsza, tańsza i bezpieczniejsza od poprzedniej.' },
      { title: 'Jedna ogólna ocena nie wystarczała', body: 'Odpowiedź mogła brzmieć dobrze, ale zawierać dane osobowe, nie mieć oparcia w źródle albo łamać regułę konkretnego produktu. Potrzebny był system, który rozdziela jakość na mierzalne kryteria i pozwala przypisać im inne progi zależnie od ryzyka zastosowania.' },
      { title: 'Każda zmiana przechodzi przez powtarzalny zestaw ewaluacji', body: 'ModelGuard uruchamia testy poprawności, groundingu, kompletności, stylu, bezpieczeństwa i kosztu. Łączy oceny deterministyczne z ocenami LLM oraz ręczną walidacją próby. Red-teaming sprawdza scenariusze brzegowe, a porównanie wersji pokazuje dokładnie, gdzie pojawiła się regresja.' },
      { title: 'Governance staje się częścią procesu wdrożeniowego', body: 'Wersja niespełniająca progu nie trafia na produkcję. Po wdrożeniu system monitoruje rzeczywiste rozmowy w zanonimizowanej próbie i dodaje nowe trudne przypadki do zestawu testowego. Dzięki temu jakość nie jest jednorazowym audytem, lecz ciągłym mechanizmem rozwoju produktu.' }
    ],
    tags: ['LLMOps', 'Evals', 'Observability', 'AI governance']
  },
  cad: {
    title: 'Blueprint IQ',
    headline: 'Rysunek techniczny staje się gotowym BOM-em w 90 sekund.',
    client: 'Zanonimizowany klient · producent engineer-to-order · dział ofertowania',
    summary: 'Blueprint IQ czyta rysunki 2D, rozpoznaje geometrię, wymiary, tolerancje i materiały, a następnie układa dane w strukturę potrzebną do BOM-u oraz wyceny. Inżynier widzi, z którego miejsca dokumentacji pochodzi każdy odczyt.',
    challenge: 'Specjaliści ręcznie odczytywali wymiary, tolerancje i materiały z wielu wersji dokumentacji technicznej.',
    solution: 'Model vision-language łączy analizę geometrii z biblioteką części, historią realizacji i regułami technologicznymi.',
    result: 'Analiza rysunku w 90 sekund',
    story: [
      { title: 'Każde zapytanie zaczynało się od żmudnego czytania dokumentacji', body: 'Klienci przesyłali pliki PDF, skany, rysunki CAD i dodatkowe noty. Inżynier musiał znaleźć wersję obowiązującą, przepisać wymiary, policzyć elementy i wychwycić tolerancje wpływające na technologię. Ten sam specjalistyczny czas był potrzebny zarówno dla wygranych, jak i przegranych ofert.' },
      { title: 'OCR widział tekst, ale nie rozumiał rysunku', body: 'Wartość wymiaru bez informacji, którego elementu dotyczy, nie wystarcza do przygotowania BOM-u. System musiał rozpoznawać linie wymiarowe, symbole, relacje przestrzenne i powiązania między arkuszami, a przy tym obsługiwać różne standardy dokumentacji.' },
      { title: 'Multimodalny agent buduje strukturę projektu', body: 'Blueprint IQ łączy analizę obrazu, tekstu i geometrii. Wydobyte cechy są porównywane z biblioteką części oraz wcześniejszymi realizacjami. System grupuje pozycje, wykrywa powtórzenia i przygotowuje BOM, który może zostać przekazany do ERP lub modułu wyceny.' },
      { title: 'Każdy odczyt można sprawdzić przed przekazaniem dalej', body: 'Parametry mają poziom pewności i odnośnik do konkretnego miejsca na rysunku. Niejasne tolerancje oraz sprzeczności między arkuszami są flagowane zamiast automatycznie rozstrzygane. Inżynier zatwierdza wynik, zachowując odpowiedzialność za decyzje technologiczne.' }
    ],
    tags: ['CAD/CAM', 'Vision-language model', 'BOM', 'ERP integration']
  },
  vision: {
    title: 'LineVision',
    headline: 'Kontrola wizyjna obejmuje każdą sztukę bez zatrzymywania linii.',
    client: 'Zanonimizowany klient · producent komponentów · linia pracująca w trybie ciągłym',
    summary: 'LineVision analizuje obraz bezpośrednio przy linii, wykrywa rysy, braki i błędy montażu, a operatorowi pokazuje klasę oraz lokalizację defektu. Wynik może sterować odrzutem albo kierować produkt do ręcznej kontroli.',
    challenge: 'Kontrola próbkowa pomijała rzadkie defekty, a wyniki zależały od zmęczenia i doświadczenia inspektora.',
    solution: 'Kamery, stabilne oświetlenie i model detekcji działający przy linii z integracją do systemu odrzutu.',
    result: '100% produktów objętych inspekcją',
    story: [
      { title: 'Kontrola próbkowa nie nadążała za tempem produkcji', body: 'Inspektorzy sprawdzali wybrane sztuki, ponieważ pełna kontrola wymagałaby spowolnienia linii. Rzadkie wady mogły pojawić się między próbkami, a ocena małych rys zależała od oświetlenia, doświadczenia i zmęczenia pracownika.' },
      { title: 'Model musiał działać w warunkach fabryki, nie laboratorium', body: 'Powierzchnie odbijały światło, elementy przesuwały się, a dopuszczalne warianty produktu zmieniały się między seriami. Projekt rozpoczął się od zdefiniowania taksonomii wad, kryteriów akceptacji oraz sposobu zbierania reprezentatywnych przykładów dobrych i wadliwych sztuk.' },
      { title: 'Inspekcja odbywa się na brzegu, tuż przy linii', body: 'Kamery i kontrolowane oświetlenie dostarczają obraz do modelu działającego na urządzeniu edge. System klasyfikuje produkt w czasie rzeczywistym, wskazuje obszar defektu i przekazuje decyzję do interfejsu operatora lub mechanizmu odrzutu, bez wysyłania obrazu do zewnętrznej chmury.' },
      { title: 'Operator widzi przyczynę, a nie tylko czerwony alarm', body: 'Każda detekcja zawiera klasę wady, jej położenie, rozmiar i poziom pewności. Przypadki graniczne trafiają do człowieka, a zatwierdzone korekty rozszerzają zbiór treningowy. Rozwiązanie może być wdrażane etapami — od jednej krytycznej stacji do kolejnych linii.' }
    ],
    tags: ['Computer vision', 'Edge AI', 'Anomaly detection', 'Quality control']
  },
  quote: {
    title: 'QuotePilot',
    headline: 'Agent zamienia pakiet RFQ w przejrzystą wycenę osiem razy szybciej.',
    client: 'Zanonimizowany klient · producent engineer-to-order · zespół kalkulacji',
    summary: 'QuotePilot czyta RFQ, specyfikacje i rysunki, wydobywa wymagania oraz odnajduje podobne realizacje. Następnie przygotowuje rozpisaną kalkulację, w której każda pozycja ma formułę i wskazane źródło.',
    challenge: 'Przygotowanie oferty wymagało ręcznego zebrania danych z dokumentów i odszukania podobnych realizacji.',
    solution: 'Document AI wydobywa parametry, agent dobiera marszrutę oraz koszt, a ekspert zatwierdza założenia.',
    result: 'Oferta gotowa 8× szybciej',
    story: [
      { title: 'Najdroższy inżynierski czas był zużywany przed zdobyciem zamówienia', body: 'Pakiet RFQ zawierał wiadomości, rysunki, arkusze i specyfikacje. Kalkulator musiał ręcznie sprawdzić ilości, materiał, tolerancje, powłoki i termin, a następnie poszukać podobnego zlecenia. Nawet oferta, której klient nie zaakceptował, wymagała wielu godzin specjalistycznej pracy.' },
      { title: 'Prosty kalkulator nie potrafił uzasadnić ceny', body: 'Gotowe narzędzia działały dopiero po ręcznym wprowadzeniu uporządkowanych danych. Nie obsługiwały sprzeczności między plikami ani nie wyjaśniały, skąd pochodzi dane założenie. Zespół potrzebował automatyzacji, która przyspiesza pracę, ale nie ukrywa ryzyka w czarnej skrzynce.' },
      { title: 'Agent składa ofertę z danych, precedensów i reguł firmy', body: 'QuotePilot tworzy listę wymagań z odnośnikami do RFQ oraz rysunków, buduje BOM i wyszukuje podobne realizacje. Koszt materiału, przygotowania, obróbki, kontroli i logistyki jest liczony według reguł firmy. Narzut oraz marża pochodzą z zatwierdzonej polityki handlowej.' },
      { title: 'Inżynier widzi pełną logikę i zatwierdza ofertę', body: 'Każda pozycja pokazuje wzór, wartość oraz źródło. Braki i rozbieżności trafiają na listę pytań do klienta. Ekspert może zmienić założenie, a system przelicza całość i zapisuje korektę. Dzięki temu szybsza oferta pozostaje audytowalna i zgodna ze sposobem kalkulacji organizacji.' }
    ],
    tags: ['Document AI', 'Agentic workflow', 'Cost estimation', 'Human approval']
  },
  match: {
    title: 'MatchLens',
    headline: 'Zdjęcie konkurencyjnego produktu prowadzi do najlepszych odpowiedników we własnej ofercie.',
    client: 'Producent i dystrybutor · ponad 24 000 pozycji katalogowych · sprzedaż B2B',
    summary: 'MatchLens analizuje zdjęcie produktu konkurencji, wydobywa cechy wizualne i funkcjonalne, a następnie przeszukuje własny katalog. Handlowiec otrzymuje ranking odpowiedników z konkretnym wyjaśnieniem podobieństw, różnic i dostępności.',
    challenge: 'Identyfikacja zamiennika wymagała wiedzy kilku ekspertów i ręcznego porównywania wielu kart produktowych.',
    solution: 'Model vision tworzy opis i embedding obrazu, wyszukiwarka wektorowa znajduje kandydatów, a reguły produktowe weryfikują dopasowanie.',
    result: 'Odpowiednik odnajdywany podczas rozmowy z klientem',
    story: [
      { title: 'Klient często znał produkt konkurencji, ale nie parametry', body: 'Zapytania handlowe zaczynały się od zdjęcia, zrzutu ekranu albo fragmentu katalogu. Handlowiec musiał rozpoznać kategorię, odnaleźć właściwego eksperta i ręcznie porównać cechy z własną ofertą. Przy dużym katalogu odpowiedź przychodziła zbyt późno albo opierała się na pierwszym podobnym produkcie.' },
      { title: 'Samo podobieństwo obrazu nie wystarczało', body: 'Dwa produkty mogły wyglądać niemal identycznie, ale różnić się wymiarem, materiałem, klasą ochrony lub sposobem montażu. Dlatego ranking nie mógł bazować wyłącznie na wyglądzie. Potrzebne było połączenie obrazu z atrybutami katalogowymi i regułami kompatybilności.' },
      { title: 'System łączy cechy wizualne z wiedzą produktową', body: 'MatchLens rozpoznaje formę, materiał, proporcje, detale i widoczne oznaczenia. Następnie wyszukuje semantycznie podobne produkty, filtruje je według wymaganych parametrów i porównuje karty techniczne. Wynik pokazuje nie tylko procent dopasowania, lecz także konkretne wspólne cechy oraz różnice.' },
      { title: 'Handlowiec widzi ranking, dowody i pytania uzupełniające', body: 'Jeżeli zdjęcie nie pozwala potwierdzić kluczowego parametru, system nie zgaduje — proponuje pytanie do klienta. Każdy odpowiednik prowadzi do karty produktu i źródła danych. Dzięki temu rozwiązanie wspiera szybką odpowiedź, ale ostateczny wybór pozostaje po stronie eksperta.' }
    ],
    tags: ['Vision embeddings', 'Vector search', 'Product graph', 'Multimodal AI']
  },
  commerce: {
    title: 'ShopMind',
    headline: 'Zespół agentów prowadzi klienta od potrzeby do gotowego koszyka.',
    client: 'Zanonimizowany klient · marketplace wyposażenia wnętrz · 18 240 produktów',
    summary: 'ShopMind nie zaczyna od listy produktów. Agent rozmowy najpierw zbiera kontekst, agent katalogu sprawdza dostępne opcje, a agent rekomendacji układa kompatybilny zestaw i wyjaśnia wybór.',
    challenge: 'Klasyczne filtry i podobne produkty nie odpowiadały na złożone potrzeby ani kontekst zakupowy klienta.',
    solution: 'Agent intencji, agent katalogu i agent rekomendacji wspólnie układają spersonalizowany zestaw produktów.',
    result: '4× większe zaangażowanie w rekomendacje',
    story: [
      { title: 'Klient znał swój cel, ale nie znał parametrów produktu', body: 'Osoba urządzająca home office potrafiła opisać przestrzeń, sposób pracy i budżet, lecz nie wiedziała, jakich filtrów użyć. Tradycyjny katalog wymagał znajomości specyfikacji, a sekcja podobnych produktów promowała pojedyncze elementy zamiast kompletnego rozwiązania.' },
      { title: 'Sam chatbot dawał ogólne odpowiedzi bez kontaktu z katalogiem', body: 'Pierwsza koncepcja oparta wyłącznie na LLM brzmiała naturalnie, ale nie kontrolowała dostępności, kompatybilności ani ceny całego zestawu. Dłuższa rozmowa gubiła wcześniejsze ustalenia, przez co rekomendacja nie była wiarygodną alternatywą dla pomocy sprzedawcy.' },
      { title: 'Wyspecjalizowani agenci pracują jak mały zespół doradców', body: 'Agent rozmowy zadaje krótką serię pytań i buduje brief. Agent katalogu wykonuje wyszukiwanie semantyczne oraz sprawdza dane produktowe. Agent rekomendacji porównuje zestawy pod kątem budżetu, zgodności i preferencji, po czym przedstawia trzy najlepiej dopasowane elementy.' },
      { title: 'Rekomendacja pokazuje powody i pozostaje łatwa do zmiany', body: 'Klient widzi, które odpowiedzi wpłynęły na wybór oraz dlaczego produkty działają razem. Może zmienić budżet lub priorytet bez rozpoczynania procesu od nowa. Architektura pozwala dodawać kolejnych agentów, na przykład do wizualizacji wnętrza, promocji lub obsługi dostawy.' }
    ],
    tags: ['Multi-agent AI', 'Semantic search', 'Personalization', 'E-commerce']
  }
};

const templates = {
  atlas: () => `
    <div class="demo-app" data-demo="atlas">
      <div class="demo-topbar"><div class="demo-brand">AtlasDesk</div><div class="demo-status">12 480 źródeł · aktualizacja 4 min temu</div></div>
      <div class="demo-body">
        <aside class="demo-sidebar">
          <span class="demo-label">Przykładowe pytania</span>
          <button class="demo-choice" data-question="Jak usunąć błąd E-041 w sterowniku AX4?">Błąd E-041</button>
          <button class="demo-choice" data-question="Porównaj procedurę serwisową AX4 i AX5.">Porównaj procedury</button>
          <button class="demo-choice" data-question="Czy gwarancja obejmuje przegrzanie modułu?">Warunki gwarancji</button>
          <span class="demo-label" style="margin-top:22px">Podgląd źródła</span>
          <div class="demo-card source-preview">Wybierz źródło po otrzymaniu odpowiedzi.</div>
        </aside>
        <main class="demo-main">
          <span class="demo-label">Rozmowa z bazą wiedzy</span>
          <div class="demo-card chat-feed" aria-live="polite"><div class="chat-message">Znam instrukcje, zgłoszenia i nagrania serwisowe. Wybierz pytanie lub wpisz własne.</div></div>
          <div class="chat-compose"><input class="demo-input" aria-label="Pytanie do copilota" value="Jak usunąć błąd E-041 w sterowniku AX4?" /><button class="demo-button" type="button">Zapytaj</button></div>
          <div class="demo-pills" style="margin-top:12px"><span class="demo-pill is-good">Cytowania włączone</span><span class="demo-pill">Dane wewnętrzne</span><span class="demo-pill">PL / EN / DE</span></div>
        </main>
      </div>
    </div>`,
  claim: () => `
    <div class="demo-app" data-demo="claim">
      <div class="demo-topbar"><div class="demo-brand">ClaimFlow</div><div class="demo-status">Sprawa #CL-2026-1842</div></div>
      <div class="demo-body">
        <aside class="demo-sidebar"><span class="demo-label">Dokumenty sprawy</span><ul class="demo-list"><li><b>Formularz szkody</b><span class="ok">✓</span></li><li><b>Zdjęcia</b><span class="ok">✓ 8</span></li><li><b>Polisa</b><span class="ok">✓</span></li><li><b>Kosztorys naprawy</b><span class="alert">brak</span></li></ul><button class="demo-button claim-run" type="button" style="width:100%;margin-top:16px">Analizuj sprawę</button></aside>
        <main class="demo-main"><span class="demo-label">Przebieg agenta</span><div class="pipeline"><div class="pipeline-step">1. Odczyt</div><div class="pipeline-step">2. Walidacja</div><div class="pipeline-step">3. Reguły</div><div class="pipeline-step">4. Rekomendacja</div></div><div class="demo-grid-3"><div class="demo-metric"><strong>12</strong><span>pól wydobytych</span></div><div class="demo-metric"><strong>3</strong><span>reguły polisy</span></div><div class="demo-metric"><strong>1</strong><span>brak do uzupełnienia</span></div></div><div class="demo-card claim-result" hidden aria-live="polite"><span class="demo-label">Rekomendacja dla eksperta</span><h3>Wstrzymaj decyzję</h3><p>Zakres ochrony jest zgodny, ale brakuje kosztorysu warsztatu. Agent przygotował prośbę o dokument i zachował pełny ślad uzasadnienia.</p><div class="demo-pills"><span class="demo-pill is-good">Polisa aktywna</span><span class="demo-pill is-risk">Brak dokumentu</span><span class="demo-pill">Pewność 91%</span></div></div></main>
      </div>
    </div>`,
  pulse: () => `
    <div class="demo-app" data-demo="pulse"><div class="demo-topbar"><div class="demo-brand">MarketPulse</div><div class="demo-status">8 420 wypowiedzi · 18 języków</div></div><div class="demo-body"><aside class="demo-sidebar"><span class="demo-label">Wybierz rynek</span><button class="demo-choice is-active" data-market="fintech">Fintech B2B</button><button class="demo-choice" data-market="retail">Retail</button><button class="demo-choice" data-market="energy">Energia</button><span class="demo-label" style="margin-top:20px">Źródła</span><div class="demo-pills"><span class="demo-pill">Opinie</span><span class="demo-pill">Wywiady</span><span class="demo-pill">Social</span><span class="demo-pill">Raporty</span></div></aside><main class="demo-main"><div class="demo-kpi-row"><div class="demo-kpi"><strong data-pulse-kpi="mentions">2 148</strong><span>wzmianek</span></div><div class="demo-kpi"><strong data-pulse-kpi="sentiment">+24%</strong><span>sentyment</span></div><div class="demo-kpi"><strong data-pulse-kpi="signal">3</strong><span>nowe sygnały</span></div></div><div class="demo-grid-2"><div class="demo-card"><span class="demo-label">Dynamika tematów</span><div class="insight-chart"><i style="--h:36%"></i><i style="--h:58%"></i><i class="is-hot" style="--h:84%"></i><i style="--h:62%"></i><i style="--h:48%"></i><i style="--h:70%"></i></div></div><div class="demo-card"><span class="demo-label">Brief AI</span><h3 data-pulse-title>Rosną oczekiwania wobec explainability</h3><p data-pulse-summary>Decydenci częściej pytają nie tylko o wynik modelu, ale o źródła, ślad decyzji i możliwość ręcznej korekty.</p><div class="demo-pills"><span class="demo-pill is-good">trend rosnący</span><span class="demo-pill">pewność 88%</span></div></div></div></main></div></div>`,
  guard: () => `
    <div class="demo-app" data-demo="guard"><div class="demo-topbar"><div class="demo-brand">ModelGuard</div><div class="demo-status">Pakiet testów: Customer AI / v4.2</div></div><div class="demo-body"><aside class="demo-sidebar"><label class="demo-label" for="guard-prompt">Przykładowa odpowiedź modelu</label><textarea class="demo-textarea" id="guard-prompt">Klient Anna Kowalska ma aktywną polisę nr 88319. Zwrot zostanie wykonany w ciągu 14 dni.</textarea><button class="demo-button guard-run" type="button" style="width:100%;margin-top:10px">Uruchom ewaluację</button><div class="demo-pills" style="margin-top:15px"><span class="demo-pill">Poprawność</span><span class="demo-pill">PII</span><span class="demo-pill">Grounding</span><span class="demo-pill">Ton</span></div></aside><main class="demo-main"><div class="demo-grid-2"><div class="demo-card"><span class="demo-label">Wynik łączny</span><div class="score-ring" data-score="--" style="--score:0"></div></div><div class="demo-card"><span class="demo-label">Ocena kryteriów</span><ul class="demo-list guard-list"><li><b>Zgodność ze źródłem</b><small>oczekuje</small></li><li><b>Dane osobowe</b><small>oczekuje</small></li><li><b>Kompletność</b><small>oczekuje</small></li><li><b>Styl odpowiedzi</b><small>oczekuje</small></li></ul></div></div><div class="demo-card guard-advice" hidden><span class="demo-label">Rekomendacja</span><p>Usuń dane osobowe i numer polisy z odpowiedzi. Termin 14 dni wymaga cytowania z regulaminu.</p><div class="demo-pills"><span class="demo-pill is-risk">PII</span><span class="demo-pill is-risk">brak źródła</span><span class="demo-pill is-good">ton poprawny</span></div></div></main></div></div>`,
  cad: () => `
    <div class="demo-app" data-demo="cad"><div class="demo-topbar"><div class="demo-brand">Blueprint IQ</div><select class="demo-select cad-sample" aria-label="Wybierz przykładowy rysunek" style="width:auto"><option value="plate">Płyta montażowa A17</option><option value="bracket">Wspornik B04</option></select></div><div class="demo-body"><aside class="demo-sidebar"><span class="demo-label">Wydobyte parametry</span><ul class="demo-list cad-values"><li><b>Materiał</b><small>S355</small></li><li><b>Grubość</b><small>12 mm</small></li><li><b>Otwory</b><small>4 × M8</small></li><li><b>Tolerancja</b><small>±0,2 mm</small></li></ul><button class="demo-button cad-build" type="button" style="width:100%;margin-top:15px">Generuj BOM</button><div class="demo-card cad-bom" hidden style="margin-top:12px"><b>14 pozycji</b><br><small>Materiał + obróbka + kontrola</small></div></aside><main class="demo-main"><span class="demo-label">Kliknij znacznik na rysunku</span><div class="drawing-canvas"><div class="drawing-part"></div><button class="drawing-hotspot" data-note="Wymiar bazowy: 240 × 160 mm">1</button><button class="drawing-hotspot" data-note="4 otwory gwintowane M8, rozstaw 180 mm">2</button><button class="drawing-hotspot" data-note="Tolerancja płaskości: 0,2 mm">3</button><div class="drawing-tooltip">Model wykrył 3 grupy cech. Wybierz znacznik, aby zobaczyć interpretację.</div></div></main></div></div>`,
  vision: () => `
    <div class="demo-app" data-demo="vision"><div class="demo-topbar"><div class="demo-brand">LineVision</div><div class="demo-status">Kamera 04 · Linia B</div></div><div class="demo-body"><aside class="demo-sidebar"><span class="demo-label">Parametry inspekcji</span><div class="demo-kpi"><strong data-scan-total>1 284</strong><span>sprawdzonych sztuk</span></div><div class="demo-kpi" style="margin-top:8px"><strong data-scan-defects>7</strong><span>wykrytych wad</span></div><label class="demo-label" for="sensitivity" style="margin-top:18px">Czułość modelu</label><input id="sensitivity" type="range" min="70" max="99" value="92" style="width:100%"><button class="demo-button vision-run" type="button" style="width:100%;margin-top:16px">Skanuj kolejną serię</button></aside><main class="demo-main"><div class="inspection-view"><div class="scan-beam"></div><div class="inspection-track"><i class="inspection-item"></i><i class="inspection-item"></i><i class="inspection-item is-bad"></i><i class="inspection-item"></i><i class="inspection-item"></i></div></div><div class="demo-card vision-result" style="margin-top:12px"><span class="demo-label">Ostatnia detekcja</span><div class="demo-grid-3"><div><b>Klasa</b><br><small>rysa powierzchniowa</small></div><div><b>Rozmiar</b><br><small>0,8 mm</small></div><div><b>Pewność</b><br><small>96,4%</small></div></div></div></main></div></div>`,
  quote: () => `
    <div class="demo-app" data-demo="quote">
      <div class="demo-topbar"><div class="demo-brand">QuotePilot</div><div class="demo-status">RFQ_0294.zip · agent przeanalizował 12 plików</div></div>
      <div class="demo-body">
        <aside class="demo-sidebar quote-sidebar">
          <span class="demo-label">Elementy wyciągnięte z RFQ</span>
          <ul class="rfq-extract">
            <li><b data-rfq-quantity>240 szt.</b><small>RFQ §2.1 · ilość</small></li>
            <li><b data-rfq-material>Stal S355 · 12 mm</b><small>Rysunek A17 · nota materiałowa</small></li>
            <li><b>±0,2 mm</b><small>Rysunek A17 · nota 6</small></li>
            <li><b>Ocynk ZN-12</b><small>Specyfikacja POW-04 · s. 3</small></li>
            <li><b data-rfq-deadline>14 dni</b><small>RFQ §4.2 · termin dostawy</small></li>
          </ul>
          <div class="quote-controls">
            <label class="demo-label" for="quote-material">Zmień wariant materiału</label>
            <select class="demo-select quote-material" id="quote-material"><option value="1" data-kg="22">Stal S355</option><option value="1.35" data-kg="29.7">Stal nierdzewna 304</option><option value="1.65" data-kg="36.3">Aluminium 7075</option></select>
            <label class="demo-label" for="quote-qty">Liczba sztuk</label>
            <input class="demo-input quote-qty" id="quote-qty" type="number" min="1" max="5000" value="240">
            <label class="quote-checkbox"><input type="checkbox" class="quote-fast"> Termin ekspresowy (+18% kosztu operacyjnego)</label>
            <button class="demo-button quote-run" type="button">Przelicz ofertę</button>
          </div>
        </aside>
        <main class="demo-main quote-main">
          <div class="demo-kpi-row"><div class="demo-kpi"><strong>14</strong><span>pozycji BOM</span></div><div class="demo-kpi"><strong>6,4 h</strong><span>czas obróbki / seria</span></div><div class="demo-kpi"><strong>92%</strong><span>podobieństwo do zlecenia #184</span></div></div>
          <div class="quote-heading"><div><span class="demo-label">Jak agent policzył wycenę</span><h3>Rozpiska kosztów ze źródłami</h3></div><span class="demo-pill is-good">5/5 danych potwierdzonych</span></div>
          <div class="cost-breakdown" aria-live="polite">
            <div class="cost-row"><div><b>Materiał</b><span data-quote-material-formula>240 × 22,00 € × 1,00</span><small>Źródło: Rysunek A17 + cennik MAT-2026-09</small></div><strong data-cost-material>5 280 €</strong></div>
            <div class="cost-row"><div><b>Przygotowanie i CNC</b><span data-quote-machining-formula>4 200 € setup + 240 × 12,00 €</span><small>Źródło: marszruta podobnego zlecenia #184</small></div><strong data-cost-machining>7 080 €</strong></div>
            <div class="cost-row"><div><b>Kontrola jakości</b><span data-quote-quality-formula>850 € + 240 × 3,00 €</span><small>Źródło: tolerancja ±0,2 mm · Rysunek A17, nota 6</small></div><strong data-cost-quality>1 570 €</strong></div>
            <div class="cost-row"><div><b>Logistyka i pakowanie</b><span>ryczałt dla tej strefy dostawy</span><small>Źródło: RFQ §4.1 + tabela LOG-EU-3</small></div><strong data-cost-logistics>980 €</strong></div>
            <div class="cost-row cost-row-subtotal"><div><b>Koszt bazowy</b><span>suma pozycji powyżej</span><small>Bez narzutu i marży</small></div><strong data-cost-base>14 910 €</strong></div>
            <div class="cost-row"><div><b>Narzut operacyjny</b><span data-quote-overhead-formula>12% × koszt bazowy</span><small>Źródło: polityka finansowa FIN-08</small></div><strong data-cost-overhead>1 789 €</strong></div>
            <div class="cost-row"><div><b>Marża handlowa</b><span data-quote-margin-formula>18% × koszt po narzucie</span><small>Źródło: CRM · segment Industrial / EU</small></div><strong data-cost-margin>3 006 €</strong></div>
          </div>
          <div class="quote-total-row"><div><small>Wartość oferty netto</small><strong data-quote-total>19 705 €</strong></div><div><span data-quote-time>Termin: 14 dni</span><small>Wymaga zatwierdzenia handlowca</small></div></div>
        </main>
      </div>
    </div>`,
  match: () => `
    <div class="demo-app" data-demo="match">
      <div class="demo-topbar"><div class="demo-brand">MatchLens</div><div class="demo-status">Analiza lokalna · katalog własny 24 680 produktów</div></div>
      <div class="demo-body">
        <aside class="demo-sidebar">
          <span class="demo-label">1. Dodaj własne zdjęcie produktu</span>
          <label class="match-upload-zone" data-match-drop>
            <input class="match-file-input" type="file" accept="image/png,image/jpeg,image/webp" aria-label="Wybierz zdjęcie produktu konkurencji">
            <span class="match-upload-icon" aria-hidden="true"></span>
            <strong>Wgraj lub przeciągnij zdjęcie</strong>
            <small>JPG, PNG lub WebP · maks. 12 MB</small>
          </label>
          <div class="match-file-card" data-match-file hidden>
            <img data-match-thumb alt="Podgląd wybranego zdjęcia">
            <div><b data-match-filename></b><small data-match-filesize></small></div>
            <span>gotowe</span>
          </div>
          <p class="match-privacy">Zdjęcie jest przetwarzane wyłącznie w tej karcie przeglądarki i nie jest wysyłane.</p>
          <div class="demo-card match-features" hidden>
            <span class="demo-label">Cechy rozpoznane na zdjęciu</span>
            <ul class="demo-list" data-match-features></ul>
          </div>
          <button class="demo-button match-run" type="button" style="width:100%;margin-top:14px" disabled>2. Analizuj i znajdź odpowiedniki</button>
        </aside>
        <main class="demo-main">
          <section class="match-awaiting" data-match-awaiting>
            <div class="match-awaiting-visual">
              <img data-match-awaiting-image alt="Podgląd zdjęcia oczekującego na analizę" hidden>
              <span class="match-awaiting-icon" aria-hidden="true"></span>
            </div>
            <span class="demo-label">Oczekiwanie na zdjęcie</span>
            <h3 data-match-awaiting-title>Najpierw dodaj zdjęcie produktu konkurencji</h3>
            <p data-match-awaiting-copy>Po wybraniu pliku przycisk analizy zostanie aktywowany. Wyniki nie pojawią się przed uruchomieniem modelu.</p>
            <div class="match-flow-steps"><span class="is-active">1. Zdjęcie</span><span>2. Analiza</span><span>3. Odpowiedniki</span></div>
          </section>
          <section class="match-results" data-match-results hidden>
            <div class="demo-grid-2">
              <div class="match-scan-preview">
                <img data-match-preview alt="Analizowane zdjęcie produktu"><div class="match-scan-line"></div>
                <div class="match-detected"><span data-match-type></span><span>pewność <b data-match-confidence></b></span></div>
              </div>
              <div class="demo-card">
                <span class="demo-label">Wynik analizy własnego zdjęcia</span>
                <h3 data-match-heading></h3>
                <p>Model porównał wygląd obrazu z atrybutami kart produktowych. Różnice krytyczne obniżają wynik niezależnie od podobieństwa wizualnego.</p>
                <div class="demo-pills"><span class="demo-pill is-good">obraz + katalog</span><span class="demo-pill">reguły zgodności</span></div>
              </div>
            </div>
            <span class="demo-label" style="margin-top:16px">3. Najbliższe produkty z własnej bazy</span>
            <div class="match-products-grid" data-match-products aria-live="polite"></div>
          </section>
          <div class="match-processing" data-match-processing hidden aria-live="polite">
            <i></i><div><strong>Model analizuje zdjęcie</strong><span>cechy wizualne → wyszukiwanie wektorowe → reguły katalogowe</span></div>
          </div>
        </main>
      </div>
    </div>`,
  commerce: () => `
    <div class="demo-app" data-demo="commerce">
      <div class="demo-topbar"><div class="demo-brand">ShopMind</div><div class="demo-status">3 agentów · katalog 18 240 produktów</div></div>
      <div class="demo-body">
        <aside class="demo-sidebar shop-agents">
          <span class="demo-label">Zespół agentów</span>
          <div class="agent-status is-working" data-agent="conversation"><i></i><div><b>Agent rozmowy</b><small>zadaje pytanie 1 z 3</small></div></div>
          <div class="agent-status" data-agent="catalog"><i></i><div><b>Agent katalogu</b><small>czeka na kontekst</small></div></div>
          <div class="agent-status" data-agent="recommendation"><i></i><div><b>Agent rekomendacji</b><small>czeka na shortlistę</small></div></div>
          <div class="demo-card shop-memory"><span class="demo-label">Pamięć robocza</span><ul class="demo-list" data-shop-memory><li><b>Cel</b><small>—</small></li><li><b>Priorytet</b><small>—</small></li><li><b>Budżet</b><small>—</small></li></ul></div>
          <button class="demo-choice shop-reset" type="button">Zacznij rozmowę od nowa</button>
        </aside>
        <main class="demo-main shop-main">
          <span class="demo-label">Agent prowadzi klienta do decyzji</span>
          <div class="shop-conversation" aria-live="polite">
            <div class="chat-message"><strong>Agent rozmowy</strong><br>Najpierw zrozumiem sytuację, zamiast od razu pokazywać produkty. Gdzie ma działać zestaw?</div>
          </div>
          <div class="shop-options" role="group" aria-label="Odpowiedzi klienta"></div>
          <section class="shop-result" hidden>
            <div class="shop-result-head"><div><span class="demo-label">Wynik współpracy agentów</span><h3 data-commerce-title>Gotowy zestaw</h3><p data-commerce-copy></p></div><span class="demo-pill is-good">96% dopasowania</span></div>
            <div class="product-results"><article class="product-result"><div class="product-thumb"></div><strong data-product-1></strong><small>Agent katalogu · wybór 1</small></article><article class="product-result"><div class="product-thumb"></div><strong data-product-2></strong><small>Agent katalogu · wybór 2</small></article><article class="product-result"><div class="product-thumb"></div><strong data-product-3></strong><small>Agent katalogu · wybór 3</small></article></div>
            <div class="demo-card shop-reason"><span class="demo-label">Dlaczego agent proponuje ten zestaw?</span><p data-commerce-reason></p><div class="demo-pills"><span class="demo-pill">zgodność z budżetem</span><span class="demo-pill">kompatybilność</span><span class="demo-pill">dostępne od ręki</span></div></div>
          </section>
        </main>
      </div>
    </div>`
};

const clearDemoTimers = () => {
  demoTimers.forEach((timer) => clearTimeout(timer));
  demoTimers = [];
};

const addTimer = (callback, delay) => {
  const timer = setTimeout(callback, delay);
  demoTimers.push(timer);
};

const appendChat = (feed, text, className = '') => {
  const message = document.createElement('div');
  message.className = `chat-message ${className}`.trim();
  message.textContent = text;
  feed.appendChild(message);
  feed.scrollTop = feed.scrollHeight;
};

const bindDemo = (key) => {
  const root = demoStage.querySelector('[data-demo]');
  if (!root) return;

  if (key === 'atlas') {
    const input = root.querySelector('.demo-input');
    const feed = root.querySelector('.chat-feed');
    const preview = root.querySelector('.source-preview');
    const answers = [
      'Błąd E-041 oznacza przerwanie komunikacji z modułem osi. Wyłącz zasilanie na 30 sekund, sprawdź złącze X14 i uruchom test diagnostyczny 4.2. Jeśli kod wróci, wymień przewód sygnałowy.',
      'AX5 ma dodatkowy test automatyczny i nie wymaga ręcznego resetu magistrali. Pozostałe kroki są wspólne: kontrola X14, log diagnostyczny i test ruchu bez obciążenia.',
      'Tak, jeśli przegrzanie nie wynika z pracy poza zakresem temperatury. Potrzebne są log temperatury i numer wersji modułu.'
    ];
    const ask = () => {
      const question = input.value.trim();
      if (!question) return;
      appendChat(feed, question, 'user');
      const button = root.querySelector('.demo-button');
      button.disabled = true;
      addTimer(() => {
        const index = /porównaj/i.test(question) ? 1 : /gwarancja/i.test(question) ? 2 : 0;
        appendChat(feed, answers[index]);
        preview.innerHTML = '<button class="source-item"><strong>Instrukcja AX4 · rozdz. 4.2</strong><small>Procedura E-041 · str. 64</small></button><button class="source-item"><strong>Zgłoszenie #SR-1841</strong><small>Rozwiązane 12.08.2026</small></button>';
        button.disabled = false;
      }, 450);
    };
    root.querySelectorAll('[data-question]').forEach((button) => button.addEventListener('click', () => { input.value = button.dataset.question; ask(); }));
    root.querySelector('.demo-button').addEventListener('click', ask);
    input.addEventListener('keydown', (event) => { if (event.key === 'Enter') ask(); });
  }

  if (key === 'claim') {
    const button = root.querySelector('.claim-run');
    const steps = [...root.querySelectorAll('.pipeline-step')];
    button.addEventListener('click', () => {
      button.disabled = true;
      root.querySelector('.claim-result').hidden = true;
      steps.forEach((step) => step.className = 'pipeline-step');
      steps.forEach((step, index) => addTimer(() => {
        steps.slice(0, index).forEach((done) => done.className = 'pipeline-step is-done');
        step.className = 'pipeline-step is-running';
        if (index === steps.length - 1) addTimer(() => {
          step.className = 'pipeline-step is-done';
          root.querySelector('.claim-result').hidden = false;
          button.disabled = false;
        }, 420);
      }, index * 420));
    });
  }

  if (key === 'pulse') {
    const markets = {
      fintech: ['2 148', '+24%', '3', 'Rosną oczekiwania wobec explainability', 'Decydenci częściej pytają nie tylko o wynik modelu, ale o źródła, ślad decyzji i możliwość ręcznej korekty.', [36,58,84,62,48,70]],
      retail: ['3 920', '+11%', '5', 'Klienci chcą rekomendacji z uzasadnieniem', 'Najlepiej oceniane doświadczenia pokazują nie tylko produkt, lecz także krótkie wyjaśnienie, dlaczego pasuje do sytuacji klienta.', [72,44,60,89,54,77]],
      energy: ['1 306', '-6%', '2', 'Koszt wdrożenia wypiera rozmowę o modelu', 'W wypowiedziach technicznych rośnie udział tematów integracji, utrzymania i kontroli kosztu inferencji.', [31,46,39,54,81,63]]
    };
    root.querySelectorAll('[data-market]').forEach((button) => button.addEventListener('click', () => {
      root.querySelectorAll('[data-market]').forEach((item) => item.classList.toggle('is-active', item === button));
      const data = markets[button.dataset.market];
      root.querySelector('[data-pulse-kpi="mentions"]').textContent = data[0];
      root.querySelector('[data-pulse-kpi="sentiment"]').textContent = data[1];
      root.querySelector('[data-pulse-kpi="signal"]').textContent = data[2];
      root.querySelector('[data-pulse-title]').textContent = data[3];
      root.querySelector('[data-pulse-summary]').textContent = data[4];
      root.querySelectorAll('.insight-chart i').forEach((bar,index) => bar.style.setProperty('--h', `${data[5][index]}%`));
    }));
  }

  if (key === 'guard') {
    root.querySelector('.guard-run').addEventListener('click', () => {
      const text = root.querySelector('.demo-textarea').value;
      const hasPII = /Anna|Kowalska|88319|@|telefon/i.test(text);
      const score = hasPII ? 58 : 91;
      const ring = root.querySelector('.score-ring');
      ring.style.setProperty('--score', score);
      ring.dataset.score = score;
      const values = hasPII ? [['Zgodność ze źródłem','72%'],['Dane osobowe','ryzyko'],['Kompletność','81%'],['Styl odpowiedzi','96%']] : [['Zgodność ze źródłem','94%'],['Dane osobowe','brak'],['Kompletność','88%'],['Styl odpowiedzi','97%']];
      root.querySelector('.guard-list').innerHTML = values.map(([name,value]) => `<li><b>${name}</b><small class="${value === 'ryzyko' ? 'alert' : 'ok'}">${value}</small></li>`).join('');
      root.querySelector('.guard-advice').hidden = false;
    });
  }

  if (key === 'cad') {
    const samples = {
      plate: [['Materiał','S355'],['Grubość','12 mm'],['Otwory','4 × M8'],['Tolerancja','±0,2 mm']],
      bracket: [['Materiał','Al 7075'],['Grubość','8 mm'],['Gięcia','2 × 90°'],['Tolerancja','±0,1 mm']]
    };
    root.querySelector('.cad-sample').addEventListener('change', (event) => {
      root.querySelector('.cad-values').innerHTML = samples[event.target.value].map(([name,value]) => `<li><b>${name}</b><small>${value}</small></li>`).join('');
      root.querySelector('.cad-bom').hidden = true;
    });
    root.querySelectorAll('.drawing-hotspot').forEach((button) => button.addEventListener('click', () => { root.querySelector('.drawing-tooltip').textContent = button.dataset.note; }));
    root.querySelector('.cad-build').addEventListener('click', () => { root.querySelector('.cad-bom').hidden = false; });
  }

  if (key === 'vision') {
    root.querySelector('.vision-run').addEventListener('click', () => {
      const view = root.querySelector('.inspection-view');
      const button = root.querySelector('.vision-run');
      button.disabled = true;
      view.classList.remove('is-scanning');
      void view.offsetWidth;
      view.classList.add('is-scanning');
      addTimer(() => {
        const total = Number(root.querySelector('[data-scan-total]').textContent.replace(/\s/g, ''));
        const defects = Number(root.querySelector('[data-scan-defects]').textContent);
        root.querySelector('[data-scan-total]').textContent = new Intl.NumberFormat('pl-PL').format(total + 5);
        root.querySelector('[data-scan-defects]').textContent = String(defects + 1);
        view.classList.remove('is-scanning');
        button.disabled = false;
      }, 1300);
    });
  }

  if (key === 'quote') {
    const formatCurrency = (value) => `${new Intl.NumberFormat('pl-PL', { maximumFractionDigits: 0 }).format(Math.round(value))} €`;
    const calculateQuote = () => {
      const quantity = Math.max(1, Number(root.querySelector('.quote-qty').value) || 1);
      const materialFactor = Number(root.querySelector('.quote-material').value);
      const fast = root.querySelector('.quote-fast').checked;
      const select = root.querySelector('.quote-material');
      const materialName = select.options[select.selectedIndex].text;
      const unitMaterial = 22 * materialFactor;
      const urgency = fast ? 1.18 : 1;
      const materialCost = quantity * unitMaterial;
      const machiningCost = (4200 + quantity * 12) * urgency;
      const qualityCost = (850 + quantity * 3) * urgency;
      const logisticsCost = 980;
      const baseCost = materialCost + machiningCost + qualityCost + logisticsCost;
      const overhead = baseCost * .12;
      const margin = (baseCost + overhead) * .18;
      const total = baseCost + overhead + margin;

      root.querySelector('.quote-qty').value = quantity;
      root.querySelector('[data-rfq-quantity]').textContent = `${new Intl.NumberFormat('pl-PL').format(quantity)} szt.`;
      root.querySelector('[data-rfq-material]').textContent = `${materialName} · 12 mm`;
      root.querySelector('[data-rfq-deadline]').textContent = fast ? '7 dni · ekspres' : '14 dni';
      root.querySelector('[data-quote-material-formula]').textContent = `${quantity} × ${unitMaterial.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €${materialFactor === 1 ? '' : ` (wsp. ${materialFactor.toLocaleString('pl-PL')})`}`;
      root.querySelector('[data-quote-machining-formula]').textContent = `4 200 € setup + ${quantity} × 12,00 €${fast ? ' · × 1,18 ekspres' : ''}`;
      root.querySelector('[data-quote-quality-formula]').textContent = `850 € + ${quantity} × 3,00 €${fast ? ' · × 1,18 ekspres' : ''}`;
      root.querySelector('[data-quote-overhead-formula]').textContent = `12% × ${formatCurrency(baseCost)}`;
      root.querySelector('[data-quote-margin-formula]').textContent = `18% × ${formatCurrency(baseCost + overhead)}`;
      root.querySelector('[data-cost-material]').textContent = formatCurrency(materialCost);
      root.querySelector('[data-cost-machining]').textContent = formatCurrency(machiningCost);
      root.querySelector('[data-cost-quality]').textContent = formatCurrency(qualityCost);
      root.querySelector('[data-cost-logistics]').textContent = formatCurrency(logisticsCost);
      root.querySelector('[data-cost-base]').textContent = formatCurrency(baseCost);
      root.querySelector('[data-cost-overhead]').textContent = formatCurrency(overhead);
      root.querySelector('[data-cost-margin]').textContent = formatCurrency(margin);
      root.querySelector('[data-quote-time]').textContent = fast ? 'Termin: 7 dni · ekspres' : 'Termin: 14 dni';
      root.querySelector('[data-quote-total]').textContent = formatCurrency(total);
    };
    root.querySelector('.quote-run').addEventListener('click', calculateQuote);
    calculateQuote();
  }

  if (key === 'match') {
    const samples = {
      lamp: {
        type: 'oprawa oświetleniowa', confidence: '96%', heading: '3 lampy o podobnej formie i parametrach',
        features: [['Forma','cylindryczna'],['Materiał','aluminium'],['Montaż','wiszący'],['Kolor','grafit']],
        products: [
          ['Luma Pro 420','94%','Ta sama forma, materiał i sposób montażu. Wyższy strumień światła.','SKU LP-420 · dostępny'],
          ['Axis Pendant S','89%','Zgodne wymiary i moc. Inne wykończenie powierzchni.','SKU AP-S40 · 4 dni'],
          ['Mono Line 38','83%','Podobny profil, lecz inny system montażowy — wymaga weryfikacji.','SKU ML-038 · dostępny']
        ]
      },
      chair: {
        type: 'krzesło konferencyjne', confidence: '93%', heading: '3 modele o zbliżonej geometrii i zastosowaniu',
        features: [['Forma','kubełkowa'],['Materiał','polipropylen'],['Podstawa','4 nogi'],['Kolor','piaskowy']],
        products: [
          ['Noma Chair 4L','92%','Zgodna geometria siedziska, materiał i typ podstawy.','SKU NC-4L · dostępny'],
          ['Folda One','87%','Podobne zastosowanie i wymiary, dodatkowo możliwość sztaplowania.','SKU FO-110 · 2 dni'],
          ['Arc Seat Basic','81%','Zbliżona bryła, lecz metalowa rama ma inny profil.','SKU AS-B2 · dostępny']
        ]
      },
      pump: {
        type: 'pompa obiegowa', confidence: '91%', heading: '3 pompy dopasowane także według parametrów technicznych',
        features: [['Typ','pompa obiegowa'],['Przyłącze','kołnierzowe'],['Korpus','żeliwo'],['Sterowanie','elektroniczne']],
        products: [
          ['FlowCore 65E','91%','Zgodne przyłącze, zakres pracy i sterowanie elektroniczne.','SKU FC-65E · 3 dni'],
          ['CircaDrive 60','86%','Podobna charakterystyka, mniejsza wysokość podnoszenia.','SKU CD-60 · dostępny'],
          ['HydroLoop X7','78%','Zgodny korpus i montaż, inny protokół komunikacyjny.','SKU HL-X7 · zapytaj']
        ]
      }
    };
    let selected = null;
    let imageUrl = '';
    const input = root.querySelector('.match-file-input');
    const dropZone = root.querySelector('[data-match-drop]');
    const fileCard = root.querySelector('[data-match-file]');
    const awaiting = root.querySelector('[data-match-awaiting]');
    const awaitingImage = root.querySelector('[data-match-awaiting-image]');
    const awaitingTitle = root.querySelector('[data-match-awaiting-title]');
    const awaitingCopy = root.querySelector('[data-match-awaiting-copy]');
    const results = root.querySelector('[data-match-results]');
    const processing = root.querySelector('[data-match-processing]');
    const features = root.querySelector('.match-features');
    const run = root.querySelector('.match-run');
    const render = () => {
      const data = samples[selected];
      root.querySelector('[data-match-type]').textContent = data.type;
      root.querySelector('[data-match-confidence]').textContent = data.confidence;
      root.querySelector('[data-match-heading]').textContent = data.heading;
      root.querySelector('[data-match-features]').innerHTML = data.features.map(([name,value]) => `<li><b>${name}</b><small>${value}</small></li>`).join('');
      root.querySelector('[data-match-products]').innerHTML = data.products.map(([name,score,reason,meta]) => `<article class="match-product"><div class="match-product-top"><b>${name}</b><strong>${score}</strong></div><div class="match-product-shape"></div><p>${reason}</p><small>${meta}</small></article>`).join('');
      root.querySelector('[data-match-preview]').src = imageUrl;
    };
    const showError = (message) => {
      selected = null;
      imageUrl = '';
      run.disabled = true;
      fileCard.hidden = true;
      results.hidden = true;
      processing.hidden = true;
      features.hidden = true;
      awaiting.hidden = false;
      awaitingImage.hidden = true;
      awaiting.classList.remove('has-image');
      awaitingTitle.textContent = 'Nie udało się użyć tego pliku';
      awaitingCopy.textContent = message;
    };
    const prepareFile = (file) => {
      if (!file) return;
      if (!/^image\/(jpeg|png|webp)$/i.test(file.type)) {
        showError('Wybierz zdjęcie w formacie JPG, PNG lub WebP.');
        return;
      }
      if (file.size > 12 * 1024 * 1024) {
        showError('Zdjęcie jest większe niż 12 MB. Wybierz mniejszy plik.');
        return;
      }
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        imageUrl = reader.result;
        selected = ['lamp','chair','pump'][(file.name.length + file.size) % 3];
        root.querySelector('[data-match-thumb]').src = imageUrl;
        root.querySelector('[data-match-filename]').textContent = file.name;
        root.querySelector('[data-match-filesize]').textContent = `${(file.size / 1024).toLocaleString('pl-PL', { maximumFractionDigits: 0 })} KB · ${file.type.replace('image/','').toUpperCase()}`;
        fileCard.hidden = false;
        awaiting.hidden = false;
        awaitingImage.src = imageUrl;
        awaitingImage.hidden = false;
        awaiting.classList.add('has-image');
        awaitingTitle.textContent = 'Zdjęcie jest gotowe do analizy';
        awaitingCopy.textContent = 'Kliknij przycisk analizy. Dopiero wtedy model przeszuka własną bazę produktową i pokaże odpowiedniki.';
        results.hidden = true;
        processing.hidden = true;
        features.hidden = true;
        run.disabled = false;
        run.textContent = '2. Analizuj i znajdź odpowiedniki';
      });
      reader.addEventListener('error', () => showError('Przeglądarka nie mogła odczytać zdjęcia. Spróbuj użyć innego pliku.'));
      reader.readAsDataURL(file);
    };
    input.addEventListener('change', () => prepareFile(input.files[0]));
    ['dragenter','dragover'].forEach((eventName) => dropZone.addEventListener(eventName, (event) => {
      event.preventDefault();
      dropZone.classList.add('is-dragging');
    }));
    ['dragleave','drop'].forEach((eventName) => dropZone.addEventListener(eventName, (event) => {
      event.preventDefault();
      dropZone.classList.remove('is-dragging');
    }));
    dropZone.addEventListener('drop', (event) => prepareFile(event.dataTransfer.files[0]));
    run.addEventListener('click', () => {
      if (!selected || !imageUrl) return;
      run.disabled = true;
      awaiting.hidden = true;
      results.hidden = true;
      features.hidden = true;
      processing.hidden = false;
      addTimer(() => {
        render();
        processing.hidden = true;
        results.hidden = false;
        features.hidden = false;
        run.disabled = false;
        run.textContent = 'Przeanalizuj zdjęcie ponownie';
      }, 1250);
    });
  }

  if (key === 'commerce') {
    const discoverySteps = [
      {
        key: 'goal',
        question: 'Gdzie ma działać zestaw?',
        options: [
          { value: 'home', label: 'Home office', memory: 'Home office' },
          { value: 'creator', label: 'Mobilne studio twórcy', memory: 'Mobilne studio' },
          { value: 'team', label: 'Sala dla zespołu', memory: 'Sala zespołowa' }
        ]
      },
      {
        key: 'priority',
        question: 'Co jest najważniejsze w codziennym użyciu?',
        options: [
          { value: 'simple', label: 'Mało kabli i prostota', memory: 'Prostota' },
          { value: 'quality', label: 'Najlepszy obraz i dźwięk', memory: 'Jakość AV' },
          { value: 'collab', label: 'Współpraca wielu osób', memory: 'Współpraca' }
        ]
      },
      {
        key: 'budget',
        question: 'Jaki budżet ma uwzględnić agent?',
        options: [
          { value: 'low', label: 'Do 800 €', memory: 'do 800 €' },
          { value: 'mid', label: '800–1 500 €', memory: '800–1 500 €' },
          { value: 'open', label: 'Elastyczny — liczy się efekt', memory: 'elastyczny' }
        ]
      }
    ];
    const recommendations = {
      home: ['Kompaktowe home office', 'Zestaw do spokojnej pracy, rozmów i szybkiego przełączania laptopa.', ['Monitor Air 27', 'Hub One', 'Lamp Mini'], 'Agent połączył małą przestrzeń z priorytetem wygody. Wszystkie urządzenia zmieszczą się na biurku 120 cm i działają przez jeden hub USB-C.'],
      creator: ['Mobilne studio twórcy', 'Lekki zestaw do nagrań, montażu i pracy w różnych miejscach.', ['Display Pro 32', 'Mic Go', 'Drive X2'], 'Agent wybrał sprzęt z dobrym profilem obrazu i dźwięku. Zestaw obsługuje materiał 4K, waży poniżej 6 kg i korzysta z jednego zasilacza.'],
      team: ['Sala gotowa do współpracy', 'Zestaw do spotkań hybrydowych i bezproblemowego współdzielenia ekranu.', ['Board Meet', 'Cam Wide', 'Dock Team'], 'Agent sprawdził kompatybilność dla 12 osób, szeroki kąt kamery i uruchamianie bez instalacji sterowników.']
    };
    const conversation = root.querySelector('.shop-conversation');
    const options = root.querySelector('.shop-options');
    const result = root.querySelector('.shop-result');
    const memory = root.querySelector('[data-shop-memory]');
    const state = { step: 0, answers: {} };

    const setAgent = (name, status, copy) => {
      const agent = root.querySelector(`[data-agent="${name}"]`);
      agent.classList.toggle('is-working', status === 'working');
      agent.classList.toggle('is-done', status === 'done');
      agent.querySelector('small').textContent = copy;
    };
    const renderMemory = () => {
      const labels = [['Cel', state.answers.goal?.memory || '—'], ['Priorytet', state.answers.priority?.memory || '—'], ['Budżet', state.answers.budget?.memory || '—']];
      memory.innerHTML = labels.map(([label, value]) => `<li><b>${label}</b><small>${value}</small></li>`).join('');
    };
    const addMessage = (copy, user = false) => {
      const message = document.createElement('div');
      message.className = `chat-message${user ? ' user' : ''}`;
      message.textContent = copy;
      conversation.appendChild(message);
      conversation.scrollTop = conversation.scrollHeight;
    };
    const showRecommendation = () => {
      const data = recommendations[state.answers.goal.value];
      setAgent('catalog', 'done', '18 240 produktów → 27 kandydatów');
      setAgent('recommendation', 'working', 'porównuje 6 zestawów');
      addTimer(() => {
        setAgent('recommendation', 'done', 'zestaw gotowy · 96% dopasowania');
        root.querySelector('[data-commerce-title]').textContent = data[0];
        root.querySelector('[data-commerce-copy]').textContent = `${data[1]} Budżet: ${state.answers.budget.memory}.`;
        data[2].forEach((name, index) => { root.querySelector(`[data-product-${index + 1}]`).textContent = name; });
        root.querySelector('[data-commerce-reason]').textContent = `${data[3]} Uwzględniony priorytet: ${state.answers.priority.memory.toLowerCase()}.`;
        result.hidden = false;
        result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 550);
    };
    const renderStep = () => {
      const step = discoverySteps[state.step];
      options.innerHTML = '';
      step.options.forEach((choice) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'demo-choice shop-answer';
        button.textContent = choice.label;
        button.addEventListener('click', () => {
          state.answers[step.key] = choice;
          addMessage(choice.label, true);
          renderMemory();
          state.step += 1;
          if (state.step < discoverySteps.length) {
            const next = discoverySteps[state.step];
            addMessage(next.question);
            setAgent('conversation', 'working', `zadaje pytanie ${state.step + 1} z 3`);
            renderStep();
          } else {
            options.innerHTML = '<div class="agent-thinking"><i></i><span>Agenci przeszukują katalog i składają zestaw…</span></div>';
            setAgent('conversation', 'done', 'brief klienta kompletny');
            setAgent('catalog', 'working', 'przeszukuje 18 240 produktów');
            showRecommendation();
          }
        });
        options.appendChild(button);
      });
    };
    const resetConversation = () => {
      clearDemoTimers();
      state.step = 0;
      state.answers = {};
      conversation.innerHTML = '<div class="chat-message"><strong>Agent rozmowy</strong><br>Najpierw zrozumiem sytuację, zamiast od razu pokazywać produkty. Gdzie ma działać zestaw?</div>';
      result.hidden = true;
      setAgent('conversation', 'working', 'zadaje pytanie 1 z 3');
      setAgent('catalog', 'idle', 'czeka na kontekst');
      setAgent('recommendation', 'idle', 'czeka na shortlistę');
      renderMemory();
      renderStep();
    };
    root.querySelector('.shop-reset').addEventListener('click', resetConversation);
    renderStep();
  }
};

const setHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
setHeader();
window.addEventListener('scroll', setHeader, { passive: true });

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('is-open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}));

document.querySelectorAll('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach((item) => {
      const selected = item === button;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    const filter = button.dataset.filter;
    document.querySelectorAll('.project-card').forEach((card) => {
      card.hidden = !(filter === 'all' || card.dataset.category.split(' ').includes(filter));
    });
  });
});

document.querySelectorAll('.project-open').forEach((button) => {
  button.addEventListener('click', () => {
    clearDemoTimers();
    const key = button.dataset.project;
    const project = projectData[key];
    dialog.querySelector('[data-dialog-product]').textContent = project.title;
    dialog.querySelector('#dialog-title').textContent = project.headline;
    dialog.querySelector('[data-dialog-client]').textContent = project.client;
    dialog.querySelector('.dialog-summary').textContent = project.summary;
    dialog.querySelector('[data-dialog-challenge]').textContent = project.challenge;
    dialog.querySelector('[data-dialog-solution]').textContent = project.solution;
    dialog.querySelector('[data-dialog-result]').textContent = project.result;
    dialog.querySelector('[data-dialog-story]').innerHTML = project.story.map((section, index) => `
      <section class="case-section">
        <span>${String(index + 1).padStart(2, '0')}</span>
        <h3>${section.title}</h3>
        <p>${section.body}</p>
      </section>`).join('');
    dialog.querySelector('[data-dialog-tags]').innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join('');
    demoStage.innerHTML = templates[key]();
    bindDemo(key);
    dialog.showModal();
    dialog.querySelector('.dialog-shell').scrollTop = 0;
    dialog.querySelector('.dialog-story').scrollTop = 0;
    demoStage.scrollTop = 0;
  });
});

const closeDialog = () => {
  clearDemoTimers();
  dialog.close();
};

dialog.querySelector('.dialog-close').addEventListener('click', closeDialog);
dialog.querySelector('.demo-jump').addEventListener('click', () => {
  dialog.querySelector('.demo-workspace').scrollIntoView({ behavior: 'smooth', block: 'start' });
});
dialog.addEventListener('click', (event) => { if (event.target === dialog) closeDialog(); });
dialog.addEventListener('close', clearDemoTimers);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const element = entry.target;
    const target = Number(element.dataset.count);
    const suffix = element.dataset.suffix || '';
    const decimals = Number.isInteger(target) ? 0 : 1;
    const started = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - started) / 1100, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = `${(target * eased).toFixed(decimals)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countObserver.unobserve(element);
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach((element) => countObserver.observe(element));
document.querySelector('[data-year]').textContent = new Date().getFullYear();
