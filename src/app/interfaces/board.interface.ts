export interface Board {

    _id: string,
    creator_id: string,
    user_group_id: string,

    favorite: boolean,
    title: string,
    description: string,

    counter: number,
    counter_appendice: string,

    logo_url: string,
    background_url: string,

    createdAt: Date
}