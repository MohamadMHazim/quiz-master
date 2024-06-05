import { z } from "zod";

const schema = z
  .object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    confirmedPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: "Passwords don't match",
    path: ["confirmedPassword"], // path of error
  });

export default schema;
