new Vue({
  el: '#app',
  data: {
    fields: [
      { 
        name: 'name',
        type: 'string'
      },
      {
        name: 'description',
        type: 'text'
      },
      {
        name: 'status',
        type: 'enum',
        items: ['Backlog', 'ToDo', 'Doing', 'Done']
      }
    ],
    tasks: [
      {
        name: 'finish this course',
        description: 'finish this course some day',
        status: 'Backlog'
      },
      {
        name: 'finish this course2',
        description: 'finish this course some day2',
        status: 'Todo'
      },
      {
        name: 'finish this course3',
        description: 'finish this course some day3',
        status: 'Backlog'
      }
    ]
  },
  computed: {
    fieldsNames() {
      return this.fields.map(field => field.name);
    }
  },
  methods: {
    firstUpper(word) {
      return word[0].toUpperCase() + word.slice(1);
    },
    addTask(event) {
      console.log(event);
    }
  }
});