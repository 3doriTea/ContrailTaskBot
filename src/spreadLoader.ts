export class SpreadLoader {
  constructor(private spreadId: string) {}

  public async load(sheetName: string): Promise<void> {
    const accessUri = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadId}/values/${sheetName}?key=${process.env.SPREAD_SEET_API_KEY}`;
    console.log(accessUri);
    const response = await fetch(accessUri);
    const json = await response.json();
    console.log(json);
  }
}
