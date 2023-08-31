'use client'

import Browsers from '@/src/components/browser/browsers';
import Taskbar from '@/src/components/taskbar/taskbar';
import Topbar from '@/src/components/top-bar/top-bar';

export default function Home() {

  return (
    <main className="h-screen w-screen bg-neutral-200 relative">
      <div className='w-screen h-screen flex flex-col items-center justify-center sm:overflow-hidden overflow-x-hidden'>
          <div className="w-full md:static sticky top-0 z-50">
              <Topbar />
          </div>
          <Browsers />
          <div className='z-20' style={{ position: 'fixed', bottom: '0', left: '0', right: '0' }}>
            <Taskbar />
          </div>
      </div>
    </main>
  )
}
