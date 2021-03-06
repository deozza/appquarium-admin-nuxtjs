import SpeciesFamily from "~/app/species/global/entities/SpeciesFamily";
import SpeciesGenre from "~/app/species/global/entities/SpeciesGenre";

export default class SpeciesNaming {
  uuid: string
  created_at: Date
  updated_at: Date
  user: string
  common_names: Array<string>
  old_names: Array<string>
  name: string
  species_family: SpeciesFamily
  species_genre: SpeciesGenre


  constructor(speciesNaming: Array<string>) {
    this.uuid = speciesNaming.hasOwnProperty('uuid') ? speciesNaming['uuid'] : ''
    this.created_at = speciesNaming.hasOwnProperty('created_at') ? speciesNaming['created_at'] : ''
    this.updated_at = speciesNaming.hasOwnProperty('updated_at') ? speciesNaming['updated_at'] : ''
    this.user = speciesNaming.hasOwnProperty('user') ? speciesNaming['user'] : ''
    this.common_names = speciesNaming.hasOwnProperty('common_names') ? speciesNaming['common_names'] : []
    this.old_names = speciesNaming.hasOwnProperty('old_names') ? speciesNaming['old_names'] : []
    this.name = speciesNaming.hasOwnProperty('name') ? speciesNaming['name'] : ''
    this.species_family = speciesNaming.hasOwnProperty('species_family') && speciesNaming['species_family'] !== null ? new SpeciesFamily(speciesNaming['species_family']) : new SpeciesFamily([])
    this.species_genre = speciesNaming.hasOwnProperty('species_genre') && speciesNaming['species_genre'] !== null ? new SpeciesGenre(speciesNaming['species_genre']) : new SpeciesGenre([])
  }

  toJSON() {
    return {...this} // here I make a POJO's copy of the class instance
  }
}
