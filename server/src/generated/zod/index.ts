import { z } from 'zod';
import type { Prisma } from '@/generated/prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','passwordHash','refreshToken']);

export const ColumnScalarFieldEnumSchema = z.enum(['id','title','position','userId']);

export const TaskScalarFieldEnumSchema = z.enum(['id','title','position','columnId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  refreshToken: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// COLUMN SCHEMA
/////////////////////////////////////////

export const ColumnSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  position: z.number().int(),
  userId: z.string(),
})

export type Column = z.infer<typeof ColumnSchema>

/////////////////////////////////////////
// TASK SCHEMA
/////////////////////////////////////////

export const TaskSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  position: z.string(),
  columnId: z.number().int(),
})

export type Task = z.infer<typeof TaskSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  columns: z.union([z.boolean(),z.lazy(() => ColumnFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  columns: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  passwordHash: z.boolean().optional(),
  refreshToken: z.boolean().optional(),
  columns: z.union([z.boolean(),z.lazy(() => ColumnFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// COLUMN
//------------------------------------------------------

export const ColumnIncludeSchema: z.ZodType<Prisma.ColumnInclude> = z.object({
  tasks: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ColumnCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const ColumnArgsSchema: z.ZodType<Prisma.ColumnDefaultArgs> = z.object({
  select: z.lazy(() => ColumnSelectSchema).optional(),
  include: z.lazy(() => ColumnIncludeSchema).optional(),
}).strict();

export const ColumnCountOutputTypeArgsSchema: z.ZodType<Prisma.ColumnCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ColumnCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ColumnCountOutputTypeSelectSchema: z.ZodType<Prisma.ColumnCountOutputTypeSelect> = z.object({
  tasks: z.boolean().optional(),
}).strict();

export const ColumnSelectSchema: z.ZodType<Prisma.ColumnSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  position: z.boolean().optional(),
  userId: z.boolean().optional(),
  tasks: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ColumnCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TASK
//------------------------------------------------------

export const TaskIncludeSchema: z.ZodType<Prisma.TaskInclude> = z.object({
  column: z.union([z.boolean(),z.lazy(() => ColumnArgsSchema)]).optional(),
}).strict();

export const TaskArgsSchema: z.ZodType<Prisma.TaskDefaultArgs> = z.object({
  select: z.lazy(() => TaskSelectSchema).optional(),
  include: z.lazy(() => TaskIncludeSchema).optional(),
}).strict();

export const TaskSelectSchema: z.ZodType<Prisma.TaskSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  position: z.boolean().optional(),
  columnId: z.boolean().optional(),
  column: z.union([z.boolean(),z.lazy(() => ColumnArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  passwordHash: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  refreshToken: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  columns: z.lazy(() => ColumnListRelationFilterSchema).optional(),
});

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  columns: z.lazy(() => ColumnOrderByRelationAggregateInputSchema).optional(),
});

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    email: z.string(),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  passwordHash: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  refreshToken: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  columns: z.lazy(() => ColumnListRelationFilterSchema).optional(),
}));

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
});

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  passwordHash: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  refreshToken: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
});

export const ColumnWhereInputSchema: z.ZodType<Prisma.ColumnWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ColumnWhereInputSchema), z.lazy(() => ColumnWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColumnWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColumnWhereInputSchema), z.lazy(() => ColumnWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  position: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  tasks: z.lazy(() => TaskListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
});

export const ColumnOrderByWithRelationInputSchema: z.ZodType<Prisma.ColumnOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  tasks: z.lazy(() => TaskOrderByRelationAggregateInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const ColumnWhereUniqueInputSchema: z.ZodType<Prisma.ColumnWhereUniqueInput> = z.object({
  id: z.number().int(),
})
.and(z.strictObject({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ColumnWhereInputSchema), z.lazy(() => ColumnWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColumnWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColumnWhereInputSchema), z.lazy(() => ColumnWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  position: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  tasks: z.lazy(() => TaskListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}));

export const ColumnOrderByWithAggregationInputSchema: z.ZodType<Prisma.ColumnOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ColumnCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ColumnAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ColumnMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ColumnMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ColumnSumOrderByAggregateInputSchema).optional(),
});

export const ColumnScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ColumnScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ColumnScalarWhereWithAggregatesInputSchema), z.lazy(() => ColumnScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColumnScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColumnScalarWhereWithAggregatesInputSchema), z.lazy(() => ColumnScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  position: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const TaskWhereInputSchema: z.ZodType<Prisma.TaskWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => TaskWhereInputSchema), z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskWhereInputSchema), z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  position: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  columnId: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  column: z.union([ z.lazy(() => ColumnScalarRelationFilterSchema), z.lazy(() => ColumnWhereInputSchema) ]).optional(),
});

export const TaskOrderByWithRelationInputSchema: z.ZodType<Prisma.TaskOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional(),
  column: z.lazy(() => ColumnOrderByWithRelationInputSchema).optional(),
});

export const TaskWhereUniqueInputSchema: z.ZodType<Prisma.TaskWhereUniqueInput> = z.object({
  id: z.number().int(),
})
.and(z.strictObject({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => TaskWhereInputSchema), z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskWhereInputSchema), z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  position: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  columnId: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  column: z.union([ z.lazy(() => ColumnScalarRelationFilterSchema), z.lazy(() => ColumnWhereInputSchema) ]).optional(),
}));

export const TaskOrderByWithAggregationInputSchema: z.ZodType<Prisma.TaskOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TaskCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TaskAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TaskMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TaskMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TaskSumOrderByAggregateInputSchema).optional(),
});

export const TaskScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TaskScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => TaskScalarWhereWithAggregatesInputSchema), z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskScalarWhereWithAggregatesInputSchema), z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  position: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  columnId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
});

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  refreshToken: z.string().optional().nullable(),
  columns: z.lazy(() => ColumnCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  refreshToken: z.string().optional().nullable(),
  columns: z.lazy(() => ColumnUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  columns: z.lazy(() => ColumnUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  columns: z.lazy(() => ColumnUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  refreshToken: z.string().optional().nullable(),
});

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const ColumnCreateInputSchema: z.ZodType<Prisma.ColumnCreateInput> = z.strictObject({
  title: z.string(),
  position: z.number().int(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutColumnInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutColumnsInputSchema),
});

export const ColumnUncheckedCreateInputSchema: z.ZodType<Prisma.ColumnUncheckedCreateInput> = z.strictObject({
  id: z.number().int().optional(),
  title: z.string(),
  position: z.number().int(),
  userId: z.string(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutColumnInputSchema).optional(),
});

export const ColumnUpdateInputSchema: z.ZodType<Prisma.ColumnUpdateInput> = z.strictObject({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutColumnNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutColumnsNestedInputSchema).optional(),
});

export const ColumnUncheckedUpdateInputSchema: z.ZodType<Prisma.ColumnUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutColumnNestedInputSchema).optional(),
});

export const ColumnCreateManyInputSchema: z.ZodType<Prisma.ColumnCreateManyInput> = z.strictObject({
  id: z.number().int().optional(),
  title: z.string(),
  position: z.number().int(),
  userId: z.string(),
});

export const ColumnUpdateManyMutationInputSchema: z.ZodType<Prisma.ColumnUpdateManyMutationInput> = z.strictObject({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ColumnUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ColumnUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const TaskCreateInputSchema: z.ZodType<Prisma.TaskCreateInput> = z.strictObject({
  title: z.string(),
  position: z.string(),
  column: z.lazy(() => ColumnCreateNestedOneWithoutTasksInputSchema),
});

export const TaskUncheckedCreateInputSchema: z.ZodType<Prisma.TaskUncheckedCreateInput> = z.strictObject({
  id: z.number().int().optional(),
  title: z.string(),
  position: z.string(),
  columnId: z.number().int(),
});

export const TaskUpdateInputSchema: z.ZodType<Prisma.TaskUpdateInput> = z.strictObject({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  column: z.lazy(() => ColumnUpdateOneRequiredWithoutTasksNestedInputSchema).optional(),
});

export const TaskUncheckedUpdateInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const TaskCreateManyInputSchema: z.ZodType<Prisma.TaskCreateManyInput> = z.strictObject({
  id: z.number().int().optional(),
  title: z.string(),
  position: z.string(),
  columnId: z.number().int(),
});

export const TaskUpdateManyMutationInputSchema: z.ZodType<Prisma.TaskUpdateManyMutationInput> = z.strictObject({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const TaskUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
});

export const ColumnListRelationFilterSchema: z.ZodType<Prisma.ColumnListRelationFilter> = z.strictObject({
  every: z.lazy(() => ColumnWhereInputSchema).optional(),
  some: z.lazy(() => ColumnWhereInputSchema).optional(),
  none: z.lazy(() => ColumnWhereInputSchema).optional(),
});

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.strictObject({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional(),
});

export const ColumnOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ColumnOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  passwordHash: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
});

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const TaskListRelationFilterSchema: z.ZodType<Prisma.TaskListRelationFilter> = z.strictObject({
  every: z.lazy(() => TaskWhereInputSchema).optional(),
  some: z.lazy(() => TaskWhereInputSchema).optional(),
  none: z.lazy(() => TaskWhereInputSchema).optional(),
});

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional(),
});

export const TaskOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TaskOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const ColumnCountOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
});

export const ColumnAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnAvgOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
});

export const ColumnMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
});

export const ColumnMinOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
});

export const ColumnSumOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnSumOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
});

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
});

export const ColumnScalarRelationFilterSchema: z.ZodType<Prisma.ColumnScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => ColumnWhereInputSchema).optional(),
  isNot: z.lazy(() => ColumnWhereInputSchema).optional(),
});

export const TaskCountOrderByAggregateInputSchema: z.ZodType<Prisma.TaskCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional(),
});

export const TaskAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TaskAvgOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional(),
});

export const TaskMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TaskMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional(),
});

export const TaskMinOrderByAggregateInputSchema: z.ZodType<Prisma.TaskMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional(),
});

export const TaskSumOrderByAggregateInputSchema: z.ZodType<Prisma.TaskSumOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional(),
});

export const ColumnCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ColumnCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => ColumnCreateWithoutUserInputSchema), z.lazy(() => ColumnCreateWithoutUserInputSchema).array(), z.lazy(() => ColumnUncheckedCreateWithoutUserInputSchema), z.lazy(() => ColumnUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ColumnCreateOrConnectWithoutUserInputSchema), z.lazy(() => ColumnCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ColumnCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ColumnWhereUniqueInputSchema), z.lazy(() => ColumnWhereUniqueInputSchema).array() ]).optional(),
});

export const ColumnUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ColumnUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => ColumnCreateWithoutUserInputSchema), z.lazy(() => ColumnCreateWithoutUserInputSchema).array(), z.lazy(() => ColumnUncheckedCreateWithoutUserInputSchema), z.lazy(() => ColumnUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ColumnCreateOrConnectWithoutUserInputSchema), z.lazy(() => ColumnCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ColumnCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ColumnWhereUniqueInputSchema), z.lazy(() => ColumnWhereUniqueInputSchema).array() ]).optional(),
});

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional(),
});

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional().nullable(),
});

export const ColumnUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ColumnUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ColumnCreateWithoutUserInputSchema), z.lazy(() => ColumnCreateWithoutUserInputSchema).array(), z.lazy(() => ColumnUncheckedCreateWithoutUserInputSchema), z.lazy(() => ColumnUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ColumnCreateOrConnectWithoutUserInputSchema), z.lazy(() => ColumnCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ColumnUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => ColumnUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ColumnCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ColumnWhereUniqueInputSchema), z.lazy(() => ColumnWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ColumnWhereUniqueInputSchema), z.lazy(() => ColumnWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ColumnWhereUniqueInputSchema), z.lazy(() => ColumnWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ColumnWhereUniqueInputSchema), z.lazy(() => ColumnWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ColumnUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => ColumnUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ColumnUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => ColumnUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ColumnScalarWhereInputSchema), z.lazy(() => ColumnScalarWhereInputSchema).array() ]).optional(),
});

export const ColumnUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ColumnUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ColumnCreateWithoutUserInputSchema), z.lazy(() => ColumnCreateWithoutUserInputSchema).array(), z.lazy(() => ColumnUncheckedCreateWithoutUserInputSchema), z.lazy(() => ColumnUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ColumnCreateOrConnectWithoutUserInputSchema), z.lazy(() => ColumnCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ColumnUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => ColumnUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ColumnCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ColumnWhereUniqueInputSchema), z.lazy(() => ColumnWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ColumnWhereUniqueInputSchema), z.lazy(() => ColumnWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ColumnWhereUniqueInputSchema), z.lazy(() => ColumnWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ColumnWhereUniqueInputSchema), z.lazy(() => ColumnWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ColumnUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => ColumnUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ColumnUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => ColumnUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ColumnScalarWhereInputSchema), z.lazy(() => ColumnScalarWhereInputSchema).array() ]).optional(),
});

export const TaskCreateNestedManyWithoutColumnInputSchema: z.ZodType<Prisma.TaskCreateNestedManyWithoutColumnInput> = z.strictObject({
  create: z.union([ z.lazy(() => TaskCreateWithoutColumnInputSchema), z.lazy(() => TaskCreateWithoutColumnInputSchema).array(), z.lazy(() => TaskUncheckedCreateWithoutColumnInputSchema), z.lazy(() => TaskUncheckedCreateWithoutColumnInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutColumnInputSchema), z.lazy(() => TaskCreateOrConnectWithoutColumnInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyColumnInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema), z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
});

export const UserCreateNestedOneWithoutColumnsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutColumnsInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutColumnsInputSchema), z.lazy(() => UserUncheckedCreateWithoutColumnsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutColumnsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const TaskUncheckedCreateNestedManyWithoutColumnInputSchema: z.ZodType<Prisma.TaskUncheckedCreateNestedManyWithoutColumnInput> = z.strictObject({
  create: z.union([ z.lazy(() => TaskCreateWithoutColumnInputSchema), z.lazy(() => TaskCreateWithoutColumnInputSchema).array(), z.lazy(() => TaskUncheckedCreateWithoutColumnInputSchema), z.lazy(() => TaskUncheckedCreateWithoutColumnInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutColumnInputSchema), z.lazy(() => TaskCreateOrConnectWithoutColumnInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyColumnInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema), z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
});

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const TaskUpdateManyWithoutColumnNestedInputSchema: z.ZodType<Prisma.TaskUpdateManyWithoutColumnNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => TaskCreateWithoutColumnInputSchema), z.lazy(() => TaskCreateWithoutColumnInputSchema).array(), z.lazy(() => TaskUncheckedCreateWithoutColumnInputSchema), z.lazy(() => TaskUncheckedCreateWithoutColumnInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutColumnInputSchema), z.lazy(() => TaskCreateOrConnectWithoutColumnInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutColumnInputSchema), z.lazy(() => TaskUpsertWithWhereUniqueWithoutColumnInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyColumnInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema), z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema), z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema), z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema), z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutColumnInputSchema), z.lazy(() => TaskUpdateWithWhereUniqueWithoutColumnInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutColumnInputSchema), z.lazy(() => TaskUpdateManyWithWhereWithoutColumnInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema), z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
});

export const UserUpdateOneRequiredWithoutColumnsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutColumnsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutColumnsInputSchema), z.lazy(() => UserUncheckedCreateWithoutColumnsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutColumnsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutColumnsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutColumnsInputSchema), z.lazy(() => UserUpdateWithoutColumnsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutColumnsInputSchema) ]).optional(),
});

export const TaskUncheckedUpdateManyWithoutColumnNestedInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutColumnNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => TaskCreateWithoutColumnInputSchema), z.lazy(() => TaskCreateWithoutColumnInputSchema).array(), z.lazy(() => TaskUncheckedCreateWithoutColumnInputSchema), z.lazy(() => TaskUncheckedCreateWithoutColumnInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutColumnInputSchema), z.lazy(() => TaskCreateOrConnectWithoutColumnInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutColumnInputSchema), z.lazy(() => TaskUpsertWithWhereUniqueWithoutColumnInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyColumnInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema), z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema), z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema), z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema), z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutColumnInputSchema), z.lazy(() => TaskUpdateWithWhereUniqueWithoutColumnInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutColumnInputSchema), z.lazy(() => TaskUpdateManyWithWhereWithoutColumnInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema), z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
});

export const ColumnCreateNestedOneWithoutTasksInputSchema: z.ZodType<Prisma.ColumnCreateNestedOneWithoutTasksInput> = z.strictObject({
  create: z.union([ z.lazy(() => ColumnCreateWithoutTasksInputSchema), z.lazy(() => ColumnUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ColumnCreateOrConnectWithoutTasksInputSchema).optional(),
  connect: z.lazy(() => ColumnWhereUniqueInputSchema).optional(),
});

export const ColumnUpdateOneRequiredWithoutTasksNestedInputSchema: z.ZodType<Prisma.ColumnUpdateOneRequiredWithoutTasksNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ColumnCreateWithoutTasksInputSchema), z.lazy(() => ColumnUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ColumnCreateOrConnectWithoutTasksInputSchema).optional(),
  upsert: z.lazy(() => ColumnUpsertWithoutTasksInputSchema).optional(),
  connect: z.lazy(() => ColumnWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ColumnUpdateToOneWithWhereWithoutTasksInputSchema), z.lazy(() => ColumnUpdateWithoutTasksInputSchema), z.lazy(() => ColumnUncheckedUpdateWithoutTasksInputSchema) ]).optional(),
});

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
});

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
});

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
});

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
});

export const ColumnCreateWithoutUserInputSchema: z.ZodType<Prisma.ColumnCreateWithoutUserInput> = z.strictObject({
  title: z.string(),
  position: z.number().int(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutColumnInputSchema).optional(),
});

export const ColumnUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ColumnUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.number().int().optional(),
  title: z.string(),
  position: z.number().int(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutColumnInputSchema).optional(),
});

export const ColumnCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ColumnCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => ColumnWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ColumnCreateWithoutUserInputSchema), z.lazy(() => ColumnUncheckedCreateWithoutUserInputSchema) ]),
});

export const ColumnCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ColumnCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => ColumnCreateManyUserInputSchema), z.lazy(() => ColumnCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const ColumnUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ColumnUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => ColumnWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ColumnUpdateWithoutUserInputSchema), z.lazy(() => ColumnUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ColumnCreateWithoutUserInputSchema), z.lazy(() => ColumnUncheckedCreateWithoutUserInputSchema) ]),
});

export const ColumnUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ColumnUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => ColumnWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ColumnUpdateWithoutUserInputSchema), z.lazy(() => ColumnUncheckedUpdateWithoutUserInputSchema) ]),
});

export const ColumnUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ColumnUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => ColumnScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ColumnUpdateManyMutationInputSchema), z.lazy(() => ColumnUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const ColumnScalarWhereInputSchema: z.ZodType<Prisma.ColumnScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ColumnScalarWhereInputSchema), z.lazy(() => ColumnScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColumnScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColumnScalarWhereInputSchema), z.lazy(() => ColumnScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  position: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const TaskCreateWithoutColumnInputSchema: z.ZodType<Prisma.TaskCreateWithoutColumnInput> = z.strictObject({
  title: z.string(),
  position: z.string(),
});

export const TaskUncheckedCreateWithoutColumnInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutColumnInput> = z.strictObject({
  id: z.number().int().optional(),
  title: z.string(),
  position: z.string(),
});

export const TaskCreateOrConnectWithoutColumnInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutColumnInput> = z.strictObject({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutColumnInputSchema), z.lazy(() => TaskUncheckedCreateWithoutColumnInputSchema) ]),
});

export const TaskCreateManyColumnInputEnvelopeSchema: z.ZodType<Prisma.TaskCreateManyColumnInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => TaskCreateManyColumnInputSchema), z.lazy(() => TaskCreateManyColumnInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const UserCreateWithoutColumnsInputSchema: z.ZodType<Prisma.UserCreateWithoutColumnsInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  refreshToken: z.string().optional().nullable(),
});

export const UserUncheckedCreateWithoutColumnsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutColumnsInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  refreshToken: z.string().optional().nullable(),
});

export const UserCreateOrConnectWithoutColumnsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutColumnsInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutColumnsInputSchema), z.lazy(() => UserUncheckedCreateWithoutColumnsInputSchema) ]),
});

export const TaskUpsertWithWhereUniqueWithoutColumnInputSchema: z.ZodType<Prisma.TaskUpsertWithWhereUniqueWithoutColumnInput> = z.strictObject({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TaskUpdateWithoutColumnInputSchema), z.lazy(() => TaskUncheckedUpdateWithoutColumnInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutColumnInputSchema), z.lazy(() => TaskUncheckedCreateWithoutColumnInputSchema) ]),
});

export const TaskUpdateWithWhereUniqueWithoutColumnInputSchema: z.ZodType<Prisma.TaskUpdateWithWhereUniqueWithoutColumnInput> = z.strictObject({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateWithoutColumnInputSchema), z.lazy(() => TaskUncheckedUpdateWithoutColumnInputSchema) ]),
});

export const TaskUpdateManyWithWhereWithoutColumnInputSchema: z.ZodType<Prisma.TaskUpdateManyWithWhereWithoutColumnInput> = z.strictObject({
  where: z.lazy(() => TaskScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateManyMutationInputSchema), z.lazy(() => TaskUncheckedUpdateManyWithoutColumnInputSchema) ]),
});

export const TaskScalarWhereInputSchema: z.ZodType<Prisma.TaskScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => TaskScalarWhereInputSchema), z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskScalarWhereInputSchema), z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  position: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  columnId: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
});

export const UserUpsertWithoutColumnsInputSchema: z.ZodType<Prisma.UserUpsertWithoutColumnsInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutColumnsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutColumnsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutColumnsInputSchema), z.lazy(() => UserUncheckedCreateWithoutColumnsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutColumnsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutColumnsInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutColumnsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutColumnsInputSchema) ]),
});

export const UserUpdateWithoutColumnsInputSchema: z.ZodType<Prisma.UserUpdateWithoutColumnsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const UserUncheckedUpdateWithoutColumnsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutColumnsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const ColumnCreateWithoutTasksInputSchema: z.ZodType<Prisma.ColumnCreateWithoutTasksInput> = z.strictObject({
  title: z.string(),
  position: z.number().int(),
  user: z.lazy(() => UserCreateNestedOneWithoutColumnsInputSchema),
});

export const ColumnUncheckedCreateWithoutTasksInputSchema: z.ZodType<Prisma.ColumnUncheckedCreateWithoutTasksInput> = z.strictObject({
  id: z.number().int().optional(),
  title: z.string(),
  position: z.number().int(),
  userId: z.string(),
});

export const ColumnCreateOrConnectWithoutTasksInputSchema: z.ZodType<Prisma.ColumnCreateOrConnectWithoutTasksInput> = z.strictObject({
  where: z.lazy(() => ColumnWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ColumnCreateWithoutTasksInputSchema), z.lazy(() => ColumnUncheckedCreateWithoutTasksInputSchema) ]),
});

export const ColumnUpsertWithoutTasksInputSchema: z.ZodType<Prisma.ColumnUpsertWithoutTasksInput> = z.strictObject({
  update: z.union([ z.lazy(() => ColumnUpdateWithoutTasksInputSchema), z.lazy(() => ColumnUncheckedUpdateWithoutTasksInputSchema) ]),
  create: z.union([ z.lazy(() => ColumnCreateWithoutTasksInputSchema), z.lazy(() => ColumnUncheckedCreateWithoutTasksInputSchema) ]),
  where: z.lazy(() => ColumnWhereInputSchema).optional(),
});

export const ColumnUpdateToOneWithWhereWithoutTasksInputSchema: z.ZodType<Prisma.ColumnUpdateToOneWithWhereWithoutTasksInput> = z.strictObject({
  where: z.lazy(() => ColumnWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ColumnUpdateWithoutTasksInputSchema), z.lazy(() => ColumnUncheckedUpdateWithoutTasksInputSchema) ]),
});

export const ColumnUpdateWithoutTasksInputSchema: z.ZodType<Prisma.ColumnUpdateWithoutTasksInput> = z.strictObject({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutColumnsNestedInputSchema).optional(),
});

export const ColumnUncheckedUpdateWithoutTasksInputSchema: z.ZodType<Prisma.ColumnUncheckedUpdateWithoutTasksInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ColumnCreateManyUserInputSchema: z.ZodType<Prisma.ColumnCreateManyUserInput> = z.strictObject({
  id: z.number().int().optional(),
  title: z.string(),
  position: z.number().int(),
});

export const ColumnUpdateWithoutUserInputSchema: z.ZodType<Prisma.ColumnUpdateWithoutUserInput> = z.strictObject({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutColumnNestedInputSchema).optional(),
});

export const ColumnUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ColumnUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutColumnNestedInputSchema).optional(),
});

export const ColumnUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ColumnUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const TaskCreateManyColumnInputSchema: z.ZodType<Prisma.TaskCreateManyColumnInput> = z.strictObject({
  id: z.number().int().optional(),
  title: z.string(),
  position: z.string(),
});

export const TaskUpdateWithoutColumnInputSchema: z.ZodType<Prisma.TaskUpdateWithoutColumnInput> = z.strictObject({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const TaskUncheckedUpdateWithoutColumnInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutColumnInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const TaskUncheckedUpdateManyWithoutColumnInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutColumnInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(), UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(), 
  having: UserScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const ColumnFindFirstArgsSchema: z.ZodType<Prisma.ColumnFindFirstArgs> = z.object({
  select: ColumnSelectSchema.optional(),
  include: ColumnIncludeSchema.optional(),
  where: ColumnWhereInputSchema.optional(), 
  orderBy: z.union([ ColumnOrderByWithRelationInputSchema.array(), ColumnOrderByWithRelationInputSchema ]).optional(),
  cursor: ColumnWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ColumnScalarFieldEnumSchema, ColumnScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ColumnFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ColumnFindFirstOrThrowArgs> = z.object({
  select: ColumnSelectSchema.optional(),
  include: ColumnIncludeSchema.optional(),
  where: ColumnWhereInputSchema.optional(), 
  orderBy: z.union([ ColumnOrderByWithRelationInputSchema.array(), ColumnOrderByWithRelationInputSchema ]).optional(),
  cursor: ColumnWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ColumnScalarFieldEnumSchema, ColumnScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ColumnFindManyArgsSchema: z.ZodType<Prisma.ColumnFindManyArgs> = z.object({
  select: ColumnSelectSchema.optional(),
  include: ColumnIncludeSchema.optional(),
  where: ColumnWhereInputSchema.optional(), 
  orderBy: z.union([ ColumnOrderByWithRelationInputSchema.array(), ColumnOrderByWithRelationInputSchema ]).optional(),
  cursor: ColumnWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ColumnScalarFieldEnumSchema, ColumnScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ColumnAggregateArgsSchema: z.ZodType<Prisma.ColumnAggregateArgs> = z.object({
  where: ColumnWhereInputSchema.optional(), 
  orderBy: z.union([ ColumnOrderByWithRelationInputSchema.array(), ColumnOrderByWithRelationInputSchema ]).optional(),
  cursor: ColumnWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ColumnGroupByArgsSchema: z.ZodType<Prisma.ColumnGroupByArgs> = z.object({
  where: ColumnWhereInputSchema.optional(), 
  orderBy: z.union([ ColumnOrderByWithAggregationInputSchema.array(), ColumnOrderByWithAggregationInputSchema ]).optional(),
  by: ColumnScalarFieldEnumSchema.array(), 
  having: ColumnScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ColumnFindUniqueArgsSchema: z.ZodType<Prisma.ColumnFindUniqueArgs> = z.object({
  select: ColumnSelectSchema.optional(),
  include: ColumnIncludeSchema.optional(),
  where: ColumnWhereUniqueInputSchema, 
}).strict();

export const ColumnFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ColumnFindUniqueOrThrowArgs> = z.object({
  select: ColumnSelectSchema.optional(),
  include: ColumnIncludeSchema.optional(),
  where: ColumnWhereUniqueInputSchema, 
}).strict();

export const TaskFindFirstArgsSchema: z.ZodType<Prisma.TaskFindFirstArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(), 
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(), TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema, TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const TaskFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TaskFindFirstOrThrowArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(), 
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(), TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema, TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const TaskFindManyArgsSchema: z.ZodType<Prisma.TaskFindManyArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(), 
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(), TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema, TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const TaskAggregateArgsSchema: z.ZodType<Prisma.TaskAggregateArgs> = z.object({
  where: TaskWhereInputSchema.optional(), 
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(), TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const TaskGroupByArgsSchema: z.ZodType<Prisma.TaskGroupByArgs> = z.object({
  where: TaskWhereInputSchema.optional(), 
  orderBy: z.union([ TaskOrderByWithAggregationInputSchema.array(), TaskOrderByWithAggregationInputSchema ]).optional(),
  by: TaskScalarFieldEnumSchema.array(), 
  having: TaskScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const TaskFindUniqueArgsSchema: z.ZodType<Prisma.TaskFindUniqueArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema, 
}).strict();

export const TaskFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TaskFindUniqueOrThrowArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema, 
}).strict();

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema, UserUncheckedCreateInputSchema ]),
}).strict();

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
  create: z.union([ UserCreateInputSchema, UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema, UserUncheckedUpdateInputSchema ]),
}).strict();

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema, UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema, UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema, UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ColumnCreateArgsSchema: z.ZodType<Prisma.ColumnCreateArgs> = z.object({
  select: ColumnSelectSchema.optional(),
  include: ColumnIncludeSchema.optional(),
  data: z.union([ ColumnCreateInputSchema, ColumnUncheckedCreateInputSchema ]),
}).strict();

export const ColumnUpsertArgsSchema: z.ZodType<Prisma.ColumnUpsertArgs> = z.object({
  select: ColumnSelectSchema.optional(),
  include: ColumnIncludeSchema.optional(),
  where: ColumnWhereUniqueInputSchema, 
  create: z.union([ ColumnCreateInputSchema, ColumnUncheckedCreateInputSchema ]),
  update: z.union([ ColumnUpdateInputSchema, ColumnUncheckedUpdateInputSchema ]),
}).strict();

export const ColumnCreateManyArgsSchema: z.ZodType<Prisma.ColumnCreateManyArgs> = z.object({
  data: z.union([ ColumnCreateManyInputSchema, ColumnCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ColumnCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ColumnCreateManyAndReturnArgs> = z.object({
  data: z.union([ ColumnCreateManyInputSchema, ColumnCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ColumnDeleteArgsSchema: z.ZodType<Prisma.ColumnDeleteArgs> = z.object({
  select: ColumnSelectSchema.optional(),
  include: ColumnIncludeSchema.optional(),
  where: ColumnWhereUniqueInputSchema, 
}).strict();

export const ColumnUpdateArgsSchema: z.ZodType<Prisma.ColumnUpdateArgs> = z.object({
  select: ColumnSelectSchema.optional(),
  include: ColumnIncludeSchema.optional(),
  data: z.union([ ColumnUpdateInputSchema, ColumnUncheckedUpdateInputSchema ]),
  where: ColumnWhereUniqueInputSchema, 
}).strict();

export const ColumnUpdateManyArgsSchema: z.ZodType<Prisma.ColumnUpdateManyArgs> = z.object({
  data: z.union([ ColumnUpdateManyMutationInputSchema, ColumnUncheckedUpdateManyInputSchema ]),
  where: ColumnWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ColumnUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ColumnUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ColumnUpdateManyMutationInputSchema, ColumnUncheckedUpdateManyInputSchema ]),
  where: ColumnWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ColumnDeleteManyArgsSchema: z.ZodType<Prisma.ColumnDeleteManyArgs> = z.object({
  where: ColumnWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const TaskCreateArgsSchema: z.ZodType<Prisma.TaskCreateArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  data: z.union([ TaskCreateInputSchema, TaskUncheckedCreateInputSchema ]),
}).strict();

export const TaskUpsertArgsSchema: z.ZodType<Prisma.TaskUpsertArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema, 
  create: z.union([ TaskCreateInputSchema, TaskUncheckedCreateInputSchema ]),
  update: z.union([ TaskUpdateInputSchema, TaskUncheckedUpdateInputSchema ]),
}).strict();

export const TaskCreateManyArgsSchema: z.ZodType<Prisma.TaskCreateManyArgs> = z.object({
  data: z.union([ TaskCreateManyInputSchema, TaskCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const TaskCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TaskCreateManyAndReturnArgs> = z.object({
  data: z.union([ TaskCreateManyInputSchema, TaskCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const TaskDeleteArgsSchema: z.ZodType<Prisma.TaskDeleteArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema, 
}).strict();

export const TaskUpdateArgsSchema: z.ZodType<Prisma.TaskUpdateArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  data: z.union([ TaskUpdateInputSchema, TaskUncheckedUpdateInputSchema ]),
  where: TaskWhereUniqueInputSchema, 
}).strict();

export const TaskUpdateManyArgsSchema: z.ZodType<Prisma.TaskUpdateManyArgs> = z.object({
  data: z.union([ TaskUpdateManyMutationInputSchema, TaskUncheckedUpdateManyInputSchema ]),
  where: TaskWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const TaskUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TaskUpdateManyAndReturnArgs> = z.object({
  data: z.union([ TaskUpdateManyMutationInputSchema, TaskUncheckedUpdateManyInputSchema ]),
  where: TaskWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const TaskDeleteManyArgsSchema: z.ZodType<Prisma.TaskDeleteManyArgs> = z.object({
  where: TaskWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();