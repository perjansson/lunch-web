<div
  class="container"
  style={`background: linear-gradient(to right, var(--currentBackgroundColor), var(--currentBackgroundColorAlpha));`}
>
  <slot />
</div>

<style>
  .container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
  }

  @supports (height: 100svh) {
    .container {
      min-height: 100svh;
    }
  }
</style>
