import { NextResponse } from "next/server";
import { dynamoClient } from "../../../lib/dynamoClient";
import { UpdateItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

// Handle the PUT request to update completion status of a specific Todo
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params; // Extract the dynamic "id" from the URL
  const { completed } = await req.json();

  if (!id || completed === undefined) {
    return NextResponse.json(
      { error: "Todo ID and completed status are required" },
      { status: 400 }
    );
  }

  try {
    // First, get the current state of the todo
    const getCommand = new ScanCommand({
      TableName: "Todos",
      FilterExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": { S: id },
      },
    });

    const { Items } = await dynamoClient.send(getCommand);

    if (Items?.length === 0) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    const currentTodo = Items![0];
    const currentCreated = currentTodo.created.S!;
    const currentCompletedStatus = currentTodo.completed.BOOL;

    // Toggle the completed status
    const updatedCompletedStatus = !currentCompletedStatus;

    // Update the todo in DynamoDB
    const updateCommand = new UpdateItemCommand({
      TableName: "Todos",
      Key: {
        id: { S: id }, // Partition key
        created: { S: currentCreated }, // Sort key
      },
      UpdateExpression: "SET completed = :completed", // Set new completed status
      ExpressionAttributeValues: {
        ":completed": { BOOL: updatedCompletedStatus },
      },
      ReturnValues: "ALL_NEW", // Return the updated attributes
    });

    await dynamoClient.send(updateCommand);
    // Return the updated todo item
    return NextResponse.json({
      id,
      completed: updatedCompletedStatus,
      itemDescription: currentTodo.itemDescription.S,
      created: currentTodo.created.S,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error updating todo" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params; // This is the dynamic route parameter 'id'
  if (!id) {
    return NextResponse.json({ error: "Todo ID is required" }, { status: 400 });
  }

  try {
    // First, get the current state of the todo (to get 'created' value for the sort key)
    const getCommand = new ScanCommand({
      TableName: "Todos",
      FilterExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": { S: id },
      },
    });

    const { Items } = await dynamoClient.send(getCommand);

    if (Items?.length === 0) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    const currentTodo = Items![0];
    const currentCreated = currentTodo.created.S; // This is the sort key
    // Now delete the todo from DynamoDB
    const deleteCommand = new DeleteCommand({
      TableName: "Todos",
      Key: {
        id: id, // Partition key
        created: currentCreated, // Sort key
      },
    });

    await dynamoClient.send(deleteCommand);

    // Return a success message
    return NextResponse.json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error deleting todo" }, { status: 500 });
  }
}
