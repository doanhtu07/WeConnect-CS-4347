import axios from "axios";
import {useEffect, useState} from "react";
import {User} from "@/types";


export default function PostView(
    props:{user:User}
){

    const [data, setData] = useState([{
        "postId": -1,
        "authorId": -1,
        "authorName": "",
        "title": "",
        "content": "",
        "comments": [{authorName: "", content: ""}]
    }])
    const [followData, setFollowData] = useState([-1])

    useEffect(() => {
        getPosts();
        getFollows();
    }, []);


    const getPosts = () => {
        axios
            .get('/api/get-all-posts', {
                data: data,
            })
            .then((res) => {
                console.log(res);
                setData(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const getFollows = () => {
        axios
            .post('/api/follows', {
                data: {id: props.user.id},
            })
            .then((res) => {
                console.log(res);
                setFollowData(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <div className="pb-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 grid gap-6">
                    <div className="text-gray-900 dark:text-gray-100">
                        {data.map((post) => {return (
                            <div>
                                {
                                    followData.includes(post.authorId) ?
                                        <p>{post.authorName} (Followed)</p> :
                                        <p>{post.authorName}</p>
                                }
                                <p>{post.title}</p>
                                <p>{post.content}</p>
                                <p>Comments:</p>
                                {post.comments.map((comment) => {return (
                                    <p>{"--- " + comment.authorName + " : " + comment.content}</p>
                                )})}
                                <br/>
                            </div>
                        )})}
                    </div>
                </div>
            </div>
        </div>
    );
}
