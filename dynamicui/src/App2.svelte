<!--<script lang="ts">-->
<!--    function handleClick(e: MouseEvent) {-->

<!--        //try recurivelly to get the innermost element div class name-->
<!--        //means if i clicked to center it should print grandchild-->
<!--        // if i clicked center but not grandchild then it should print child-->
<!--        // ...-->

<!--        if (e.target !== e.currentTarget) {-->
<!--            console.log('Innermost clicked:', e.target);-->
<!--            e.stopPropagation(); // Prevent parent handlers-->
<!--            return;-->
<!--        }-->
<!--        console.log('Parent clicked');-->
<!--    }-->
<!--</script>-->

<!--<div style=" width: 100vw; height: 100vh;" class="center">-->
<!--    <div on:click={handleClick}-->
<!--    class="parent center">-->

<!--        <div class="child center" on:click={handleClick}>-->
<!--            <div class="grandchild center" on:click={handleClick}>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->


<!--<style>-->
<!--    .parent {-->
<!--        height: 500px;-->
<!--        width: 500px;-->
<!--        background: #748da5;-->
<!--    }-->
<!--    .child {-->
<!--        height: 200px;-->
<!--        width: 200px;-->
<!--        background: #0065af;-->
<!--    }-->
<!--    .grandchild {-->
<!--        height: 50px;-->
<!--        width: 50px;-->
<!--        background: black;-->
<!--    }-->


<!--</style>-->


<script lang="ts">
    function getInnermostClass(e: MouseEvent): string | null {
        const target = e.target as HTMLElement;
        const currentTarget = e.currentTarget as HTMLElement;

        // Start from the clicked element
        let element: HTMLElement | null = target;

        console.log(element, currentTarget)
        // Walk up the DOM tree until we reach the container
        while (element && element !== currentTarget) {

            if (element.classList.contains('grandchild')) return 'grandchild';
            if (element.classList.contains('child')) return 'child';
            if (element.classList.contains('parent')) return 'parent';
            element = element.parentElement;
        }

        return null;
    }

    function handleClick(e: MouseEvent) {
        const className = getInnermostClass(e);
        console.log('Innermost class:', className);
        e.stopPropagation();
    }
</script>

<div style="width: 100vw; height: 100vh;" class="center">
    <div on:click={handleClick} class="parent center">

        <div class="child center" on:click={handleClick}>
            <div class="grandchild center" on:click={handleClick}>
            </div>
        </div>
        <div class="child center" on:click={handleClick}>
            <div class="grandchild center" on:click={handleClick}>
            </div>
        </div>
        <div class="child center" on:click={handleClick}>
            <div class="grandchild center" on:click={handleClick}>
            </div>
        </div>
    </div>
</div>

<style>
    .parent {
        height: 500px;
        width: 500px;
        background: #748da5;
        display: flex;
        flex-direction: row;
        row-gap: 20px;
    }
    .child {
        height: 200px;
        width: 200px;
        background: #0065af;
    }
    .grandchild {
        height: 50px;
        width: 50px;
        background: black;
    }
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
