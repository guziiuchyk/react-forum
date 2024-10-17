export interface PostType {
    "id": number,
    "topic": string,
    "content": string,
    "created_at": string,
    "files": string[],
    "tags": string[],
    "likes_count": number,
    comments_count: number,
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
}

export interface GetApiPaginationGeneric<itemsType> {
    items: itemsType[];
    total: number;
    page: number;
    size: number;
    pages: number;
}