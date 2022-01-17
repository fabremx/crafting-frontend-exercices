import { User } from "../../models/user"

export const isAuthorisedToBet = (user: User): boolean => {
    return user.age >= 18 && user.hasIdentityVerified
}