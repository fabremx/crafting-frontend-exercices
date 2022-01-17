import { User } from "../../models/user";
import { isAuthorisedToBet } from "./isAuthorisedToBet";

const USER: Partial<User> = {
    firstname: 'Paul',
    lastname: 'Martin',
}

describe('isAuthorisedToBet', () => {
    it('should return false when user is not on legal age', () => {
        const user: Partial<User> = {
            ...USER,
            age: 16,
        }

        expect(isAuthorisedToBet(user as User)).toBe(false)
    });

    it('should return false when user identity had not been checked', () => {
        const user: Partial<User> = {
            ...USER,
            age: 45,
            hasIdentityVerified: false,
        }

        expect(isAuthorisedToBet(user as User)).toBe(false)
    });

    it('should return true when user is on legal age and his/her identity has been checked', () => {
        const user: Partial<User> = {
            ...USER,
            age: 18,
            hasIdentityVerified: true,
        }

        expect(isAuthorisedToBet(user as User)).toBe(true)
    });
});