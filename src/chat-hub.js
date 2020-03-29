import { HubConnectionBuilder } from '@aspnet/signalr';

const connection = new HubConnectionBuilder()
  .withUrl('https://localhost:44308/ws')
  .build();

export default connection