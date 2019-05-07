import React, { Component } from "react";
import Container from "../../components/basic/Container";
import { Text } from "react-native-elements";
import { ScrollView } from "react-native";

export interface Props {}

export interface State {}

class ImprintScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: "Impressum"
  };

  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ScrollView>
        <Container padded="more">
          <Text h1>Impressum</Text>
          <Text>
            {`
Kontakt:
Mustermann PartG mbB
Musterweg 7
12345 Musterstadt
Tel.: 01234 / 56789-00
Fax: 01234 / 56789-10

E-Mail: rechtsanwalt@muster-online.de

Rechtsform:
Partnerschaftsgesellschaft mit beschränkter Berufshaftung nach dem Partnerschaftsgesetz

Vertretungsberechtigter:
Max Mustermann

Zuständige Aufsichtsbehörde und Kammer:
Rechtsanwaltskammer Musterstadt
Musterallee 14
12345 Musterstadt

Berufsbezeichnung und berufsrechtliche Regelungen:
Die gesetzliche Berufsbezeichnung lautet Rechtsanwalt. Die Berufsbezeichnung wurde in der Bundesrepublik Deutschland verliehen. Die Rechtsanwälte unterliegen den folgenden berufsrechtlichen Regelungen:
Der Bundesrechtsanwaltsordnung (BRAO), der Berufsordnung für Rechtsanwälte (BORA), der Fachanwaltsordnung (FAO), dem Gesetz über die Vergütung der Rechtsanwältinnen und Rechtsanwälte (Rechtsanwaltsvergütungsgesetz – RVG), den Berufsregeln der Rechtsanwälte der Europäischen Union (CCBE) sowie dem Gesetz über die Tätigkeit europäischer Rechtsanwälte in Deutschland vom 9. März 2000 (EuRAG). Diese und weitere berufsrechtlichen Regelungen finden Sie auf der Internetseite der Bundesrechtsanwaltskammer (http://www.brak.de/) unter „Berufsrecht“.

Register:
Registergericht AG Musterstadt
Partnerschaftsregisternummer: 123456

Umsatzsteuer-ID:
DE 123456789

Berufshaftpflichtversicherung:
Musterversicherungen AG
Musterweg 301-306
12345 Musterstadt

Räumlicher Geltungsbereich:
weltweit

Verantwortlicher i.S.d. § 55 Abs. 2 RStV für die journalistisch-redaktionellen Inhalte:
Max Mustermann

Hinweis gem. ODR-Verordnung:
Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit, die Sie unter https://ec.europa.eu/consumers/odr finden.

Hinweis gem. § 36 VSBG:
Mustermann PartG mbB wird nicht an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilnehmen und ist hierzu auch nicht verpflichtet.
`}
          </Text>
        </Container>
      </ScrollView>
    );
  }
}

export default ImprintScreen;
