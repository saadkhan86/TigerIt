declare namespace Express {
  interface Request {
    user?: import("../Interfaces/IUser").IUser.Doc
    admin?: import("../Interfaces/IAdmin").IAdmin.Doc
  }
}
