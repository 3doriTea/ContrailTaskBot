import { TrelloElement } from "./trelloElement";
import { organizationGetRequest } from "./utility";

export type OrganizationData = {
  id: string;
};

export type OrganizationsData = Array<OrganizationData>;

export type Organizations = Array<Organization>;

export class Organization extends TrelloElement<OrganizationData> {
  constructor(json: OrganizationData) {
    super(json);
  }

  public get id() {
    return this.json.id;
  }

  public async getMembers(): Promise<any> {
    const data = await organizationGetRequest<any>(this.id, "members");
    return data;
  }

  public static async load(organizationId: string): Promise<Organization> {
    const data = await organizationGetRequest<OrganizationData>(organizationId);
    return new Organization(data);
  }
}
