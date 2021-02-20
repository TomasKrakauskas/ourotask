export interface UserGroup {

    _id: string,
    creator_id: string,

    title: string,
    users: Array<string>,
} 