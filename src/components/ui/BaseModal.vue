<template>
  <div v-if="showModal">
    <!-- Modal -->
    <div class="modal fade d-block show">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- <div class="p-3">
            <h1 class="modal-title fs-5 mb-3">Modal title</h1>
            <div class="input-group mb-3">
              <input type="text" class="form-control">
            </div>
          </div> -->
          <slot name="header"></slot>
          <div class="modal-footer">
            <slot name="footer">
              <!-- <button type="button" class="btn btn-secondary" @click="$emit('closeModal')">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button> -->
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let props = defineProps({
  showModal: Boolean
})

// let emit = defineEmits(['closeModal'])
</script>

<style lang="scss" scoped></style>