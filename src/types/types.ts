export interface PostType {
    "id": number,
    "topic": string,
    "content": string,
    "created_at": string,
    "tags": string[],
    "user": {
        "id": number,
        "username": string,
        "email": string,
        "profile_picture": string,
    }
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
