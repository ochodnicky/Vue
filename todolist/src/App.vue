<template>
  <div id="app">
    <div class="todoList__nav">
        <button 
      type="button"
      @click="showCompleted(true)"
      v-bind:class="[showCompletedItems ? 'isActive' : '']">All</button>

      <button 
      type="button"
      @click="showCompleted(false)"
      v-bind:class="[!showCompletedItems ? 'isActive' : '']">To complete</button>
    </div>

    <ul class="todoList">
      <li v-for="(item, index) in myItems"
      v-bind:key="index"
      class="todoList__item"
      v-bind:class="[item.completed ? 'isCompleted' : '']">
      
        <input
        type="checkbox"
        class="todoList__check"
        v-bind:name="'todo-' + index"
        v-bind:id="'todo-' + index">

        <label 
        v-bind:for="'todo-' + index"
        @click="completeItem(index)">
        </label>

        <input 
        type="text"
        class="todoList__input"
        v-bind:value="item.name"
        v-bind:readonly="item.completed"
        @keyup.enter="editItem($event, index)">

        <button
        type="button"
        class="todoList__remove"
        @click="removeItem(index)">x</button>
      </li>
    </ul>

    <form @submit.prevent="addItem"
    class="todoAdd">
      <input 
      type="text"
      v-model="inputValue">

      <button
      type="button"
      @click="clearItems">Clear</button>
    </form>
  </div>
</template>

<!---------------------------->
<script>
export default {
  data() {
    return {
      items: [],
      inputValue: "",
      showCompletedItems: true
    };
  },
  computed: {
    myItems () {
      let todoListItems;

      if (this.showCompletedItems) {
          todoListItems = this.items;
      } else {
        todoListItems = this.items.filter(function(item) {
            return item.completed == false;
        });
      }
  
      return todoListItems;
    }
  },
  methods: {
    addItem () {
      this.items.push({
        name: this.inputValue,
        completed: false
      });
      this.inputValue=""
    },
    removeItem (index) {
      this.items.splice(index, 1)
    },
    editItem (event, index) {
      this.items[index].name = event.target.value;
    },
    completeItem (index) {
      this.items[index].completed = this.items[index].completed ? false : true;
    },
    showCompleted (value) {
      this.showCompletedItems = value;
    },
    clearItems () {
      this.items = []
    }
  }
};
</script>

<style>
  .todoList {
    margin-bottom: 25px;
  }
  .todoList__item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .todoList__input {
    border: none;
    margin-right: 10px;
    font-size: 16px;
  }
  .todoList__input:focus {
    outline: none;
  }
  .todoList__check {
    display: none;
  }
  .todoList__check + label {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 1px solid #000;
    margin-right: 10px;
    position: relative;
    cursor: pointer;
  }
  .isCompleted .todoList__check + label:before {
    content: '';
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #000;
    position: absolute;
    top: 3px;
    left: 3px;
    z-index: 3;
  }
  .isCompleted .todoList__input {
    text-decoration: line-through;
  }
  .todoList__remove {
    border: none;
    background: none;
    font-size: 16px;
    color: #000;
    cursor: pointer;
  }
  .todoList__remove:hover {
    color: red;
  }
  .todoAdd {
    margin-top: 25px;
  }
  .todoList__nav {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  .todoList__nav button {
    padding: 10px 20px;
    font-size: 14px;
    background: none;
    color: #000;
    border: none;
    margin-right: 10px;
    outline: none;
  }
  .todoList__nav button.isActive {
    background: red;
    color: #fff;
  }
</style>
