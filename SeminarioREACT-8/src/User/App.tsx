import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { User } from '../modules/user';
import { IPost } from '../modules/post'
import GetUsers from '../GET/getUsers';
import UpdateUser from '../GET/getUser';
import CreateUser from '../POST/createUser';
import CreatePost from '../POST/createPost';
import '@fontsource/inter';
import GetPosts from '../GET/getPosts';


function AppUser() {

  const [usersUpdated, setUsersUpdated] = useState(false);
  const [postsUpdated, setPostsUpdated] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  
  const updateUserList = () => {
    setUsersUpdated(!usersUpdated);
  };

  const updatePostList = () => {
    setPostsUpdated(!postsUpdated);
  };

  return (
    <div className="container" >
      <div className="title">
        <h1 >Seminario 8</h1>
        <img src={logo} alt="logo" className="logo" />
      </div>
      <div className="component">
        <h2>Get Users Component</h2>
        <GetUsers usersUpdated={usersUpdated} setSelectedUser={setSelectedUser}/>
      </div>
      <div className="component">
        <h2>Edit User Component</h2>
        <UpdateUser user={selectedUser} updateUserList={updateUserList}  />
      </div>
      <div className="component">
        <h2>Create User Component</h2>
        <CreateUser updateUserList={updateUserList} />
      </div>
      <div className="component">
        <h2>Get Posts Component</h2>
        <GetPosts postsUpdated={postsUpdated} setSelectedPost={setSelectedPost}/>
      </div>
      <div className="component">
        <h2>Create Post Component</h2>
        <CreatePost updatePostList={updatePostList} />
      </div>
    </div>
);

}

export default AppUser;
