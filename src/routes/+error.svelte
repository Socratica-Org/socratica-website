<script>    
    import UsersThree from '$lib/images/UsersThree.png';
    import MapTrifold from '$lib/images/MapTrifold.png';
    import DarkHouse from '$lib/images/DarkHouse.png';
    import House from '$lib/images/House.png';
    import GreenGuy from '$lib/images/GreenGuy.png';
    import OrangeGuy from '$lib/images/OrangeGuy.png';
    import YellowGuy from '$lib/images/YellowGuy.png';
    import BlueGuy from '$lib/images/BlueGuy.png';
    import PurpleGuy from '$lib/images/PurpleGuy.png';
    import PinkGuy from '$lib/images/PinkGuy.png';
    import BeigeGuy from '$lib/images/BeigeGuy.png';
    import Eye from '$lib/images/Eye.png';

</script>

<div class="flex flex-col h-screen justify-center bg-primary">
    <div class="absolute top-5 left-7 sm:left-10 w-10 h-10 bg-black rounded-full" />
    <div class="absolute top-5 right-5 flex flex-col space-y-2 items-end">
        <a href="/" class="bg-white md:bg-primary py-2 px-2.5 text-[10px] text-xs md:text-sm rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out">
            <img src={DarkHouse} alt="home" class="w-4 h-4 md:w-6 md:h-6" />
            <span>HOME</span>
        </a>
        <a href="/about" class="bg-white md:bg-primary py-2 px-2.5 text-[10px] text-xs md:text-sm rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out">
            <img src={UsersThree} alt="Users" class="w-4 h-4 md:w-6 md:h-6" />
            <span>ABOUT</span>
        </a>
        <a href="/map" class="bg-white md:bg-primary py-2 px-2.5  text-[10px] text-xs md:text-sm rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out">
            <img src={MapTrifold} alt="Map" class="w-4 h-4 md:w-6 md:h-6" />
            <span>MAP</span>
        </a>
        <a href="/get-involved" class="bg-white md:bg-primary py-2 px-2.5  text-[10px] text-xs md:text-sm rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out">
            <img src={Eye} alt="Eye" class="w-4 h-4 md:w-6 md:h-6" />
            <span>GET INVOLVED</span>
        </a>
    </div>

    <div class="absolute top-5 left-1/2 transform -translate-x-1/2">
        <a href="/">
            <h1 class="text-2xl font-tiempos-headline">Socratica</h1>
        </a>
    </div>

    <div class="flex flex-col items-center absolute w-full" style="top: 40%;">
        <h2 class="text-[23px] mt-5 sm:text-4xl md:text-5xl font-tiempos-headline z-10">Stiiiiill building this. (maybe)</h2>
        <p class="text-md md:text-xl font-tiempos-headline mt-4 md:mt-8">The page you’re looking for doesn’t exist.</p>
        <a href="/" class="transition text-xs md:text-base bg-[#2A2928] mt-12 md:mt-16 py-4 px-8 rounded-full border border-cool-grey hover:bg-[#706F6B] font-mono inline-flex items-center space-x-2 min-w-[150px] text-white" style="font-family: 'SF Mono', monospace;">
            <img src={House} alt="Home" class="w-4 h-4 md:w-6 md:h-6" />
            <span>BACK TO HOME</span>
        </a>
    </div>
    

    <!-- <img src={GreenGuy} alt="Green Character" class="absolute" style="top: 5%; left: 15%; transform: scale(0.6);" />
    <img src={OrangeGuy} alt="Orange Character" class="absolute" style="top: 5%; left: 43%; transform: scale(0.6);" />
    <img src={YellowGuy} alt="Yellow Character" class="absolute" style="top: 14%; left: 66%; transform: scale(0.5);" /> -->

    <img src={GreenGuy} alt="Green Character" class="absolute      top-[5%] right-[50%] transform scale-[0.27]      md:top-[5%] lg:left-[15%] md:transform-scale-[0.6]" />
    <img src={OrangeGuy} alt="Orange Character" class="absolute   top-[5%] left-[10%] transform scale-[0.4]        md:top-[5%] lg:left-[43%] md:transform-scale-[0.6]" />
    <img src={YellowGuy} alt="Yellow Character" class="absolute     top-[12%] left-[60%] transform scale-[0.4]   md:top-[14%] lg:left-[66%] md:transform-scale-50" />

    <!-- <img src={BlueGuy} alt="Blue Character" class="absolute" style="top: 45%; left: 15%; transform: scale(0.5);" />
    <img src={PurpleGuy} alt="Purple Character" class="absolute" style="top: 52%; left: 23%; transform: scale(0.55);" />
    <img src={PinkGuy} alt="Pink Character" class="absolute" style="top: 61%; left: 54%; transform: scale(0.55);" />
    <img src={BeigeGuy} alt="Beige Character" class="absolute" style="top: 41.5%; left: 67.5%; transform: scale(0.55);" /> -->
    
    <img src={BlueGuy} alt="Blue Character" class="absolute   top-[47%] right-[63%] transform scale-[0.4]        md:top-[45%] md:left-[15%] md:transform-scale-50" />
    <img src={PurpleGuy} alt="Purple Character" class="absolute   top-[60%] right-[40%] transform scale-[0.27]           md:top-[52%] md:left-[23%] md:transform-scale-55" />
    <img src={PinkGuy} alt="Pink Character" class="absolute    top-[65%] left-[30%] transform scale-[0.4]          md:top-[61%] md:left-[54%] md:transform-scale-55" />
    <img src={BeigeGuy} alt="Beige Character" class="absolute  top-[40.5%] left-[52%] transform scale-[0.27]            md:top-[41.5%] md:left-[67.5%] md:transform-scale-55" />

</div>