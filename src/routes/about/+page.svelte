<script>
  import Navbar from "$lib/components/navbar.svelte";
</script>

<div class="block">
  <div class="flex flex-col h-[820px] justify-center bg-primary">
    <!-- <div
      class="absolute top-5 left-7 sm:left-10 w-10 h-10 bg-black rounded-full"
    /> -->
    <Navbar />

    <div class="absolute top-20 left-10 sm:left-20 transform ">
      <a href="/">
        <h1 class="text-2xl font-tiempos-headline">Socratica</h1>
      </a>
    </div>

    <div
      class="absolute w-9/10 md:w-9/10 lg:w-3/5 mt-96 sm:mt-96 md:mt-32 pb-60 md:pb-0"
      style="left: 10%;"
    >
      <h2
        class="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-tiempos-headline"
      >
        For the love of <i>making</i>.
      </h2>

      <div
        class="mt-8 md:mt-16"
        style="font-family: 'Untitled Sans', sans-serif; width: 80%;"
      >
        <p class="text-[11px] md:text-[17px] lg:text-lg leading-relaxed mb-4">
          Great creative work is historically done together, across backgrounds
          and disciplines, in small, high trust groups. This is the foundation
          of boundary pushing work - in engineering, science, art, and more.
        </p>
        <p class="text-[11px] md:text-[17px] lg:text-lg leading-relaxed mb-4">
          On top of that... there are increasingly few, low stakes ways for
          people to make interest, values aligned friends IRL. This is made
          worse by an endless stream of catered consumption.
        </p>
        <p
          class="text-[11px] md:text-[17px] lg:text-lg leading-relaxed mb-4 font-bold"
        >
          It becomes pretty clear that we should do two things: gather and
          create. Socratica aims to help people do both.
        </p>
      </div>
    </div>
  </div>
</div>
