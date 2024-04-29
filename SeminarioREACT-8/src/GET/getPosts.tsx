import { useState, useEffect } from "react";
import { IPost } from "../modules/post";
import axios from "axios";
import './getPosts.css'

interface GetPostsProps {
    postsUpdated: boolean;
    setSelectedPost: React.Dispatch<React.SetStateAction<IPost | null>>;
}

function GetPosts({ postsUpdated, setSelectedPost } : GetPostsProps){
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/posts')
        .then((result) => {
            console.log(result.data);
            setPosts(result.data)})
        .catch((err) => console.log(err))
        console.log()
    }, [postsUpdated] );

    const handlePostClick = (post: IPost) => {
        setSelectedPost(post);
    };


    return (
        <div className="posts-container">
            <div className="table-container">
                <table className="posts-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Author</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.map((post, index ) => (
                                    <tr key = {index} onClick={() => handlePostClick(post)}>
                                    <td>{post.title}</td>
                                    <td>{post.content}</td>
                                    <td>{post.author}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default GetPosts;

