export interface PostType {
    "id": number,
    "topic": string,
    "content": string,
    "created_at": string,
    "tags": string[],
    "likes_count": number,
    "is_liked": boolean,
    "user": {
        "id": number,
        "username": string,
        "email": string,
        "profile_picture": string,
    }
}

export interface CommentType {
    id: number;
    user_id: number;
    user_email: string;
    username: string;
    profile_picture: string;
    content: string;
    created_at: string;
}

export interface UserType {
    id: number;
    username: string;
    email: string;
    profile_picture:string;
    bio: string;
    posts: UserPostType[];
}

export interface UserPostType{
    id:number;
    user_id: number;
    topic:string;
    content:string;
    created_at: string;
    tags:string[];
}

export interface GetApiPaginationPosts {
    items: PostType[];
    total: number;
    page: number;
    size: number;
    pages: number;
}