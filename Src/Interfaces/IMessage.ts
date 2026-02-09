import { Document } from "mongoose";
import { Types } from "mongoose";

export namespace IMessage {
    export interface Doc extends Document {
        sender: Types.ObjectId | string;
        content: string;
        chat: Types.ObjectId | string;
    }
}
export default IMessage