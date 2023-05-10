<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	/**
	 *	@type {boolean}
	 *  @description value used to open/close the menu for smaller screens.
	 */
	let isMenuVisible = false;

	onMount(async () => {
		const navObj = document.querySelector('#navbar')?.scrollHeight;
		if (navObj) document.documentElement.style.setProperty('--scroll-padding', navObj + 'px')
	});

	function toggleMenu() {
		isMenuVisible = !isMenuVisible;
		console.log(isMenuVisible);
	}
</script>

<div class="navbar bg-base-300 sticky top-0 z-50" id="navbar">
	<div class="lg:hidden dropdown navbar-end">
		<!-- If the size is other than large to visualize links the burger menu is displayed -->
		<label class="btn btn-circle btn-ghost swap swap-rotate">
			<!-- this hidden checkbox controls the state -->
			<input type="checkbox" on:click={toggleMenu} id="navbar-toggle-checkbox" />
			<!-- hamburger icon -->
			<svg
				class="swap-off fill-current"
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				viewBox="0 0 512 512"
				><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg
			>
			<!-- close icon -->
			<svg
				class="swap-on fill-current"
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				viewBox="0 0 512 512"
				><polygon
					points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"
				/></svg
			>
		</label>
		{#if isMenuVisible}
			<ul
				class="lg:hidden menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 ml-4"
			>
				<li><a href="{base}/#home">Home</a></li>
				<li><a href="{base}/#about">About</a></li>
				<li><a href="{base}/#contacts">Contacts</a></li>
			</ul>
		{/if}
	</div>
	<div class="text-xl font-medium self-center lg:navbar-start navbar-end px-4">
		<a href="https://github.com/ReadyCodeToUse">RCTU</a>
	</div>
	<!-- If screen size is large links are visualized on the top-right -->
	<ul class="hidden lg:flex lg:navbar-end">
		<li class="px-4"><a href="{base}/#home">Home</a></li>
		<li class="px-4"><a href="{base}/#about">About</a></li>
		<li class="px-4"><a href="{base}/#contacts">Contacts</a></li>
	</ul>
</div>