# Interactiepatronen DvTP (PSA)

Dit document beschrijft de belangrijkste interactiepatronen voor GBO zoals afgeleid uit de use cases. In de patronen is op verschillende plekken sprake van een "dienst"; dit kunnen standaarden of centrale of decentrale voorzieningen zijn. Daar wordt verderop in de PSA dieper op ingegaan.  


## Gegevensverzoek van private partij met toestemming aan bronhouder (DvTP)

### Doel

Een private dienstverlener haalt gegevens op bij een bronhouder op basis van een geldige toestemming van de burger.

### Betrokken generieke functies

-   Autorisatie & Beleidsafdwinging
-   Gegevensvoorziening
-   Orkestratie & Integratie
-   Logging & Verantwoording

### Actoren

-   Private dienstverlener
-   Integrator (optioneel)
-   Autorisatievoorziening
-   Consentregister
-   Bronhouder

### Interactie

--8<-- "diagrammen/interactiepatroon-PP-haalt-gegevens-op.mmd"


## Gegevensverzoek van burger om credential via wallet te delen

### Doel

Een burger vraagt een gegeven op als credential om in zijn/haar wallet op te nemen en te delen met een dienstverlener.

### Betrokken generieke functies

-   Autorisatie & Beleidsafdwinging
-   Gegevensvoorziening
-   Orkestratie & Integratie
-   Logging & Verantwoording

### Actoren

-   Burger
-   Dienstverlener
-   Integrator (optioneel)
-   Autorisatievoorziening
-   Bronhouder

### Interactie

--8<-- "diagrammen/interactiepatroon-EDI-Wallet.mmd"


## Gegevensverzoek van Europese overheidsdienst aan Nederlandse overheidsbron

### Doel

Een Europese overheidsdienst vraagt een gegeven (Evidence Request) aan een Nederlandse overheidsbron om een dienst aan een Nederlandse burger te kunnen leveren.

### Betrokken generieke functies

-   Autorisatie & Beleidsafdwinging
-   Gegevensvoorziening
-   Orkestratie & Integratie
-   Logging & Verantwoording

### Actoren

-   Burger
-   Europese overheidsdienst
-   Autorisatievoorziening
-   Bronhouder

### Interactie

--8<-- "diagrammen/interactiepatroon-SDG-OOTS-verzoek.mmd"


### Toelichting

RINIS is het nationale toegangspunt voor eDelivery en verzorgt de basisinrichting OOTS — het Nederlandse toegangspunt en de generieke koppelingen met gerelateerde systemen. Dit is een transportrol: RINIS spreekt het AS4/eDelivery-protocol richting de EC Common Services, en vertaalt dit naar een nationaal berichtformaat.  
GBO is een verwerkingsrol: identiteit, grondslag, toestemming, bronontsluiting, semantiek. Dit zijn inhoudelijke functies, geen transport.  

De praktische knip zit op het grenswerk tussen fase 1 en fase 2 in het diagram: RINIS ontvangt het AS4-bericht van buiten, pakt de OOTS-payload uit en geeft die als REST-aanroep door aan GBO. Bij de terugkoppeling (fase 7) geldt het omgekeerde: GBO geeft de Evidence Response terug aan RINIS, die het opnieuw inpakt in AS4 voor verzending. Bronhouders zien uitsluitend de GBO-API — OOTS-kennis is voor hen niet nodig.  

NB: Openstaand architectuurvraagstuk is nog waar de OOTS-specifieke toestemmingsflow (het "preview"-scherm dat de burger het bewijsstuk laat zien vóór afgifte, verplicht per SDG-verordening) belegd wordt. Momenteel zit dit in de RINIS-basisinrichting. Als GBO de toestemming afhandelt, moeten we afspreken of het OOTS-preview-scherm bij RINIS blijft of naar GBO verschuift — dat raakt de verantwoordelijkheidsverdeling tussen de twee voorzieningen.



## Identificatie en authenticatie van een actor

### Doel

Het vaststellen van de identiteit van een actor (bijv. burger of organisatie) voordat toegang wordt verleend tot functies van het stelsel.

### Betrokken generieke functies

-   Identiteit & Vertrouwen
-   Toegang & Interactie
-   Autorisatie & Beleidsafdwinging

### Actoren

-   Burger
-   Private dienstverlener
-   Identiteitsdienst
-   GBO‑stelsel

### Interactie

--8<-- "diagrammen/interactiepatroon-identificatie.mmd"


## Toestemming geven en registreren

### Doel

Een burger geeft expliciete toestemming voor het delen van een specifieke dataset met een specifieke private dienstverlener.

### Betrokken generieke functies

-   Toegang & Interactie
-   Identiteit & Vertrouwen
-   Gebruik & Juridische grondslag
-   Gegevensvoorziening

### Actoren

-   Burger
-   Private dienstverlener
-   Toestemmingsdienst
-   Consentregister

### Interactie

--8<-- "diagrammen/interactiepatroon-toestemming-geven.mmd"


## Toestemming beheren of intrekken

### Doel

De burger kan een eerder gegeven toestemming bekijken en intrekken.

### Betrokken generieke functies

-   Toegang & Interactie
-   Gebruik & Juridische grondslag
-   Logging & Verantwoording

### Actoren

-   Burger
-   Toestemmingsvoorziening
-   Consentregister

### Interactie

--8<-- "diagrammen/interactiepatroon-toestemming-intrekken.mmd"
