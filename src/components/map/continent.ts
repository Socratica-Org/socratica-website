export const getContinent = (lat: number, lon: number): string => {
  if (lon > 180) lon -= 360;
  if (lon < -180) lon += 360;

  if (lat <= -60) return "Antarctica";
  if (lat >= -60 && lat < 15 && lon >= -90 && lon <= -30)
    return "South America";
  if (
    lat >= 7 &&
    lat <= 83 &&
    ((lon >= -170 && lon <= -30) || lon >= 170 || lon <= -150)
  )
    return "North America";
  if (lat >= 36 && lat <= 72 && lon >= -25 && lon <= 60) return "Europe";
  if (lat >= -35 && lat < 36 && lon >= -20 && lon <= 55) return "Africa";
  if (lat >= -10 && lat <= 80 && lon >= 45 && lon <= 180) return "Asia";
  if (
    lat >= -50 &&
    lat <= 13 &&
    ((lon >= 110 && lon <= 180) || (lon >= -180 && lon <= -130))
  )
    return "Oceania";

  return "Other";
};
