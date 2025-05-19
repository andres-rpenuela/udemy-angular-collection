export interface Country {
  cca2:       string;         // Código corto del país (ISO 3166-1 alpha-2)
  name:       string;         // Nombre común del país
  capital:    string;      // Capital del país (puede estar vacía)
  flagUrl:    string;      // URL de la bandera (preferiblemente SVG)
  flag:       string;         // Emoji de la bandera (por ejemplo 🇪🇸)
  population: number;   // Población
  region:     string;       // Región geográfica
}
