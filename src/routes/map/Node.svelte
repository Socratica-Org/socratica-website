<script lang="ts">
  import ArrowUpRight from "$lib/images/ArrowUpRight.svg";
  import CircleWavyCheck from "$lib/images/CircleWavyCheck.svg";
  import Globe from "$lib/images/Globe.svg";
  import InstagramLogo from "$lib/images/InstagramLogo.svg";
  import TwitterLogo from "$lib/images/TwitterLogo.svg";
  import YoutubeLogo from "$lib/images/YoutubeLogo.svg";

  export let id: string;
  export let name: string;
  export let date: string;
  export let location: string | undefined;
  export let lumaLink: string | undefined;
  export let joinLink: string | undefined;
  export let websiteLink: string | undefined;
  export let instagramLink: string | undefined;
  export let twitterLink: string | undefined;
  export let youtubeLink: string | undefined;
  export let imageSrc: string | undefined;

  let placeholderIndex = 0;
  function getNextPlaceholder() {
    placeholderIndex = (placeholderIndex % 6) + 1;
    return `/img-ppl/placeholder_${placeholderIndex}.png`;
  }
</script>

<div
  {id}
  class="hidden flex flex-col items-center justify-center"
  style="border: 1px solid gray;"
>
  <div class="w-full text-left">
    <h1
      class="text-3xl md:text-5xl text-black font-normal font-tiempos-headline"
    >
      {name}
    </h1>
    <div class="-mt-4 mb-8">
      <p class="font-sf-mono text-sm text-[#A09D98]">{location}</p>
    </div>
    <div class="flex items-center gap-2.5 mb-8">
      {#if joinLink}
        <a href={joinLink} target="_blank">
          <button
            class="bg-[#2A2928] py-1 px-3 rounded-full text-white text-sm font-mono border-2 border-[#2A2928] flex items-center justify-center"
          >
            <img
              src={ArrowUpRight}
              alt="Join"
              class="w-4 h-4 md:w-6 md:h-6 mr-2"
            />
            JOIN
          </button>
        </a>
      {/if}
      {#if websiteLink}
        <a
          href={websiteLink}
          target="_blank"
          class="icon-container"
          style="border-color: #000000;"
        >
          <img src={Globe} alt="Website" class="icon" />
        </a>
      {/if}
      {#if instagramLink}
        <a
          href={instagramLink}
          target="_blank"
          class="icon-container"
          style="border-color: #854F6F;"
        >
          <img src={InstagramLogo} alt="Instagram" class="icon" />
        </a>
      {/if}
      {#if twitterLink}
        <a
          href={twitterLink}
          target="_blank"
          class="icon-container"
          style="border-color: #000;"
        >
          <img src={TwitterLogo} alt="Twitter" class="icon" />
        </a>
      {/if}
      {#if youtubeLink}
        <a
          href={youtubeLink}
          target="_blank"
          class="icon-container"
          style="border-color: #C6482C;"
        >
          <img src={YoutubeLogo} alt="Youtube" class="icon" />
        </a>
      {/if}
    </div>
  </div>

  {#if lumaLink}
    <iframe
      title={name}
      src={lumaLink}
      class="w-full md:w-400"
      height="350"
      frameborder="0"
      style="border-radius: 8px; margin: 0 auto; margin-bottom: 20px; background: #F4F5F6; border: 2px solid #CFCCC4;"
      aria-hidden="false"
    />
  {:else if imageSrc}
    <img
      src={imageSrc}
      alt="socratica node preview"
      class="w-full md:w-400"
      style="border-radius: 8px; margin: 0 auto; margin-bottom: 20px; background: #F4F5F6; border: 2px solid #CFCCC4;"
      aria-hidden="false"
      height="350"
    />
  {/if}

  <button
    class="bg-[#FFFCF3] py-1 px-3 rounded-full text-xs md:text-sm text-[#2A2928] font-mono border-2 border-dashed border-soft-grey flex items-center justify-center uppercase"
  >
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
