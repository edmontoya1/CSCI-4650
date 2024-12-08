import {
  create_table,
  insert_list_to_table,
  insert_to_table,
  list_tables,
  query_table,
  scan_table,
  TableInsertType,
  TableType,
} from "./index";

const table: TableType = {
  AttributeDefinitions: [
    {
      AttributeName: "id",
      AttributeType: "S",
    },
    {
      AttributeName: "completed",
      AttributeType: "B",
    },
    {
      AttributeName: "created",
      AttributeType: "S",
    },
  ],
  KeySchema: [
    {
      AttributeName: "id",
      KeyType: "HASH",
    },
    {
      AttributeName: "created",
      KeyType: "RANGE",
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
  TableName: "Todos",
};

const item: TableInsertType = {
  TableName: "Todos",
  Item: { id: "2", itemDescription: "first item", created: "2024-12-7T08:12Z" },
};

const itemList: TableInsertType[] = [
  {
    TableName: "Todos",
    Item: {
      id: "1",
      itemDescription: "Buy groceries",
      created: "2024-12-07T12:00:00Z",
      completed: "false", // Add completed field here
    },
  },
  {
    TableName: "Todos",
    Item: {
      id: "2",
      itemDescription: "Finish homework",
      created: "2024-12-07T12:10:00Z",
      completed: "true", // Add completed field here
    },
  },
  {
    TableName: "Todos",
    Item: {
      id: "3",
      itemDescription: "Clean the house",
      created: "2024-12-07T12:15:00Z",
      completed: "false", // Add completed field here
    },
  },
  {
    TableName: "Todos",
    Item: {
      id: "4",
      itemDescription: "Prepare for meeting",
      created: "2024-12-07T12:20:00Z",
      completed: "true", // Add completed field here
    },
  },
  {
    TableName: "Todos",
    Item: {
      id: "5",
      itemDescription: "Walk the dog",
      created: "2024-12-07T12:25:00Z",
      completed: "false", // Add completed field here
    },
  },
  {
    TableName: "Todos",
    Item: {
      id: "6",
      itemDescription: "Read a book",
      created: "2024-12-07T12:30:00Z",
      completed: "false", // Add completed field here
    },
  },
  {
    TableName: "Todos",
    Item: {
      id: "7",
      itemDescription: "Call mom",
      created: "2024-12-07T12:35:00Z",
      completed: "true", // Add completed field here
    },
  },
  {
    TableName: "Todos",
    Item: {
      id: "8",
      itemDescription: "Write blog post",
      created: "2024-12-07T12:40:00Z",
      completed: "false", // Add completed field here
    },
  },
  {
    TableName: "Todos",
    Item: {
      id: "9",
      itemDescription: "Pay bills",
      created: "2024-12-07T12:45:00Z",
      completed: "true", // Add completed field here
    },
  },
  {
    TableName: "Todos",
    Item: {
      id: "10",
      itemDescription: "Go for a run",
      created: "2024-12-07T12:50:00Z",
      completed: "false", // Add completed field here
    },
  },
];

const queryItem = {
  TableName: "Todos",
  KeyConditionExpression: "id = :id",
  ExpressionAttributeValues: {
    ":id": { S: "1" },
  },
  ConsistentRead: true,
};

const main = async () => {
  //   console.log("list: ", await list_tables());
  //   console.log("create: ", await create_table(table));
  //   console.log("list: ", await list_tables());
  //   console.log("insert: ", await insert_to_table(item));
  // console.log("insert list: ", await insert_list_to_table(itemList));
  // console.log("aaa", await scan_table(table.TableName));
  //   console.log("query item", (await query_table(queryItem)).Items);
};
main();
