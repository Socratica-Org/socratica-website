<script lang="ts">
	import './styles.css';
	import "../app.css";
	import ArrowDownRight from '$lib/images/ArrowDownRight.png';
	import uwstartups_logo from '$lib/images/uwstartups_logo.svg';
	import eigenspace_logo from '$lib/images/eigenspace_logo.svg';
	import { initializeApp } from "firebase/app";
	import { getAnalytics } from "firebase/analytics";
	import { getFirestore, collection, getDocs, addDoc, query, where } from "firebase/firestore";
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	
	let currentPath = $page.url.pathname;
	$: {
        currentPath = $page.url.pathname;
    }

	let db: any;
	onMount(() => {

		const firebaseConfig = {
			apiKey: import.meta.env.VITE_API_KEY,
			authDomain: import.meta.env.VITE_AUTH_DOMAIN,
			databaseURL: import.meta.env.VIT_DATABASE_URL,
			projectId: import.meta.env.VITE_PROJECT_ID,   
			storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
			messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
			appId: import.meta.env.VITE_APP_ID,
			measurementId: import.meta.env.VITE_MEASUREMENT_ID
		};
		const app = initializeApp(firebaseConfig);
    	const analytics = getAnalytics(app);
		db = getFirestore(app); //////

	});
  
	let email = '';
	let emailValidationMessage = ''; // Feedback message


	/**
     * @param {string} email
     */
	function isValidEmail(email: string) {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	}
  
	/**
     * @param {{ preventDefault: () => void; }} event
     */
	async function handleOnSubmit(event: any) {
		event.preventDefault(); // prevent the form from submitting
		if (isValidEmail(email)) {
			console.log("Valid Email:", email);
			emailValidationMessage = ''; // Clear any previous error messages

			// Check if the email already exists in Firestore using a query
			const emailsRef = collection(db, "emails");
			const q = query(emailsRef, where("email", "==", email));
			const querySnapshot = await getDocs(q);

			if (querySnapshot.empty) {
				// Email does not exist, add it to Firestore
				try {
					const newDoc = {
						email: email,
						dateCreated: new Date() // Add the current date and time
					};
					const docRef = await addDoc(emailsRef, newDoc);
					console.log("Document written with ID: ", docRef.id);
					emailValidationMessage = 'Email successfully added!';
					email = '';
				} catch (e) {
					console.error("Error adding document: ", e);
					emailValidationMessage = 'Error adding email. Please try again.';
				}
			} else {
				// Email exists
				console.log("Email already exists: ", email);
				emailValidationMessage = 'This email already exists in our records.';
			}
		} else {
			console.log("Invalid Email:", email);
			emailValidationMessage = 'Please enter a valid email';
		}
	}
  </script>
  
  
  
  
  
<div class="app">
  
	<main>
		<slot />
	</main>
  
	{#if currentPath !== '/map'}
		<footer class="bg-[#4A4948] min-h-fit w-full bg-[url('/noise.png')]"  data-sveltekit-preload-data="hover">		  
			<div class="w-full grid xs:grid-cols-3 md:grid-cols-4 px-10 sm:px-14">
				
				<div class="pt-16">
					<h3 class="text-[#FBF8EF] font-base text-sm -tracking-[0.48px] leading-[20px] pb-4 font-mono">FRIENDS OF SOCRATICA</h3>
					<div class="text-[#FBF8EF] opacity-80 font-light -tracking-[0.48px] text-xs sm:text-xs md:text-xs lg:text-sm font-graphik">
						<p class="leading-[26px]"><a  href="https://lu.ma/socraticaTO" target="_blank">Toronto, ON <img src={ArrowDownRight} alt="Arrow Down Right" class="w-3 h-3 inline-block opacity-80"/></a></p>
						<p class="leading-[26px]"><a  href="https://www.instagram.com/socratica.info/" target="_blank">London, ON <img src={ArrowDownRight} alt="Arrow Down Right" class="w-3 h-3 inline-block opacity-80"/></a></p>
						<p class="leading-[26px]"><a  href="https://lu.ma/atelier.ubc" target="_blank">Vancouver, BC <img src={ArrowDownRight} alt="Arrow Down Right" class="w-3 h-3 inline-block opacity-80"/></a></p>
						<p class="leading-[26px]"><a  href="https://lu.ma/ijsn65sl" target="_blank">Montreal, QC <img src={ArrowDownRight} alt="Arrow Down Right" class="w-3 h-3 inline-block opacity-80"/></a></p>
						<p class="leading-[26px]"><a  href="https://www.instagram.com/socratica.info/" target="_blank">Ottawa, ON <img src={ArrowDownRight} alt="Arrow Down Right" class="w-3 h-3 inline-block opacity-80"/></a></p>
						<p class="leading-[26px]"><a  href="https://lu.ma/o659plym" target="_blank">Kingston, ON <img src={ArrowDownRight} alt="Arrow Down Right" class="w-3 h-3 inline-block opacity-80"/></a></p>
						<p class="leading-[26px]"><a  href="https://saturdays.rsvp/" target="_blank">Seattle, WA <img src={ArrowDownRight} alt="Arrow Down Right" class="w-3 h-3 inline-block opacity-80"/></a></p>
						<p class="leading-[26px]"><a  href="https://lu.ma/berkeleydemoday" target="_blank">Berkeley, CA <img src={ArrowDownRight} alt="Arrow Down Right" class="w-3 h-3 inline-block opacity-80"/></a></p>
						<p class="leading-[26px]"><a  href="https://www.instagram.com/socratica.info/" target="_blank">New York, NY <img src={ArrowDownRight} alt="Arrow Down Right" class="w-3 h-3 inline-block opacity-80"/></a></p>
						<p class="leading-[26px]"><a  href="https://lu.ma/bean" target="_blank">Cambridge, MA <img src={ArrowDownRight} alt="Arrow Down Right" class="w-3 h-3 inline-block opacity-80"/></a></p>
						<p class="leading-[26px]"><a  href="https://lu.ma/scaledown" target="_blank">Cambridge, ENG <img src={ArrowDownRight} alt="Arrow Down Right" class="w-3 h-3 inline-block opacity-80"/></a></p>
					</div>
				</div>

				<div class="pt-16">
					<h3 class="text-[#FBF8EF] font-base text-sm  -tracking-[0.48px] leading-[20px] pb-4 font-mono">MORE LINKS</h3>
					<div class="text-[#FBF8EF] opacity-80 font-light -tracking-[0.48px] leading-[33px] text-xs sm:text-xs md:text-xs lg:text-sm font-graphik">
						<p class="leading-[26px]"><a  href="/">Back to Top</a></p>
						<p class="leading-[26px]"><a  href="/about">About</a></p>
						<p class="leading-[26px]"><a  href="/map">Map</a></p>
						<p class="leading-[26px]"><a  href="/get-involved">Get Involved</a></p>
						<p class="leading-[26px]"><a  href="https://www.youtube.com/watch?v=ydYDqZQpim8" target="_blank">Easter Egg</a></p>
						<p class="leading-[26px]"><a  href="https://socratica.notion.site/Code-of-Conduct-52fb005f7e3a452096e235995a2f92e5" target="_blank">Code of Conduct</a></p>
						<p class="leading-[26px]"><a  href="https://donate.stripe.com/5kA6qZcondXE8Te008" target="_blank">Donate</a></p>
					</div>
				</div>

				<div class="pt-16 col-span-2">
					<h3 class="text-[#FBF8EF] font-base text-sm  -tracking-[0.48px] leading-[20px] pb-4 font-mono">NEWSLETTER</h3>
					<div class=" min-w-4/5 max-w-[400px] bg-[#2A2928] py-[8px] px-[10px] rounded-full flex justify-between">
						<input bind:value={email} placeholder="email@gmail.com" class="bg-[#2A2928] text-[12px] md:text-base -tracking-[0.48px] w-full outline-none pl-4 rounded-full text-[#FFFFFF] font-graphik"/>
						<button type="submit" on:click={handleOnSubmit} class=" text-black py-[7px] px-[20px] bg-[#FBF8EF] rounded-[100px] text-[12px] md:text-base font-semibold font-normal hover:opacity-95 transition-colors duration-500 ease-in-out">
							Submit
						</button>
					</div>
					{#if emailValidationMessage}
						<p class="text-red-500 mt-2 ">{emailValidationMessage}</p>
					{/if}
					<!-- <div class="mt-[6px] flex gap-3">
						<a data-sveltekit-reload href="https://eigenspace.com/" target="_blank"> 
							<img src={eigenspace_logo} alt="Sponsor Logos: eigenspace" class="h-14 w-14">
						</a>
						<a data-sveltekit-reload href="https://www.instagram.com/uwstartups/" target="_blank"> 
							<img src={uwstartups_logo} alt="Sponsor Logos: uwstartups" class="h-14 w-14">
						</a>
					</div> -->

				</div>
					
			</div>
				<img src="/socratica_logo_footer.svg" alt="Sponsor Logos" class="px-8 pt-[23px] pb-5">
		</footer>
	{/if}
</div>
  
  
  
  
  
  
  
  
  <style>
	  .app {
		  min-height: 100vh;
	  }  


	  footer {
		background-image: url('/noise.png'), linear-gradient(to top, #2A2928, #2a2928 50%,  #2a2928);
		background-size: cover, cover;  /* Apply cover for both gradient and image */
		background-repeat: no-repeat; 
	  }
  </style>
  
  