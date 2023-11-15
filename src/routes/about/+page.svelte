<script>
    import MapTrifold from '$lib/images/MapTrifold.png';
    import Eye from '$lib/images/Eye.png';
    import DarkHouse from '$lib/images/DarkHouse.png';
</script>

<div class="flex flex-col h-screen justify-center bg-primary">
    <div class="absolute top-5 left-10 w-10 h-10 bg-black rounded-full" />
    <div class="absolute top-5 right-5 flex flex-col space-y-2 items-end">
        <a href="/" class="bg-primary py-2 px-2.5 rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 w-[95px]">
            <img src={DarkHouse} alt="Users" class="w-6 h-6" />
            <span>HOME</span>
        </a>
        <a href="/map" class="bg-primary py-2 px-2.5 rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 w-[85px]">
            <img src={MapTrifold} alt="Map" class="w-6 h-6" />
            <span>MAP</span>
        </a>
        <a href="/get-involved" class="bg-primary py-2 px-2.5 rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2">
            <img src={Eye} alt="Eye" class="w-6 h-6" />
            <span>GET INVOLVED</span>
        </a>
    </div>

    <div class="absolute top-5 left-1/2 transform -translate-x-1/2">
        <h1 class="text-2xl font-tiempos-headline">Socratica</h1>
    </div>

    <div class="absolute w-3/5 mt-32" style="left: 10%;">
        <h2 class="text-6xl font-tiempos-headline">We’re in the business of helping good people do great things.</h2>
        
        <div class="mt-16 italic" style="font-family: 'Untitled Sans', sans-serif; width: 80%;">
            <p class="text-lg leading-relaxed mb-4">
                Ah, dear Seekers of Productivity and Pursuers of Passion! Gather 'round, for I present to you a grandiloquent proclamation, an opus of eloquence, a magnum opus if you will, extolling the virtues of a hallowed sanctuary for the enlightened minds of our time - none other than the illustrious "Socratica"!
            </p>
            <p class="text-lg leading-relaxed mb-4">
                In this hallowed hall of collaboration, where fervent flames of creativity dance merrily with the cool waters of contemplation, we offer unto you a resplendent oasis of productivity. Fear not, dear reader, for you are not alone in your quest to tame the unruly beasts of your passions! For here, amidst the congeniality of fellow enthusiasts, you shall find solace in the collective endeavour.
            </p>
        </div>
    </div>
</div>