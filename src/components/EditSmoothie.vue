<template>
  <div class="container">
    <div v-if="smoothie">
      <h3>Edit {{ smoothie.title }} Smoothie</h3>
      <form @submit.prevent="editSmoothie">
        <div class="input-field">
          <input
            placeholder="Title"
            type="text"
            id="title"
            v-model="smoothie.title"
          />
        </div>
        <div
          class="field"
          v-for="(ing, index) in smoothie.ingredients"
          :key="index"
        >
          <input type="text" v-model="smoothie.ingredients[index]" />
          <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
        </div>
        <div class="input-field">
          <p v-if="feedback" class="red-text">{{ feedback }}</p>
          <input
            type="text"
            id="ingredient"
            @keydown.tab.prevent="addIng"
            v-model="ingredient"
            placeholder="Ingredients"
          />
        </div>
        <button class="btn">Add smoothie</button>
      </form>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  data() {
    return {
      smoothie: null,
      feedback: null,
      ingredient: null,
    };
  },
  created() {
    db.collection("smoothies")
      .where("slug", "==", this.slug)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.smoothie = doc.data();
          this.smoothie.id = doc.id;
        });
      });
  },
  methods: {
    editSmoothie() {
      if (this.smoothie.title) {
        this.feedback = null;
        db.collection("smoothies")
          .doc(this.smoothie.id)
          .update({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug: slugify(this.smoothie.title, {
              replacement: "-",
              remove: /[$*_+~.()'"!\-:@]/g,
              lower: true,
            }),
          })
          .then(() => {
            this.$router.push({ name: "index" });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.feedback = "You should fill the title field.";
      }
    },
    addIng() {
      if (this.ingredient) {
        this.smoothie.ingredients.push(this.ingredient);
        this.ingredient = null;
        this.feedback = null;
      } else {
        this.feedback = "You should write new ingredient.";
      }
    },
    deleteIng(ing) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(
        (ingredient) => {
          return ingredient != ing;
        }
      );
    },
  },
  props: ["slug"],
};
</script>

<style >
</style>