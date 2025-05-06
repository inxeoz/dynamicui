<script>
    let color = '';
    let error = '';

    async function pickColor() {
        if (!window.EyeDropper) {
            error = 'EyeDropper API is not supported in this browser.';
            return;
        }

        try {
            const eyeDropper = new window.EyeDropper(); // Use window.EyeDropper
            const result = await eyeDropper.open();
            color = result.sRGBHex;
            error = '';
            await navigator.clipboard.writeText(color);
        } catch (err) {
            error = 'Color picking canceled or failed.';
        }
    }
</script>

<style>
    .color-box {
        width: 100px;
        height: 30px;
        border: 1px solid #ccc;
        margin-top: 10px;
    }
</style>

<h2>Color Picker</h2>
<button on:click={pickColor}>Pick a color</button>

{#if color}
    <div class="color-box" style="background-color: {color}"></div>
    <p>Picked: {color}</p>
{/if}

{#if error}
    <p style="color: red;">{error}</p>
{/if}
