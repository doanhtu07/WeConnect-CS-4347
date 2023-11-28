import axios from "axios";
import {useEffect, useState} from "react";


export default function PostView(){

    const [data, setData] = useState([{
        "postId": -1,
        "authorId": -1,
        "authorName": "",
        "title": "",
        "content": ""
    }])

    useEffect(() => {
        getPosts();
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

    return (
        <div className="pb-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 grid gap-6">
                    <div className="text-gray-900 dark:text-gray-100">
                        {data.map((post) => {return (
                                <p>{post.authorName + " : " + post.content}</p>
                        )})}
                    </div>
                </div>
            </div>
        </div>
    );
}
