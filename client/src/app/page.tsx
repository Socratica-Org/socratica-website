import Navbar from './components/Navbar';

export default function Home() {
  return (
    <div className="h-screen bg-primary flex">
      <div className="w-full relative mt-5">
        <div className="absolute left-5 flex space-x-4">
          <img src="/images/logo.svg" alt="Socratica" className="w-8 h-8" />
          <h2 className="text-2xl font-tiempos">Socratica</h2>
        </div>
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-tiempos">
          For the love of <i>making.</i>
        </h1>
        <Navbar />
      </div>
    </div>
  );
}


// import React from 'react';

// export default function Home() {
//   return (
//     <div className="h-screen bg-primary flex items-center justify-center">
//       <div className="flex items-center space-x-4">
//         <img src="/images/logo.svg" alt="Socratica" className="w-8 h-8" />
//         <span className="text-lg font-bold">Socratica</span>
//         <h1 className="text-2xl font-tiempos">
//           For the love of <i>making.</i>
//         </h1>
//         <span className="text-lg font-semibold">Menu</span>
//       </div>
//     </div>
//   );
// }

