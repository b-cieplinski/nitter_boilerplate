import { CalendarDaysIcon, CheckCircleIcon, FaceSmileIcon, MagnifyingGlassCircleIcon, MapIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Tweet, TweetBody } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'

interface Props {
    setTweets: Dispatch<SetStateAction<Tweet[]>>
}

function TweetBox({setTweets} : Props) {
    const [input, setInput] = useState<string>("")
    const [image, setImage] = useState<string>('')
    const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false)
    const {data: session} = useSession()

    const imageInputRef = useRef<HTMLInputElement>(null)

    const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if(!imageInputRef.current?.value) return;

        setImage(imageInputRef.current.value)
        imageInputRef.current.value = ''
        setImageUrlBoxIsOpen(false)
    }

    const postTweet = async () => {
        const tweetInfo: TweetBody = {
            text: input,
            username: session?.user?.name || "Unknown User",
            profileImg: session?.user?.image || "https://images.unsplash.com/photo-1661459479190-fd1cdad5ffd4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            image: image,
        }

        const result = await fetch(`/api/addTweet`, {
            body: JSON.stringify(tweetInfo),
            method: 'POST',
        })

        const json = await result.json();

        console.log(result)

        const newTweets = await fetchTweets();
        setTweets(newTweets)

        toast('Tweet Posted', {
            icon: <CheckCircleIcon/>
        })
        return json
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault()
        
        postTweet()
        

        setInput('')
        setImage('')
        setImageUrlBoxIsOpen(false)
    }
  return (
    <div className="flex space-x-2 p-5">
        <img src={session?.user?.image || "https://images.unsplash.com/photo-1474073705359-5da2a8270c64?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=784&q=80"} className="h-14 w-14 object-cover rounded-full mt-4"></img>
    <div className="flex-1 items-center flex pl-2">
        <form className="flex flex-1 flex-col">
            <input type="text" placeholder='Whats happening?' className="h-24 w-full text-xl outline-none placeholder:text-xl" value={input} onChange={(e) => setInput(e.target.value)}/>
                <div className="flex items-center">
                    <div className="flex flex-1 space-x-2 text-twitter">
                        {/* Icon */}
                        <PhotoIcon onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)}className="w-5 h-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"/>
                        <MagnifyingGlassCircleIcon className="w-5 h-5"/>
                        <FaceSmileIcon className="w-5 h-5"/>
                        <CalendarDaysIcon className="w-5 h-5"/>
                        <MapIcon className="w-5 h-5"/>
                    </div>
                    <button disabled={!input || !session} onClick={handleSubmit} className="bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40">
                       Post 
                    </button>
                </div>
                {imageUrlBoxIsOpen && (
                    <form className="mt-5 rounded-lg flex bg-twitter py-2 px-4">
                        <input ref={imageInputRef} type="text" placeholder="Enter image URL" className="text-white flex-1 bg-transparent outline-none placeholder:text-white"/>
                        <button className="text-white font-bold" type="submit" onClick={addImageToTweet}>Add image</button>
                    </form>
                )}
                {image && (
                    <img src={image} alt="" className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"/>
                )}
        </form>
        </div>
    </div>
  )
}

export default TweetBox