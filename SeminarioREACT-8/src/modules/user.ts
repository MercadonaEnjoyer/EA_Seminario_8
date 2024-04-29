export interface User {
    _id?: String;
    name: {
        first_name: String;
        middle_name: String;
        last_name: String;
    };
    email: String;
    phone_number: String;
    gender: String;
    posts?: String[]; // Array to store post IDs
    reviews?: String[]; // Array to store post IDs
}