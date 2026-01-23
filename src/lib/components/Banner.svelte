<script lang="ts">
  import ArrowUpRight from "$lib/images/ArrowUpRight.svg";
  import s26wLogo from "$lib/images/s26w-logo.avif";

  const BANNER_URL = "http://symposium.socratica.info/?utm_source=website";
</script>

<div class="w-full bg-[#2A2928] text-[#FBF8EF] font-tiempos-headline">
  <a
    href={BANNER_URL}
    target="_blank"
    class="banner:hidden mx-auto max-w-screen-xl px-4 py-3 flex items-start justify-between gap-3 text-sm font-[300]"
  >
    <span class="min-w-0 flex items-start gap-2">
      <img
        src={s26wLogo}
        class="h-5 w-auto flex-shrink-0 self-start"
        loading="lazy"
        decoding="async"
        alt=""
        aria-hidden
      />
      <span class="min-w-0">
        The world's greatest celebration of <i>making</i> is back.
      </span>
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
  <div
    class="hidden banner:grid mx-auto max-w-screen-xl px-4 py-3 banner:py-4 grid-cols-1 banner:grid-cols-[1fr_auto_1fr] items-center gap-2 banner:gap-6 text-center"
  >
    <div class="text-sm banner:text-lg font-[300] banner:text-left">
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
      class="text-sm banner:text-lg flex flex-col banner:flex-row items-center banner:justify-end banner:text-right"
    >
      <span><b>March 21-22</b> | Waterloo |&#32;</span>
      <a
        href={BANNER_URL}
        target="_blank"
        class="text-[#FBF8EF] hover:opacity-90 transition-opacity duration-200 inline-flex"
        >Register for Symposium here.<img
          src={ArrowUpRight}
          class="w-6 h-6 relative top-[0.1em]"
          loading="lazy"
          decoding="async"
          alt=""
          aria-hidden
        /></a
      >
    </div>
  </div>
</div>
