import conf from "../conf/Conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    
    constructor() {
        this.client
            .setEndpoint(conf.apwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }
    
    async CreateAccount({ name,email, password }) {
        console.log(name,email, password);
        console.log("Account creation button clicked successfully");
        
        try {
        
            const UserAccount = await this.account.create(ID.unique(), email, password, name);
            if (UserAccount) {
                return this.Login({email, password});
            }
            else {
                return UserAccount
            }

        } catch (error) {
            throw error
        }

    }
    
    async Login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    } 
     
    async getCurrentUser(){
        try {
            return await this.account.get();
            
        } catch (error) {
            console.log("appwrite getCurrentUser :: Error ", error);
            
        }
        return null;
    }
    
    async logout(){
        try {
            return await this.account.deleteSessions();
             
        } catch (error) {
            console.log("appwrite logout", error);
            
        }
        return null;
    }

}
const authService = new AuthService();
                 
export default authService
