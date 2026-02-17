<template>
  <table class="table table-bordered table-hover">
    <thead class="table-light">
      <tr>
        <td v-for="col in columns" :key="col.label">{{ col.label }}</td>
        <td class="text-end">Action</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id" >
        <td v-for="col in columns" :key="col.key">
          <slot :name="`col-${col.key}`" :row="row" :value="row[col.key]">
            {{ row[col.key] }}
          </slot>
          
        </td>
        <td class="text-end">
          <slot name="action" :row="row">
            <button class="btn btn-primary me-2" @click="$emit('editArticle' ,row.id)">Edit</button>
            <button class="btn btn-danger" @click="$emit('deleteArttcle' , row.id)">Delete</button>
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
let props = defineProps({
  columns: Array,
  rows: Array,
});

defineEmits(['deleteArticle' , 'editArticle']);
</script>

<style scoped></style>
