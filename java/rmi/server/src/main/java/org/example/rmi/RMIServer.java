package org.example.rmi;

import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;

public class RMIServer implements RemoteHello {
  public String sayHello(String name) {
    return "Hello " + name;
  }

  public static void main(String[] args) throws Exception {
    RMIServer rmiServer = new RMIServer();
    RemoteHello remoteObject = (RemoteHello) UnicastRemoteObject.exportObject(rmiServer, 0);

    Registry registry = LocateRegistry.createRegistry(1099);
    registry.bind("RemoteHello", remoteObject);

    System.out.println("Server started and running");
  }
}
