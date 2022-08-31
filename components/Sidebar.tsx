import React from 'react';
import {BellIcon, HashtagIcon, BookmarkIcon, EllipsisHorizontalIcon, EnvelopeIcon, UserIcon, HomeIcon, RectangleStackIcon} from '@heroicons/react/24/solid';
import SidebarRow from './SidebarRow';
import { signIn, signOut, useSession } from 'next-auth/react';

function Sidebar() {
  const { data: session } = useSession()
  return (
    <div className="flex flex-col col-span-2 items-center px-4 md:items-start">
<img src="https://ra.ac.ae/wp-content/uploads/2020/01/logo-twitter-icon-symbol-0.png" className="h-10 w-10 m-3"/>
<SidebarRow Icon={HomeIcon} title="Home"/>
<SidebarRow Icon={HashtagIcon} title="Explore"/>
<SidebarRow Icon={BellIcon} title="Notifications"/>
<SidebarRow Icon={EnvelopeIcon} title="Messages"/>
<SidebarRow Icon={BookmarkIcon} title="Bookmarks"/>
<SidebarRow Icon={RectangleStackIcon} title="Lists"/>

<SidebarRow onClick={session ? signOut : signIn} Icon={UserIcon} title={session ? 'Sign Out' : 'Sign In'}/>
<SidebarRow Icon={EllipsisHorizontalIcon} title="More"/>
    </div>
  )
}

export default Sidebar