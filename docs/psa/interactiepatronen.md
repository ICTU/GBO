# Interactiepatronen GBO

Dit document beschrijft de belangrijkste interactiepatronen voor GBO zoals afgeleid uit de use cases. In de patronen is op verschillende plekken sprake van een "dienst"; dit kunnen standaarden of centrale of decentrale voorzieningen zijn. Daar wordt in het hoofdstuk [Capabilities](./capabilities.md) dieper op ingegaan.  


## Gegevensverzoek van private partij met toestemming aan bronhouder (DvTP)

### Doel

Een private dienstverlener haalt gegevens op bij een bronhouder op basis van een geldige toestemming van de burger.

### Interactie

<figure>

--8<-- "diagrammen/interactiepatroon-PP-haalt-gegevens-op.mmd"

<figcaption>Interactiepatroon Private Partij haalt gegevens op met toestemming van de burger</figcaption>
</figure>

### Toelichting

De dienstverlener kan rechtstreeks gegevens opvragen bij de bronhouder, maar heeft daarvoor toestemming van de burger nodig. Deze toestemming wordt door GBO afgehandeld via een toestemmingsvoorziening (een interface waar de burger vrij, specifiek, geïnformeerd en ondubbelzinnig de toestemming verleent) en een toestemmingsregister waar de toestemming wordt vastgelegd en waar deze gecontroleerd kan worden. De toestemmingsvoorziening moet de burger ook toegang geven tot de gegeven toestemmingen om te zien of die is gebruikt en om deze - indien relevant - in te trekken.

De dienstverlener gebruikt nooit het BSN van de burger. Daarom moet deze gepseudonimiseerd worden. De pseudonimisering moet zo gebeuren dat de dienstverlener deze telkens kan depseudonimiseren naar een eigen identificatie, die echter geen betekenis heeft voor andere partijen. De bronhouder moet het pseudoniem kunnen depseudonimiseren naar het originele BSN.

Bij controle van de gegevensvraag door de dienstverlener bij de bronhouder, authenticeert de bronhouder de dienstverlener op basis van het certificaat dat ook voor de versleuteling van het transport (mTLS) gebruikt wordt. Daarnaast moet de bronhouder controleren of de dienstverlener bevoegd is om gegevens op te vragen. Dat kan via FSC-contracten - de dienstverlener moet een contract hebben afgesloten om de API van de bronhouder te mogen bevragen. Dit kan ook op basis van een lijst met bevoegde afnemers (Trusted List). Zo'n lijst kan sectoraal beheerd worden, wat voorkomt dat een bronhouder met heel veel afnemers (bv. alle hypotheekverstrekkers) contracten moet afsluiten en beheren.

## Gegevensverzoek van burger om gegevens via wallet te delen

### Doel

Een burger vraagt een gegeven op als gekwalificeerd elektronisch attest van een attribuut om in zijn/haar wallet op te nemen en te delen met een dienstverlener.

### Interactie

<figure>

--8<-- "diagrammen/interactiepatroon-EDI-Wallet.mmd"

<figcaption>Gegevensverzoek van burger om credential via wallet te delen</figcaption>
</figure>

### Toelichting

Iedere bronhouder kan in theorie gegevens uitleveren aan wallets, maar deze gegevens krijgen pas juridische waarde als ze gekwalificeerd zijn. Dat kwalificeren kan op twee manieren: de overheid ondertekent het gegeven, waardoor het een PuB-EAA wordt, of een gekwalificeerde verlener van vertrouwensdiensten (QTSP) doet dit.  
Als de overheid het gegeven kwalificeert kan de bronhouder dit zelf doen, maar het kan schaalvoordeel bieden om dit te centraliseren in een GBO PuB-EAA-dienst. Als een QTSP het gegeven kwalificeert, moet deze QTSP het gegeven kunnen verifiëren via een verificatiedienst. Ook hier kan een bronhouder de dienst zelf aanbieden, of kan ervoor gekozen worden om dit te centraliseren in een GBO verificatiedienst. Ook de autorisatiedienst die door de Pub-EAA-dienst en de verificatiedienst aangeroepen wordt, kan door de bronhouder aangeboden worden, maar het biedt schaalvoordeel om dat te centraliseren in een GBO dienst.


## Gegevensverzoek van Europese overheidsdienst aan Nederlandse overheidsbron

### Doel

Een Europese overheidsdienst vraagt een gegeven (Evidence Request) aan een Nederlandse overheidsbron om een dienst aan een Nederlandse burger te kunnen leveren.

### Interactie

<figure>

--8<-- "diagrammen/interactiepatroon-SDG-OOTS-verzoek.mmd"

<figcaption>Interactiepatroon gegevensverzoek Europese overheidsdienst via SDG/OOTS</figcaption>
</figure>

### Toelichting

RINIS is het nationale toegangspunt voor eDelivery en verzorgt namens BZK de basisinrichting OOTS — het Nederlandse toegangspunt en de generieke koppelingen met gerelateerde systemen. RINIS verzorgt de toestemmingsinteractie met de burger en de identiteitsvastelling, en vertaalt het verzoek naar een nationaal berichtformaat.  
GBO verzorgt de bronbevraging en en de semantische mapping naar het SDG Evidence-formaat.  

De praktische knip zit op het grenswerk tussen fase 3 en fase 4 in het diagram: RINIS ontvangt het AS4-bericht van buiten, verzorgt de toestemmingsflow, pakt de OOTS-payload uit en geeft die als REST-aanroep door aan GBO. Bij de terugkoppeling (fase 7) geldt het omgekeerde: GBO geeft de Evidence Response terug aan RINIS, die het opnieuw inpakt in AS4 voor verzending. Bronhouders zien uitsluitend de GBO-API — OOTS-kennis is voor hen niet nodig. Ook de toestemming en de autorisatie zijn al afgehandeld en vormen geen belemmering voor de bronhouder.   
