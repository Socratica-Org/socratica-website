<script lang="ts">
    import { onMount } from 'svelte';
    import Globe from '$lib/images/Globe.svg';
    import InstagramLogo from '$lib/images/InstagramLogo.svg';
    import TwitterLogo from '$lib/images/TwitterLogo.svg';
    import YoutubeLogo from '$lib/images/YoutubeLogo.svg';
    import ArrowUpRight from '$lib/images/ArrowUpRight.svg';
    import CircleWavyCheck from '$lib/images/CircleWavyCheck.svg';

    export let id: string;
    export let name: string;
    export let date: string;
    export let location: string;
    export let lumaLink: string;
    export let joinLink: string;
    export let instagramLink: string;

</script>
  
<div id={id} class="hidden flex flex-col items-center justify-center" style="border: 1px solid gray;">
    <div class="w-full text-left">
        <h1 class="text-3xl md:text-5xl text-black font-normal font-tiempos-headline">{name}</h1>
        <div class="-mt-4 mb-8">
            <p class="font-sf-mono text-sm text-[#A09D98]">{location}</p>
        </div>
        <div class="flex items-center gap-2.5 mb-8">
            <a href={joinLink} target="_blank">
                <button class="bg-[#2A2928] py-1 px-3 rounded-full text-white text-xs md:text-sm font-mono border-2 border-[#2A2928] flex items-center justify-center">
                    <img src={ArrowUpRight} alt="Join" class="w-4 h-4 md:w-6 md:h-6 mr-2" />
                    JOIN
                </button>
            </a>
            <a href="https://www.socratica.info/" target="_blank" class="icon-container" style="border-color: #000000;">
                <img src={Globe} alt="Website" class="icon" />
            </a>
            <a href={instagramLink} target="_blank" class="icon-container" style="border-color: #854F6F;">
                <img src={InstagramLogo} alt="Instagram" class="icon" />
            </a>
            <a href="https://twitter.com/socraticainfo" target="_blank" class="icon-container" style="border-color: #649AEA;">
                <img src={TwitterLogo} alt="Twitter" class="icon" />
            </a>
            <a href="https://www.youtube.com/@socraticainfo" target="_blank" class="icon-container" style="border-color: #C6482C;">
                <img src={YoutubeLogo} alt="Youtube" class="icon" />
            </a>
        </div>
    </div>

    <iframe
        title={name}
        src={lumaLink}
        class="w-full md:w-400"
        height="325"
        frameborder="0"
        style="border-radius: 8px; margin: 0 auto; margin-bottom: 20px; background: #F4F5F6; border: 2px solid #CFCCC4;"
        aria-hidden="false"
    ></iframe>

    <button class="bg-[#FFFCF3] py-1 px-3 rounded-full text-xs md:text-sm text-[#2A2928] font-mono border-2 border-dashed border-soft-grey flex items-center justify-center">
        <img src={CircleWavyCheck} alt="Date" class="w-4 h-4 md:w-6 md:h-6 mr-2" />
        {date}
    </button>
</div>

<style>
    @media (max-width: 768px) {
        .icon-container {
            width: 30px;
            height: 30px;
        }
        .icon {
            width: 60%;
        }
    }

    .icon-container {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 38px;
        height: 38px;
        padding: 5px;
        border: 2px solid;
        border-radius: 9999px;
        overflow: hidden;
    }
    .icon {
        display: block;
        width: 80%;
        height: auto;
    }
</style>
