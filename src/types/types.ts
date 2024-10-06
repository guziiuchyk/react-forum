export interface PostType {
    "id": number,
    "topic": string,
    "content": string,
    "created_at": string,
    "tags": string[],
    "user": {
        "id": number,
        "username": string,
        "email": string
    }
}

interface PostForUserType{
    id: number;
    topic:string;
    content:string;
    tags:string[];
    created_at:string;
    user_id:number;
}

export interface UserType {
    id: number;
    username: string;
    email: string;
    profile_picture:string;
    bio: string;
    posts: PostForUserType[];
}

export interface UserPostType{
    id:number;
    user_id: number;
    topic:string;
    content:string;
    created_at: string;
    tags:string[];
}
