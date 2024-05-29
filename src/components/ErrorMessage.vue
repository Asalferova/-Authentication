<template>
  <div class="error-message">
    <slot></slot>
  </div>
</template>

<style>
.error-message {
  width: 95%;
  color: #dc3545;
  font-size: 14px;
  margin: 10px 0;
  text-align: center;
  border: 1px solid #dc3545;
  padding: 10px;
  border-radius: 5px;
  background-color: #f8d7da;
}
</style>
