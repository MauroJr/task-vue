<template>
  <v-card>
    <v-card-title>
      Tasks
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">New Task</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-textarea v-model="editedItem.description" label="Description"></v-textarea>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field type="number" v-model="editedItem.duration" label="Duration"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md8>
                  <v-select
                    v-model="editedItem.status"
                    :items="statusOptions"
                    item-text="Status"
                    item-value="status"
                    label="Status"
                    return-object
                    single-line
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-title>
  
    <v-data-table
      :headers="headers"
      :items="tasks"
      :search="search"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.description }}</td>
        <td class="text-xs-left">{{ props.item.duration }}</td>
        <td class="text-xs-left">{{ props.item.status }}</td>
        <td class="text-xs-left layout">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>


<script>
export default {
  data() {
    return {
      dialog: false,
      search: '',
      headers: [
        {
          text: 'Id',
          align: 'left',
          sortable: false,
          value: 'id'
        },
        {
          text: 'Name',
          align: 'left',
          value: 'name'
        },
        {
          text: 'Description',
          align: 'left',
          value: 'description'
        },
        {
          text: 'Duration',
          align: 'left',
          value: 'duration'
        },
        {
          text: 'Status',
          align: 'left',
          value: 'status'
        },
        {
          text: 'Actions',
          value: 'name',
          sortable: false
        }
      ],
      statusOptions: [
        'Backlog',
        'ToDo',
        'Doing',
        'Done'
      ],
      tasks: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        description: '',
        duration: 0,
        status: 'Backlog'
      },
      defaultItem: {
        name: '',
        description: '',
        duration: 0,
        status: 'Backlog'
      }
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Task' : 'Edit Task'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize () {
      this.tasks = [
        {
          id: 1,
          name: 'task1',
          description: 'test1 description',
          duration: 2,
          status: 'Backlog'
        },
        {
          id: 2,
          name: 'task2',
          description: 'test2 description',
          duration: 2,
          status: 'Backlog'
        },
        {
          id: 3,
          name: 'task3',
          description: 'test3 description',
          duration: 2,
          status: 'Backlog'
        },
      ]
    },

    editItem (item) {
      this.editedIndex = this.tasks.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.tasks.indexOf(item)
      confirm('Are you sure you want to delete this task?') && this.tasks.splice(index, 1)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.tasks[this.editedIndex], this.editedItem)
      } else {
        this.tasks.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
