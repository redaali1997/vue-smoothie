<template>
  <div class="index container">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)"
          >delete</i
        >
        <h2 class="indigo-text">{{ smoothie.title }}</h2>
        <ul class="ingredients">
          <li
            class="chip"
            v-for="(ing, index) in smoothie.ingredients"
            :key="index"
          >
            {{ ing }}
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{name: 'edit-smoothie', params: {slug: smoothie.slug}}">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from "../firebase/init";
export default {
  data() {
    return {
      smoothies: [],
    };
  },
  methods: {
    deleteSmoothie(id) {
      db.collection("smoothies")
        .doc(id)
        .delete()
        .then(() => {
          this.smoothies = this.smoothies.filter(
            (smoothie) => smoothie.id != id
          );
        });
    },
  },
  created() {
    db.collection("smoothies")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const smoothie = doc.data();
          smoothie.id = doc.id;
          this.smoothies.push(smoothie);
        });
      });
  },
};
</script>

<style>
.index {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 30px;
}
.card h2 {
  font-size: 1.8em;
}
.ingredients {
  display: inline-block;
}
.delete {
  font-size: 1.4em;
  color: #aaa;
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
}
</style>
