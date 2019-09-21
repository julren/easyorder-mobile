# EasyOrder Mobile
EasyOrder ist eine Restaurantbestllplattform, die es Gästen erlaubt, neue Restaurants in ihrer Nähe zu finden und vor Ort direkt via Smartphone-App zu bestellen. Vor der Bestellungen melden sich Gäste über das Scannen eines QR-Code-Tischaufsteller am Restaurant-Tisch an.
Gastronomen können ihr Lokal auf der Plattform anmelden, ihre Speisekarte verwalten, Bestellungen abarbeiten und Einblick über den Erfolg ihres Lokals erhalten.

**Technische Basis**: Die WebApp wurde mit React umgesetzt, die Smartphone-App mit React Native. Als Backend kommt Firebase zum Einsatz.

**Wichtigste Features der MobileApp für Gastronomen:**

* Registrieren / Login
* Restaurant in der Nähe finden
* Details zu Restaurants anzeigen (Stammdaten, Bewertungen anderer Nutzer)
* Speisekarte ansehen
* Tischcode des Restaurants scannen
* Warenkorb zusammenstellen
* Bestellungen aufgeben
* Bestellhistorie betrachten
* Restaurant und einzelne Gerichte bewerten

**Mehr Screenshots in** `/screenshots`

![alt text](https://raw.githubusercontent.com/julren/easyorder-mobile/master/screenshots/Screenshot-EasyOrder-Smartphone-App%202.png "EasyOrder")
![alt text](https://raw.githubusercontent.com/julren/easyorder-mobile/master/screenshots/Screenshot-EasyOrder-Smartphone-App%204.png "EasyOrder")
![alt text](https://raw.githubusercontent.com/julren/easyorder-mobile/master/screenshots/Screenshot-EasyOrder-Smartphone-App%2025.png "EasyOrder") 
![alt text](https://raw.githubusercontent.com/julren/easyorder-mobile/master/screenshots/Screenshot-EasyOrder-Smartphone-App%2013.png "EasyOrder")

This React Native App was bootstrapped with [Expo](https://expo.io/).

## Installation
- (install npm)
- install expo-cli globally `npm install -g expo-cli`
- run `npm install` in project root
- configure firebase account in `.src/config/firebase.ts`. See [Firebase Docs](https://firebase.google.com/docs) for details.
- start app with `expo start`