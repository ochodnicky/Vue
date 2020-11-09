<template>
  <div id="app">
    <div class="wrapper">

      <h1>Task List</h1>

      <div class="tasks">
      
      <form @submit.prevent="addItem"
      class="todoAdd">
        <input 
        type="text"
        v-model="inputValue">

        <button
        type="button"
        @click="clearItems">Clear</button>
      </form>

      <div class="todoList__nav">
        <button 
        type="button"
        @click="showCompleted(true)"
        :class="[showCompletedItems ? 'isActive' : '']">All</button>

        <button 
        type="button"
        @click="showCompleted(false)"
        :class="[!showCompletedItems ? 'isActive' : '']">To complete</button>
      </div>

      <ul class="todoList">
        <li v-for="(item, index) in myItems"
        :key="item.id"
        class="todoList__item"
        :class="[item.completed ? 'isCompleted' : '']">
        
          <input
          type="checkbox"
          class="todoList__check"
          :name="'todo-' + index"
          :id="'todo-' + index">

          <label 
          :for="'todo-' + index"
          @click="completeItem(index)">
          </label>

          <input 
          type="text"
          class="todoList__input"
          :value="item.name"
          :readonly="item.completed"
          @keyup.enter="editItem($event, index)">

          <button
          type="button"
          class="todoList__remove"
          @click="removeItem(index)">x</button>
        </li>
      </ul>
      </div>

    </div>
  </div>
</template>

<!---------------------------->
<script>
export default {
  data() {
    return {
      items: [],
      inputValue: "",
      showCompletedItems: true,
      uniqueId: 1
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
        id: this.uniqueId,
        name: this.inputValue,
        completed: false
      });
      this.inputValue="";
      this.uniqueId++
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
