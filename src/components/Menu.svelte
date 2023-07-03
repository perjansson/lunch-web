<script lang="ts">
  import { beforeUpdate } from 'svelte'
  import { Link } from 'svelte-routing'
  import { type Location, locations } from '../constants'

  export let isOpen = false
  export let onClose = () => {}

  interface MenuOption extends Location {
    visible?: boolean
  }

  const menuOptions: MenuOption[] = locations.map((location) => ({
    ...location,
    visible: false,
  }))

  beforeUpdate(() => {
    if (!isOpen) {
      menuOptions.forEach((option) => (option.visible = false))
    }
  })
</script>

{#if isOpen}
  <div class="overlay">
    <ul class="menu">
      {#each menuOptions as option, index (option.id)}
        <li
          class="menu-option"
          class:visible={option.visible}
          style="animation-delay: {index * 100}ms"
          on:animationend={() => (option.visible = true)}
        >
          <Link to={option.path} on:click={onClose}>{option.label}</Link>
        </li>
      {/each}
    </ul>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(10px);
    z-index: 999;
  }

  .menu {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: center;
  }

  .menu-option {
    padding: 20px;
    animation-name: stagger;
    animation-duration: 0.5s;
    opacity: 0;
    transform: translateY(100px);
    font-family: Rubik, sans-serif;
    font-size: 36px;
    font-weight: bold;
    color: '#fff';
  }

  .menu-option.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @keyframes stagger {
    0% {
      opacity: 0;
      transform: translateY(100px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
