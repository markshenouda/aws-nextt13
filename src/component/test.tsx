import { Cache } from "aws-amplify";
import { revalidatePath } from "next/cache";

async function Test() {
  async function handleSubmit(data: FormData) {
    "use server";
    const expiration = new Date(2100, 1, 1);
    Cache.setItem("name", data.get("name"), {
      expires: expiration.getTime(),
    });
    revalidatePath("/");
  }

  const name = await Cache.getItem("name");

  return (
    <div>
      <h1>Cached name: {name}</h1>
      <form action={handleSubmit}>
        <input type="text" name="name" id="name" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Test;
