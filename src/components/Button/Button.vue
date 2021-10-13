<template>
  <div :class="['btn', color, size, type, { filled, both: !!icon && !!label }]">
    <Icon v-if="!!icon" :name="icon" />
    <div v-if="!!label" class="btn-label">{{ label }}</div>
  </div>
</template>

<script>
  import Icon from '../Icon/Icon';

  export default {
    name: 'Button',
    components: { Icon },
    props: {
      icon: { type: String },
      label: { type: String },
      filled: { type: Boolean, default: false },
      color: {
        type: String,
        default: 'christmas',
        validator: color => ['christmas', 'default'].includes(color),
      },
      size: {
        type: String,
        default: 'medium',
        validator: size => ['big', 'medium', 'small'].includes(size),
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/_colors.scss';

  .btn {
    display: flex;
    align-items: center;
    cursor: pointer;

    .btn-label {
      display: flex;
      flex: 1;
    }

    &.default {
      &:not(.filled) {
        border: 1px solid $color-white;
        color: $color-white;
      }
    }

    &.medium {
      height: 40px;
      padding: 0 20px;
      border-radius: 7px;
      font-size: 15px;

      &.both .icon {
        padding-right: 10px;

        :deep(svg) {
          width: 18px;
          height: 18px;
        }
      }
    }

    &.big {
      height: 80px;
      border-radius: 10px;
      font-size: 35px;
    }
  }
</style>
