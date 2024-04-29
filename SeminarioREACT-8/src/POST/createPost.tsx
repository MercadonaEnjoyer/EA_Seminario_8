import { useState } from "react";
import axios from "axios";
import { IPost } from "../modules/post";
import './createPost.css';

interface CreatePostProps {
    updatePostList: () => void;
}

interface FormErrors {
    [key: string]: string;
}

function CreatePost({ updatePostList }: CreatePostProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});

    const validateField = (fieldName: string, value: string) => {
        let errorMessage = '';

        switch (fieldName) {
            case 'first_name':
                errorMessage = value.trim() === '' ? 'First name is required' : '';
                break;
            case 'middle_name':
                errorMessage = value.trim() === '' ? 'Middle name is required' : '';
                break;
            case 'last_name':
                errorMessage = value.trim() === '' ? 'Last name is required' : '';
                break;
            case 'email':
                errorMessage = value.trim() === '' ? 'Email is required' : '';
                break;
            default:
                break;
        }

        setErrors(prevErrors => ({
            ...prevErrors,
            [fieldName]: errorMessage
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isFormValid = validateForm();
        if (isFormValid) {
            const post: IPost = {
                title: title,
                content: content,
                author: author
            };
            console.log(post);
            axios.post("http://localhost:3000/post", post)
            .then(result => {
                console.log(result);
                updatePostList();
                setTitle('');
                setContent('');
                setAuthor('');
            })
            .catch(err => console.error(err));
        }
    };

    const validateForm = () => {
        let isValid = true;

        validateField('title', title);
        validateField('content', content);
        validateField('author', author);

        for (const error in errors) {
            if (errors[error] !== '') {
                isValid = false;
                break;
            }
        }

        return isValid;
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="create-post-form">
                <div>
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => { setTitle(e.target.value); validateField('title', e.target.value); }} />
                    {errors.first_name && <span style={{ color: 'red' }}>{errors.first_name}</span>}
                </div>
                <div>
                    <label>Content</label>
                    <input type="text" value={content} onChange={(e) => { setContent(e.target.value); validateField('content', e.target.value);}} />
                    {errors.content && <span style={{ color: 'red' }}>{errors.content}</span>}
                </div>
                <div>
                    <label>Author</label>
                    <input type="text" value={author} onChange={(e) => { setAuthor(e.target.value); validateField('author', e.target.value); }} />
                    {errors.author && <span style={{ color: 'red' }}>{errors.author}</span>}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreatePost;
