<script>    
    import UsersThree from '$lib/images/UsersThree.png';
    import MapTrifold from '$lib/images/MapTrifold.png';
    import Eye from '$lib/images/Eye.png';
    import House from '$lib/images/House.png';
    import GreenGuy from '$lib/images/GreenGuy.png';
    import OrangeGuy from '$lib/images/OrangeGuy.png';
    import YellowGuy from '$lib/images/YellowGuy.png';
    import BlueGuy from '$lib/images/BlueGuy.png';
    import PurpleGuy from '$lib/images/PurpleGuy.png';
    import PinkGuy from '$lib/images/PinkGuy.png';
    import BeigeGuy from '$lib/images/BeigeGuy.png';

</script>

<div class="flex flex-col h-screen justify-center bg-primary">
    <div class="absolute top-5 left-10 w-10 h-10 bg-black rounded-full" />
    <div class="absolute top-5 right-5 flex flex-col space-y-2 items-end">
        <a href="/about" class="bg-primary py-2 px-2.5 rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 w-[105px]">
            <img src={UsersThree} alt="Users" class="w-6 h-6" />
            <span>ABOUT</span>
        </a>
        <a href="/map" class="bg-primary py-2 px-2.5 rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 w-[85px]">
            <img src={MapTrifold} alt="Map" class="w-6 h-6" />
            <span>MAP</span>
        </a>
        <a href="/" class="bg-primary py-2 px-2.5 rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2">
            <img src={Eye} alt="Eye" class="w-6 h-6" />
            <span>GET INVOLVED</span>
        </a>
    </div>

    <div class="absolute top-5 left-1/2 transform -translate-x-1/2">
        <h1 class="text-2xl font-tiempos-headline">Socratica</h1>
    </div>

    <div class="flex flex-col items-center absolute w-full" style="top: 40%;">
        <h2 class="text-5xl font-tiempos-headline">Stiiiiill building this. (maybe)</h2>
        <p class="text-xl font-tiempos-headline mt-8">The page you’re looking for doesn’t exist.</p>
        <a href="/" class="bg-[#2A2928] mt-16 py-4 px-8 rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 min-w-[150px] text-white" style="font-family: 'SF Mono', monospace;">
            <img src={House} alt="Home" class="w-6 h-6" />
            <span>BACK TO HOME</span>
        </a>
    </div>
    

    <img src={GreenGuy} alt="Green Character" class="absolute" style="top: 5%; left: 15%; transform: scale(0.6);" />
    <img src={OrangeGuy} alt="Orange Character" class="absolute" style="top: 5%; left: 43%; transform: scale(0.6);" />
    <img src={YellowGuy} alt="Yellow Character" class="absolute" style="top: 14%; left: 66%; transform: scale(0.5);" />

    <img src={BlueGuy} alt="Blue Character" class="absolute" style="top: 45%; left: 15%; transform: scale(0.5);" />
    <img src={PurpleGuy} alt="Purple Character" class="absolute" style="top: 52%; left: 23%; transform: scale(0.55);" />
    <img src={PinkGuy} alt="Pink Character" class="absolute" style="top: 61%; left: 54%; transform: scale(0.55);" />
    <img src={BeigeGuy} alt="Beige Character" class="absolute" style="top: 41.5%; left: 67.5%; transform: scale(0.55);" />
    
</div>