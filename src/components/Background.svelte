<div class="container">
  <slot />
</div>

<style>
  .container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    background: linear-gradient(to right, #ff9a9e, #fad0c4);
    color: #fff;
    font-family: Rubik, sans-serif;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    font-size: 24px;
  }
</style>
