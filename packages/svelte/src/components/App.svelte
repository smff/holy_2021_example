<script>
    import { onMount } from 'svelte';
    import { publishDOM, subscribeDOM } from 'dom-pubsub';

    onMount(() => {
        subscribeDOM('YO', payload => {
            if (payload.from !== 'SVELTE') {
                console.log(`SVELTE: получил от ${payload.from}`);
            }
        })
    })

    const onclick = () => {
        console.log('SVELTE: отправил');
        publishDOM('YO', {
            from: 'SVELTE'
        })
    }
</script>

<span on:click={onclick}>Б</span>
