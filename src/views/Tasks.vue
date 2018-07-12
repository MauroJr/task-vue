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
                  <v-text-field v-model="$store.state.editedTask.name" label="Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-textarea v-model="$store.state.editedTask.description" label="Description"></v-textarea>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field type="number" v-model="$store.state.editedTask.duration" label="Duration"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md8>
                  <v-select
                    v-model="$store.state.editedTask.status"
                    :items="$store.state.tasksStatus"
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
      :items="$store.state.tasks"
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
            @click="editTask(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteTask(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template slot="no-data">
        <p>não tem nada aqui...</p>
      </template>
    </v-data-table>
  </v-card>
</template>


<script>
export default {
  data() {
    return {
      dialog: false,
      search: ''
    };
  },

  computed: {
    formTitle() {
      return this.$store.state.editedTaskIndex === -1 ? 'New Task' : 'Edit Task';
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.headers = [
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
    ];
  },

  methods: {

    editTask(task) {
      this.$store.dispatch('editTask', task);
      this.dialog = true;
    },

    deleteTask(task) {
      var index = this.$store.state.tasks.indexOf(task);
      confirm('Are you sure you want to delete this task?') &&
        this.$store.dispatch('deleteTask', index);
    },

    close () {
      this.dialog = false;
      this.$store.dispatch('resetEditedTask');
    },

    async save() {
      await this.$store.dispatch('saveTask');
      this.close();
    }
  }
}
</script>
