import conf from "../conf/Conf";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";
         
export class Service {
    client = new Client();
    databases;
    bucket;
    
    constructor() {
        this.client
            .setEndpoint(conf.apwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);

    }
    
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {

            return await this.databases.createDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )

        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);

        }
    }

    async updatePost({ slug }, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status }
            )
        } catch (error) {
            console.log(error);

        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("deletepost", error);
            return false
        }
    }

    async getPost(slug) {
        try {

            return await this.databases.getDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug
            )

        } catch (error) {
            console.log(error);

        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                queries
            )

        } catch (error) {
            console.log("error in getposts is :", error);
        }
    }

    // file upload service 
    async FileUpload(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("File upload error", error);

        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("appwrite file delete error", error);

        }
    }

    filePreview(fileId) {
        try {

            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )

        } catch (error) {
            console.log("file preview error : ", error);

        }
    }
      
}

const service = new Service()

export default service 
