<script lang="ts">
  import ArrowUpRight from "$lib/images/ArrowUpRight.svg";
  import s26wLogo from "$lib/images/s26w-logo.avif";

  const BANNER_URL = "http://symposium.socratica.info/?utm_source=website";
</script>

<div class="w-full bg-black text-[#FBF8EF] font-tiempos-headline">
  <a
    href={BANNER_URL}
    target="_blank"
    class="banner:hidden mx-auto max-w-screen-xl px-4 py-3 flex items-start justify-between gap-3 text-[12px] font-[300]"
  >
    <img
      src={s26wLogo}
      class="h-5 w-auto flex-shrink-0 self-start"
      loading="lazy"
      decoding="async"
      alt=""
      aria-hidden
    />
    <span class="min-w-0 flex-1 text-center self-center">
      The world's greatest celebration of <i>making</i> is back.
    </span>
    <img
      src={ArrowUpRight}
      class="w-5 h-5 flex-shrink-0 self-start"
      loading="lazy"
      decoding="async"
      alt=""
      aria-hidden
    />
  </a>
  <a
    href={BANNER_URL}
    target="_blank"
    class="hidden banner:flex mx-auto max-w-screen-xl px-4 py-3 banner:py-4 items-center justify-between gap-2 banner:gap-6 hover:opacity-90 transition-opacity duration-200"
  >
    <div
      class="text-sm banner:text-lg font-[300] banner:text-left whitespace-nowrap"
    >
      The world's greatest celebration of <i>making</i> is back.
    </div>
    <img
      src={s26wLogo}
      class="h-7 banner:h-8 w-auto"
      loading="lazy"
      decoding="async"
      alt=""
      aria-hidden
    />
    <div
      class="text-sm banner:text-lg flex flex-col banner:flex-row items-center banner:justify-end banner:text-right whitespace-nowrap"
    >
      <span><b>March 21-22</b> | Waterloo | Register for Symposium here.</span>
      <img
        src={ArrowUpRight}
        class="w-6 h-6 ml-1"
        loading="lazy"
        decoding="async"
        alt=""
        aria-hidden
      />
    </div>
  </a>
</div>
