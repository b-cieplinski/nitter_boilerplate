import { ArrowPathIcon, ArrowUturnDownIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Tweet } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'
import Tweetcomponent from './Tweet'
import TweetBox from './TweetBox'

interface Props {
  tweets: Tweet[]
}

function Feed({tweets: tweetsProp}: Props) {

  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp)

  const handleRefresh = async () => {
    const refreshToast = toast.loading("Refreshing...")
    const tweets = await fetchTweets()
    setTweets(tweets)

    toast.success('Feed Updated', {
      id: refreshToast
    })
  }
  return (
    <div className="col-span-7 lg:col-span-5 border-x max-h-screen overflow-scroll">
    <div className="flex items-center justify-between">
        <h1 className="font-bold p-5 pb-0 text-xl">Home</h1>
        <ArrowPathIcon onClick={handleRefresh} className="w-8 h-8 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125"/>
    </div>

    {/* NeetBox */}
    <div className="scroll-y-auto">
        <TweetBox setTweets={setTweets}/>
    </div>

      <div>
{tweets.map(tweet => (
  <Tweetcomponent key={tweet._id} tweet={tweet}/>
))}
      </div>

    </div>
  )
}

export default Feed