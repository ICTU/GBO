# Gemeenschappelijke Bronontsluiting (GBO)

**Eerste ontwerp — ter bespreking**

| | |
|---|---|
| Versie | 0.1 — Concept |
| Organisatie | ICTU |
| Datum | April 2025 |
| Status | Ter bespreking |

# 1 Inleiding en doel

Het programma Gemeenschappelijke Bronontsluiting (GBO) realiseert een generieke infrastructuurlaag waarmee overheidsgegevens op een veilige, gecontroleerde en privacybeschermende manier beschikbaar worden gesteld aan drie typen afnemers:

- private dienstverleners op basis van burgertoestemming (DvTP — Data delen via toestemming met private partijen),
- Europese overheden via het Single Digital Gateway/Once Only Technical System (SDG/OOTS) en
- burgers via een EDI-Wallet (eIDAS2/ARF).

GBO is geen nieuw, losstaand stelsel. Het sluit aan op het Federatief Datastelsel (FDS) als basisafsprakenstelsel en breidt dit gericht uit met afspraken, standaarden en voorzieningen die nodig zijn voor de drie toepassingen.

Centrale begrippen zijn: toestemming als afdwingbare grondslag voor gegevensverstrekking, dataminimalisatie via selectieve bevraging, en een generieke ontsluiting zodat bronhouders maar één keer hoeven aan te sluiten.

De juridische basis wordt gevormd door de Wet digitale overheid (Wdo) en de daarvoor uit te werken AMvB. Zolang die grondslag nog niet in werking is getreden, lopen technische uitwerking en wetgevingstraject parallel.

## Relatie met bestaande stelsels

GBO hergebruikt maximaal wat er al is:

- FDS als afsprakenstelsel met FSC (Federated Service Connectivity) als binnenlands koppelnetwerk,
- BSNk PP voor pseudonimisering,
- PBAC (en FTV) voor autorisatie.

Waar FDS generieke afspraken biedt, voegt GBO trajectspecifieke invulling toe voor DvTP, de EDI-Wallet en de OOTS-brug.

# 2 Interactiepatronen

GBO ondersteunt drie interactiepatronen, elk met eigen actoren, grondslagen en technische protocollen. Het architectuuroverzicht (figuur 1) toont hoe de drie patronen samenkomen in de GBO-kern.

*Figuur 1 — GBO Architectuuroverzicht*

> *\[ Diagram 1: GBO architectuuroverzicht — zie bijgevoegd Mermaid-diagram \]*

## 2.1 Patroon A — gegevensverzoek van private partij (DvTP)

Een private dienstverlener haalt overheidsgegevens op bij een bronhouder, uitsluitend op basis van een geldige, expliciete toestemming van de burger. De burger authenticeert zich via DigiD of ander EIDAS authenticatiemiddel op het vereiste betrouwbaarheidsniveau en geeft geïnformeerde toestemming voor een specifiek doel, een specifieke afnemer en een specifieke set gegevens. GBO registreert de toestemming in een toestemmingenregister, levert een consent_id aan de private partij, valideert het op het moment van uitvraag real-time, en zorgt dat het BSN de private partij nooit bereikt — in de plaats daarvan ontvangt de afnemer een partijspecifiek pseudoniem via BSNk PP.

De bronhouder controleert of de private partij bevoegd is om de gegevens op te vragen, controleert het consent_id en depseudonimiseert het BSN. Het antwoord aan de private partij wordt geleverd als REST- of GraphQL-response in het afnemerformaat.

![](media/image1.png)

*Figuur 1: interactiepatroon DvTP (dienstverlener is een private partij)*

## 2.2 Patroon B — burger vult EDI-Wallet (OID4VCI)

Een burger vraagt een overheidsattribuut op als verifieerbare credential (VC) voor opname in zijn EDI-Wallet. De wallet initieert een OID4VCI-ophaalverzoek richting GBO, dat de bron bevraagt en het resultaat retourneert als SD-JWT VC of mdoc (ISO 18013-5). De credential is cryptografisch gezegeld door de bronhouder en kan daarna door de burger worden gepresenteerd aan dienstverleners via OID4VP, zonder verdere tussenkomst van GBO.

GBO vervult in dit patroon de rol van PuB-EAA-uitgevende instantie (zie ook sectie 4.4). De verificatiedienst voor QTSP's die zelf credentials willen uitreiken of verifiëren is een aanvullend GBO-component beschreven in sectie 4.5.

![](media/image2.png)

*Figuur 2: interactiepatroon burger deelt gegeven via EDI-Wallet met dienstverlener*
*NB: opvragen van gegeven kan als PuB-EAA (rechtstreeks van overheidsbron) of QEAA (via QTSP)*

## 2.3 Patroon C — grensoverschrijdend verzoek via SDG/OOTS

Een Europese overheidsdienst stuurt via het OOTS-netwerk een Evidence Request voor een Nederlandse burger. RINIS fungeert als nationaal OOTS-toegangspunt (AS4/eDelivery) en geeft de payload als REST/JSON door aan GBO. GBO verzorgt de toestemmingsinteractie met de burger (DvTP-flow), de identiteitsvaststelling, de bronontsluiting en de semantische mapping naar het SDG Evidence-formaat. Bronhouders zien uitsluitend de GBO-API en hoeven geen OOTS-kennis te hebben. De terugkoppeling volgt de omgekeerde route: GBO retourneert aan RINIS, RINIS verpakt in AS4.

![](media/image3.png)

*Figuur 3: interactiepatroon gegevensverzoek vanuit Europese overheidsorganisatie via SDG/OOTS*

# 3 Generieke functies — GBO

GBO is opgebouwd uit acht generieke functieclusters. Samen dekken zij de volledige gegevensstroom af, van identiteitsvaststelling en toestemmingsbeheer tot bronontsluiting en beheer. De functies zijn technologieneutraal beschreven; de technische invulling volgt in sectie 5.

| **Functie** | **Kern van de functie** | **Raakvlak GBO-toepassingen** |
|---|---|---|
| F1 — Identiteit & Vertrouwen | Authenticatie van burgers en organisaties; PKI; audit logging van iedere gegevensuitvraag | Alle drie patronen |
| F2 — Toegang & Interactie | Toestemmings-UI voor de burger; SSO; machtigen; consent met toestemmingenregister; PEP/PDP/PIP-keten | DvTP, OOTS (toestemmingspreview) |
| F3 — Gegevensvoorziening | Generieke bronontsluiting API; REST/GraphQL; lokalisatie; selectieve bevraging; OOTS-brug (RINIS-koppeling) | Alle drie patronen |
| F4 — Semantiek & Eenheid van Taal | Vocabularia (GGM, RDF, SKOS); mapping GBO-canoniek naar SDG-EDM, VC-schema en JSON | OOTS (SDG-evidencetype), EDI-Wallet (VC-schema) |
| F5 — Gegevenskwaliteit & Validatie | SHACL-validatie; herkomstregistratie (W3C PROV-O); feedbackloops naar bronhouders | Alle drie patronen |
| F6 — Grondslag & Beleid | Toestemmingenregister; consent-records; doelbindingstoets; PEP/PDP/PIP-keten | DvTP, OOTS |
| F7 — Orkestratie & Integratie | Procesorkestratie over patronen; formaat-mapping; event-afhandeling | Alle drie patronen |
| F8 — Beheer & Continuïteit | Logging; monitoring; versiebeheer; incidentbeheer; SLA-bewaking | Stelselbreed |

# 4 Afwijkingen en aanvullingen op FDS

GBO gebruikt het Federatief Datastelsel (FDS) als basisafsprakenstelsel en hergebruikt de stelselfuncties Poortwachter en Marktmeester, FSC als koppelnetwerk en DCAT-AP NL voor datacatalogisering. Op vijf punten voegt GBO aanvullingen toe die FDS niet of onvoldoende invult. De tabel hieronder geeft per onderwerp aan wat FDS biedt, wat GBO toevoegt en wat de aanvulling inhoudt.

> *Juridische randvoorwaarde: toestemming als afdwingbare grondslag (onderwerp 1) is pas operationeel na inwerkingtreding van de Wdo en de bijbehorende AMvB. De technische uitwerking loopt parallel aan het wetgevingstraject.*

| **Onderwerp** | **FDS-status** | **Type** | **GBO-aanvulling** |
|---|---|---|---|
| **1 — Toestemming & grondslag als afdwingbaar autorisatiemechanisme** | | | |
| Grondslageis | Principe; geen technische invulling | Aanvulling | Toestemmingenregister; PEP/PDP/PIP-keten (AuthZEN + OPA/Rego) met centraal beheerde policies; real-time raadpleging per uitvraag; intrekking werkt onmiddellijk. |
| BSN-pseudonimisering | Wettelijk vereist; geen stelselsprofiel | Aanvulling | BSNk PP verplicht voor DvTP: BSN bereikt private partijen nooit. Partijspecifieke, onomkeerbare pseudoniemen via Logius (in productie). consent_id als brug tussen pseudoniem en BSN-resolving. |
| Toestemmingsportaal | Buiten scope FDS | Nieuw | Burgergerichte UI voor het geven, inzien en intrekken van toestemming. Schrijft real-time naar het grondslagregister (PIP voor de autorisatieketen). |
| **2 — GraphQL als selectief bevragingsmechanisme** | | | |
| REST / NL API Strategie | Verplicht datadienst-type | Aanvulling | GraphQL toegevoegd naast REST: dataminimalisatie is structureel ingebouwd — de afnemer vraagt exact de velden op die zijn consent-scope toestaat. Toegestane gegevensvragen worden vooraf geregistreerd als query-templates (afdwingbaar door beleid). In productie bewezen bij iWlz. GBO initieert positionering als FDS-datadienst-type. |
| DCAT-AP NL | Verplicht FDS-eis | Overgenomen | Overgenomen; uitgebreid met GBO-specifieke velden voor trajectactivatie en query-templateregistratie. |
| **3 — SDG/OOTS-aansluiting via RINIS-adapter** | | | |
| Grensoverschrijdend verkeer | Buiten scope FDS | Nieuw | OOTS-brug ontkoppelt EU-transport (AS4/eDelivery via RINIS) van de binnenlandse ontsluiting (FSC/GraphQL). GBO verzorgt identiteit, toestemming, bronontsluiting en semantische mapping naar SDG-EDM. Bronhouders zien uitsluitend de GBO-API; OOTS-kennis is niet vereist. |
| SMP-serviceregistratie | Buiten scope FDS | Aanvulling | Centraal beheerd door GBO, niet door individuele bronhouders. Expliciete afwijking van de decentrale logica die FDS hanteert voor data-aanbiederregistratie. |
| **4 — PuB-EAA: uitgifte van geverifieerde credentials voor de EDI-Wallet** | | | |
| Verifieerbare credentials (VC) | Buiten scope FDS | Nieuw | GBO als PuB-EAA-uitgevende instantie (Public Body Electronic Attestation of Attributes). Uitgifte via OID4VCI; presentatie via OID4VP. Formaten: SD-JWT VC (online) en mdoc/ISO 18013-5 (offline/proximity). Semantische mapping van bronhouder-attributen naar attestatieschema's per use case. |
| **5 — Verificatiedienst voor QTSP's (Authentic Source Interface)** | | | |
| QTSP-verificatie | Buiten scope FDS | Nieuw | Verificatiedienst (ETSI TS 119 478) voor QTSP's die bronhouder-attributen willen verifiëren of gebruiken voor eigen attestatie-uitgifte. Onboarding via FDS-Poortwachter aangevuld met GBO-aansluitvoorwaarden (ETSI EN 319 412). EU-rechtelijke verplichting (art. 45e eIDAS2). |

# 5 Voorgestelde technische invulling

Dit hoofdstuk beschrijft de voorgestelde technische bouwstenen van GBO en hun onderlinge relatie. De technische invulling is in lijn met de generieke functies uit sectie 3 en de aanvullingen/verbijzonderingen op FDS uit sectie 4. Het onderstaande diagram vormt de basis voor de verdere technische uitwerking.

![](media/image4.png)

*Figuur 4: Technisch ontwerp GBO stelsel*

## 5.1 Bouwstenen en hun rol

De technische architectuur van GBO bestaat uit de volgende hoofdbouwstenen:

**FSC (Federated Service Connectivity).** Binnenlands koppelnetwerk dat mTLS-gebaseerde verbindingen tussen GBO, bronhouders en private afnemers verzorgt. Elke deelnemer beheert een eigen FSC Inway (bronhouder) of Outway (afnemer). FSC is beschikbaar als open referentie-implementatie en is de standaard voor binnenlands dataverkeer in het FDS.

**OAuth 2.0 / OpenID Connect.** Autorisatieprotocol voor de uitgifte van toestemmingstokens na succesvolle burgeridentificatie (DigiD of ander EIDAS-middel). Het toestemmingstoken bevat de consent-id als brug naar het toestemmingenregister; het BSN zit niet in het token.

**OPA/Rego (Open Policy Agent).** Policy Decision Point voor real-time beleidsevaluatie. Policies zijn machineleesbaar, per traject instelbaar en centraal beheerd in een PAP. OPA/Rego is in productie bij het iWlz-afsprakenstelsel voor gevoelige zorgdata en is daarmee een bewezen keuze voor een overheidscontext met hoge privacyvereisten.

**AuthZEN.** Gestandaardiseerde koppelinterface (OpenID Foundation, draft) tussen de PEP en de OPA-PDP. Maakt de autorisatieketen protocononafhankelijk en vervangbaar per component.

**GraphQL.** Bevragingsprotocol voor selectieve gegevensuitvraag op de bronontsluiting API. Queries zijn vooraf geregistreerd in de Query Template Registry en afdwingbaar door het PEP-beleid.

**BSNk PP (Polymorf Pseudonimiseringsstelsel).** In productie bij Logius. Verplicht voor alle DvTP-uitvragen: zet het BSN om naar een partijspecifiek, onomkeerbaar pseudoniem vóór enige verstrekking aan een private partij.

**OID4VCI / OID4VP.** OpenID-protocollen voor respectievelijk de uitgifte (GBO → wallet) en de presentatie (wallet → dienstverlener) van verifieerbare credentials. Vormt het technische fundament van het EDI-Wallet-patroon.

**SD-JWT VC / mdoc (ISO 18013-5).** Credentialformaten voor de EDI-Wallet, conform het ARF. SD-JWT VC is het standaardformaat voor online presentatie; mdoc ondersteunt ook offline (proximity) scenario's.

**AS4 / eDelivery (via RINIS).** EU-transportprotocol voor het OOTS-berichtenverkeer. GBO communiceert via REST/JSON met RINIS; de AS4-laag is volledig bij RINIS belegd.

**ODRL (Open Digital Rights Language).** W3C-standaard voor het vastleggen van toestemmingen en grondslagen in het grondslagregister — als declaratieve rechtenexpressie (wie mag wat, voor welk doel, tot wanneer). ODRL is de taal van de toestemming; OPA/Rego is de taal van de handhaving. De PDP leest ODRL-records als data-input via de PIP, maar de autorisatielogica staat in Rego. ODRL is niet de taal van de PAP-policies. Wordt al ingezet in FDS en DCAT-AP NL voor beleidsbeschrijving.

**PAP (Policy Administration Point) / OCI-registry.** Centrale GBO-voorziening voor het beheren en distribueren van gesigneerde OPA/Rego-policy-bundles naar alle gedistribueerde PDPs bij bronhouders en de FSC Manager. Policies worden door het GBO-gremium beheerd in Git, via CI omgezet naar gesigneerde OCI-bundles, en asynchroon door bronhouder-PDPs opgehaald via de OPA Bundle API. De PAP is het punt waarop GBO gezaghebbend bepaalt wat iedere deelnemer wel en niet mag — vergelijkbaar met de rol die het Ketenbureau iWlz vervult voor de iWlz-autorisatiepolicies. Ontbreekt nog als expliciete stelselfunctie in de PSA (zie bijlage, S05).

## 5.2 Kernontwerpkeuzes

De referentiearchitectuur is gebaseerd op zes expliciete ontwerpkeuzes. De tabel hieronder vat elke keuze samen, legt de onderbouwing uit en benoemt de voornaamste implicatie voor de inrichting van het stelsel.

| **Keuze** | **Beslissing** | **Onderbouwing** | **Implicatie** |
|---|---|---|---|
| 1 — GraphQL als bevragingsprotocol | Bronhouders ontsluiten via GraphQL, niet via REST-endpoints. | REST vereist aparte endpoints of filterparameters per consent-scope, waardoor beleid en API-laag versnipperd raken. GraphQL maakt dataminimalisatie structureel: de afnemer vraagt exact de velden op die zijn consent-scope toestaat. In productie bewezen bij iWlz (gevoelige zorgdata). Compatibel met FSC Inway/Outway en de NL API Strategie. | Bronhouders realiseren een GraphQL API of gebruiken de centrale GBO-vertaallaag. Alle toegestane gegevensvragen worden als query-templates geregistreerd in de GBO-catalogus. |
| 2 — Twee grondslagpaden, één PDP | Toestemming (DvTP) en wettelijke grondslag (OOTS, Gov-to-Gov) worden door dezelfde PDP geëvalueerd via twee afzonderlijke paden. | Eén autorisatieketen voor alle trajecten voorkomt parallelle handhavingspunten. Voor DvTP raadpleegt de PDP het toestemmingsregister real-time als PIP. Voor wettelijke grondslag is de basis ingebakken in het gesigneerde OPA-policy-bundle: geen PIP-aanroep, geen netwerkafhankelijkheid. | Het toestemmingsregister is de enige runtime-netwerkafhankelijkheid. Bij uitval zijn alleen DvTP-uitvragen geblokkeerd; wettelijke-grondslagvragen draaien door. PDP evalueert beide paden via AuthZEN. |
| 3 — BSNk PP voor pseudonimisering | Private dienstverleners ontvangen nooit het BSN. Het Toestemmingsportaal gebruikt BSNk PP (Logius) om partijspecifieke pseudoniemen te genereren. | Het BSN is wettelijk beschermd (Wabvpz). BSNk PP lost drie problemen op die eenvoudige PKI-encryptie niet kan: (1) private partij decrypteert naar pseudoniem, nooit naar BSN; (2) randomisatie maakt herhaald gebruik onkoppelbaar; (3) samenwerkende private partijen kunnen hun pseudoniemen niet aan elkaar koppelen. BSNk PP is al in productie bij Logius (eToegang, ~2019). | Onboarding van private dienstverleners als BSNk PP-deelnemer is verplicht. De consent_id is de brug tussen pseudoniem (private zijde) en BSN-resolving (bronhouderzijde). Geen nieuwe infrastructuur: integratie van bestaande Logius-voorziening. |
| 4 — Vijffactor-autorisatiemodel met gedistribueerde PDP | Iedere uitvraag doorloopt vijf onafhankelijke checks: (1) organisatie-identiteit via mTLS/PKI-O; (2) organisatierechten via FSC-contract + JWT; (3) grondslag via register of policy-bundle; (4) datascope via query-template; (5) verzoekgeldigheid via AuthZEN. Geen centrale autorisatieserver. | De vijf checks hebben elk een andere wijzigingsfrequentie en beheerder; scheiding maakt iedere laag onafhankelijk aanpasbaar. De FSC Manager evalueert (1) en (2) bij token-uitgifte; de bronhouder-PDP evalueert (3)–(5) per verzoek. Beide laden policies uit dezelfde centraal beheerde PAP (OCI-registry, gesigneerde OPA-bundles). Sector-PIPs (KvK, KNB, BIG) stellen de Manager in staat sectorlidmaatschap te verifiëren, zodat één sector-grant volstaat i.p.v. honderden individuele contracten. | Elke bronhouder draait een eigen PDP-instantie. GBO levert een referentie-implementatie. Policies worden centraal beheerd door het GBO-gremium en gedistribueerd via PAP. Sectorale PIPs moeten op de FSC Manager worden aangesloten. Er is geen centrale autorisatieserver nodig. |
| 5 — FSC als enige binnenlandse connectiviteitslaag | FSC is het enige binnenlandse transportprotocol voor alle trajecten. Er is geen aanvullend binnenlands transportprotocol nodig. | FSC biedt mTLS-authenticatie, PKI-O-certificaatbinding en contractregistratie in één stack. Bronhouders implementeren één connectiviteitstandaard voor alle trajecten. FSC is de FDS-standaard voor binnenlands dataverkeer en beschikbaar als open referentie-implementatie. | Bronhouders implementeren één FSC Inway; afnemers één Outway. De AS4-brug (keuze 6) vertaalt grensoverschrijdend verkeer aan de GBO-kant; bronhouders zien geen AS4. |
| 6 — AS4-brug voor SDG/OOTS (EU-verplichting) | Grensoverschrijdend OOTS-verkeer wordt afgehandeld via een Domibus Access Point dat AS4/eDelivery vertaalt naar FSC/GraphQL. AS4 is uitsluitend voor dit grensoverschrijdende verkeer. | AS4/eDelivery is een EU-rechtelijke verplichting (Single Digital Gateway Verordening): geen architectuurkeuze maar een randvoorwaarde. De brug isoleert alle EU-specifieke protocollen op één plek. Bronhouders hoeven geen OOTS-kennis te hebben. | De AS4-brug (Domibus Access Point + OOTS-EDM adapter) is een te realiseren GBO-component. SMP-serviceregistratie voor Europese discovery wordt centraal door GBO beheerd, niet door bronhouders. |

## 5.3 Nog te realiseren componenten

De volgende bouwstenen zijn nog niet beschikbaar als GBO-voorziening en moeten worden gerealiseerd in het kader van GBO:

- Toestemmingsregister (centrale voorziening)
- Toestemmingsportaal voor burger (inclusief inzage en intrekkingsfunctionaliteit)
- Query Template Registry (centrale catalogus van toegestane gegevensvragen)
- GBO-vertaallaag voor bronhouders zonder eigen GraphQL-implementatie
- PEP/PDP-referentie-implementatie voor bronhouders (deployable package)
- PuB-EAA-uitgifte-component (OID4VCI-endpoint, credentialschema's per use case)
- QTSP-verificatiedienst
- GBO afsprakenstelsel (aansluitvoorwaarden, RFC-proces, stelselrollen) — nb: moet landen in bestaande stelsels

# Bijlage — Stelselfuncties en inrichtingsstatus

De onderstaande tabel geeft een beknopt overzicht van de twaalf GBO-stelselfuncties, hun huidige invulling en de voornaamste gaps. De volledige uitwerking per stelselfunctie is opgenomen in de PSA.

| **Stelselfunctie** | **Status** | **Voornaamste gap / actie** |
|---|---|---|
| S01 — Toestemmingenregistratie | Nog te realiseren ⚠️ | Toestemmingsregister; ODRL-profiel; PIP-interface; afhankelijk van Wdo/AMvB |
| S02 — Burgeridentificatie & Pseudonimisering | BSNk PP beschikbaar; integratie nodig | Onboarding DvTP-partijen als BSNk PP-deelnemer; consent_id-koppeling |
| S03 — Organisatie-authenticatie & Vertrouwensstelsel | FDS Poortwachter/Marktmeester beschikbaar | GBO-aansluitvoorwaarden; QTSP-erkenningsprofiel; KvK↔OIN↔eIDAS-koppeling |
| S04 — Autorisatie (PEP/PDP/PIP) | OPA/Rego bewezen (iWlz); GBO-inrichting nog nodig | PEP/PDP referentie-implementatie per bronhouder; AuthZEN-profiel; Policy Store / PAP (zie S05) |
| S05 — Beleidsbeheer & -distributie (PAP) | Nog te ontwerpen ⚠️ | Centrale voorziening voor beheren en distribueren van OPA/Rego-policy-bundles naar bronhouder-PDPs en FSC Manager. De PAP is het technisch-bestuurlijke gezagspunt van het stelsel. Vereist governance-afspraak over wie policies mag schrijven, wijzigen en goedkeuren. |
| S06 — Gegevensontsluiting (Bronontsluiting API) | FSC beschikbaar; GraphQL nog niet gestandaardiseerd als FDS-type | Query Template Registry; GraphQL positionering in FDS; GBO-vertaallaag |
| S07 — OOTS-brug (Grensoverschrijdend) | RINIS basisinrichting beschikbaar | GBO ↔ RINIS REST-koppeling; SMP-beheer; SDG-EDM mapping; toestemmingspreview-vraagstuk |
| S08 — Toestemmingsportaal (Burger Interactie) | Nog te realiseren ⚠️ | DvTP-UI; inzage & intrekking; koppeling grondslagregister; aansluiting MijnOverheid |
| S09 — Logging, Audit & Traceerbaarheid | Standaarden beschikbaar; GBO-invulling nodig | Centraal auditlog; herleidbaarheidsprofiel; koppeling aan autorisatieketen |
| S10 — Semantiek & Gegevenscatalogus | DCAT-AP NL verplicht in FDS | GBO-canonieke definities per bronhouder; mapping naar SDG-EDM en VC-schema's |
| S11 — Attesteringsuitgifte (PuB-EAA / QEAA) | Nog te realiseren ⚠️ | OID4VCI-endpoint; credentialschema's; signing-infrastructuur; QTSP-verificatiedienst |
| S12 — Beleidsbeheer & -distributie (PAP) | Nog te ontwerpen ⚠️ | Centrale voorziening voor het beheren en distribueren van OPA/Rego-policy-bundles naar alle bronhouder-PDPs en de FSC Manager. Policies worden als gesigneerde OCI-bundles beschikbaar gesteld en asynchroon opgehaald door decentrale PDPs (OPA Bundle API). De PAP is het technisch-bestuurlijke gezagspunt van het stelsel: hij bepaalt wat iedere deelnemer mag. Vereist een expliciete governance-afspraak over wie policies mag schrijven, wijzigen en goedkeuren. |

*Legenda: ⚠️ = nog te realiseren als nieuwe GBO-voorziening.*
