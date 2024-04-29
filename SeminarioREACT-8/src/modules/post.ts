export interface IPost {
    _id?: String; // Optional _id field
    title: string;
    content: string;
    author: string; // Reference to the User collection
}



