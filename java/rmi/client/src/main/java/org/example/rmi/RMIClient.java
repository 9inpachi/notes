package org.example.rmi;

import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class RMIClient {
  public static void main(String[] args) throws Exception {
    Registry registry = LocateRegistry.getRegistry(1099);

    RemoteHello remoteHello = (RemoteHello) registry.lookup("RemoteHello");
    System.out.println(remoteHello.sayHello("RMI Client"));
  }
}
