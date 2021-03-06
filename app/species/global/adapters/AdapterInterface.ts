import UseCaseError from "~/app/utils/useCasesResult/types/UseCaseError";
import Species from "~/app/species/global/entities/Species";
import SpeciesFamily from "~/app/species/global/entities/SpeciesFamily";
import SpeciesGenre from "~/app/species/global/entities/SpeciesGenre";
import WaterConstraints from "~/app/species/global/entities/WaterConstraints";
import SpeciesNaming from "~/app/species/global/entities/SpeciesNaming";
import AnimalSpecs from "~/app/species/global/entities/AnimalSpecs";

export default interface AdapterInterface {
  queryTotalSpecies(): Promise<number | null>

  queryListOfSpecies(): Promise<Array<Species> | UseCaseError>

  queryGetSpecies(uuid: string): Promise<Species | UseCaseError>

  queryListOfSpeciesCategories(): Promise<Array<string> | UseCaseError>

  queryListOfSpeciesFamiliesByCategory(category: string): Promise<Array<SpeciesFamily> | UseCaseError>

  queryListOfSpeciesGenresByCategory(category: string): Promise<Array<SpeciesGenre> | UseCaseError>

  queryListOfSpeciesOrigins(): Promise<Array<string> | UseCaseError>

  queryListOfSpeciesByCategory(category: string): Promise<Array<Species> | UseCaseError>

  mutationCreateSpeciesGenre(speciesGenre: SpeciesGenre): Promise<string | UseCaseError>

  mutationCreateSpeciesFamily(speciesFamily: SpeciesFamily): Promise<string | UseCaseError>

  mutationCreateSpecies(species: Species): Promise<string | UseCaseError>

  mutationUpdateSpeciesNaming(speciesNaming: SpeciesNaming): Promise<SpeciesNaming | UseCaseError>

  mutationCreateWaterConstraints(uuid: string, waterConstraints: WaterConstraints): Promise<string | Array<UseCaseError>>

  mutationEditWaterConstraints(waterConstraints: WaterConstraints): Promise<WaterConstraints | Array<UseCaseError>>

  mutationAddWaterConstraintsToSpecies(waterConstraint: WaterConstraints, speciesUuid: string): Promise<WaterConstraints | UseCaseError>

  mutationCreateAnimalSpecs(uuid: string, animalSpecs: AnimalSpecs): Promise<string | Array<UseCaseError>>

  mutationEditAnimalSpecs(animalSpecs: AnimalSpecs): Promise<AnimalSpecs | Array<UseCaseError>>

  mutationAddAnimalSpecsToSpecies(animalSpecs: AnimalSpecs, speciesUuid: string): Promise<AnimalSpecs | UseCaseError>

  mutationUpdatePublicationState(uuid: string, nextState: string): Promise<string | Array<UseCaseError>>

  mutationDeleteSpecies(uuid: string): Promise<boolean | Array<UseCaseError>>
}
