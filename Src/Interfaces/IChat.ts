import { Document, Types } from "mongoose";
import { IUser } from "./IUser";
import IMessage from "./IMessage";

export namespace IChat {
    export interface UserSummary {
        _id: Types.ObjectId;
        name: string;
        phone: string;
    }

    export interface Doc extends Document {
        users: (Types.ObjectId | string)[];
        latestMessage: Types.ObjectId | string | IMessage.Doc | null;
    }

    export interface Populated extends Document {
        _id: Types.ObjectId;
        users: UserSummary[];
        latestMessage: IMessage.Populated | null;
        createdAt: Date;
        updatedAt: Date;
    }
}
export default IChat