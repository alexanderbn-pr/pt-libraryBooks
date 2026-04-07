---
name: forms
description: Build forms with React Hook Form + Zod validation
category: forms
level: intermediate
---

## Setup
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define schema (type-safe validation)
const schema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 chars'),
});

type FormData = z.infer<typeof schema>;
```

## Basic Form
```tsx
function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await submitForm(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Name" />
      {errors.name && <span>{errors.name.message}</span>}
      
      <input {...register('email')} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}
      
      <button disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Sign up'}
      </button>
    </form>
  );
}
```

## Dynamic Fields
```tsx
const { fields, append, remove } = useFieldArray({
  control,
  name: 'items',
});

{fields.map((field, i) => (
  <div key={field.id}>
    <input {...register(`items.${i}.name`)} />
    <button onClick={() => remove(i)}>Remove</button>
  </div>
))}
<button onClick={() => append({ name: '' })}>Add item</button>
```

## Watch Fields
```tsx
const quantity = watch('quantity');
const price = watch('price');
const total = (quantity || 0) * (price || 0);

return <p>Total: {total}</p>;
```

## Conditional Fields
```tsx
const userType = watch('userType');

return (
  <>
    <select {...register('userType')}>
      <option value="personal">Personal</option>
      <option value="business">Business</option>
    </select>
    
    {userType === 'business' && (
      <input {...register('companyName')} placeholder="Company" />
    )}
  </>
);
```

## Zod Validation
```tsx
// Custom validation
const schema = z.object({
  password: z.string().min(8),
  confirm: z.string(),
}).refine(d => d.password === d.confirm, {
  message: "Passwords don't match",
  path: ["confirm"],
});

// Async validation
const schema = z.object({
  email: z.string().email().refine(
    async (email) => !(await emailExists(email)),
    { message: "Email taken" }
  ),
});
```

## Key Concepts
- Uncontrolled components = better performance
- Validation at schema level = reusable
- Watch sparingly = only when needed
- Controller for custom inputs


