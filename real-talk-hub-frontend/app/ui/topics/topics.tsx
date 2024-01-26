import React from 'react';
import topicServices from "@/app/lib/topicServices";
import { Button } from "../button";
import { verifyTopicsAreAssociatedWithUser } from "@/app/lib/actions";
import ButtonDeleteTopic from "./buttonDeleteTopic";
import { auth } from "@/auth";
import { IUserWithTopics } from "@/app/interfaces/IUser";

export default async function TopicList() {
  const topics = await topicServices.getTopics();
  const session = await auth();
  const user = session?.user;

  if (!user?.email) return null;

  const userWithTopics = await getUserWithTopics(user.email);

  return (
    <>
      {topics.length === 0 ? (
        <h3>It seems like there's nothing here...;-;</h3>
      ) : (
        topics.map((topic) => (
          <div key={topic.id} className="flex w-full justify-between mt-7 ">
            <h2 className="text-white font-mono font-bold flex items-center">
              {topic.title}
            </h2>
            <div className="flex gap-2">
              <Button className="bg-green-500">ENTER THE ROOM</Button>
              {userWithTopics?.topics && userWithTopics.topics.some((topicMap) => topicMap.id === topic.id) ? (
                <ButtonDeleteTopic id={topic.id} />
              ) : (
                <span key={topic.id}></span>
              )}
            </div>
          </div>
        ))
      )}
    </>
  );
}

async function getUserWithTopics(email: string): Promise<IUserWithTopics | null> {
  try {
    const userWithTopics: IUserWithTopics | null = await verifyTopicsAreAssociatedWithUser(email);
    return userWithTopics;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
}
