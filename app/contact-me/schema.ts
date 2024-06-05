import { z } from "zod";

const schema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    message: z.string().min(1)
});

export default schema;
