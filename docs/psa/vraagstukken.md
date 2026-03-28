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


## Toestemmingsvoorziening

De OOTS-verplichte toestemmingspreview (SDG-verordening) is momenteel belegd bij RINIS-basisinrichting. Als GBO de toestemmingsflow overneemt, moet worden bepaald of het preview-scherm bij RINIS blijft of naar GBO verhuist. Dit raakt de verantwoordelijkheidsverdeling en dient te worden beslecht vóór technisch ontwerp.


## Gekwalificeerde elektronische attesteringen van attributen

Hoe laten we attributen elektronisch kwalificeren? Hoe wordt de "attesteringsuitgifte" ingericht?  
Dit is nodig voor de Wallet, maar mogelijk ook voor de andere use cases. Er is [Europese Wetgeving](https://eur-lex.europa.eu/legal-content/NL/TXT/HTML/?uri=OJ:L_202501569), maar die laat nog ruimte voor de inrichting en wie welke rol invult.  

- Gebruik QEAA / QTSP?
- Inrichten Pub-EAA?
- Centrale verificatiedienst tbv QEAA?


## Centrale Componenten

Ontwerpprincipe D01 stelt "Decentraal wat kan, centraal wat moet". Dit geldt als uitgangspunt, maar als een centrale voorziening voldoende voordelen biedt, past in de geldende wet- en regelgeving en niet tegn andere ontwerpprincipes ingaat, dan kan ervoor gekozen worden hiervoor te kiezen.  
Bij de volgende voorzieningen die in theorie decentraal ingericht kunnen worden, wordt een centrale inrichting overwogen:

- PuB-EAA dienst waar alle overheidsbronnen gebruik van kunnen maken.
- Verificatiedienst waarmee QTSP's gegevens kunnen verifiëren en waar alle overheidsbronnen gebruik van kunnen maken.
- Vertaalvoorziening om GraphQL verzoeken om te zetten naar REST/API verzoeken voor overheidsbronnen die (nog) geen eigen GraphQL implementatie willen/ kunnen realiseren.


## Transformatie-architectuur

Hoe één bronhouder-API leidt tot drie verschillende afnemerprotocollen (DvTP/REST+OAuth, OOTS/AS4+eDelivery, Wallet/OID4VC)? Dit is het technische hart van de "bronhouder één keer, afnemer naar wens"-ambitie.

- RINIS biedt een dienst om berichten uit te wisselen tussen OOTS/eDelivery/AS4 en REST-API?  
- Vanuit [Synergy](https://ec.europa.eu/digital-building-blocks/sites/spaces/OOTS/pages/930450665/Two+systems+one+vision) en UBO is gekeken naar het koppelen van OOTS en de Wallet.
- Onze oplossingsrichting werkt vanuit de FDS-standaarden (REST-API/ GraphQL).
