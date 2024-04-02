"use client";
import { Button } from "@radix-ui/themes";
import { MinusCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import axios from "axios";

const DeleteIssueButton = ({ issueId }: { issueId: any }) => {
  const handleDelete = async () => {
    await axios.delete(`api/issues/`, issueId);
  };

  return (
    <Button color="red">
      <MinusCircledIcon />
      <Link href="/issues" onClick={handleDelete}>
        Delete Issue
      </Link>
    </Button>
  );
};

export default DeleteIssueButton;
