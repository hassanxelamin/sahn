import React, { useState, useEffect } from 'react';

const Topbar = () => {
  const [location, setLocation] = useState('San Diego, CA');
  const [dateTime, setDateTime] = useState({
    date: 'Fri 25 Aug',
    time: '01:26AM'
  });

  useEffect(() => {
    // Fetch location based on IP address using ipstack
    const fetchLocation = async () => {
      try {
        
        const API_KEY = process.env.NEXT_PUBLIC_IPSTACK_API_KEY;
        const response = await fetch(`http://api.ipstack.com/check?access_key=${API_KEY}`);
        const data = await response.json();

        if (data && data.city && data.region_code) {
          setLocation(`${data.city}, ${data.region_code}`);
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchLocation();

    // Set the local date and time
    const updateDateTime = () => {
      const currentDate = new Date();
      setDateTime({
        date: new Intl.DateTimeFormat('en-US', { weekday: 'short', day: 'numeric', month: 'short' }).format(currentDate),
        time: new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).format(currentDate)
      });
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000); // Update every minute

    return () => clearInterval(interval); // Clear the interval when the component unmounts

  }, []);

  return (
    <div className='w-full h-[30px] bg-custom-blue backdrop-blur backdrop-brightness font-styrene text-white text-[1rem] sm:text-[1.2rem] mb-[20px]'>
    <div className='w-full h-full flex justify-between items-center px-[20px]'>
        <div className='font-bold'>🎈SAHN</div>
        <div className='flex gap-x-[0.8rem] sm:gap-x-[1.5rem]'>
            <div>{location}</div>
            <div>{dateTime.date}</div>
            <div>{dateTime.time}</div>
        </div>
    </div>
</div>
  )
}

export default Topbar;