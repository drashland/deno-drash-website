import { Drash } from "https://deno.land/x/drash/mod.ts";
import { init, MongoClient } from "https://deno.land/x/mongo/mod.ts";

export default class HomeResource extends Drash.Http.Resource {

  static paths = ["/"];

  public async GET() {
    const insertId = this.request.getUrlQueryParam("insertId");
    if (!insertId) {
      throw new Drash.Exceptions.HttpException(400, "'insertId' URL query param is required.");
    }

    const user = await getUsersCollection().findOne({ _id: insertId });

    this.response.body = user;
    return this.response;
  }

  public async POST() {
    const name = this.request.getUrlQueryParam("name");
    if (!name) {
      throw new Drash.Exceptions.HttpException(400, "'name' URL query param is required.");
    }

    // Insert a user
    const insertId = await getUsersCollection().insertOne({
      name: name,
    });

    this.response.body = { insertId: insertId };
    return this.response;
  }

  protected getUsersCollection() {
    // Initialize the plugin
    await init();
    // Get the client
    const client = new MongoClient();
    client.connectWithUri("mongodb://localhost:27017");

    // Go to the deno database
    const db = getClient().database("deno");

    // Go to the users collection
    const users = db.collection("users");

    return users;
  }
}
