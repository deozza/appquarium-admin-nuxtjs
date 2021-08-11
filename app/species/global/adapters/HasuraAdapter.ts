import AdapterInterface from "~/app/species/global/adapters/AdapterInterface";
import HasuraClient from "~/app/utils/hasura/HasuraClient";
import {ClientError} from "graphql-request";
import Error from "~/app/utils/useCasesResult/types/Error";

export default class HasuraAdapter extends HasuraClient implements AdapterInterface{

  constructor(jwt: string) {
    super(jwt);
  }

  async queryTotalSpecies(): Promise<number | null> {
    const query: string = `query{
      species_aggregate {
        aggregate {
          count
        }
      }
    }
    `
    try {
      const data = await this.client.request(query)
      const totalSpecies: number = data.species_aggregate.aggregate.count
      return totalSpecies
    }
    catch (e) {
      return null
    }
  }

  async queryListOfSpeciesCategories(): Promise<Array<string> | Error> {
    const query: string = `query {
      species_categories {
        name
      }
    }
    `
    try {
      const data = await this.client.request(query)
      const listOfSpeciesCategories: Array<string> = data.species_categories
      return listOfSpeciesCategories
    }
    catch (e) {
      if(e.message.includes("JWTExpired")){
        return new Error("JWT expired", 401)

      }
      return new Error(e.message, 400)
    }
  }
}
