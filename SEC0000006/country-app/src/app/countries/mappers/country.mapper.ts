import {RestCountry} from '../interfaces/rest-countries.interface';
//import type {Country} from '../interfaces/country.interface';
import type {Country} from '@interface/country/country.interface'; // namespace custom

export class CountryMappers {

    // static RestCountry => Country
    public static mapRestCountryToCountry(source:RestCountry): Country {
      return {
        cca2: source.cca2,
        name:  source.translations?.['spa']?.common ?? source.name.common,
        capital: source.capital?.[0] || '',
        flagUrl: source.flags.svg || source.flags.png,
        flag: source.flag,
        population: source.population,
        region: source.region
      }
    }
    // static RestCountry[] => Country[]
  public static restCountriesToCountries(source:RestCountry[]): Country[] {
      console.log(source);
    return source.map(CountryMappers.mapRestCountryToCountry);
  }

}
