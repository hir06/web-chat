let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);

io.on("connection", socket => {
  // Log whenever a user connects
  console.log("user connected");
  var randomMessages = [
    'Never forget what you are. The rest of the world will not. Wear it like armor, and it can never be used to hurt you.',
    'There is only one thing we say to death: Not today.',
    'If you think this has a happy ending, you haven’t been paying attention.',
    'You’re going to die tomorrow, Lord Bolton. Sleep well.',
    'That’s what I do: I drink and I know things.',
    'Yes. All men must die, but we are not men.',
    'The man who passes the sentence should swing the sword.',
    'Chaos isn’t a pit. Chaos is a ladder.',
    'Winter is coming.',
    'When you play the game of thrones, you win or you die. There is no middle ground.',
    'Winter is here',
    'I will take whatever is mine with fire and blood',
    'you know nothing',
    'when you play game of thrones wother you win or die there is no middle ground',
    'winter is here',
    'dragon is not a slave',
    'Dracaryas',
    'I am arya stark of winterfell and I am going home',
    'A girl has no name',
    'I am slow learner',
    'I am noone'
  ];
  var counter = 0;

  // Log whenever a client disconnects from our websocket server
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  // When we receive a 'message' event from our client, print out
  // the contents of that message and then echo it back to our client
  // using `io.emit()`
  socket.on("message", message => {
    if (counter == randomMessages.length - 1) {
        counter = 0;
    } else {
      counter++
    }
    console.log(counter);
    console.log("Message Sent: " + randomMessages[counter]);
    setTimeout(() => {
      io.emit("message", { type: "new-message", text: randomMessages[counter] });
    }, 1000);

  });
});

// Initialize our websocket server on port 5000
http.listen(5000, () => {
  console.log("started on port 5000");
});
