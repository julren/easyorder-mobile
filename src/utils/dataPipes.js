export function displayNameForWeekday(day) {
  dayDisplayNames = {
    monday: "Montag",
    thuesday: "Dienstag",
    wednesday: "Mittwoch",
    thursday: "Donnerstag",
    friday: "Freitag",
    saturday: "Samastag",
    sunday: "Sonntag"
  };
  return dayDisplayNames[day];
}

export function displayNameForPriceClass(priceClass) {
  priceClassDisplayNames = {
    0: "Günstig",
    1: "Durchschnittlich",
    2: "Gehoben"
  };
  return priceClassDisplayNames[priceClass];
}
