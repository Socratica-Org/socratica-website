<script lang="ts">
  import { onMount } from "svelte";
  import Navbar from "$lib/components/navbar.svelte";
  import MarkerShadow from "$lib/images/marker-shadow.png";
  import Node from "./Node.svelte";

  let map: any;
  const centerPoint = [51.557152, -62.146388];

  // move this to a seperate file, and import it also map on Footer
  const locations = [
    {
      id: "waterloo",
      name: "Socratica",
      date: "JANUARY 2022",
      location: "WATERLOO, ON",
      lumaLink:
        "https://lu.ma/embed/calendar/cal-cBMgU2QXqXZQSv1/events?lt=light",
      joinLink: "https://lu.ma/socratica",
      instagramLink: "https://www.instagram.com/socratica.info",
      coordinates: [43.477305, -80.549252],
    },
    {
      id: "toronto",
      name: "Socratica",
      date: "JANUARY 2023",
      location: "TORONTO, ON",
      lumaLink:
        "https://lu.ma/embed/calendar/cal-PxG5QruZfgz28XB/events?lt=light",
      joinLink: "https://lu.ma/socraticaTO",
      instagramLink: "https://www.instagram.com/socratica.info",
      coordinates: [43.664714, -79.385477],
    },
    {
      id: "vancouver",
      name: "Atelier",
      date: "SEPTEMBER 2023",
      location: "VANCOUVER, BC",
      lumaLink:
        "https://lu.ma/embed/calendar/cal-CvuDnsONPxinxqk/events?lt=light",
      joinLink: "https://lu.ma/atelier.ubc",
      instagramLink: "https://www.instagram.com/atelier.ubc",
      coordinates: [49.282729, -123.120738],
    },
    {
      id: "cambridge-uk",
      name: "Scale Down",
      date: "OCTOBER 2023",
      location: "CAMBRIDGE, UK",
      lumaLink:
        "https://lu.ma/embed/calendar/cal-vHCyjMqqjpdduOt/events?lt=light",
      joinLink: "https://lu.ma/scaledown",
      instagramLink: "https://www.instagram.com/socratica.info",
      coordinates: [52.205338, 0.121817],
    },
    {
      id: "ottawa",
      name: "Agora",
      date: "OCTOBER 2023",
      location: "OTTAWA, ON",
      lumaLink:
        "https://lu.ma/embed/calendar/cal-xPDTKP81aHIflKD/events?lt=light",
      joinLink: "https://lu.ma/agora",
      instagramLink: "https://www.instagram.com/agora.cu",
      coordinates: [45.42153, -75.697193],
    },
    {
      id: "kingston",
      name: "id8.blankcanvas",
      date: "OCTOBER 2023",
      location: "KINGSTON, ON",
      lumaLink:
        "https://lu.ma/embed/calendar/cal-AxzTU0DF1vlwRSI/events?lt=light",
      joinLink: "https://lu.ma/id8id8id8",
      instagramLink: "https://www.instagram.com/id8id8id8",
      coordinates: [44.231172, -76.485954],
    },
    {
      id: "berkeley",
      name: "Side Project Sundays",
      date: "SEPTEMBER 2023",
      location: "BERKELEY, CA",
      lumaLink:
        "https://lu.ma/embed/calendar/cal-CRtUehgIQHLEB3o/events?lt=light",
      joinLink: "https://lu.ma/commonroom",
      instagramLink: "https://www.instagram.com/berkeleycommonroom",
      coordinates: [37.871593, -122.272747],
    },
    {
      id: "western",
      name: "Momentum",
      date: "SEPTEMBER 2023",
      location: "LONDON, ON",
      lumaLink:
        "https://lu.ma/embed/calendar/cal-gt0OmSf2cUw1HHl/events?lt=light",
      joinLink: "https://lu.ma/moment.um",
      instagramLink: "https://www.instagram.com/momentum_uwo",
      coordinates: [43.009561, -81.275471],
    },
    {
      id: "mit",
      name: "Friendly Beans",
      date: "DECEMBER 2023",
      location: "CAMBRIDGE, MA",
      lumaLink:
        "https://lu.ma/embed/calendar/cal-2Z2ZQZQZQZQZQZQ/events?lt=light",
      joinLink: "https://lu.ma/beans",
      instagramLink: "https://www.instagram.com/socratica.info",
      coordinates: [42.3629, -71.0839],
    },
    {
      id: "san-francisco",
      name: "Playspace",
      date: "JANUARY 2024",
      location: "SAN FRANCISCO, CA",
      lumaLink:
        "https://lu.ma/embed/calendar/cal-WrTTBMGBVUcTaij/events?lt=light",
      joinLink: "https://lu.ma/playspace",
      instagramLink: "https://www.instagram.com/socratica.info",
      coordinates: [37.7937, -122.3965],
    },
  ];

  onMount(() => {
    // Dynamically import Leaflet only on the client-side
    import("leaflet").then((L) => {
      let mapOptions: {
        center: [number, number];
        zoom: number;
        minZoom: number;
        maxZoom: number;
        maxBounds: L.LatLngBounds;
        maxBoundsViscosity: number;
      } = {
        center: centerPoint as [number, number],
        zoom: 3,
        minZoom: 3,
        maxZoom: 18,
        maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)),
        maxBoundsViscosity: 1.0,
      };

      map = L.map("map", mapOptions);

      // const layer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
      //     attribution: ''
      // });

      const layer = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: "",
        }
      );

      map.addLayer(layer);
      var defaultIcon = L.icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        shadowUrl: MarkerShadow,
        iconSize: [25, 41],
        shadowSize: [41, 41],
        iconAnchor: [12, 41],
        shadowAnchor: [13, 41],
        popupAnchor: [1, -34],
      });

      const isMobile = window.innerWidth < 768;
      const popupOptions: L.PopupOptions = {
        minWidth: isMobile ? 285 : 400,
        maxWidth: isMobile ? 285 : 400,
      };

      function createMarkerAndBindPopup(
        location: any,
        map: any,
        popupOptions: any,
        locationId: string
      ) {
        const marker = L.marker(location.coordinates, { icon: defaultIcon });
        marker.addTo(map);
        const popupContent = document.getElementById(location.id)!.innerHTML;
        marker.bindPopup(popupContent, popupOptions);
        marker.on("popupopen", () => {
          window.history.pushState({}, "", `/map?location=${location.id}`);
        });

        if (locationId === location.id) {
          setTimeout(() => {
            map.panTo(marker.getLatLng(), { animate: true, duration: 1 });
            setTimeout(() => {
              marker.openPopup();
            }, 1000); // Adjust delay as needed
          }, 500); // Adjust initial delay as needed
        }
      }

      const urlParams = new URLSearchParams(window.location.search);
      const locationId = urlParams.get("location") ?? "";

      locations.forEach((location) =>
        createMarkerAndBindPopup(location, map, popupOptions, locationId)
      );
    });
  });
</script>

<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@0.7.7/dist/leaflet.css"
/>

<Navbar />

<div id="map" class="w-screen h-screen z-10">
  {#each locations as location}
    <Node
      id={location.id}
      name={location.name}
      date={location.date}
      location={location.location}
      lumaLink={location.lumaLink}
      joinLink={location.joinLink}
      instagramLink={location.instagramLink}
    />
  {/each}
</div>

<style>
  #map {
    width: 100%;
  }
</style>
