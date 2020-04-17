<template>
<div class="room">
  <div class="window">
    <div class="user-window">
      <h1>Welcome!</h1>
      <h2>Logged in as: {{user.username}}</h2>
      <button @click="logout" class="pure-button littlebutton">Logout</button>
      <h2>Users Online:</h2>
      <div class="users-online">
        <div v-for="user in users" v-bind:key="user.id">
          <div class="user">
            <p>{{user.username}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-window">
      <div class="chat-feed" id="chat-feed">
        <div v-for="message in messages" v-bind:key="message.id">
          <div class="message">
            <p class="username">{{message.user}}</p>
            <p class="text">{{message.text}}</p>
            <p class="time">{{time(message.created)}}</p>
          </div>
        </div>
      </div>
      <div class="create">
        <form class="pure-form message-sender" @submit.prevent="sendMessage">
          <input placeholder="Send a Message" v-model="text" />
          <button class="pure-button mybutton" type="submit">Send</button>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import moment from "moment"
export default {
  name: 'Room',
  data() {
    return {
      message: '',
      messages: [],
      users: [],
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  created() {
    this.getMessages();
    this.getUsers();
    setInterval(this.getMessages, 20000);
    setInterval(this.getUsers, 20000);
    setTimeout(this.scrollToEnd, 500);
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    async getMessages() {
      try {
        let response = await axios.get("/api/messages");
        this.messages = response.data.messages;
        return true;
      } catch (e) {
        console.log(e);
      }
    },
    async getUsers() {
      try {
        let response = await axios.get("/api/users");
        this.users = response.data.users;
        return true;
      } catch (e) {
        console.log(e);
      }
    },
    time(d) {
      return moment(d).format('D MM YY, h:mm a');
    },
    async sendMessage() {
      try {
        await axios.post("/api/messages", {
          text: this.text,
          user: this.$root.$data.user.username
        });
        this.text = "";
        this.getMessages();
        this.scrollToEnd();
        return true;
      } catch (e) {
        console.log(e);
      }
    },
    scrollToEnd() {
      let feed = this.$el.querySelector("#chat-feed");
      feed.scrollTop = feed.scrollHeight;
    },
  }
}
</script>



 <style scoped>
*{
  margin: 0px;
  border: 0px;
}

.room {
  max-height: 75%;
}

 .window {
   margin: 0 auto;
   display: flex;
 }

 .user-window {
   background-color: #334A4F;
   color: white;
   flex-basis: 10%;
   text-align: center;
 }

 .chat-window {
   width: 90%;
 }

.chat-feed {
  overflow-y: scroll;
  height: 82vh;
  background-color: #182426;
}

input {
  width: 100%;
  height: 50px;
}

.message {
  padding: 5px;
  background-color: #27393D;
  color: white;
  border-radius: 3px;
  margin: 5px 5px;
}

.message-sender {
  display: flex;
}

button[type="submit"] {
  margin: 0px;
}


.mybutton {
  font-size: 15px;
  background-color: #F35A61;
  color: white;
  height: 50px;
  width: 100px;
  margin-left: 1px;
}

.users-online{
  background-color: #182426;
  width: 90%;
  height: 77vh;
  margin: 0 auto;
  margin-top: 5px;
  border-radius: 5px;
}

.username {
  color: white;
  font-weight: bold;
  font-size: 13px;
}

.text {
  color: #ccc;
  font-size: 18px
}

.time {
  color: #777;
  font-size: 10px;
}
 .littlebutton {
   font-size: 10px;
   border-radius: 20px;
   background-color: #F35A61;
   color: white;
   margin-bottom: 5px;
 }
 </style>
