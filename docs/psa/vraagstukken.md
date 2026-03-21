# Vraagstukken en ontwerpkeuzes

## Inleiding

In dit hoofdstuk worden de vraagstukken waarvoor een oplossing gevonden moet worden of waarvoor een keuze gemaakt moet worden besproken.  
Als er een oplossing is gevonden of een keuze is gemaakt, wordt dit in dit hoofdstuk als ontwerpkeuze vastgelegd. De verdere uitwerking vindt plaats in het technisch ontwerp.  


## Identificatie & authenticatie private partijen

eHerkenning is de logische kandidaat, maar de onboarding, accreditatie en het onderscheid tussen directe afnemers en intermediairs/integrators moeten worden uitgewerkt. TIP biedt hiervoor aanknopingspunten.


## Burgeridentificatie en het BSN

Het BSN mag bij private partijen niet direct worden doorgegeven. Dit vereist een pseudonimiseringslaag of sector-ID, terwijl voor OOTS de eIDAS-identifier geldt en de wallet werkt met SD-JWT VC-attributen. Dit zijn drie verschillende regimes op één generieke ontsluiting.

- BSNk-PP dienst van BZK?

## Vertrouwensstelsel

Welke partijen mogen deelnemen, hoe worden ze geaccrediteerd, welke niveaus van zekerheid gelden per gegevenstype, en hoe verhouden PKI(O), eHerkenning, eIDAS, FDS en TIP-afspraken zich tot elkaar?


## Toestemming

De wettelijke grondslag (via Wdo/AMvB), de technische implementatie (toestemmingsregister, tokens, TTL), intrekking, en het onderscheid met OOTS waar toestemming een "verklaring van instemming" is, en de wallet waar de burger zelf de credential beheert.


## Gekwalificeerde elektronische attesteringen van attributen

Hoe laten we attributen elektronisch kwalificeren? Hoe wordt de "attesteringsuitgifte" ingericht?  
Dit is nodig voor de Wallet, maar mogelijk ook voor de andere use cases. Er is [Europese Wetgeving](https://eur-lex.europa.eu/legal-content/NL/TXT/HTML/?uri=OJ:L_202501569), maar die laat nog ruimte voor de inrichting en wie welke rol invult.  

- Gebruik QEAA / QTSP?
- Inrichten Pub-EEA?
- Centrale verificatiedienst?


## Transformatie-architectuur

Hoe één bronhouder-API leidt tot drie verschillende afnemerprotocollen (DvTP/REST+OAuth, OOTS/AS4+eDelivery, Wallet/OID4VC)? Dit is het technische hart van de "bronhouder één keer, afnemer naar wens"-ambitie.

- RINIS biedt een dienst om berichten uit te wisselen tussen OOTS/eDelivery/AS4 en REST-API?  
- Vanuit Service2 (?) en UBO is gekeken naar het koppelen van SDG/OOTS en de Wallet. (lijkt niet goed te passen in onze oplossingsrichting waar we vanuit REST-API/ GraphQL willen werken)
