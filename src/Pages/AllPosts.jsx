import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../Appwrite/config'
import { set } from 'react-hook-form'

function AllPosts() {
    const [posts, setposts] = useState([])

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setposts(posts.documents)
            }
        })
    }, [])

    return (
        <div className='w-full py-8 '>
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4 ' >
                            <PostCard {...post} /> 
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )

}

export default AllPosts