<script>
    import "../app.css";
	import Footer from "../lib/components/layout/footer.svelte";
	import Navbar from "../lib/components/layout/navbar.svelte";
</script>

<Navbar></Navbar>
<slot />
<Footer></Footer>