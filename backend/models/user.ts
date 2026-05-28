import { ObjectId, InsertOneResult } from 'mongodb';
import { getDb } from '../utils/database';
import { UserType } from '../@types/index';

export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  async save(): Promise<UserType> {
    const db = getDb();

    const result: InsertOneResult<UserType> = await db.collection('users').insertOne(this);

    const user = { _id: result.insertedId, ...this };

    return user;
  }

  static async findById(id: string): Promise<UserType | null> {
    const db = getDb();

    const user = await db.collection<UserType>('users').findOne({ _id: new ObjectId(id) });

    if (!user) return null;

    return user;
  }
}
