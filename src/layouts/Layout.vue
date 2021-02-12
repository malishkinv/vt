<template>
  <div :class="$style.wrapper">
    <slot />
  </div>
</template>

<style lang="scss" module>
.wrapper {
  margin: 100px auto;
  width: 320px;
}
</style>