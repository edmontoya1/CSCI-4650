import {
  create_table,
  insert_to_table,
  list_tables,
  query_table,
  scan_table,
  TableType,
} from "./index";

const table: TableType = {
  AttributeDefinitions: [
    {
      AttributeName: "id",
      AttributeType: "S",
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

const item = {
  TableName: "Todos",
  Item: { id: "2", itemDescription: "first item", created: "2024-12-7T08:12Z" },
};

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
  //   console.log("aaa", await scan_table(table.TableName));
  //   console.log("query item", (await query_table(queryItem)).Items);
};
main();
