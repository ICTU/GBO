# Logische architectuur (generieke functies)

De oplossingsrichting met generieke bronontsluiting wordt gerealiseerd door **generieke functies**.

## Overzicht generieke functies

Uit de interactiepatronen blijken de volgenDe generieke functies nodig:

1. Identiteit & Vertrouwen
2. Toegang & Interactie
3. Gegevensvoorziening
4. Semantiek & Eenheid van taal
5. Gegevenskwaliteit & Validatie
6. Gebruik & Juridische Grondslag
7. Orkestratie & Integratie
8. Beheer & Continuïteit

> hier mist "Logging & Verantwoording" dat vaak in architecturen specifieke aandacht krijgt. Hier zit dat impliciet in "Beheer & Continuïteit", maar moet misschien expliciet gemaakt worden? In de [capabilities](./capabilities.md) komt het wel terug.

---


## Logisch architectuurdiagram

Het logische architectuurdiagram schetst De generieke functies ten opzichte van elkaar.

--8<-- "diagrammen/Architectuuroverzicht.mmd"

Vanuit de [architectuur- en ontwerpprincipes](./architectuurprincipes.md) worden aan de generieke functies eisen gesteld, die hieronder zijn uitgewerkt. De eisen zijn bewust technologieneutraal geformuleerd; ze beschrijven *wat* een generieke functie moet kunnen, niet *hoe* dat gerealiseerd wordt.

---

## Generieke functie 1 — Toestemming & Grondslag

**Doel:** Vaststellen en beheren van de juridische grondslag voor gegevensdeling, per traject (DvTP-toestemming, SDG/OOTS-wettelijke basis, eIDAS2-presentatie).

**Eisen:**

- De generieke functie ondersteunt meerdere grondslagtypen (toestemming burger, wettelijke verplichting, gerechtvaardigd belang) zonder dat de verwerkende systemen daar trajectspecifiek voor hoeven te worden ingericht.
- Toestemming van de burger is altijd herleidbaar tot een specifiek doel, een specifieke afnemer, en een specifieke gegevensvraag (doelbinding).
- De grondslag is machineleesbaar raadpleegbaar op het moment van gegevensuitvraag — niet alleen vastgelegd in een document of token dat van tevoren is uitgegeven.
- Intrekking van toestemming werkt met onmiddellijke ingang: een ingetrokken grondslag leidt bij de eerstvolgende uitvraag automatisch tot weigering, zonder dat daarvoor aparte notificaties of tokeninvalidatie nodig zijn.
- De burger heeft inzage in welke grondslagen namens hem actief zijn en kan deze zelf beheren via een toegankelijke interface.
- De vastlegging van grondslagen voldoet aan de eisen van de AVG, de Wdo en de van toepassing zijnde AMvB's.

---

## Generieke functie 2 — Burgeridentificatie & Pseudonimisering

**Doel:** Het vaststellen van de identiteit van de burger ten behoeve van gegevensontsluiting, waarbij het BSN uitsluitend circuleert binnen de overheidsinfrastructuur en nooit zichtbaar is voor private afnemers.

**Eisen:**

- Het BSN wordt nooit doorgegeven aan of verwerkt door private dienstverleners. Voor private afnemers wordt altijd een partij-specifiek, onomkeerbaar pseudoniem gebruikt.
- Pseudoniemen voor verschillende private partijen zijn niet onderling koppelbaar, ook niet wanneer die partijen samenwerken.
- Herhaalde gebruik van hetzelfde pseudoniem voor dezelfde burger levert cryptografisch onkoppelbare uitvoer op (geen correlatierisico over tijd).
- De omzetting van BSN naar pseudoniem — en terug, aan de bronhouderszijde — vindt plaats in een door de overheid beheerde en gecertificeerde voorziening.
- De identiteitsvaststelling sluit aan op de voor het traject vereiste betrouwbaarheidsniveaus (eIDAS Laag/Substantieel/Hoog) en maakt gebruik van erkende authenticatiemiddelen.
- Voor het EDI-wallet traject ondersteunt De generieke functie het ontvangen van een burgeridentiteit via een wallet-presentatie (conform eIDAS2/ARF), met verificatie via de relevante Trusted List.

---

## Generieke functie 3 — Vertrouwensstelsel & Authenticatie van organisaties

**Doel:** Vaststellen dat een afnemende organisatie (dienstverlener, EU-lidstaat) daadwerkelijk is wie zij zegt te zijn, en bevoegd is om deel te nemen aan het desbetreffende traject.

**Eisen:**

- Iedere deelnemende organisatie is aantoonbaar geregistreerd en geautoriseerd vóór zij gegevens kan opvragen. Onboarding is een expliciete beheerhandeling.
- Organisatie-authenticatie is gebaseerd op certificaten uitgegeven door een erkende, toezichthoudende vertrouwensdienstverlener (conform eIDAS of PKI Overheid).
- Het vertrouwensstelsel ondersteunt zowel binnenlandse als grensoverschrijdende partijen, waarbij grensoverschrijdend vertrouwen via de Europese Trusted List-infrastructuur wordt verankerd — niet via bilaterale afspraken per traject.
- Vertrouwensankers (certificaten, attestaties van gekwalificeerde aanbieders) zijn verificeerbaar zonder afhankelijkheid van de uitgevende partij op het moment van verificatie.
- Het vertrouwensstelsel is onafhankelijk van het transportprotocol: dezelfde vertrouwensbeoordeling geldt ongeacht of de verbinding via het binnenlandse koppelnetwerk of via een Europese infrastructuur binnenkomt.

---

## Generieke functie 4 — Toegangsbeleid & Autorisatie (PEP/PDP)

**Doel:** Elke gegevensuitvraag wordt getoetst aan het geldende beleid, ongeacht het traject. De toetsing is geünificeerd, machineleesbaar en herleidbaar.

**Eisen:**

- Iedere gegevensuitvraag — ongeacht het traject of de afnemer — doorloopt dezelfde autorisatieketen. Er zijn geen trajectspecifieke omwegen of parallelle handhavingspunten.
- Het beleid is uitgedrukt in een formele, machineleesbare taal. Menselijk leesbare beschrijvingen zijn afgeleid van dezelfde bron, niet de bron zelf.
- De autorisatiebeslissing is gebaseerd op: de identiteit van de afnemer, de gevraagde gegevens, de aanwezige grondslag (PIP-raadpleging), en de context van het verzoek. Deze vier elementen zijn altijd expliciet aanwezig in de beslissing.
- De autorisatiecomponent raadpleegt de grondslag real-time op het moment van uitvraag — er is geen vertrouwen op eerder uitgegeven tokens die de grondslagstatus "bevroren" vastleggen.
- Beleidsdefinities zijn per traject instelbaar zonder wijziging van de autorisatie-infrastructuur zelf.
- De beslissing (allow/deny) en de relevante context worden vastgelegd ten behoeve van auditbaarheid.
- BSN-resolving vindt pas plaats *na* de autorisatiebeslissing, binnen de handhavingscomponent — niet als invoer voor de beleidsevaluatie.

---

## Generieke functie 5 — Gegevensontsluiting (Bronontsluiting API)

**Doel:** Bronhouders stellen hun gegevens beschikbaar via een gestandaardiseerde interface die door alle trajecten herbruikbaar is.

**Eisen:**

- Een bronhouder realiseert één generieke ontsluiting. Er zijn geen trajectspecifieke endpoints of koppelingen per afnemer.
- De interface ondersteunt selectieve gegevensuitvraag: de afnemer vraagt exact de velden op die voor het specifieke gebruik nodig zijn, niet een vaste dataset. Dataminimalisatie is structureel ingebouwd, niet afhankelijk van afsprakenstelsel of goede wil.
- De set van toegestane gegevensvragen per gebruik is vooraf geregistreerd (via een catalogus of template-mechanisme) en door beleid afdwingbaar. Willekeurige, niet-geregistreerde queries zijn niet mogelijk.
- De interface is onafhankelijk van het BSN als externe sleutel: het subject-identifier in een uitvraag van een private afnemer is altijd een pseudoniem of een consent-referentie; BSN-resolving is een interne aangelegenheid van de ontsluiting.
- Bronhouders implementeren de ontsluiting eenmalig; aanpassingen voor nieuwe afnemers of trajecten vereisen geen bronhouder-specifieke ontwikkeling, alleen aanpassing van het beleid en de query-registratie.
- De interface is bereikbaar via het gestandaardiseerde binnenlandse koppelnetwerk voor overheidsorganisaties.

---

## Generieke functie 6 — Gegevensuitwisseling met EU (OOTS-brug)

**Doel:** Grensoverschrijdende gegevensuitvraag conform de SDG-verordening, waarbij de bronhouder niet hoeft te weten of een verzoek binnenlands of grensoverschrijdend van origine is.

**Eisen:**

- De grensoverschrijdende ontsluiting voldoet aan de verplichtingen van EU-verordening 2018/1724 (SDG) en het bijbehorende technische stelsel (OOTS).
- Verzoeken vanuit andere EU-lidstaten worden aan de GBO-zijde vertaald naar het binnenlandse formaat en protocol. Bronhouders zien geen EU-specifiek transportprotocol.
- De autorisatie van grensoverschrijdende verzoeken doorloopt dezelfde autorisatieketen als binnenlandse verzoeken — alleen de grondslagcontext verschilt (wettelijke basis i.p.v. toestemming).
- De brug is uitsluitend bedoeld voor het OOTS-traject. Binnenlands verkeer, ook van private dienstverleners, gebruikt de binnenlandse koppelinfrastructuur direct.
- Serviceregistratie voor grensoverschrijdende discovery (SMP) wordt door de brug beheerd, niet door individuele bronhouders.

---

## Generieke functie 7 — Consent UI & Burger Interactie

**Doel:** De burger geeft geïnformeerde, specifieke toestemming voor gegevensdeling, en kan die toestemming ook intrekken en inzien.

**Eisen:**

- De toestemmingsinteractie is begrijpelijk voor de burger: doel, afnemer en gegevens zijn in gewone taal gepresenteerd, niet in technische of juridische termen.
- De burger authenticeert zich op een betrouwbaarheidsniveau dat passend is bij de gevoeligheid van de betrokken gegevens.
- Na het geven van toestemming ontvangt de burger een bevestiging, en kan hij via dezelfde of een gelijkwaardige interface zijn actieve toestemmingen inzien en intrekken.
- De UI-component schrijft de vastgelegde toestemming weg naar de grondslagregistratie (zie Generieke functie 1 en 5), zodat de autorisatiecomponent deze real-time kan raadplegen.
- De pseudonimiseringsactie (BSN → pseudoniem voor de afnemer) vindt plaats als onderdeel van het toestemmingsproces, transparant voor de burger en zonder dat het BSN wordt gedeeld.

---

## Generieke functie 8 — Logging, Audit & Traceerbaarheid

**Doel:** Iedere gegevensuitvraag is herleidbaar: wie heeft wanneer welke gegevens over welke burger opgevraagd, op basis van welke grondslag, met welk besluit.

**Eisen:**

- Iedere gegevensuitvraag genereert een vastlegging conform de Logboek Dataverwerkingen (LDV) standaard.
- Logregels over de keten heen zijn correleerbaar via een gestandaardiseerde verzoekidentificator, zodat een uitvraag van afnemer tot bronhouder volledig reconstrueerbaar is.
- Audit-logs zijn niet aanpasbaar door de componenten die ze genereren (onweerlegbaarheid).
- De burger heeft recht op inzage in de verwerkingen die zijn gegevens betreffen; de logging is zo ingericht dat dit recht technisch uitvoerbaar is.
- Wallet-lokale logs (EDI-traject) vallen buiten de server-side correlatie; de architectuur maakt geen aannames over inzage in wallet-transacties van de burger zelf.

---

## Generieke functie 9 — Semantiek & Gegevenskwaliteit

**Doel:** Gegevens die via GBO worden uitgewisseld hebben een eenduidige, gedocumenteerde betekenis, ongeacht het traject of de afnemer.

**Eisen:**

- Per bronhouder bestaat een geregistreerde, door GBO beheerde beschrijving van de beschikbaar gestelde gegevenselementen (naam, type, definitie, herkomst).
- Dezelfde gegevensset kan worden geserialiseerd naar de voor elk traject vereiste uitwisselingsformaten (JSON voor binnenlands, OOTS-EDM XML voor grensoverschrijdend, SD-JWT VC of mdoc voor de wallet). De canonieke definitie is eenmalig vastgelegd.
- Mapping tussen de GBO-canonieke definitie en trajectspecifieke schema's (zoals OOTS Semantic Repository types of PuB-EAA attestatieschema's) is expliciet en beheerbaar.
- Gegevensherkomst (bronhouder, tijdstip, versie) is altijd meegeleverd bij uitgewisselde gegevens.

---

## Samenhang

De capabilities zijn niet op zichzelf staand. De onderstaande afhankelijkheden zijn architectureel kritiek:

- **Generieke functie 4 (Autorisatie)** is afhankelijk van **Generieke functie 1 (Grondslag)** als informatiebron (PIP), en van **Generieke functie 2 (Pseudonimisering)** voor BSN-resolving *na* de beslissing.
- **Generieke functie 5 (Bronontsluiting)** is afhankelijk van **Generieke functie 4** voor toegangshandhaving, en van **Generieke functie 9 (Semantiek)** voor de definitie van wat er ontsloten wordt.
- **Generieke functie 6 (OOTS-brug)** is een vertaallaag bovenop **Generieke functie 5**, met eigen grondslagcontext via **Generieke functie 1**.
- **Generieke functie 7 (Consent UI)** is de schrijfinterface naar **Generieke functie 1**, en triggert de pseudonimiseringsactie van **Generieke functie 2**.
- **Generieke functie 8 (Logging)** is een cross-cutting concern: iedere andere Generieke functie genereert input voor de audit-keten.
