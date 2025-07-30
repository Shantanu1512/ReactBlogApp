import { Client, Databases, Storage, Query, ID } from 'appwrite';
import conf from '../../conf/conf';

class Service {
  client = new Client();
  database;
  storage;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.database.createDocument(
        conf.databaseId,
        conf.collectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log('error: createPost: ', error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.database.updateDocument(
        conf.databaseId,
        conf.collectionId,
        slug,
        { title, featuredImage, status, content }
      );
    } catch (error) {
      console.log('Appwrite error :: updatePost :: error :: ', error);
    }
  }

  async deletePost(slug) {
    try {
      return await this.database.deleteDocument(
        conf.databaseId,
        conf.collectionId,
        slug
      );
    } catch (error) {
      console.log('Appwrite Error :: deletePost :: error :: ', error);
    }
  }

  async getPost(slug) {
    try {
      return await this.database.getDocument(
        conf.databaseId,
        conf.collectionId,
        slug
      );
    } catch (error) {
      console.log('Appwrite error :: getPost :: error :: ', error);
    }
  }

  async getAllPost(queries = [Query.equal('status', 'active')]) {
    try {
      return await this.database.listDocuments(
        conf.databaseId,
        conf.collectionId,
        queries
      );
    } catch (error) {
      console.log('Appwrite Error :: getAllPost :: error :: ', error);
    }
  }

  //upload file delete file preview file

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log('Appwrite serive :: uploadFile :: error', error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log('Appwrite serive :: deleteFile :: error', error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();

export default service;
