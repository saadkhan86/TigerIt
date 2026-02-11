import { Document } from "mongoose";
import { Types } from "mongoose";

export namespace IMessage {
    export interface Doc extends Document {
        sender: Types.ObjectId | string;
        content: string;
        chat: Types.ObjectId | string;
    }
    export interface Populated extends Document {
        sender: { _id: Types.ObjectId; name: string };
        content: string;
        chat: Types.ObjectId | any;
    }
}
export default IMessage