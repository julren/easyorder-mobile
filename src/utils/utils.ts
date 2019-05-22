/**
 * Get Additional info (address, city, ...) for a place based on the supplied coordinates.
 * Based on openStreetMap
 * @param latitude: latitude
 * @param longitude: longitude
 */
const getLocationInfosForCoords = (
  latitude: string | number,
  longitude: string | number
) => {
  if (latitude && longitude) {
    return fetch(
      `https://nominatim.openstreetmap.org/reverse.php?format=html&lat=${latitude}&lon=${longitude}&format=json`
    )
      .then(response => response.json())
      .then(responseJson => {
        return responseJson;
      });
  } else {
    console.log("latitude & longitude not supplied porperly");
    return null;
  }
};

export default { getLocationInfosForCoords: getLocationInfosForCoords };
