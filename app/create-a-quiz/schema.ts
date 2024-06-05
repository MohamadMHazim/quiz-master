import { z } from "zod";

const schema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  questions: z.array(
    z.object({
      text: z.string().min(1),
      type: z.enum(["MCQ", "FILL_IN_THE_BLANKS", "WRITTEN_ANSWER"]),
      options: z.array(
        z.object({
          text: z.string().min(1),
          isCorrect: z.boolean(),
        })
      ).nonempty(),
    })
  ).nonempty(),
});

export default schema;
