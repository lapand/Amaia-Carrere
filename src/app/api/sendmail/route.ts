import { contactSchema } from '@/app/schemas/formSchema';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body: unknown = await req.json();
  console.log(body);

  const result = contactSchema.safeParse(body);
  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
  }
  
  return NextResponse.json(
    Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true }
  );
}
