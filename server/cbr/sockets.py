import socketio
from cbr.settings import DEBUG, ALLOWED_HOSTS

# The maximum allowable number of clients that can connect to the socketIO concurrently.
# If this limit is reached, the next client that tries to connect will be disconnected.
MAX_SOCKET_CONNECTION_LIMIT = 50
CONNECTION_COUNT = 0 # A counter for the number of clients connected to the socketIO server

cors_allowed_origins = "*" if DEBUG else ALLOWED_HOSTS
sio = socketio.Server(
    async_mode="eventlet",
    always_connect=True,
    cors_allowed_origins=cors_allowed_origins,
)

# Set a property in the socket server to hold a maximum number of connections
sio.maxConnections = MAX_SOCKET_CONNECTION_LIMIT

@sio.on("connect")
def connect(sid, environ):
  global CONNECTION_COUNT
  CONNECTION_COUNT = CONNECTION_COUNT + 1
  sio.emit("alert", {"sid": sid, "data": "[SocketIO Server] User Connected."})
  print("[SocketIO Server] User connected with socketID {}.".format(sid))

  if CONNECTION_COUNT > sio.maxConnections:
    print("[SocketIO Server] Connection limit reached, disconnecting user with socketID {}.\n".format(sid))
    sio.disconnect(sid)


@sio.on("disconnect")
def disconnect(sid):
    global CONNECTION_COUNT
    CONNECTION_COUNT = CONNECTION_COUNT - 1
    print("[SocketIO Server] User {} has disconnected.".format(sid))


@sio.on("newAlert")
def newAlert(sid, data):
    print("[SocketIO Server]: Received a new alert '{} from {}".format(data, sid))
    sio.emit("pushAlert", {"data": "[SocketIO Server] pushAlert test message"})


def main():
  global CONNECTION_COUNT