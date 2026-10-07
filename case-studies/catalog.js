const cases = [
  {
    id:'route-mind', name:'RouteMind', category:'agents', label:'Agentic workflow', industry:'Logistyka',
    title:'Agent sam rozwiązuje wyjątki w dostawach, zanim eskalują do klienta.',
    summary:'Monitoruje przesyłki, rozpoznaje opóźnienie, sprawdza alternatywy i przygotowuje bezpieczny plan działania dla dyspozytora.',
    workflow:['Wykrywa wyjątek na podstawie statusów TMS, GPS i komunikatów przewoźnika.','Porównuje okna dostawy, koszty przeładunku i dostępne trasy.','Proponuje zmianę oraz przygotowuje wiadomości po akceptacji dyspozytora.'],
    inputs:'TMS, telematyka, SLA, cenniki, historia incydentów.', control:'Dyspozytor zatwierdza zmianę trasy i komunikację z klientem.', outcome:'Hipoteza: mniej ręcznych eskalacji i krótszy czas reakcji.', tech:['Tool use','Planning','TMS API']
  },
  {
    id:'procure-pilot', name:'ProcurePilot', category:'agents', label:'Agentic workflow', industry:'Zakupy',
    title:'Wniosek zakupowy przechodzi od potrzeby do shortlisty dostawców.',
    summary:'Agent doprecyzowuje wymagania, sprawdza umowy ramowe, zbiera oferty i porównuje je według polityki zakupowej.',
    workflow:['Zadaje właścicielowi potrzeby pytania o zakres, termin i kryteria.','Wyszukuje zatwierdzonych dostawców i wysyła ustandaryzowane RFQ.','Buduje porównanie kosztu, ryzyka i warunków do decyzji kupca.'],
    inputs:'Polityki, katalog dostawców, umowy, RFQ, ERP.', control:'Kupiec wybiera dostawcę; agent nie składa zamówienia bez akceptacji.', outcome:'Hipoteza: krótsze przygotowanie postępowania i pełniejsza dokumentacja.', tech:['Multi-agent','RAG','ERP']
  },
  {
    id:'onboard-os', name:'OnboardOS', category:'agents', label:'Agentic workflow', industry:'HR / IT',
    title:'Nowa osoba dostaje dostęp, sprzęt i plan wdrożenia we właściwej kolejności.',
    summary:'Koordynuje zadania HR, IT, przełożonego i administracji, pilnując zależności oraz opóźnień.',
    workflow:['Czyta rolę, lokalizację i datę startu z systemu HR.','Tworzy zadania w odpowiednich systemach i śledzi ich status.','Przypomina właścicielom oraz aktualizuje plan pierwszego tygodnia.'],
    inputs:'HRIS, katalog ról, polityki dostępów, ticketing, kalendarze.', control:'Właściciele systemów zatwierdzają dostępy uprzywilejowane.', outcome:'Hipoteza: mniej braków pierwszego dnia i mniej ręcznej koordynacji.', tech:['Orchestration','HRIS','Ticketing']
  },
  {
    id:'field-mission', name:'FieldMission', category:'agents', label:'Agentic workflow', industry:'Serwis terenowy',
    title:'Agent układa misję serwisową z diagnozą, częściami i instrukcją.',
    summary:'Łączy zgłoszenie, historię urządzenia, dostępność techników i magazyn, aby przygotować wizytę bez zbędnego powrotu.',
    workflow:['Rozpoznaje objaw i tworzy wstępną diagnozę z historii awarii.','Sprawdza kwalifikacje techników, części i okna serwisowe.','Przygotowuje plan wizyty oraz checklistę bezpieczeństwa.'],
    inputs:'CMMS, IoT, historia napraw, magazyn, grafiki.', control:'Koordynator zatwierdza termin i krytyczne zalecenia serwisowe.', outcome:'Hipoteza: więcej napraw podczas pierwszej wizyty.', tech:['Agentic RAG','CMMS','Scheduling']
  },
  {
    id:'compliance-desk', name:'ComplianceDesk', category:'agents', label:'Agentic workflow', industry:'Compliance',
    title:'Zmiana regulacji zamienia się w listę właścicieli i działań.',
    summary:'Agent porównuje nowy dokument z politykami firmy, identyfikuje luki i proponuje plan wdrożenia zmian.',
    workflow:['Monitoruje wskazane źródła i klasyfikuje zmianę.','Mapuje wymagania na procesy, polityki i właścicieli.','Tworzy zadania z dowodami oraz śledzi ich realizację.'],
    inputs:'Regulacje, polityki, mapa procesów, rejestr kontroli.', control:'Prawnik zatwierdza interpretację i zakres działań.', outcome:'Hipoteza: szybsza analiza wpływu i spójny ślad audytowy.', tech:['RAG','Diff analysis','Audit log']
  },
  {
    id:'revenue-crew', name:'RevenueCrew', category:'agents', label:'Multi-agent AI', industry:'Sprzedaż B2B',
    title:'Zespół agentów przygotowuje account plan przed spotkaniem handlowym.',
    summary:'Researcher zbiera sygnały, analityk łączy je z CRM, a copilot tworzy hipotezy problemów i pytania discovery.',
    workflow:['Researcher przegląda zatwierdzone źródła o firmie i rynku.','Analityk łączy sygnały z historią relacji oraz ofertą.','Copilot układa brief, pytania i szkic follow-upu dla handlowca.'],
    inputs:'CRM, oferta, notatki, publiczne źródła, polityka komunikacji.', control:'Handlowiec weryfikuje fakty i wysyła każdą wiadomość samodzielnie.', outcome:'Hipoteza: lepsze przygotowanie spotkań bez automatycznego spamu.', tech:['Multi-agent','CRM','Web research']
  },
  {
    id:'service-mate', name:'ServiceMate', category:'chatbots', label:'Chatbot procesowy', industry:'Obsługa klienta',
    title:'Chatbot nie tylko odpowiada — prowadzi sprawę do rozwiązania.',
    summary:'Rozpoznaje intencję, zbiera brakujące dane, korzysta z wiedzy i wykonuje dozwolone operacje w systemie obsługi.',
    workflow:['Identyfikuje klienta i typ sprawy.','Odpowiada ze źródłami albo prowadzi formularz konwersacyjny.','Aktualizuje status lub przekazuje kompletne podsumowanie konsultantowi.'],
    inputs:'Baza wiedzy, CRM, zamówienia, regulaminy, historia rozmów.', control:'Operacje finansowe i nietypowe reklamacje trafiają do konsultanta.', outcome:'Hipoteza: wyższy self-service bez utraty kontekstu przy eskalacji.', tech:['Conversational AI','RAG','CRM tools']
  },
  {
    id:'sales-guide', name:'SalesGuide', category:'chatbots', label:'Doradca konwersacyjny', industry:'Sprzedaż',
    title:'Agent zadaje klientowi właściwe pytania i buduje konfigurację.',
    summary:'Zamiast wyświetlać katalog, prowadzi rozmowę o potrzebach, ograniczeniach i priorytetach, a następnie wyjaśnia rekomendację.',
    workflow:['Pyta o kontekst użycia, budżet i wymagania krytyczne.','Eliminuje niezgodne warianty przy pomocy reguł produktowych.','Tworzy shortlistę z uzasadnieniem, różnicami i następnym krokiem.'],
    inputs:'Katalog, reguły kompatybilności, ceny, stany, FAQ.', control:'Klient potwierdza parametry; sprzedawca przejmuje złożone konfiguracje.', outcome:'Hipoteza: mniej porzuconych konfiguracji i trafniejsze leady.', tech:['Chatbot','Rules engine','Product graph']
  },
  {
    id:'hr-compass', name:'HR Compass', category:'chatbots', label:'Copilot pracownika', industry:'HR',
    title:'Pracownik dostaje odpowiedź z polityki firmy, nie z pamięci HR.',
    summary:'Asystent odpowiada na pytania o urlopy, benefity i procedury, uwzględniając kraj, umowę oraz aktualną wersję dokumentu.',
    workflow:['Rozpoznaje temat i kontekst pracownika.','Wyszukuje fragmenty obowiązującej polityki.','Odpowiada z cytatem lub kieruje sprawę do właściwego specjalisty.'],
    inputs:'Polityki HR, intranet, struktura organizacji, dane profilu.', control:'Sprawy indywidualne i interpretacje prawne są eskalowane do HR.', outcome:'Hipoteza: mniej powtarzalnych pytań i spójniejsze odpowiedzi.', tech:['Secure RAG','SSO','Citations']
  },
  {
    id:'developer-desk', name:'DeveloperDesk', category:'chatbots', label:'Engineering copilot', industry:'Software',
    title:'Programista pyta o system i dostaje odpowiedź osadzoną w kodzie.',
    summary:'Copilot łączy dokumentację, repozytoria, ADR-y i historię incydentów, aby skrócić wejście w złożony system.',
    workflow:['Rozpoznaje usługę i wersję, której dotyczy pytanie.','Przeszukuje dokumentację oraz indeks kodu z kontrolą uprawnień.','Pokazuje odpowiedź, pliki źródłowe i sugerowany test weryfikacyjny.'],
    inputs:'Repozytoria, dokumentacja, ADR, runbooki, incydenty.', control:'Zmiany w kodzie przechodzą standardowy review i CI.', outcome:'Hipoteza: krótszy onboarding i mniej przerw dla seniorów.', tech:['Code RAG','Graph','Access control']
  },
  {
    id:'citizen-desk', name:'CitizenDesk', category:'chatbots', label:'Chatbot usługowy', industry:'Administracja',
    title:'Mieszkaniec opisuje potrzebę własnymi słowami i trafia do właściwej usługi.',
    summary:'Asystent tłumaczy procedury prostym językiem, dobiera formularz i sprawdza, jakie dokumenty należy przygotować.',
    workflow:['Rozpoznaje intencję bez wymagania znajomości nazwy urzędowej.','Dobiera procedurę według lokalizacji i sytuacji użytkownika.','Tworzy checklistę oraz przekazuje do oficjalnego formularza.'],
    inputs:'Katalog usług, procedury, formularze, terminy, lokalizacje.', control:'Nie wydaje decyzji administracyjnych; pokazuje źródła i datę aktualizacji.', outcome:'Hipoteza: mniej błędnie rozpoczętych spraw i telefonów informacyjnych.', tech:['Plain language','RAG','Forms']
  },
  {
    id:'patient-path', name:'PatientPath', category:'chatbots', label:'Asystent administracyjny', industry:'Ochrona zdrowia',
    title:'Pacjent szybciej przygotowuje się do wizyty bez porad medycznych od modelu.',
    summary:'Asystent obsługuje pytania organizacyjne, zbiera formularze i wyjaśnia instrukcje placówki, zachowując granicę między administracją a diagnozą.',
    workflow:['Rozpoznaje typ wizyty i sprawdza wymagane przygotowanie.','Zbiera dane administracyjne oraz przypomina o dokumentach.','Kieruje objawy alarmowe do człowieka lub oficjalnej ścieżki pomocy.'],
    inputs:'Instrukcje placówki, grafik, formularze, FAQ, reguły eskalacji.', control:'Brak diagnozy; treści kliniczne zatwierdza personel medyczny.', outcome:'Hipoteza: mniej nieprzygotowanych wizyt i pytań do rejestracji.', tech:['Guardrails','Scheduling','Human handoff']
  },
  {
    id:'legal-atlas', name:'LegalAtlas', category:'rag', label:'Knowledge RAG', industry:'Prawo',
    title:'Prawnik przeszukuje umowy i opinie według znaczenia, nie nazwy pliku.',
    summary:'System łączy klauzule, definicje i historię stanowisk, a każdą odpowiedź osadza w konkretnym dokumencie oraz wersji.',
    workflow:['Klasyfikuje pytanie i zakres uprawnień użytkownika.','Odnajduje podobne klauzule oraz powiązane opinie.','Tworzy syntezę z cytatami, różnicami i poziomem pewności.'],
    inputs:'Umowy, aneksy, opinie, wzorce, metadane spraw.', control:'Odpowiedź jest materiałem roboczym, nie automatyczną poradą prawną.', outcome:'Hipoteza: krótszy research i łatwiejsze ponowne użycie know-how.', tech:['Hybrid RAG','Clause graph','Citations']
  },
  {
    id:'maintenance-memory', name:'Maintenance Memory', category:'rag', label:'Multimodal RAG', industry:'Produkcja',
    title:'Technik znajduje rozwiązanie na podstawie objawu, zdjęcia i kodu błędu.',
    summary:'Łączy instrukcje, historię przestojów, zdjęcia usterek i notatki techników dla konkretnej maszyny oraz wersji.',
    workflow:['Identyfikuje urządzenie ze zdjęcia, tagu lub numeru seryjnego.','Wyszukuje podobne symptomy i potwierdzone naprawy.','Pokazuje checklistę diagnostyczną ze źródłami i ostrzeżeniami.'],
    inputs:'CMMS, instrukcje, zdjęcia, alarmy, historia napraw.', control:'Procedury LOTO i krytyczne działania zawsze wymagają uprawnionego technika.', outcome:'Hipoteza: szybsza diagnoza i lepsze wykorzystanie wiedzy zmianowej.', tech:['Multimodal RAG','CMMS','OCR']
  },
  {
    id:'finance-brief', name:'FinanceBrief', category:'rag', label:'Analytical RAG', industry:'Finanse',
    title:'Komentarz zarządczy powstaje z liczb, założeń i dokumentów źródłowych.',
    summary:'Copilot łączy wyniki z planem, notatkami biznesowymi i wcześniejszymi komentarzami, wskazując przyczyny odchyleń.',
    workflow:['Pobiera zatwierdzony zestaw danych i kontroluje okres.','Wykrywa istotne odchylenia oraz szuka potwierdzeń w źródłach.','Tworzy szkic komentarza z tabelą dowodów do zatwierdzenia.'],
    inputs:'Hurtownia danych, budżet, forecast, notatki, definicje KPI.', control:'Kontroler zatwierdza interpretację; model nie zmienia ksiąg.', outcome:'Hipoteza: szybsze zamknięcie komentarza i większa spójność narracji.', tech:['RAG + SQL','Semantic layer','Evals']
  },
  {
    id:'research-hub', name:'ResearchHub', category:'rag', label:'Research copilot', industry:'R&D',
    title:'Zespół badawczy widzi, co już sprawdzono i gdzie są luki.',
    summary:'Indeksuje publikacje, notatki, eksperymenty i patenty, budując mapę pytań, dowodów oraz sprzeczności.',
    workflow:['Rozkłada pytanie badawcze na podtematy.','Wyszukuje źródła i grupuje dowody według wniosku.','Tworzy mapę sprzeczności oraz listę hipotez do dalszych testów.'],
    inputs:'Publikacje, patenty, ELN, raporty, bibliografia.', control:'Badacz ocenia jakość źródeł i akceptuje wnioski.', outcome:'Hipoteza: mniej powtórzonej pracy i szybszy przegląd stanu wiedzy.', tech:['Graph RAG','Entity linking','Provenance']
  },
  {
    id:'policy-lens', name:'PolicyLens', category:'rag', label:'Policy intelligence', industry:'Organizacja regulowana',
    title:'Każda procedura pokazuje, z jakiego wymagania wynika.',
    summary:'Graf wiedzy łączy regulacje, polityki, kontrole i dowody, dzięki czemu zmiana jednego wymagania pokazuje wpływ na organizację.',
    workflow:['Rozpoznaje wymagania i tworzy ich strukturę.','Łączy wymagania z politykami, kontrolami oraz dowodami.','Pokazuje luki, konflikty i właścicieli obszarów.'],
    inputs:'Regulacje, polityki, kontrole, rejestry ryzyka, dowody.', control:'Compliance zatwierdza mapowanie i status zgodności.', outcome:'Hipoteza: szybsze audyty i mniej ręcznego śledzenia zależności.', tech:['Knowledge graph','RAG','Traceability']
  },
  {
    id:'tender-rag', name:'TenderRAG', category:'rag', label:'Knowledge copilot', industry:'Ofertowanie',
    title:'Zespół ofertowy znajduje najlepsze dowody z wcześniejszych realizacji.',
    summary:'Copilot wyszukuje referencje, opisy kompetencji i zatwierdzone odpowiedzi, dopasowując je do wymagań nowego przetargu.',
    workflow:['Dzieli wymagania przetargu na pytania i kryteria.','Dobiera zatwierdzone dowody, projekty oraz ekspertów.','Tworzy szkic odpowiedzi z cytatami i listą brakujących danych.'],
    inputs:'Poprzednie oferty, CV, referencje, portfolio, polityki.', control:'Bid manager zatwierdza każdą odpowiedź i aktualność referencji.', outcome:'Hipoteza: szybszy pierwszy draft i większa kompletność oferty.', tech:['RAG','Document parsing','Citations']
  },
  {
    id:'similar-sku', name:'SimilarSKU', category:'vision', label:'Visual product intelligence', industry:'Produkcja / handel',
    title:'Zdjęcie produktu konkurencji prowadzi do podobnych pozycji we własnym katalogu.',
    summary:'System analizuje kształt, materiał, detale i kontekst zdjęcia, a następnie wyszukuje najbardziej podobne produkty firmy.',
    workflow:['Użytkownik dodaje zdjęcie lub kadr z katalogu konkurencji.','Model wydobywa cechy wizualne i rozpoznaje kategorię produktu.','Wyszukiwarka wektorowa zwraca odpowiedniki z opisem podobieństw i różnic.'],
    inputs:'Zdjęcia produktów, katalog, atrybuty, warianty, reguły dopasowania.', control:'Ekspert potwierdza odpowiednik; system nie deklaruje identyczności bez danych.', outcome:'Hipoteza: szybsza identyfikacja zamienników i odpowiedź handlowa.', tech:['Vision embeddings','Vector search','Product data']
  },
  {
    id:'part-finder', name:'PartFinder', category:'vision', label:'Visual search', industry:'Serwis / części',
    title:'Technik fotografuje część i znajduje właściwy numer katalogowy.',
    summary:'Rozpoznaje typ komponentu, geometrię i oznaczenia, a następnie zawęża katalog według maszyny oraz kompatybilności.',
    workflow:['Analizuje zdjęcie, OCR i orientacyjne proporcje elementu.','Łączy cechy z modelem maszyny i historią użytych części.','Zwraca shortlistę z różnicami, dostępnością i ostrzeżeniami.'],
    inputs:'Katalog części, zdjęcia, BOM, kompatybilność, magazyn.', control:'Przed montażem technik potwierdza numer i specyfikację.', outcome:'Hipoteza: mniej błędnych zamówień i krótszy czas identyfikacji.', tech:['Computer vision','OCR','Compatibility graph']
  },
  {
    id:'shelf-match', name:'ShelfMatch', category:'vision', label:'Retail vision', industry:'Retail',
    title:'Jedno zdjęcie półki pokazuje braki, ekspozycję i udział marki.',
    summary:'System wykrywa produkty, pozycje oraz luki na półce i porównuje stan rzeczywisty z planogramem.',
    workflow:['Pracownik wykonuje zdjęcie zgodnie z prostą instrukcją.','Model wykrywa SKU, facings, ceny i puste miejsca.','Panel wskazuje rozbieżności oraz priorytety korekty.'],
    inputs:'Zdjęcia półek, planogram, katalog opakowań, promocje.', control:'Niepewne rozpoznania trafiają do ręcznego potwierdzenia.', outcome:'Hipoteza: szybsze audyty ekspozycji i bardziej aktualne dane terenowe.', tech:['Object detection','OCR','Planogram']
  },
  {
    id:'pack-vision', name:'PackVision', category:'vision', label:'Multimodal QA', industry:'Opakowania',
    title:'Projekt opakowania jest sprawdzany przed wysłaniem do druku.',
    summary:'Porównuje layout z wymaganiami marki, rynków i regulacji, wykrywając brakujące elementy oraz niespójności językowe.',
    workflow:['Odczytuje tekst, symbole i hierarchię elementów z projektu.','Sprawdza checklisty dla produktu, języka i rynku.','Generuje listę uwag ze współrzędnymi na grafice.'],
    inputs:'Artwork, brandbook, checklisty, słowniki, wymagania rynkowe.', control:'Regulatory i brand manager zatwierdzają finalny projekt.', outcome:'Hipoteza: mniej korekt w późnym etapie i mniejsze ryzyko reprintu.', tech:['Vision LLM','OCR','Rules engine']
  },
  {
    id:'style-scout', name:'StyleScout', category:'vision', label:'Visual commerce', industry:'Fashion / wnętrza',
    title:'Inspiracyjne zdjęcie zamienia się w zestaw produktów z katalogu.',
    summary:'Rozpoznaje styl, paletę, materiały i obiekty, a następnie układa spójny zestaw dostępny w sklepie.',
    workflow:['Klient dodaje zdjęcie wnętrza lub stylizacji.','Model opisuje cechy i rozdziela widoczne elementy.','Agent dobiera produkty, pilnuje budżetu oraz kompatybilności zestawu.'],
    inputs:'Zdjęcie klienta, katalog, stany, ceny, reguły zestawów.', control:'Klient może zablokować cechy i poprawić błędne rozpoznanie.', outcome:'Hipoteza: bardziej intuicyjne odkrywanie oferty i większy koszyk.', tech:['Vision-language model','Recommendations','Catalog search']
  },
  {
    id:'damage-assess', name:'DamageAssess', category:'vision', label:'Visual triage', industry:'Ubezpieczenia',
    title:'Zdjęcia szkody są porządkowane i wstępnie oceniane przed ekspertem.',
    summary:'System grupuje fotografie, wskazuje widoczne uszkodzenia i sprawdza ich zgodność z opisem zgłoszenia.',
    workflow:['Kontroluje jakość oraz kompletność zdjęć.','Wykrywa obiekty, obszary uszkodzeń i możliwe niespójności.','Tworzy raport oględzin z poziomem pewności i listą braków.'],
    inputs:'Zdjęcia, zgłoszenie, dane przedmiotu, katalog typów szkód.', control:'Rzeczoznawca ocenia zakres i podejmuje decyzję finansową.', outcome:'Hipoteza: szybszy triage i mniej spraw wracających po dodatkowe zdjęcia.', tech:['Computer vision','Multimodal LLM','Uncertainty']
  },
  {
    id:'invoice-ops', name:'InvoiceOps', category:'documents', label:'Document AI', industry:'Finanse operacyjne',
    title:'Faktura przechodzi od skrzynki do zaksięgowania z kontrolą wyjątków.',
    summary:'Agent odczytuje dokument, dopasowuje zamówienie i odbiór, a rozbieżności kieruje do właściwej osoby.',
    workflow:['Klasyfikuje załącznik i wydobywa pola wraz z pewnością.','Wykonuje dopasowanie 2- lub 3-way match.','Księguje bezpieczne przypadki albo przygotowuje wyjątek do decyzji.'],
    inputs:'Faktury, PO, przyjęcia, dostawcy, ERP, polityki.', control:'Nietypowe kwoty i rozbieżności wymagają zatwierdzenia księgowego.', outcome:'Hipoteza: większy straight-through processing bez utraty kontroli.', tech:['OCR','Agentic workflow','ERP']
  },
  {
    id:'contract-flow', name:'ContractFlow', category:'documents', label:'Contract AI', industry:'Legal / sprzedaż',
    title:'Umowa trafia do właściwych osób z gotową listą odstępstw.',
    summary:'Porównuje dokument z playbookiem, wykrywa nietypowe klauzule i przygotowuje propozycje zmian z uzasadnieniem.',
    workflow:['Rozpoznaje typ umowy i wersję dokumentu.','Porównuje klauzule z zatwierdzonym playbookiem.','Kieruje odstępstwa do właściwych ekspertów i śledzi decyzje.'],
    inputs:'Umowy, playbook, wzorce, historia negocjacji, limity.', control:'Prawnik zatwierdza każdą modyfikację i finalną wersję.', outcome:'Hipoteza: krótszy cykl review i spójniejsze stosowanie standardów.', tech:['Clause extraction','RAG','Workflow']
  },
  {
    id:'kyc-assist', name:'KYC Assist', category:'documents', label:'Document intelligence', industry:'Finanse',
    title:'Pakiet KYC jest kompletny, zanim trafi do analityka.',
    summary:'System porządkuje dokumenty, wydobywa dane, porównuje je między źródłami i wskazuje braki lub niespójności.',
    workflow:['Klasyfikuje dokumenty i sprawdza ich ważność.','Normalizuje podmioty, adresy oraz strukturę własności.','Tworzy listę braków i podsumowanie ryzyka do analizy.'],
    inputs:'Dokumenty klienta, formularze, rejestry, polityki KYC.', control:'Analityk wykonuje ocenę ryzyka i podejmuje decyzję.', outcome:'Hipoteza: mniej pracy przygotowawczej i mniej powrotów do klienta.', tech:['Document AI','Entity resolution','Audit']
  },
  {
    id:'order-inbox', name:'OrderInbox', category:'documents', label:'Email-to-order', industry:'Dystrybucja',
    title:'Zamówienia z maili i PDF-ów zamieniają się w sprawdzone pozycje ERP.',
    summary:'Agent czyta wiadomość oraz załączniki, mapuje nazwy klienta na SKU i pyta tylko o dane, których naprawdę brakuje.',
    workflow:['Rozpoznaje zamówienie w skrzynce i łączy załączniki.','Mapuje opisy klienta na SKU, ilości oraz jednostki.','Sprawdza ceny i dostępność, po czym przedstawia draft zamówienia.'],
    inputs:'E-maile, PDF, kartoteki klienta, katalog, ERP.', control:'Pracownik zatwierdza niepewne mapowania i finalne zamówienie.', outcome:'Hipoteza: krótsze wprowadzanie zamówień i mniej błędów przepisywania.', tech:['Email agent','OCR','ERP mapping']
  },
  {
    id:'grant-pilot', name:'GrantPilot', category:'documents', label:'Document workflow', industry:'Dotacje',
    title:'Wniosek grantowy jest sprawdzany punkt po punkcie przed wysłaniem.',
    summary:'Copilot mapuje kryteria konkursu na treść wniosku, wskazuje braki dowodów i pilnuje spójności budżetu z opisem.',
    workflow:['Rozbija regulamin na wymagania i kryteria oceny.','Łączy każdy wymóg z fragmentem wniosku i załącznikiem.','Tworzy checklistę braków, sprzeczności oraz ryzyk.'],
    inputs:'Regulamin, wniosek, budżet, załączniki, dane organizacji.', control:'Wnioskodawca zatwierdza treść i oświadczenia; system nie tworzy fikcyjnych dowodów.', outcome:'Hipoteza: większa kompletność i mniej korekt formalnych.', tech:['Long-context RAG','Validation','Citations']
  },
  {
    id:'spec-reader', name:'SpecReader', category:'documents', label:'Technical Document AI', industry:'Przemysł',
    title:'Specyfikacja techniczna staje się listą wymagań i pytań do klienta.',
    summary:'Analizuje wielostronicowe specyfikacje, tabele i rysunki, identyfikując parametry, normy oraz sprzeczności.',
    workflow:['Dzieli dokument na wymagania funkcjonalne i techniczne.','Wydobywa wartości, jednostki, normy i zależności.','Tworzy macierz zgodności oraz listę niejasności do RFQ.'],
    inputs:'PDF, tabele, rysunki, normy, katalog możliwości.', control:'Inżynier zatwierdza interpretację parametrów krytycznych.', outcome:'Hipoteza: szybsza analiza zapytania i mniej przeoczonych wymagań.', tech:['Multimodal parsing','Tables','Requirements graph']
  },
  {
    id:'basket-architect', name:'BasketArchitect', category:'commerce', label:'Agentic commerce', industry:'E-commerce',
    title:'Klient opisuje efekt, a agenci budują kompletny, kompatybilny koszyk.',
    summary:'Agent rozmowy zbiera potrzeby, agent katalogu dobiera elementy, a agent weryfikacji sprawdza kompatybilność i budżet.',
    workflow:['Prowadzi krótkie discovery o celu, ograniczeniach i preferencjach.','Buduje kilka wariantów zestawu z katalogu.','Sprawdza zależności, dostępność i wyjaśnia każdą rekomendację.'],
    inputs:'Katalog, kompatybilność, stany, ceny, zwroty, opinie.', control:'Klient potwierdza założenia i sam finalizuje koszyk.', outcome:'Hipoteza: większa kompletność zamówień i mniej zwrotów zestawów.', tech:['Multi-agent','Product graph','Recommendations']
  },
  {
    id:'voice-market', name:'VoiceOfMarket', category:'commerce', label:'Customer intelligence', industry:'Produkt / CX',
    title:'Tysiące rozmów klientów zamieniają się w mapę problemów i szans.',
    summary:'Analizuje rozmowy, ankiety, recenzje i zgłoszenia, łącząc tematy z segmentem, produktem oraz etapem podróży.',
    workflow:['Anonimizuje oraz klasyfikuje źródła feedbacku.','Grupuje podobne potrzeby, emocje i przyczyny kontaktu.','Tworzy brief trendów z cytatami i zmianą w czasie.'],
    inputs:'Call center, ankiety, recenzje, CRM, helpdesk.', control:'Analityk weryfikuje klastry i reprezentatywność próby.', outcome:'Hipoteza: szybsze wykrywanie trendów i lepsza priorytetyzacja produktu.', tech:['Topic modeling','LLM analytics','PII redaction']
  },
  {
    id:'pricing-scout', name:'PricingScout', category:'commerce', label:'Market intelligence', industry:'Handel B2B',
    title:'Sygnały rynkowe wspierają decyzję cenową bez automatycznego ustalania ceny.',
    summary:'Łączy dane o własnych transakcjach, kosztach i publicznych ofertach, pokazując kontekst oraz anomalie dla konkretnej decyzji.',
    workflow:['Normalizuje porównywalne produkty, waluty i warunki.','Wykrywa zmiany rynku oraz nietypowe rabaty.','Przygotowuje rekomendowany przedział z czynnikami wpływu.'],
    inputs:'Transakcje, koszty, cenniki, oferty publiczne, segmenty.', control:'Pricing manager podejmuje decyzję i nadzoruje zgodność z polityką.', outcome:'Hipoteza: szybsza analiza wyjątków i lepsza dyscyplina rabatowa.', tech:['Entity matching','Forecasting','Explainability']
  },
  {
    id:'returns-agent', name:'ReturnsAgent', category:'commerce', label:'Service agent', industry:'E-commerce',
    title:'Zwrot jest rozwiązany w rozmowie, z regułami i pełnym śladem decyzji.',
    summary:'Agent identyfikuje zamówienie, rozumie powód, sprawdza politykę i proponuje właściwą ścieżkę: zwrot, wymianę albo wsparcie.',
    workflow:['Zbiera numer zamówienia, powód oraz opcjonalne zdjęcie.','Sprawdza produkt, termin, stan i obowiązujące zasady.','Generuje etykietę lub przekazuje kompletną sprawę konsultantowi.'],
    inputs:'Zamówienia, polityka zwrotów, płatności, logistyka, zdjęcia.', control:'Wyjątki wartościowe i podejrzenia nadużycia przejmuje pracownik.', outcome:'Hipoteza: krótsza obsługa prostych zwrotów i spójne decyzje.', tech:['Conversational agent','Vision','Order tools']
  },
  {
    id:'churn-radar', name:'ChurnRadar', category:'commerce', label:'Customer success AI', industry:'SaaS',
    title:'Customer success widzi ryzyko odejścia razem z możliwą przyczyną.',
    summary:'System łączy użycie produktu, zgłoszenia, wyniki ankiet i historię relacji, aby przygotować priorytety oraz kontekst rozmowy.',
    workflow:['Wylicza sygnały ryzyka na zatwierdzonych cechach.','Tworzy narrację przyczyn z linkami do danych.','Proponuje playbook działań odpowiedni dla segmentu i sytuacji.'],
    inputs:'Product analytics, CRM, support, NPS, billing.', control:'CSM wybiera działanie; model nie wysyła komunikacji autonomicznie.', outcome:'Hipoteza: wcześniejsza reakcja i bardziej trafne działania retencyjne.', tech:['Predictive ML','LLM summary','CRM']
  },
  {
    id:'campaign-studio', name:'CampaignStudio', category:'commerce', label:'Marketing copilot', industry:'Marketing',
    title:'Jedna strategia kampanii zamienia się w spójne warianty dla kanałów.',
    summary:'Copilot korzysta z brandbooka, zatwierdzonych claims i danych o odbiorcach, tworząc wersje do review oraz testów.',
    workflow:['Porządkuje cel, segment, ofertę i ograniczenia prawne.','Generuje warianty treści dla wybranych kanałów.','Sprawdza ton, zakazane sformułowania i spójność przekazu.'],
    inputs:'Brandbook, oferta, persony, wyniki kampanii, reguły prawne.', control:'Marketing i legal zatwierdzają materiały przed publikacją.', outcome:'Hipoteza: szybsza produkcja wariantów bez rozjechania marki.', tech:['Controlled generation','Brand RAG','Content checks']
  },
  {
    id:'incident-commander', name:'IncidentCommander', category:'agents', label:'Agentic workflow', industry:'IT Operations',
    title:'Agent zbiera sygnały z incydentu i prowadzi zespół przez runbook.',
    summary:'Łączy alerty, logi, historię zmian i wiedzę operacyjną, aby utrzymać wspólny obraz sytuacji podczas awarii.',
    workflow:['Koreluje alerty i tworzy chronologię zdarzeń.','Dobiera właściwy runbook oraz wskazuje ostatnie zmiany w systemie.','Aktualizuje status incydentu i przygotowuje szkic post-mortem.'],
    inputs:'Monitoring, logi, CMDB, repozytoria, runbooki, historia incydentów.', control:'Incident commander zatwierdza działania wpływające na środowisko produkcyjne.', outcome:'Szybsze ustalenie kontekstu i spójna komunikacja podczas incydentu.', tech:['Tool use','Observability','Runbook RAG']
  },
  {
    id:'supply-planner', name:'SupplyPlanner', category:'agents', label:'Planning agent', industry:'Supply chain',
    title:'Agent przebudowuje plan dostaw po zmianie popytu lub opóźnieniu dostawcy.',
    summary:'Analizuje zapas, prognozę, moce i ograniczenia, po czym przedstawia warianty planu wraz z kosztami oraz ryzykiem.',
    workflow:['Wykrywa odchylenie i wskazuje zagrożone zamówienia.','Symuluje alternatywnych dostawców, partie i terminy.','Przedstawia planerowi warianty wraz z konsekwencjami.'],
    inputs:'ERP, forecast, zapasy, lead time, moce produkcyjne, koszty.', control:'Planer zatwierdza każdą zmianę zamówienia i priorytetu produkcji.', outcome:'Krótsze reagowanie na zakłócenia i lepiej udokumentowane decyzje.', tech:['Planning agent','Optimization','ERP']
  },
  {
    id:'dealer-assist', name:'DealerAssist', category:'chatbots', label:'Partner copilot', industry:'Sieć dealerska',
    title:'Partner handlowy uzyskuje jedną odpowiedź z cenników, promocji i dokumentacji.',
    summary:'Copilot rozpoznaje rynek, rolę partnera i linię produktową, aby podać aktualną odpowiedź bez przeszukiwania portali.',
    workflow:['Ustala kontekst partnera oraz zakres uprawnień.','Wyszukuje odpowiedź w aktualnych materiałach dla danego rynku.','Pokazuje źródło i pozwala przekazać złożone pytanie do opiekuna.'],
    inputs:'Portal partnera, cenniki, promocje, katalog, dokumentacja, CRM.', control:'Warunki niestandardowe i rabaty specjalne zatwierdza channel manager.', outcome:'Mniej pytań powtarzalnych i szybsza obsługa sieci partnerskiej.', tech:['Secure chatbot','RAG','Partner portal']
  },
  {
    id:'engineering-change', name:'EngineeringChange', category:'rag', label:'Engineering knowledge', industry:'Produkcja',
    title:'Zmiana konstrukcyjna pokazuje wpływ na BOM, instrukcje i dostawców.',
    summary:'Graf wiedzy łączy rewizje rysunków, części, procesy i dokumenty jakościowe, dzięki czemu inżynier widzi pełny zasięg zmiany.',
    workflow:['Porównuje rewizje i wydobywa zmienione wymagania.','Mapuje wpływ na BOM, operacje, dokumentację oraz dostawców.','Tworzy listę działań i dowodów potrzebnych do zamknięcia zmiany.'],
    inputs:'PLM, CAD, BOM, instrukcje, dostawcy, dokumentacja jakościowa.', control:'Change board zatwierdza zakres i datę obowiązywania zmiany.', outcome:'Mniej przeoczonych zależności i sprawniejsze zamykanie zmian inżynierskich.', tech:['Graph RAG','PLM','Document diff']
  },
  {
    id:'trial-atlas', name:'TrialAtlas', category:'rag', label:'Evidence RAG', industry:'Life sciences',
    title:'Zespół badań klinicznych odnajduje precedensy i dowody z pełnym pochodzeniem.',
    summary:'System porządkuje protokoły, publikacje i raporty według populacji, interwencji, punktów końcowych oraz jakości dowodu.',
    workflow:['Strukturyzuje pytanie badawcze i kryteria wyszukiwania.','Łączy dowody z protokołów, publikacji i raportów.','Tworzy tabelę porównawczą z cytowaniami oraz lukami.'],
    inputs:'Protokoły, publikacje, raporty, rejestry badań, słowniki medyczne.', control:'Ekspert kliniczny ocenia dowody i zatwierdza interpretację.', outcome:'Szybszy przegląd materiału przy zachowaniu ścieżki do każdego źródła.', tech:['Evidence RAG','Ontology','Provenance']
  },
  {
    id:'sales-evidence', name:'SalesEvidence', category:'rag', label:'Sales knowledge', industry:'B2B sales',
    title:'Handlowiec dobiera właściwy dowód wartości do branży i problemu klienta.',
    summary:'Copilot wyszukuje referencje, wyniki, materiały produktowe i zatwierdzone claims, zamiast generować ogólne obietnice.',
    workflow:['Rozpoznaje branżę, rolę rozmówcy i problem biznesowy.','Wybiera pasujące referencje oraz dowody z repozytorium.','Buduje krótką narrację z odnośnikami do materiałów źródłowych.'],
    inputs:'Case studies, CRM, decki, claims, katalog produktu, referencje.', control:'Handlowiec zatwierdza dobór materiału i sposób wykorzystania danych klienta.', outcome:'Bardziej konkretne rozmowy i spójniejsze wykorzystanie referencji.', tech:['RAG','CRM context','Claim control']
  },
  {
    id:'waste-sort', name:'WasteSort', category:'vision', label:'Edge vision', industry:'Recykling',
    title:'System rozpoznaje frakcję odpadu i steruje kontrolowanym sortowaniem.',
    summary:'Model wizyjny klasyfikuje obiekty na taśmie, wykrywa zanieczyszczenia i przekazuje sygnał do urządzenia sortującego.',
    workflow:['Kamera rejestruje strumień materiału przy stałym oświetleniu.','Model wykrywa klasę, pozycję oraz poziom pewności.','Sterownik wykonuje odrzut lub kieruje niepewny przypadek do kontroli.'],
    inputs:'Obrazy linii, etykiety frakcji, parametry taśmy, sygnały sterownika.', control:'Operator ustala progi pewności i nadzoruje jakość poszczególnych frakcji.', outcome:'Większa powtarzalność sortowania i szybsze wykrywanie zanieczyszczeń.', tech:['Edge AI','Object detection','PLC integration']
  },
  {
    id:'site-progress', name:'SiteProgress', category:'vision', label:'Visual progress AI', industry:'Budownictwo',
    title:'Zdjęcia budowy zamieniają się w raport postępu względem harmonogramu.',
    summary:'System łączy fotografie z lokalizacją, modelem BIM i planem prac, aby wskazać wykonane elementy oraz potencjalne opóźnienia.',
    workflow:['Porządkuje zdjęcia według strefy, daty i elementu obiektu.','Porównuje widoczny stan z BIM oraz planem etapów.','Tworzy raport różnic z materiałem fotograficznym dla kierownika.'],
    inputs:'Zdjęcia, BIM, harmonogram, mapa stref, raporty dzienne.', control:'Kierownik budowy potwierdza postęp i przyczyny odchyleń.', outcome:'Szybsze raportowanie postępu i lepsza dokumentacja wizualna.', tech:['Vision-language model','BIM','Progress tracking']
  },
  {
    id:'freight-docs', name:'FreightDocs', category:'documents', label:'Logistics Document AI', industry:'Transport',
    title:'Dokumenty transportowe są porównywane, zanim blokada zatrzyma rozliczenie.',
    summary:'System odczytuje CMR, POD, faktury i zlecenia, sprawdzając zgodność tras, dat, ilości oraz potwierdzeń.',
    workflow:['Klasyfikuje dokumenty i łączy je ze zleceniem.','Porównuje kluczowe pola oraz podpisy między źródłami.','Przekazuje komplet do rozliczenia albo wyjątek z opisem różnicy.'],
    inputs:'CMR, POD, zlecenia, faktury, TMS, reguły rozliczeń.', control:'Specjalista zatwierdza sporne dostawy i korekty finansowe.', outcome:'Szybsze zamykanie kompletnych transportów i mniej ręcznych porównań.', tech:['Document AI','TMS','Exception workflow']
  }
];

const categoryNames = {
  agents:'Agenci', chatbots:'Chatboty i copiloci', rag:'RAG i wiedza',
  vision:'Vision i multimodal', documents:'Document AI', commerce:'Commerce i insight'
};

const grid = document.querySelector('[data-case-grid]');
const search = document.querySelector('[data-search]');
const count = document.querySelector('[data-result-count]');
const empty = document.querySelector('[data-empty]');
const filters = [...document.querySelectorAll('[data-filter]')];
let activeFilter = 'all';

const cardTemplate = (item, index) => `
  <article class="case-card" data-category="${item.category}" data-searchable="${[item.name,item.industry,item.title,item.summary,item.inputs,item.tech.join(' ')].join(' ').toLowerCase()}">
    <div class="case-head">
      <div class="case-number"><b>${String(index + 1).padStart(2,'0')} / ${item.name}</b><span>${item.industry}</span></div>
      <h3>${item.title}</h3>
      <p class="case-summary">${item.summary}</p>
      <div class="case-tags">${item.tech.map(tag => `<span>${tag}</span>`).join('')}</div>
    </div>
    <details>
      <summary>Zobacz przebieg projektu <span class="sr-only">dla ${item.name}</span></summary>
      <div class="case-detail">
        <h4>${categoryNames[item.category]} · jak to działa</h4>
        <ol class="case-flow">${item.workflow.map(step => `<li>${step}</li>`).join('')}</ol>
        <dl class="case-facts">
          <div><dt>Potrzebne dane</dt><dd>${item.inputs}</dd></div>
          <div><dt>Kontrola człowieka</dt><dd>${item.control}</dd></div>
        </dl>
        <div class="case-outcome"><strong>Rezultat projektu</strong>${item.outcome.replace(/^Hipoteza:\s*/, '')}</div>
      </div>
    </details>
  </article>`;

grid.innerHTML = cases.map(cardTemplate).join('');

const normalize = value => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');

const updateCatalog = () => {
  const phrase = normalize(search.value.trim());
  let visible = 0;
  document.querySelectorAll('.case-card').forEach(card => {
    const categoryMatch = activeFilter === 'all' || card.dataset.category === activeFilter;
    const textMatch = !phrase || normalize(card.dataset.searchable).includes(phrase);
    card.hidden = !(categoryMatch && textMatch);
    if (!card.hidden) visible += 1;
  });
  count.textContent = visible;
  empty.hidden = visible !== 0;
};

filters.forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  filters.forEach(item => {
    const selected = item === button;
    item.classList.toggle('is-active', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  updateCatalog();
}));

search.addEventListener('input', updateCatalog);
document.querySelector('[data-clear]').addEventListener('click', () => {
  search.value = '';
  activeFilter = 'all';
  filters.forEach(item => {
    const selected = item.dataset.filter === 'all';
    item.classList.toggle('is-active', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  updateCatalog();
  search.focus();
});

document.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    search.focus();
  }
});

updateCatalog();
document.querySelector('[data-year]').textContent = new Date().getFullYear();
