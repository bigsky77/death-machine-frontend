import clientPromise from "../../lib/mongodb"
import { DB_NAME } from '../../src/constants/constants'


export default async function handler(req, res) {

    const client = await clientPromise

    const db = client.db("DeathMachine")
    const solutions = await db
          .collection("boardSet_docs").find()
         .sort({
             '_chain.valid_from': -1 // prefer latest
        })
        .toArray()

    console.log("solutions: ", solutions);

    res.status(200).json({ 'DeathMachine': solutions })
}
