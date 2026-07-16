# Gemeenschappelijk Bronontsluiting

## Introductie

Het programma Gemeenschappelijke Bronontsluiting (GBO) ontwikkelt een gestandaardiseerde ontsluiting waarmee overheidsorganisaties (bronhouders) hun gegevens direct interoperabel en herbruikbaar beschikbaar stellen voor de Europese Digitale Identiteit wallet (EUDI-Wallet), het Once-Only Technical System (OOTS) en Delen via Toestemming met Private dienstverleners (DvTP).

GBO richt zich vanuit het perspectief van bronhouders op de gemeenschappelijke aspecten van bronontsluiting en biedt de volgende voordelen:

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
<figcaption>Gemeenschappelijke bronontsluiting</figcaption>
</figure>


## Borgen in bestaande stelsels

De gestandaardiseerde ontsluiting bestaat uit een samenhangende set van generieke afspraken, standaarden en voorzieningen. GBO vormt daarbij geen nieuw, zelfstandig stelsel, maar bouwt voort op bestaande landelijke afspraken, standaarden en voorzieningen.

Nieuwe, aanvullende afspraken, standaarden en voorzieningen worden zoveel mogelijk geborgd binnen de bestaande afsprakenstelsels. Hiertoe behoren het Federatief Datastelsel (FDS), de Generieke Digitale Infrastructuur (GDI), het EDI-stelsel, de Nederlandse Basisinfrastructuur OOTS en, voor de uitwisseling met private dienstverleners, publiek-private afsprakenstelsels zoals Trusted Information Partners (TIP).

De GBO architectuur formuleert aanvullingen voor en verbeteringen op deze bestaande stelsels. Het project draagt die voorstellen voor aan de governance van de stelsels. De stelsels implementeren de maatregelen vervolgens zelf. Het project ondersteunt dit met specificaties en voorbeeldimplementaties.

## Documentatie

Deze omgeving bevat de inhoudelijke uitwerking van de GBO. Deze uitwerking bestaat uit de volgende onderdelen:

- de [Context](context.md), waarin de juridische en organisatorische context beschreven wordt
- het [Globaal Ontwerp](https://ictu.github.io/GBO-GO/) met een beschrijving van de gemeenschappelijke bronontsluiting in grote lijnen
- de [Projectstartarchitectuur](https://ictu.github.io/GBO-PSA/) waarin het ontwerp uitgewerkt wordt naar benodigde stelselfuncties (afspraken, standaarden en voorzieningen) en een inventarisatie van te ontwikkelen componenten
- het [Technisch Ontwerp](underconstruction_to.md) waarin het ontwerp uitgewerkt wordt naar in te richten technische componenten
- [Technische Requirements](underconstruction_tr.md) waarin de te ontwikkelen voorzieningen uitgewerkt worden naar technische specificaties
- het [Semantisch Model](underconstruction_sem.md) met o.a. de vereiste gegevensmodellen, vertaaltabellen en metadatering

Deze onderdelen hangen inhoudelijk met elkaar samen en verwijzen waar nodig naar elkaar, maar kunnen ook zelfstandig worden geraadpleegd.

## Reviewproces

De documentatie is nog in ontwikkeling en vormt de basis voor verdere besluitvorming en de start van de ontwikkelfase. De onderdelen worden stapsgewijs ter review voorgelegd. Hieronder is de planning van de reviewrondes per onderdeel opgenomen.

| **Onderdeel**            |  **Reviewronde**                            | **Status** |
| ------------------------ |  ------------------------------------------ | ------------------ |
| [Context](context.md)    |  In voorbereiding                           | In ontwikkeling    |
| [Globaal Ontwerp](https://ictu.github.io/GBO-GO/)          |  Afgerond ([v0.8.7](https://ictu.github.io/GBO-GO/0.8.7/))<br\>\[22 april - 22 mei 2026\] | Verwerking review t.b.v. vaststelling |
| [Projectstartarchitectuur](https://ictu.github.io/GBO-PSA/) |  In voorbereiding       | Interne review t.b.v. externe reviewronde |
| Technisch Ontwerp        |  In voorbereiding                           | In ontwikkeling |
| Semantisch Model         |  In voorbereiding                           | In ontwikkeling |
| Requirements             |  In voorbereiding                           | In ontwikkeling |
