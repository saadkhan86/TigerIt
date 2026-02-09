import { Document, Types } from "mongoose";
import { IUser } from "./IUser";
import IMessage from "./IMessage";

export namespace IChat {
    export interface Doc extends Document {
        users: Types.ObjectId[] | string[];
        latestMessage: Types.ObjectId | string;
    }
    export interface populated extends Document {
        users: IUser.Doc[];
        latestMessage?: IMessage.Doc;
    }
}
export default IChat