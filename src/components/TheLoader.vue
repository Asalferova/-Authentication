<template>
  <div class="loader">
    <div class="loader-inner"></div>
  </div>
</template>

<style>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader-inner {
  width: 30px;
  height: 30px;
  border: 5px solid var(--header-bg-color);
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
