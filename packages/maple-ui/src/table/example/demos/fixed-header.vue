<script setup>
import { ref } from 'vue'

const list2 = ref(gen(1, 10))
function gen(current, size) {
  return Array.from({ length: size }).map((_, index) => {
    const id = (current - 1) * size + index + 1

    return {
      name: `Name ${id}`,
      math: id,
      english: id,
    }
  })
}
function get2(current, size) {
  list2.value = gen(current, size)
}
</script>

<template>
  <mp-table scroller-height="400px">
    <thead style="position: sticky; top: 0">
      <tr>
        <th>姓名</th>
        <th>数学</th>
        <th>英语</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="l in list2" :key="l.name">
        <td>{{ l.name }}</td>
        <td>{{ l.math }}</td>
        <td>{{ l.english }}</td>
      </tr>
    </tbody>

    <template #footer>
      <div class="footer">
        <mp-pagination :current="1" :total="100" :page-size-options="[5, 10]" show-page-size @change="get2" />
      </div>
    </template>
  </mp-table>
</template>

<style lang="less" scoped>
.footer {
  display: flex;
  justify-content: flex-end;
  padding: 0 16px;
  align-items: center;
  height: 48px;
}
</style>
