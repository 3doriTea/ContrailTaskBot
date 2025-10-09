namespace TrelloClient {
  export class TrelloClient {
    constructor(
      private token: string,
      private key: string,
      private boardId: string
    ) {
    }
    
    async getBoard(): Promise<void> {
      
    }
  }
}