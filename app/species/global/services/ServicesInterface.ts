import UseCaseError from "~/app/utils/useCasesResult/types/UseCaseError";
import Species from "~/app/species/global/entities/Species";
import WaterConstraints from "~/app/species/global/entities/WaterConstraints";
import User from "~/app/user/entities/User";
import SpeciesNaming from "~/app/species/global/entities/SpeciesNaming";
import AnimalSpecs from "~/app/species/global/entities/AnimalSpecs";

export default interface ServicesInterface {
  queryTotalSpecies(jwt: string): Promise<number | null>

  queryGetSpecies(jwt: string, uuid: string): Promise<Species | UseCaseError>

  queryListOfSpecies(jwt: string): Promise<Array<Species> | UseCaseError>

  querySpeciesCategories(jwt: string): Promise<Array<string> | UseCaseError>

  querySpeciesOrigins(jwt: string): Promise<Array<string> | UseCaseError>

  createSpecies(jwt: string, species: Species): Promise<string | UseCaseError>

  updateSpeciesNaming(jwt: string, speciesNaming: SpeciesNaming): Promise<SpeciesNaming | UseCaseError>

  updateWaterConstraints(jwt: string, waterConstraints: WaterConstraints): Promise<WaterConstraints | Array<UseCaseError>>

  createWaterConstraints(jwt: string, uuid: string, waterConstraints: WaterConstraints): Promise<string | Array<UseCaseError>>

  addWaterConstraintsToSpecies(jwt: string, speciesUuid: string, waterConstraints: WaterConstraints): Promise<WaterConstraints | UseCaseError>

  updateAnimalSpecs(jwt: string, animalSpecs: AnimalSpecs): Promise<AnimalSpecs | Array<UseCaseError>>

  createAnimalSpecs(jwt: string, uuid: string, animalSpecs: AnimalSpecs): Promise<string | Array<UseCaseError>>

  addAnimalSpecsToSpecies(jwt: string, speciesUuid: string, animalSpecs: AnimalSpecs): Promise<AnimalSpecs | UseCaseError>

  initNewSpecies(user: User, category: string): Species

  checkNextState(species: Species, nextState: string): Promise<boolean | Array<UseCaseError>>

  updatePublicationState(jwt: string, uuid: string, state: string): Promise<string | Array<UseCaseError>>

  deleteSpecies(jwt: string, uuid: string): Promise<boolean | Array<UseCaseError>>
}
