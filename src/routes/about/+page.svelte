<script>
    import MapTrifold from '$lib/images/MapTrifold.png';
    import Eye from '$lib/images/Eye.png';
    import DarkHouse from '$lib/images/DarkHouse.png';
    import UsersThree from '$lib/images/UsersThree.png';
</script>

<div class="block">
<div class="flex flex-col h-[820px] justify-center bg-primary">
    <div class="absolute top-5 left-7 sm:left-10 w-10 h-10 bg-black rounded-full" />
    <div class="absolute top-5 right-5 flex flex-col space-y-2 items-end">
        <a href="/" class="bg-white md:bg-primary py-2 px-2.5 text-[10px] text-xs md:text-sm rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out">
            <img src={DarkHouse} alt="home" class="w-4 h-4 md:w-6 md:h-6" />
            <span>HOME</span>
        </a>
        <a href="/about" class="cursor-not-allowed opacity-50 bg-cool-grey py-2 px-2.5 text-[10px] text-xs md:text-sm rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out">
            <img src={UsersThree} alt="Users" class="w-4 h-4 md:w-6 md:h-6" />
            <span>ABOUT</span>
        </a>
        <a href="/map" class="bg-white md:bg-primary py-2 px-2.5 text-[10px] text-xs md:text-sm rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out">
            <img src={MapTrifold} alt="Map" class="w-4 h-4 md:w-6 md:h-6" />
            <span>MAP</span>
        </a>
        <a href="/get-involved" class="bg-white md:bg-primary py-2 px-2.5 text-[10px] text-xs md:text-sm rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out">
            <img src={Eye} alt="Eye" class="w-4 h-4 md:w-6 md:h-6" />
            <span>GET INVOLVED</span>
        </a>
    </div>

    <div class="absolute top-5 left-1/2 transform -translate-x-1/2">
        <a href="/">
            <h1 class="text-2xl font-tiempos-headline">Socratica</h1>
        </a>
    </div>

    <div class="absolute w-9/10 md:w-9/10 lg:w-3/5 mt-96  sm:mt-96 md:mt-32 pb-60 md:pb-0" style="left: 10%;">
        <h2 class="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-tiempos-headline">We’re in the business of helping good people do great things.</h2>
        
        <div class="mt-8 md:mt-16 italic" style="font-family: 'Untitled Sans', sans-serif; width: 80%;">
            <p class="text-[11px] md:text-[17px] lg:text-lg leading-relaxed mb-4">
                Great creative work is historically done together, across backgrounds and disciplines, in small, high trust groups. This is the foundation of boundary pushing work - in engineering, science, art, and more.
            </p>
            <p class="text-[11px] md:text-[17px] lg:text-lg leading-relaxed mb-4">
               There are increasingly few, low stakes ways for people to make interest, values aligned friends IRL. This is made worse by an endless stream of catered consumption.
            </p>
            <p class="text-[11px] md:text-[17px] lg:text-lg leading-relaxed mb-4">
              It becomes pretty clear that we should do two things: gather and create. Socratica aims to help people do both.
            </p>
        </div>
    </div>
</div>
</div>