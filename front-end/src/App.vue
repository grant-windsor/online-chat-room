<template>
<div id="app">
  <div class="header">
    <div class="brand">
      <h1>Q-chat</h1>
      <h2>Quarantine Chat Room</h2>
    </div>
  </div>
  <div class="content">
    <router-view />
  </div>
</div>
</template>


<style>
* {
  margin: 0px;
  padding: 0px;
}

body {
  margin: 0px;
  background: #3E5A61;
  height: 100%;
}

.header {
  height: 10vh;
}

.brand {
  display: flex;
  background: #80857D;
}

.brand h1 {
  display: inline-block;
  background: white;
  color: #F35A61;
  padding: 10px;
  margin: 10px;
  border-radius: 40px;
  font-family: 'Lobster', cursive;
  font-size: 150%;
}

.brand h2 {
  font-size: 100%;
  color: white;
  align-self: center;
}

.content {
  height: 100%;
}

.pure-button {
  font-size: 10px;
}

h1 {
  font-size: 16px;
}

h2 {
  font-size: 12px;
}


a {
  color: #F35A61;
}

.pure-button-primary {
  background-color: #F35A61;
  color: white;
  border-radius: 5px;
}

@media screen and (max-device-width: 1000px) {


  .header {
    height: 5%;
    width: 100%;
  }

  .brand {
    display: flex;
    background: #868F7D;
  }

  .content {
    width: 100%;
  }

  .brand h1 {
    display: inline-block;
    background: white;
    color: #F35A61;
    padding: 5px;
    margin: 5px;
    border-radius: 30px;
    font-family: 'Lobster', cursive;
    font-size: 100%;
  }

  .brand h2 {
    font-size: 50%;
    color: white;
    padding: 0px;
    align-self: center;
    margin-top: 5px;
  }

  .window {
    width: 100%;
    margin: 0px;
  }

  .chat-window {
    width: 100% !important;
  }

  .user-window {
    display: none;
  }


}
</style>
