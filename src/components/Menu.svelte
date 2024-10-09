<script lang="ts">
  import { beforeUpdate } from 'svelte'
  import { Link } from 'svelte-routing'
  import { type Location, locations } from '../constants'

  export let isOpen = false
  export let onMenuItemSelected: (id: string) => void
  $: {
    if (isOpen) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }
  }

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
          style="animation-delay: {index * 75}ms"
        >
          <Link to={option.path} on:click={() => onMenuItemSelected(option.id)}
            >{option.label}</Link
          >
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
    width: 100%;
    background-color: rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    z-index: 999;
    overflow-y: auto;
  }

  .menu {
    list-style: none;
    padding: 80px 0;
    margin: 0;
    width: 100%;
    text-align: center;
    overflow-y: auto;
    user-select: none;
    height: 80vh;
    padding: 10vh 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .menu-option {
    padding: 18px;
    animation-name: stagger;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
    opacity: 0;
    transform: translateY(100px);
    font-family: Rubik, sans-serif;
    font-size: 32px;
    font-weight: bold;
    transition: all 0.2s ease-in-out;
  }

  @media (max-width: 768px) {
    .menu-option {
      padding: 16px;
      font-size: 32px;
    }
  }

  @media (max-width: 480px) {
    .menu-option {
      padding: 14px;
      font-size: 22px;
    }
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 767px) and (orientation: landscape) {
    .menu-option {
      padding: 14px;
      font-size: 16px;
    }
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
