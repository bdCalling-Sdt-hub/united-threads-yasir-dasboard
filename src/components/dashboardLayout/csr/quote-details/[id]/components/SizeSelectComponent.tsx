"use client";

import React, { useEffect, useState } from "react";
import { Checkbox, Input } from "antd";
import { FieldError } from "react-hook-form";
import { TSizeAndQuantity } from "@/types/quoteProductTypes";

interface SizeAndQuantity {
  size: string;
  quantity: number | undefined;
  selected: boolean;
}

interface SizeSelectComponentProps {
  defaultValues?: TSizeAndQuantity[];
  setSizesAndQuantities: React.Dispatch<React.SetStateAction<TSizeAndQuantity[]>>;
  errors?: {
    sizeAndQuantities?: FieldError;
  };
}

const SizeSelectComponent: React.FC<SizeSelectComponentProps> = ({
  defaultValues = [],
  setSizesAndQuantities,
  errors,
}) => {
  const [sizeAndQuantities, setSizeAndQuantities] = useState<SizeAndQuantity[]>([]);

  useEffect(() => {
    // Initialize state with all checkboxes selected by default, creating new objects
    const initialValues = defaultValues.map((item) => ({
      ...item,
      selected: true, // Ensure a new "selected" property is added
    }));
    setSizeAndQuantities(initialValues);
    setSizesAndQuantities(
      initialValues.map((item) => ({ size: item.size, quantity: item.quantity || 0 })),
    );
  }, [defaultValues, setSizesAndQuantities]);

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const updatedSizes = sizeAndQuantities.map((item, idx) =>
      idx === index
        ? { ...item, selected: checked } // Create a new object for the modified item
        : item,
    );
    setSizeAndQuantities(updatedSizes);
    setSizesAndQuantities(
      updatedSizes.map((item) => ({ size: item.size, quantity: item.quantity || 0 })),
    );
  };

  const handleQuantityChange = (index: number, value: string) => {
    const updatedSizes = sizeAndQuantities.map((item, idx) =>
      idx === index
        ? { ...item, quantity: Number(value) } // Create a new object for the modified item
        : item,
    );
    setSizeAndQuantities(updatedSizes);
    setSizesAndQuantities(
      updatedSizes.map((item) => ({ size: item.size, quantity: item.quantity || 0 })),
    );
  };

  return (
    <div>
      <label htmlFor='sizeAndQuantities' className='mb-2 block font-medium'>
        Select Size and Quantity
      </label>

      <div className='space-y-4'>
        {sizeAndQuantities.map((item, index) => (
          <div key={item.size} className='flex items-center gap-4'>
            {/* Checkbox */}
            <Checkbox
              id={item.size}
              checked={item.selected}
              onChange={(e) => handleCheckboxChange(index, e.target.checked)}
            >
              {item.size}
            </Checkbox>

            {/* Quantity input (visible only if checkbox is selected) */}
            {item.selected && (
              <Input
                type='number'
                min={1}
                value={item.quantity || ""}
                onChange={(e) => handleQuantityChange(index, e.target.value)}
                placeholder={`Enter quantity for ${item.size}`}
                className='w-1/3'
              />
            )}
          </div>
        ))}
      </div>

      {errors?.sizeAndQuantities && (
        <p className='mt-2 text-red-500'>
          {errors.sizeAndQuantities.message || "Size and quantity are required"}
        </p>
      )}
    </div>
  );
};

export default SizeSelectComponent;
