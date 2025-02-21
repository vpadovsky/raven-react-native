import axios from 'axios';
import { IPost, IComment, IUser } from '../types/blog';

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

export const fetchPosts = async (): Promise<IPost[]> => {
    const response = await api.get('/posts');
    return response.data;
};

export const fetchPost = async (id: number): Promise<IPost> => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
};

export const fetchComments = async (postId: number): Promise<IComment[]> => {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data;
};

export const fetchUserPosts = async (userId: number): Promise<IPost[]> => {
    const response = await api.get(`/posts?userId=${userId}`);
    return response.data;
};

export const fetchUser = async (userId: number): Promise<IUser> => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
};
