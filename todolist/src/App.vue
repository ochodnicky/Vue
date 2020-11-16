<template>
  <div id="app">
    <div class="wrapper">

      <h1>Task List</h1>
      
      <form @submit.prevent="addItem"
      class="todoAdd">
        <input 
        type="text"
        v-model="inputValue"
        :class="[addInputClass, 'todoAdd__input']">

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

       <div class="tasks">
      
      <div class="message">
        <div class="message" v-if="myItems.length > 3">
          {{ messageFull }}
        </div>
        <div class="message" v-else>
          {{ messageEmpty }}
        </div>
      </div>

      <ul class="todoList">
        <li v-for="(item) in myItems"
        :key="item.id"
        :class="[item.completed ? 'isCompleted' : '', 'todoList__item']">
        
          <input
          type="checkbox"
          class="todoList__check"
          :name="'todo-' + item.id"
          :id="'todo-' + item.id">

          <label 
          :for="'todo-' + item.id"
          @click="completeItem(item.id)">
          </label>

          <input 
          type="text"
          class="todoList__input"
          :value="item.name"
          :readonly="item.completed"
          @keyup.enter="editItem($event, item.id)">

          <button
          type="button"
          class="todoList__remove"
          @click="removeItem(item.id)">x</button>
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
      uniqueId: 0,
      messageFull: "' You have a lot to do... 🐝 '",
      messageEmpty: "' The list is quite empty.. 😴 '"
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
    },
    addInputClass () {
      return this.inputValue.length > 1 ? 'green' : 'error'
    }
  },
  methods: {
    addItem (event) {
      console.log(event);
      this.inputValue = this.inputValue.trim();
      if (this.inputValue.length > 1) {
        this.items.push({
          id: this.uniqueId,
          name: this.inputValue,
          completed: false
        });
        this.inputValue="";
        this.uniqueId++;
      }
    },
    removeItem (id) {
      let index = this.findIndex(id);
      this.items.splice(index, 1)
    },
    editItem (event, id) {
      let index = this.findIndex(id);
      this.items[index].name = event.target.value;
    },
    completeItem (id) {
      let index = this.findIndex(id);
      this.items[index].completed = this.items[index].completed ? false : true;
    },
    showCompleted (value) {
      this.showCompletedItems = value;
    },
    clearItems () {
      this.items = []
    },
    findIndex(id) {
      return this.items.findIndex(item => item.id === id);
    }
  }
};
</script>
