# Gemeenschappelijke Bronontsluiting

## Introductie

**GBO** verwijst in deze documentatie uitsluitend naar het programma Gemeenschappelijke Bronontsluiting. Het programma onderzoekt en beproeft oplossingsrichtingen, doet voorstellen voor aanvullende afspraken en coördineert de ontwikkeling van referentiecomponenten en voorzieningen.

Het programma werkt vanuit het perspectief van bronhouders een **bronontsluitingsmodel** uit. Dit model bestaat uit:

1. een decentrale, herbruikbare bronontsluiting die iedere bronhouder zelf inricht of laat inrichten; en
2. kanaalvoorzieningen voor de EUDI-Wallet, het Once-Only Technical System (OOTS) en Delen via Toestemming met Private dienstverleners (DvTP).

Het bronontsluitingsmodel is geen afzonderlijke standaard, voorziening, organisatie of afsprakenstelsel. Het bouwt voort op bestaande afspraken, standaarden en voorzieningen van onder meer de Generieke Digitale Infrastructuur (GDI) en het Federatief Datastelsel (FDS).

Het bronontsluitingsmodel beoogt de volgende voordelen:

- aansluiting op de Europese en internationale afspraken en standaarden
- lagere implementatielast voor bronhouders
- minder maatwerk en ad-hoc-implementaties
- beter hergebruik van generieke voorzieningen
- meer uniformiteit en interoperabiliteit tussen overheden, en overheid en private partijen
- een herbruikbare bronontsluiting voor nieuwe ontwikkelingen

<figure>
``` mermaid
--8<-- "diagrammen/context-diagram.mmd"

```
<figcaption>Het voorgestelde bronontsluitingsmodel</figcaption>
</figure>

Op onze [informatiesite](https://gbo.pleio.nl) lees je over aanleiding en doel van het programma GBO en word je op de hoogte gehouden van de voortgang. Daarnaast vind je hier informatie over de pilots van het programma. Omdat het programma ook DvTP uitvoert, is op deze site informatie over DvTP opgenomen.


## Borgen in bestaande stelsels

Het bronontsluitingsmodel bouwt voort op bestaande landelijke afspraken, standaarden en voorzieningen. Het model vormt geen nieuw, zelfstandig stelsel.

Aanvullende afspraken worden pas na besluitvorming onderdeel van de daarvoor aangewezen standaarden en afsprakenstelsels, waaronder het FDS en de GDI. Voor de kanalen sluit het model aan op de nationale en Europese inrichting van de EUDI-Wallet, de Basisinrichting OOTS en de afspraken voor uitwisseling met private dienstverleners. Sectorale en eigen aansluitingen op OOTS vallen buiten de scope van het programma GBO.

De architectuurdocumentatie van het programma GBO beschrijft voorstellen voor aanvullingen op bestaande afspraken en standaarden. Het programma brengt deze voorstellen in bij de governance van de verantwoordelijke stelsels en ondersteunt de uitwerking met specificaties en referentie-implementaties. Het programma wordt daarmee zelf geen standaard, stelsel, voorziening, product of toekomstige beheerorganisatie.

## Documentatie

Deze omgeving bevat de algemene introductie en context van het programma GBO. De verdere uitwerking van het voorgestelde bronontsluitingsmodel bestaat uit de volgende onderdelen:

- de [Context](context.md), waarin de juridische en organisatorische context beschreven wordt
- het [Globaal Ontwerp](https://ictu.github.io/GBO-GO/) met een beschrijving van het voorgestelde bronontsluitingsmodel, de interactiepatronen, generieke functies en componenten
- de [Projectstartarchitectuur](https://ictu.github.io/GBO-PSA/) waarin het ontwerp uitgewerkt wordt naar benodigde stelselfuncties (afspraken, standaarden en voorzieningen) en een inventarisatie van te ontwikkelen componenten
- het [Technisch Ontwerp](https://ictu.github.io/GBO-TO/) waarin het ontwerp uitgewerkt wordt naar in te richten technische componenten
- [Technische Requirements](underconstruction_tr.md) waarin de te ontwikkelen voorzieningen uitgewerkt worden naar technische specificaties
- het [Semantisch Model](https://ictu.github.io/GBO-Semantiek/) met o.a. de vereiste gegevensmodellen, vertaaltabellen en metadatering

Deze onderdelen hangen inhoudelijk met elkaar samen en verwijzen waar nodig naar elkaar, maar kunnen ook zelfstandig worden geraadpleegd.

## Reviewproces

De documentatie is nog in ontwikkeling en vormt de basis voor verdere besluitvorming en de start van de ontwikkelfase. De onderdelen worden stapsgewijs ter review voorgelegd. Hieronder is de planning van de reviewrondes per onderdeel opgenomen.

| **Onderdeel** | **Reviewronde** | **Status** |
| ------------- | --------------- | ---------- |
| [Context](context.md) | N.v.t. | In ontwikkeling |
| [Globaal Ontwerp](https://ictu.github.io/GBO-GO/) | Afgerond ([v0.8.7](https://ictu.github.io/GBO-GO/0.8.7/))<br>[22 april - 22 mei 2026] | v0.9.6 t.b.v. vaststelling |
| [Projectstartarchitectuur](https://ictu.github.io/GBO-PSA/) | Afgerond ([v0.7.2](https://ictu.github.io/GBO-PSA/0.7.2/))<br>[21 juni - 1 augustus 2026] | v0.8.5 t.b.v. Technisch Ontwerp |
| [Technisch Ontwerp](https://ictu.github.io/GBO-TO/) | Open voor feedback | Ontwikkelversie (v0.2.2) beschikbaar |
| [Semantisch Model](https://ictu.github.io/GBO-Semantiek/) | Open voor feedback | Ontwikkelversie (v0.5) beschikbaar |
| Requirements | In voorbereiding | In ontwikkeling |
