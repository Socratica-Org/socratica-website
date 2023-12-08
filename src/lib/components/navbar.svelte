<script>
    import { onMount } from 'svelte';
    import DarkHouse from '$lib/images/DarkHouse.png';
    import UsersThree from '$lib/images/UsersThree.png';
    import MapTrifold from '$lib/images/MapTrifold.png';
    import Eye from '$lib/images/Eye.png';
    import Heart from '$lib/images/Heart.png';

    let currentPath = '';

    onMount(() => {
        currentPath = window.location.pathname;
    });
</script>

<div class="absolute top-1 right-1 md:top-5 md:right-5 flex flex-col space-y-1 md:space-y-2 items-end z-40">
    <a href="/" 
       class:opacity-50={currentPath === '/'} 
       class:cursor-not-allowed={currentPath === '/'} 
       class:bg-cool-grey={currentPath === '/'} 
       class="z-40 bg-primary py-2 px-2.5 text-xs md:text-sm rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out">
        <img src={DarkHouse} alt="Home" class="w-4 h-4 md:w-6 md:h-6" />
        <span>HOME</span>
    </a>
    <a href="/about" 
       class:opacity-50={currentPath === '/about'} 
       class:cursor-not-allowed={currentPath === '/about'} 
       class:bg-cool-grey={currentPath === '/about'} 
       class="z-40 bg-primary py-2 px-2.5 text-xs md:text-sm rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out">
        <img src={UsersThree} alt="About" class="w-4 h-4 md:w-6 md:h-6" />
        <span>ABOUT</span>
    </a>
    <a href="/map" 
       class:opacity-50={currentPath === '/map'} 
       class:cursor-not-allowed={currentPath === '/map'} 
       class:bg-cool-grey={currentPath === '/map'} 
       class="z-40 bg-primary py-2 px-2.5 text-xs md:text-sm rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out">
        <img src={MapTrifold} alt="Map" class="w-4 h-4 md:w-6 md:h-6" />
        <span>MAP</span>
    </a>
    <a href="/get-involved" 
       class:opacity-50={currentPath === '/get-involved'} 
       class:cursor-not-allowed={currentPath === '/get-involved'} 
       class:bg-cool-grey={currentPath === '/get-involved'} 
       class="z-40 bg-primary py-2 px-2.5 text-xs md:text-sm rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out">
        <img src={Eye} alt="Get Involved" class="w-4 h-4 md:w-6 md:h-6" />
        <span>GET INVOLVED</span>
    </a>
    <a href="https://donate.stripe.com/5kA6qZcondXE8Te008" target="_blank"
       class="z-40 bg-primary py-2 px-2.5 text-xs md:text-sm rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out">
        <img src={Heart} alt="Donate" class="w-4 h-4 md:w-6 md:h-6" />
        <span>DONATE</span>
    </a>
</div>
