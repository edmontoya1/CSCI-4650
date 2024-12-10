// /app/api/todos/route.ts
import { NextResponse } from "next/server";
import { dynamoClient } from "../../../lib/dynamoClient";
import { ScanCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { TodoItem } from "@/app/types";
// Function to get all Todos
export async function GET() {
  const command = new ScanCommand({
    TableName: "Todos", // DynamoDB Table name
  });

  try {
    const { Items } = await dynamoClient.send(command);

    // Transform the DynamoDB result into the desired TodoItem format
    const todos: TodoItem[] =
      Items?.map((item) => ({
        id: item.id.S!,
        created: item.created.S!,
        completed: item.completed.BOOL!,
        itemDescription: item.itemDescription.S!,
      })) || [];

    return NextResponse.json(todos);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error fetching todos" },
      { status: 500 }
    );
  }
}

// Function to create a new Todo
export async function POST(req: Request) {
  const { itemDescription } = await req.json();

  // Generate a unique ID for the new Todo (you can use a UUID, but for simplicity, we use timestamp)
  const id = Date.now().toString();

  const command = new PutItemCommand({
    TableName: "Todos",
    Item: {
      id: { S: id },
      created: { S: new Date().toISOString() },
      completed: { BOOL: false },
      itemDescription: { S: itemDescription },
    },
  });

  try {
    // Insert the new Todo into DynamoDB
    await dynamoClient.send(command);

    // After inserting the new Todo, fetch all Todos
    const scanCommand = new ScanCommand({
      TableName: "Todos",
    });

    const { Items } = await dynamoClient.send(scanCommand);
    const todos =
      Items?.map((item) => ({
        id: item.id.S!,
        created: item.created.S!,
        completed: item.completed.BOOL!,
        itemDescription: item.itemDescription.S!,
      })) || [];

    // Return the updated list of Todos
    return NextResponse.json(todos);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error creating todo" }, { status: 500 });
  }
}
