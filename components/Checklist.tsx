'use client';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChecklistItem as ChecklistItemType } from '@/types';
import ChecklistItem from './ChecklistItem';

interface ChecklistProps {
  items: ChecklistItemType[];
  onItemsChange: (items: ChecklistItemType[]) => void;
}

function SortableItem({
  item,
  onToggle,
  onUpdate,
  onRemove,
}: {
  item: ChecklistItemType;
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<ChecklistItemType>) => void;
  onRemove: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="flex items-center gap-2">
        <button
          {...listeners}
          className="text-slate-300 hover:text-purple-400 cursor-grab active:cursor-grabbing text-lg font-light transition-colors"
          aria-label="드래그"
        >
          ⋮⋮
        </button>
        <div className="flex-1">
          <ChecklistItem
            item={item}
            onToggle={onToggle}
            onUpdate={onUpdate}
            onRemove={onRemove}
          />
        </div>
      </div>
    </div>
  );
}

export default function Checklist({ items, onItemsChange }: ChecklistProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      onItemsChange(newItems);
    }
  };

  const handleToggle = (id: string) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    onItemsChange(newItems);
  };

  const handleUpdate = (id: string, updates: Partial<ChecklistItemType>) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );
    onItemsChange(newItems);
  };

  const handleRemove = (id: string) => {
    const newItems = items.filter((item) => item.id !== id);
    onItemsChange(newItems);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {items.map((item) => (
            <SortableItem
              key={item.id}
              item={item}
              onToggle={handleToggle}
              onUpdate={handleUpdate}
              onRemove={handleRemove}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

