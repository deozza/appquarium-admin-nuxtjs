import ServicesInterface from "~/app/species/global/services/ServicesInterface";
import AdapterInterface from "~/app/species/global/adapters/AdapterInterface";
import HasuraAdapter from "~/app/species/global/adapters/HasuraAdapter";
import UseCaseError from "~/app/utils/useCasesResult/types/UseCaseError";
import Species from "~/app/species/global/entities/Species";
import WaterConstraints from "~/app/species/global/entities/WaterConstraints";
import Result from "~/app/utils/useCasesResult/Result";
import User from "~/app/user/entities/User";
import SpeciesNaming from "~/app/species/global/entities/SpeciesNaming";
import SpeciesFamily from "~/app/species/global/entities/SpeciesFamily";
import SpeciesGenre from "~/app/species/global/entities/SpeciesGenre";
import AnimalSpecs from "~/app/species/global/entities/AnimalSpecs";

export default class Services implements ServicesInterface {
  async queryTotalSpecies(jwt: string): Promise<number | null> {
    const adapter: AdapterInterface = new HasuraAdapter(jwt)

    return await adapter.queryTotalSpecies()
  }

  async queryListOfSpecies(jwt: string): Promise<Array<Species> | UseCaseError> {
    const adapter: AdapterInterface = new HasuraAdapter(jwt)

    return await adapter.queryListOfSpecies()
  }

  async queryGetSpecies(jwt: string, uuid: string): Promise<Species | UseCaseError> {
    const adapter: AdapterInterface = new HasuraAdapter(jwt)

    return await adapter.queryGetSpecies(uuid)
  }

  async querySpeciesCategories(jwt: string): Promise<Array<string> | UseCaseError> {
    const adapter: AdapterInterface = new HasuraAdapter(jwt)

    return await adapter.queryListOfSpeciesCategories()
  }

  async querySpeciesOrigins(jwt: string): Promise<Array<string> | UseCaseError> {
    const adapter: AdapterInterface = new HasuraAdapter(jwt)

    return await adapter.queryListOfSpeciesOrigins()
  }

  initNewSpecies(user: User, category: string): Species {
    let newSpecies = new Species([])
    newSpecies.category = category
    newSpecies.user = user.uid
    newSpecies.publication_state = 'DRAFT'
    newSpecies.species_naming.species_family.category = category
    newSpecies.species_naming.species_family.user = user.uid
    newSpecies.species_naming.species_genre.category = category
    newSpecies.species_naming.species_genre.user = user.uid

    return newSpecies
  }

  async createSpecies(jwt: string, species: Species): Promise<string | UseCaseError> {
    const adapter: AdapterInterface = new HasuraAdapter(jwt)

    return await adapter.mutationCreateSpecies(species)
  }

  async createSpeciesFamily(jwt: string, speciesFamily: SpeciesFamily): Promise<string | UseCaseError> {
    const adapter: AdapterInterface = new HasuraAdapter(jwt)

    return await adapter.mutationCreateSpeciesFamily(speciesFamily)
  }

  async createSpeciesGenre(jwt: string, speciesGenre: SpeciesGenre): Promise<string | UseCaseError> {
    const adapter: AdapterInterface = new HasuraAdapter(jwt)

    return await adapter.mutationCreateSpeciesGenre(speciesGenre)
  }

  async updateSpeciesNaming(jwt: string, speciesNaming: SpeciesNaming): Promise<SpeciesNaming | UseCaseError> {
    const adapter: AdapterInterface = new HasuraAdapter(jwt)

    return await adapter.mutationUpdateSpeciesNaming(speciesNaming)
  }

  async createWaterConstraints(jwt: string, uuid: string, waterConstraints: WaterConstraints): Promise<string | Array<UseCaseError>> {
    const areConstraintsValid: Result = Services.checkWaterConstraintsAreValid(waterConstraints)

    if (areConstraintsValid.isFailed()) {
      return areConstraintsValid.errors
    }

    const adapter: AdapterInterface = new HasuraAdapter(jwt)

    return await adapter.mutationCreateWaterConstraints(uuid, waterConstraints)
  }

  async addWaterConstraintsToSpecies(jwt: string, speciesUuid: string, waterConstraints: WaterConstraints): Promise<WaterConstraints | UseCaseError> {
    const adapter: AdapterInterface = new HasuraAdapter(jwt)

    return await adapter.mutationAddWaterConstraintsToSpecies(waterConstraints, speciesUuid)
  }

  async updateWaterConstraints(jwt: string, waterConstraints: WaterConstraints): Promise<WaterConstraints | Array<UseCaseError>> {
    const areConstraintsValid: Result = Services.checkWaterConstraintsAreValid(waterConstraints)

    if (areConstraintsValid.isFailed()) {
      return areConstraintsValid.errors
    }

    const adapter: AdapterInterface = new HasuraAdapter(jwt)

    return await adapter.mutationEditWaterConstraints(waterConstraints)
  }

  private static checkWaterConstraintsAreValid(waterConstraints: WaterConstraints): Result {
    const result: Result = new Result()

    if (waterConstraints.ph_min > waterConstraints.ph_max) {
      result.addError("ph_min", 400)
    }

    if (waterConstraints.gh_min > waterConstraints.gh_max) {
      result.addError("gh_min", 400)
    }

    if (waterConstraints.temp_min > waterConstraints.temp_max) {
      result.addError("temp_min", 400)
    }

    return result
  }

  async createAnimalSpecs(jwt: string, uuid: string, animalSpecs: AnimalSpecs): Promise<string | Array<UseCaseError>> {
    const adapter: AdapterInterface = new HasuraAdapter(jwt)

    return await adapter.mutationCreateAnimalSpecs(uuid, animalSpecs)
  }

  async addAnimalSpecsToSpecies(jwt: string, speciesUuid: string, animalSpecs: AnimalSpecs): Promise<AnimalSpecs | UseCaseError> {
    const adapter: AdapterInterface = new HasuraAdapter(jwt)

    return await adapter.mutationAddAnimalSpecsToSpecies(animalSpecs, speciesUuid)
  }

  async updateAnimalSpecs(jwt: string, animalSpecs: AnimalSpecs): Promise<AnimalSpecs | Array<UseCaseError>> {
    const adapter: AdapterInterface = new HasuraAdapter(jwt)

    return await adapter.mutationEditAnimalSpecs(animalSpecs)
  }

  async checkNextState(species: Species, nextState: string): Promise<boolean | Array<UseCaseError>> {
    return true
  }

  async updatePublicationState(jwt: string, uuid: string, state: string): Promise<string | Array<UseCaseError>> {
    const adapter: AdapterInterface = new HasuraAdapter(jwt)

    return await adapter.mutationUpdatePublicationState(uuid, state)
  }

  async deleteSpecies(jwt: string, uuid: string): Promise<boolean | Array<UseCaseError>> {
    const adapter: AdapterInterface = new HasuraAdapter(jwt)

    return await adapter.mutationDeleteSpecies(uuid)
  }
}
