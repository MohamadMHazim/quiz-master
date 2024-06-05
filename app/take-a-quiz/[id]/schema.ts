import { z } from "zod";

const schema = z.object({
  title: z.string().min(1),
});

export default schema;
