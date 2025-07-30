<template>
  <div>
    <h1>ユーザーデータをテーブル表示する</h1>
    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>mail</th>
          <th>tel</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <td>{{ user.name }}</td>
          <td>{{ user.mail }}</td>
          <td>{{ user.tel }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: []
    };
  },
mounted() {
  axios.get('http://153.120.121.157:3000/api/users')
    .then(res => {
      console.log('取得したユーザーデータ:', res.data)
      this.users = res.data;
    })
    .catch(err => {
      console.error('ユーザーデータの取得に失敗:', err);
    });
}
};
</script>
