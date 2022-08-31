import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';

import React from 'react'

function Widgets() {
  return (
    <div className="px-2 mt-2 col-span-2 hidden lg:inline">
        <div className="items-center flex space-x-2 bg-gray-100 rounded-full p-3">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400"/>
            <input placeholder='Search Nitter' type="text" className="bg-transparent flex-1 outline-none"></input>
        </div>

        <TwitterTimelineEmbed
  sourceType="profile"
  screenName="elonmusk"
  options={{height: 1000}}
/>

    </div>
  )
}

export default Widgets