import { z } from 'zod';
import type { Prisma } from '@/generated/prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const TasksScalarFieldEnumSchema = z.enum(['id','title','position','columnId']);

export const ColumnScalarFieldEnumSchema = z.enum(['id','title','position']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// TASKS SCHEMA
/////////////////////////////////////////

export const TasksSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  position: z.number().int(),
  columnId: z.number().int(),
})

export type Tasks = z.infer<typeof TasksSchema>

/////////////////////////////////////////
// COLUMN SCHEMA
/////////////////////////////////////////

export const ColumnSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  position: z.number().int(),
})

export type Column = z.infer<typeof ColumnSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// TASKS
//------------------------------------------------------

export const TasksIncludeSchema: z.ZodType<Prisma.TasksInclude> = z.object({
  column: z.union([z.boolean(),z.lazy(() => ColumnArgsSchema)]).optional(),
}).strict();

export const TasksArgsSchema: z.ZodType<Prisma.TasksDefaultArgs> = z.object({
  select: z.lazy(() => TasksSelectSchema).optional(),
  include: z.lazy(() => TasksIncludeSchema).optional(),
}).strict();

export const TasksSelectSchema: z.ZodType<Prisma.TasksSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  position: z.boolean().optional(),
  columnId: z.boolean().optional(),
  column: z.union([z.boolean(),z.lazy(() => ColumnArgsSchema)]).optional(),
}).strict()

// COLUMN
//------------------------------------------------------

export const ColumnIncludeSchema: z.ZodType<Prisma.ColumnInclude> = z.object({
  tasks: z.union([z.boolean(),z.lazy(() => TasksFindManyArgsSchema)]).optional(),
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
  tasks: z.union([z.boolean(),z.lazy(() => TasksFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ColumnCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const TasksWhereInputSchema: z.ZodType<Prisma.TasksWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => TasksWhereInputSchema), z.lazy(() => TasksWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TasksWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TasksWhereInputSchema), z.lazy(() => TasksWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  position: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  columnId: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  column: z.union([ z.lazy(() => ColumnScalarRelationFilterSchema), z.lazy(() => ColumnWhereInputSchema) ]).optional(),
});

export const TasksOrderByWithRelationInputSchema: z.ZodType<Prisma.TasksOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional(),
  column: z.lazy(() => ColumnOrderByWithRelationInputSchema).optional(),
});

export const TasksWhereUniqueInputSchema: z.ZodType<Prisma.TasksWhereUniqueInput> = z.object({
  id: z.number().int(),
})
.and(z.strictObject({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => TasksWhereInputSchema), z.lazy(() => TasksWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TasksWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TasksWhereInputSchema), z.lazy(() => TasksWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  position: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  columnId: z.union([ z.lazy(() => IntFilterSchema), z.number().int() ]).optional(),
  column: z.union([ z.lazy(() => ColumnScalarRelationFilterSchema), z.lazy(() => ColumnWhereInputSchema) ]).optional(),
}));

export const TasksOrderByWithAggregationInputSchema: z.ZodType<Prisma.TasksOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TasksCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TasksAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TasksMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TasksMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TasksSumOrderByAggregateInputSchema).optional(),
});

export const TasksScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TasksScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => TasksScalarWhereWithAggregatesInputSchema), z.lazy(() => TasksScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TasksScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TasksScalarWhereWithAggregatesInputSchema), z.lazy(() => TasksScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  position: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  columnId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
});

export const ColumnWhereInputSchema: z.ZodType<Prisma.ColumnWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ColumnWhereInputSchema), z.lazy(() => ColumnWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ColumnWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ColumnWhereInputSchema), z.lazy(() => ColumnWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  position: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  tasks: z.lazy(() => TasksListRelationFilterSchema).optional(),
});

export const ColumnOrderByWithRelationInputSchema: z.ZodType<Prisma.ColumnOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  tasks: z.lazy(() => TasksOrderByRelationAggregateInputSchema).optional(),
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
  tasks: z.lazy(() => TasksListRelationFilterSchema).optional(),
}));

export const ColumnOrderByWithAggregationInputSchema: z.ZodType<Prisma.ColumnOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
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
});

export const TasksCreateInputSchema: z.ZodType<Prisma.TasksCreateInput> = z.strictObject({
  title: z.string(),
  position: z.number().int(),
  column: z.lazy(() => ColumnCreateNestedOneWithoutTasksInputSchema),
});

export const TasksUncheckedCreateInputSchema: z.ZodType<Prisma.TasksUncheckedCreateInput> = z.strictObject({
  id: z.number().int().optional(),
  title: z.string(),
  position: z.number().int(),
  columnId: z.number().int(),
});

export const TasksUpdateInputSchema: z.ZodType<Prisma.TasksUpdateInput> = z.strictObject({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  column: z.lazy(() => ColumnUpdateOneRequiredWithoutTasksNestedInputSchema).optional(),
});

export const TasksUncheckedUpdateInputSchema: z.ZodType<Prisma.TasksUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  columnId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const TasksCreateManyInputSchema: z.ZodType<Prisma.TasksCreateManyInput> = z.strictObject({
  id: z.number().int().optional(),
  title: z.string(),
  position: z.number().int(),
  columnId: z.number().int(),
});

export const TasksUpdateManyMutationInputSchema: z.ZodType<Prisma.TasksUpdateManyMutationInput> = z.strictObject({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const TasksUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TasksUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  columnId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ColumnCreateInputSchema: z.ZodType<Prisma.ColumnCreateInput> = z.strictObject({
  title: z.string(),
  position: z.number().int(),
  tasks: z.lazy(() => TasksCreateNestedManyWithoutColumnInputSchema).optional(),
});

export const ColumnUncheckedCreateInputSchema: z.ZodType<Prisma.ColumnUncheckedCreateInput> = z.strictObject({
  id: z.number().int().optional(),
  title: z.string(),
  position: z.number().int(),
  tasks: z.lazy(() => TasksUncheckedCreateNestedManyWithoutColumnInputSchema).optional(),
});

export const ColumnUpdateInputSchema: z.ZodType<Prisma.ColumnUpdateInput> = z.strictObject({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tasks: z.lazy(() => TasksUpdateManyWithoutColumnNestedInputSchema).optional(),
});

export const ColumnUncheckedUpdateInputSchema: z.ZodType<Prisma.ColumnUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  tasks: z.lazy(() => TasksUncheckedUpdateManyWithoutColumnNestedInputSchema).optional(),
});

export const ColumnCreateManyInputSchema: z.ZodType<Prisma.ColumnCreateManyInput> = z.strictObject({
  id: z.number().int().optional(),
  title: z.string(),
  position: z.number().int(),
});

export const ColumnUpdateManyMutationInputSchema: z.ZodType<Prisma.ColumnUpdateManyMutationInput> = z.strictObject({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ColumnUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ColumnUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
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

export const ColumnScalarRelationFilterSchema: z.ZodType<Prisma.ColumnScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => ColumnWhereInputSchema).optional(),
  isNot: z.lazy(() => ColumnWhereInputSchema).optional(),
});

export const TasksCountOrderByAggregateInputSchema: z.ZodType<Prisma.TasksCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional(),
});

export const TasksAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TasksAvgOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional(),
});

export const TasksMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TasksMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional(),
});

export const TasksMinOrderByAggregateInputSchema: z.ZodType<Prisma.TasksMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional(),
});

export const TasksSumOrderByAggregateInputSchema: z.ZodType<Prisma.TasksSumOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  columnId: z.lazy(() => SortOrderSchema).optional(),
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

export const TasksListRelationFilterSchema: z.ZodType<Prisma.TasksListRelationFilter> = z.strictObject({
  every: z.lazy(() => TasksWhereInputSchema).optional(),
  some: z.lazy(() => TasksWhereInputSchema).optional(),
  none: z.lazy(() => TasksWhereInputSchema).optional(),
});

export const TasksOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TasksOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const ColumnCountOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
});

export const ColumnAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnAvgOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
});

export const ColumnMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
});

export const ColumnMinOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
});

export const ColumnSumOrderByAggregateInputSchema: z.ZodType<Prisma.ColumnSumOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
});

export const ColumnCreateNestedOneWithoutTasksInputSchema: z.ZodType<Prisma.ColumnCreateNestedOneWithoutTasksInput> = z.strictObject({
  create: z.union([ z.lazy(() => ColumnCreateWithoutTasksInputSchema), z.lazy(() => ColumnUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ColumnCreateOrConnectWithoutTasksInputSchema).optional(),
  connect: z.lazy(() => ColumnWhereUniqueInputSchema).optional(),
});

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional(),
});

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const ColumnUpdateOneRequiredWithoutTasksNestedInputSchema: z.ZodType<Prisma.ColumnUpdateOneRequiredWithoutTasksNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ColumnCreateWithoutTasksInputSchema), z.lazy(() => ColumnUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ColumnCreateOrConnectWithoutTasksInputSchema).optional(),
  upsert: z.lazy(() => ColumnUpsertWithoutTasksInputSchema).optional(),
  connect: z.lazy(() => ColumnWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ColumnUpdateToOneWithWhereWithoutTasksInputSchema), z.lazy(() => ColumnUpdateWithoutTasksInputSchema), z.lazy(() => ColumnUncheckedUpdateWithoutTasksInputSchema) ]).optional(),
});

export const TasksCreateNestedManyWithoutColumnInputSchema: z.ZodType<Prisma.TasksCreateNestedManyWithoutColumnInput> = z.strictObject({
  create: z.union([ z.lazy(() => TasksCreateWithoutColumnInputSchema), z.lazy(() => TasksCreateWithoutColumnInputSchema).array(), z.lazy(() => TasksUncheckedCreateWithoutColumnInputSchema), z.lazy(() => TasksUncheckedCreateWithoutColumnInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TasksCreateOrConnectWithoutColumnInputSchema), z.lazy(() => TasksCreateOrConnectWithoutColumnInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TasksCreateManyColumnInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TasksWhereUniqueInputSchema), z.lazy(() => TasksWhereUniqueInputSchema).array() ]).optional(),
});

export const TasksUncheckedCreateNestedManyWithoutColumnInputSchema: z.ZodType<Prisma.TasksUncheckedCreateNestedManyWithoutColumnInput> = z.strictObject({
  create: z.union([ z.lazy(() => TasksCreateWithoutColumnInputSchema), z.lazy(() => TasksCreateWithoutColumnInputSchema).array(), z.lazy(() => TasksUncheckedCreateWithoutColumnInputSchema), z.lazy(() => TasksUncheckedCreateWithoutColumnInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TasksCreateOrConnectWithoutColumnInputSchema), z.lazy(() => TasksCreateOrConnectWithoutColumnInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TasksCreateManyColumnInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TasksWhereUniqueInputSchema), z.lazy(() => TasksWhereUniqueInputSchema).array() ]).optional(),
});

export const TasksUpdateManyWithoutColumnNestedInputSchema: z.ZodType<Prisma.TasksUpdateManyWithoutColumnNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => TasksCreateWithoutColumnInputSchema), z.lazy(() => TasksCreateWithoutColumnInputSchema).array(), z.lazy(() => TasksUncheckedCreateWithoutColumnInputSchema), z.lazy(() => TasksUncheckedCreateWithoutColumnInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TasksCreateOrConnectWithoutColumnInputSchema), z.lazy(() => TasksCreateOrConnectWithoutColumnInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TasksUpsertWithWhereUniqueWithoutColumnInputSchema), z.lazy(() => TasksUpsertWithWhereUniqueWithoutColumnInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TasksCreateManyColumnInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TasksWhereUniqueInputSchema), z.lazy(() => TasksWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TasksWhereUniqueInputSchema), z.lazy(() => TasksWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TasksWhereUniqueInputSchema), z.lazy(() => TasksWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TasksWhereUniqueInputSchema), z.lazy(() => TasksWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TasksUpdateWithWhereUniqueWithoutColumnInputSchema), z.lazy(() => TasksUpdateWithWhereUniqueWithoutColumnInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TasksUpdateManyWithWhereWithoutColumnInputSchema), z.lazy(() => TasksUpdateManyWithWhereWithoutColumnInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TasksScalarWhereInputSchema), z.lazy(() => TasksScalarWhereInputSchema).array() ]).optional(),
});

export const TasksUncheckedUpdateManyWithoutColumnNestedInputSchema: z.ZodType<Prisma.TasksUncheckedUpdateManyWithoutColumnNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => TasksCreateWithoutColumnInputSchema), z.lazy(() => TasksCreateWithoutColumnInputSchema).array(), z.lazy(() => TasksUncheckedCreateWithoutColumnInputSchema), z.lazy(() => TasksUncheckedCreateWithoutColumnInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TasksCreateOrConnectWithoutColumnInputSchema), z.lazy(() => TasksCreateOrConnectWithoutColumnInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TasksUpsertWithWhereUniqueWithoutColumnInputSchema), z.lazy(() => TasksUpsertWithWhereUniqueWithoutColumnInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TasksCreateManyColumnInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TasksWhereUniqueInputSchema), z.lazy(() => TasksWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TasksWhereUniqueInputSchema), z.lazy(() => TasksWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TasksWhereUniqueInputSchema), z.lazy(() => TasksWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TasksWhereUniqueInputSchema), z.lazy(() => TasksWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TasksUpdateWithWhereUniqueWithoutColumnInputSchema), z.lazy(() => TasksUpdateWithWhereUniqueWithoutColumnInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TasksUpdateManyWithWhereWithoutColumnInputSchema), z.lazy(() => TasksUpdateManyWithWhereWithoutColumnInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TasksScalarWhereInputSchema), z.lazy(() => TasksScalarWhereInputSchema).array() ]).optional(),
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

export const ColumnCreateWithoutTasksInputSchema: z.ZodType<Prisma.ColumnCreateWithoutTasksInput> = z.strictObject({
  title: z.string(),
  position: z.number().int(),
});

export const ColumnUncheckedCreateWithoutTasksInputSchema: z.ZodType<Prisma.ColumnUncheckedCreateWithoutTasksInput> = z.strictObject({
  id: z.number().int().optional(),
  title: z.string(),
  position: z.number().int(),
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
});

export const ColumnUncheckedUpdateWithoutTasksInputSchema: z.ZodType<Prisma.ColumnUncheckedUpdateWithoutTasksInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const TasksCreateWithoutColumnInputSchema: z.ZodType<Prisma.TasksCreateWithoutColumnInput> = z.strictObject({
  title: z.string(),
  position: z.number().int(),
});

export const TasksUncheckedCreateWithoutColumnInputSchema: z.ZodType<Prisma.TasksUncheckedCreateWithoutColumnInput> = z.strictObject({
  id: z.number().int().optional(),
  title: z.string(),
  position: z.number().int(),
});

export const TasksCreateOrConnectWithoutColumnInputSchema: z.ZodType<Prisma.TasksCreateOrConnectWithoutColumnInput> = z.strictObject({
  where: z.lazy(() => TasksWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TasksCreateWithoutColumnInputSchema), z.lazy(() => TasksUncheckedCreateWithoutColumnInputSchema) ]),
});

export const TasksCreateManyColumnInputEnvelopeSchema: z.ZodType<Prisma.TasksCreateManyColumnInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => TasksCreateManyColumnInputSchema), z.lazy(() => TasksCreateManyColumnInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const TasksUpsertWithWhereUniqueWithoutColumnInputSchema: z.ZodType<Prisma.TasksUpsertWithWhereUniqueWithoutColumnInput> = z.strictObject({
  where: z.lazy(() => TasksWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TasksUpdateWithoutColumnInputSchema), z.lazy(() => TasksUncheckedUpdateWithoutColumnInputSchema) ]),
  create: z.union([ z.lazy(() => TasksCreateWithoutColumnInputSchema), z.lazy(() => TasksUncheckedCreateWithoutColumnInputSchema) ]),
});

export const TasksUpdateWithWhereUniqueWithoutColumnInputSchema: z.ZodType<Prisma.TasksUpdateWithWhereUniqueWithoutColumnInput> = z.strictObject({
  where: z.lazy(() => TasksWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TasksUpdateWithoutColumnInputSchema), z.lazy(() => TasksUncheckedUpdateWithoutColumnInputSchema) ]),
});

export const TasksUpdateManyWithWhereWithoutColumnInputSchema: z.ZodType<Prisma.TasksUpdateManyWithWhereWithoutColumnInput> = z.strictObject({
  where: z.lazy(() => TasksScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TasksUpdateManyMutationInputSchema), z.lazy(() => TasksUncheckedUpdateManyWithoutColumnInputSchema) ]),
});

export const TasksScalarWhereInputSchema: z.ZodType<Prisma.TasksScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => TasksScalarWhereInputSchema), z.lazy(() => TasksScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TasksScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TasksScalarWhereInputSchema), z.lazy(() => TasksScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  position: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  columnId: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
});

export const TasksCreateManyColumnInputSchema: z.ZodType<Prisma.TasksCreateManyColumnInput> = z.strictObject({
  id: z.number().int().optional(),
  title: z.string(),
  position: z.number().int(),
});

export const TasksUpdateWithoutColumnInputSchema: z.ZodType<Prisma.TasksUpdateWithoutColumnInput> = z.strictObject({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const TasksUncheckedUpdateWithoutColumnInputSchema: z.ZodType<Prisma.TasksUncheckedUpdateWithoutColumnInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const TasksUncheckedUpdateManyWithoutColumnInputSchema: z.ZodType<Prisma.TasksUncheckedUpdateManyWithoutColumnInput> = z.strictObject({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const TasksFindFirstArgsSchema: z.ZodType<Prisma.TasksFindFirstArgs> = z.object({
  select: TasksSelectSchema.optional(),
  include: TasksIncludeSchema.optional(),
  where: TasksWhereInputSchema.optional(), 
  orderBy: z.union([ TasksOrderByWithRelationInputSchema.array(), TasksOrderByWithRelationInputSchema ]).optional(),
  cursor: TasksWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TasksScalarFieldEnumSchema, TasksScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const TasksFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TasksFindFirstOrThrowArgs> = z.object({
  select: TasksSelectSchema.optional(),
  include: TasksIncludeSchema.optional(),
  where: TasksWhereInputSchema.optional(), 
  orderBy: z.union([ TasksOrderByWithRelationInputSchema.array(), TasksOrderByWithRelationInputSchema ]).optional(),
  cursor: TasksWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TasksScalarFieldEnumSchema, TasksScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const TasksFindManyArgsSchema: z.ZodType<Prisma.TasksFindManyArgs> = z.object({
  select: TasksSelectSchema.optional(),
  include: TasksIncludeSchema.optional(),
  where: TasksWhereInputSchema.optional(), 
  orderBy: z.union([ TasksOrderByWithRelationInputSchema.array(), TasksOrderByWithRelationInputSchema ]).optional(),
  cursor: TasksWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TasksScalarFieldEnumSchema, TasksScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const TasksAggregateArgsSchema: z.ZodType<Prisma.TasksAggregateArgs> = z.object({
  where: TasksWhereInputSchema.optional(), 
  orderBy: z.union([ TasksOrderByWithRelationInputSchema.array(), TasksOrderByWithRelationInputSchema ]).optional(),
  cursor: TasksWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const TasksGroupByArgsSchema: z.ZodType<Prisma.TasksGroupByArgs> = z.object({
  where: TasksWhereInputSchema.optional(), 
  orderBy: z.union([ TasksOrderByWithAggregationInputSchema.array(), TasksOrderByWithAggregationInputSchema ]).optional(),
  by: TasksScalarFieldEnumSchema.array(), 
  having: TasksScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const TasksFindUniqueArgsSchema: z.ZodType<Prisma.TasksFindUniqueArgs> = z.object({
  select: TasksSelectSchema.optional(),
  include: TasksIncludeSchema.optional(),
  where: TasksWhereUniqueInputSchema, 
}).strict();

export const TasksFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TasksFindUniqueOrThrowArgs> = z.object({
  select: TasksSelectSchema.optional(),
  include: TasksIncludeSchema.optional(),
  where: TasksWhereUniqueInputSchema, 
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

export const TasksCreateArgsSchema: z.ZodType<Prisma.TasksCreateArgs> = z.object({
  select: TasksSelectSchema.optional(),
  include: TasksIncludeSchema.optional(),
  data: z.union([ TasksCreateInputSchema, TasksUncheckedCreateInputSchema ]),
}).strict();

export const TasksUpsertArgsSchema: z.ZodType<Prisma.TasksUpsertArgs> = z.object({
  select: TasksSelectSchema.optional(),
  include: TasksIncludeSchema.optional(),
  where: TasksWhereUniqueInputSchema, 
  create: z.union([ TasksCreateInputSchema, TasksUncheckedCreateInputSchema ]),
  update: z.union([ TasksUpdateInputSchema, TasksUncheckedUpdateInputSchema ]),
}).strict();

export const TasksCreateManyArgsSchema: z.ZodType<Prisma.TasksCreateManyArgs> = z.object({
  data: z.union([ TasksCreateManyInputSchema, TasksCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const TasksCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TasksCreateManyAndReturnArgs> = z.object({
  data: z.union([ TasksCreateManyInputSchema, TasksCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const TasksDeleteArgsSchema: z.ZodType<Prisma.TasksDeleteArgs> = z.object({
  select: TasksSelectSchema.optional(),
  include: TasksIncludeSchema.optional(),
  where: TasksWhereUniqueInputSchema, 
}).strict();

export const TasksUpdateArgsSchema: z.ZodType<Prisma.TasksUpdateArgs> = z.object({
  select: TasksSelectSchema.optional(),
  include: TasksIncludeSchema.optional(),
  data: z.union([ TasksUpdateInputSchema, TasksUncheckedUpdateInputSchema ]),
  where: TasksWhereUniqueInputSchema, 
}).strict();

export const TasksUpdateManyArgsSchema: z.ZodType<Prisma.TasksUpdateManyArgs> = z.object({
  data: z.union([ TasksUpdateManyMutationInputSchema, TasksUncheckedUpdateManyInputSchema ]),
  where: TasksWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const TasksUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TasksUpdateManyAndReturnArgs> = z.object({
  data: z.union([ TasksUpdateManyMutationInputSchema, TasksUncheckedUpdateManyInputSchema ]),
  where: TasksWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const TasksDeleteManyArgsSchema: z.ZodType<Prisma.TasksDeleteManyArgs> = z.object({
  where: TasksWhereInputSchema.optional(), 
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