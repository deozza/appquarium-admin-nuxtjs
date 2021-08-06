import Credentials from "~/app/user/entities/Credentials";
import User from "~/app/user/entities/User";

export default interface ServicesInterface {
   authenticateUser(credentials: Credentials): Promise<User|null>
}
