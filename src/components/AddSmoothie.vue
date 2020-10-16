<template>
  <div class="container form">
    <h3>Add Smoothie</h3>
    <form @submit.prevent="addSmoothie">
      <div class="input-field">
        <input placeholder="Title" type="text" id="title" v-model="title" />
      </div>
      <div class="field" v-for="(ing, index) in ingredients" :key="index" >
        <input type="text" v-model="ingredients[index]">
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
</template>

<script>
import db from '../firebase/init'
import slugify from 'slugify'
export default {
  data() {
    return {
      title: null,
      ingredients: [],
      ingredient: null,
      feedback: null,
    };
  },
  methods: {
    addSmoothie() {
      if(this.title) {
        this.feedback = null
        db.collection('smoothies').add({
          title: this.title,
          ingredients: this.ingredients,
          slug: slugify(this.title, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
          }),
        }).then(() => {
            this.$router.push({name: 'index'})
          }).catch((err) => {
            console.log(err)
          })
      }else {
        this.feedback = 'You should fill the title field.'
      }
    },
    addIng() {
      if (this.ingredient) {
        this.ingredients.push(this.ingredient);
        this.ingredient = null;
        this.feedback = null;
        console.log(this.ingredients);
      } else {
        this.feedback = "You should write new ingredient.";
      }
    },
    deleteIng(ing) {
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient != ing;
      })
    }
  },
};
</script>

<style>
.form {
  width: 500px;
}
.field {
  position: relative;
}
.delete {
  position: absolute;
  right: 0;
  bottom: 0;
  color:rgb(212, 202, 202);
  cursor: pointer;
}
</style>