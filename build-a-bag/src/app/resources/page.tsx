import React from 'react';

export default function Resources() {
  const resources = [
    { name: 'PGA Tour', url: 'https://www.pgatour.com' },
    { name: 'Golf Digest', url: 'https://www.golfdigest.com' },
    { name: 'USGA', url: 'https://www.usga.org' },
    { name: 'Golf Channel', url: 'https://www.golfchannel.com' },
    { name: 'R&A', url: 'https://www.randa.org' },
    { name: 'Golfweek', url: 'https://www.golfweek.usatoday.com' },
    { name: 'European Tour', url: 'https://www.europeantour.com' },
    { name: 'Golf Monthly', url: 'https://www.golfmonthly.com' },
    { name: 'MyGolfSpy', url: 'https://www.mygolfspy.com' },
    { name: 'GolfWRX', url: 'https://www.golfwrx.com' },
    { name: 'National Golf Foundation', url: 'https://www.ngf.org' },
    { name: 'The Open', url: 'https://www.theopen.com' },
    { name: 'Topgolf', url: 'https://www.topgolf.com' },
    { name: 'GolfPass', url: 'https://www.golfpass.com' },
    { name: 'Golf.com', url: 'https://www.golf.com' },
  ];

  return (
    <>
    <div className="flex flex-col min-h-screen bg-[#e7e7e7] p-8">
      <main className="flex-1 flex flex-col items-center py-10 px-4 z-10">
        <div className="bg-white shadow-lg rounded-2xl min-w-full max-w-3xl p-8 opacity-80">
          <ul className="space-y-4">
            {resources.map((resource, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 font-bold text-lg hover:underline"
                >
                  {resource.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
    <div className="absolute inset-0 z-0 flex justify-end items-center -rotate-45 mt-[50vh]">
        <img
          className="w-[30vw] mr-20 opacity-15 z-0"
          src="logo.svg"
          alt="Golf Bag Logo"
        />
      </div>
    </>
  );
}
