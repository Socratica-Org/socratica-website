<script lang="ts">
  import Navbar from "$lib/components/navbar.svelte";
  import { initializeApp } from "firebase/app";
  import { getAnalytics } from "firebase/analytics";
  import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    addDoc,
  } from "firebase/firestore";
  import { onMount } from "svelte";

  import GreenGuy from "$lib/images/GreenGuy.png";
  import OrangeGuy from "$lib/images/OrangeGuy.png";
  import YellowGuy from "$lib/images/YellowGuy.png";
  import BlueGuy from "$lib/images/BlueGuy.png";
  import PurpleGuy from "$lib/images/PurpleGuy.png";
  import PinkGuy from "$lib/images/PinkGuy.png";
  import BeigeGuy from "$lib/images/BeigeGuy.png";

  onMount(() => {
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_API_KEY,
      authDomain: import.meta.env.VITE_AUTH_DOMAIN,
      databaseURL: import.meta.env.VIT_DATABASE_URL,
      projectId: import.meta.env.VITE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_APP_ID,
      measurementId: import.meta.env.VITE_MEASUREMENT_ID,
    };
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
  });
</script>

<div class="block">
  <div class="flex flex-col h-[820px] justify-center bg-primary">
    <div
      class="absolute top-5 left-7 sm:left-10 w-10 h-10 bg-black rounded-full"
    />
    <Navbar />

    <div class="absolute top-5 left-1/2 transform -translate-x-1/2">
      <a href="/">
        <h1 class="text-2xl font-tiempos-headline">Socratica</h1>
      </a>
    </div>

    <div>
      <div>
        <div class="flex flex-col items-center w-full">
          <h2
            class="text-[45px] mt-5 sm:text-5xl md:text-5xl font-tiempos-headline z-10"
          >
            Emotional Investor Update
          </h2>
        </div>
        <div class="mt-5 text-lg">
          <p>Hi!</p>
          <p>
            It has been a fun and wild 4 months. There are inevitably things we
            fail to capture in these updates - it’s hard to measure the
            confidence built or friendships made - but here’s what we’ve been up
            to!
          </p>
          <h2 class="mt-5 text-xl font-bold">Sessions</h2>
          <ul class="list-disc ml-5">
            <li>
              There was too much demand. For the first time, we experimented
              with 2 weekly sessions. In total, we had 763 unique attendees
              across all events!
            </li>
            <li>
              It was our most diverse term yet, in many ways. We’ve had the most
              balanced ratio of technical to non-technical projects, and also
              our best gender ratio yet.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

<img
  src={GreenGuy}
  alt="Green Character"
  class="absolute top-[5%] right-[45%] transform scale-[0.27] md:top-[5%] lg:left-[15%] md:transform-scale-[0.6]"
/>
<img
  src={OrangeGuy}
  alt="Orange Character"
  class="absolute top-[5%] left-[15%] transform scale-[0.4] md:top-[5%] lg:left-[43%] md:transform-scale-[0.6]"
/>
<img
  src={YellowGuy}
  alt="Yellow Character"
  class="absolute top-[16%] left-[72%] transform scale-[0.4] md:top-[14%] lg:left-[66%] md:transform-scale-50"
/>

<img
  src={BlueGuy}
  alt="Blue Character"
  class="absolute top-[47%] right-[58%] transform scale-[0.4] md:top-[45%] md:left-[15%] md:transform-scale-50"
/>
<img
  src={PurpleGuy}
  alt="Purple Character"
  class="absolute top-[60%] right-[35%] transform scale-[0.27] md:top-[52%] md:left-[23%] md:transform-scale-55"
/>
<img
  src={PinkGuy}
  alt="Pink Character"
  class="absolute top-[65%] left-[35%] transform scale-[0.4] md:top-[61%] md:left-[54%] md:transform-scale-55"
/>
<img
  src={BeigeGuy}
  alt="Beige Character"
  class="absolute top-[40.5%] left-[63%] transform scale-[0.27] md:top-[41.5%] md:left-[67.5%] md:transform-scale-55"
/>
